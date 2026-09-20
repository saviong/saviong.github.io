import assert from "node:assert/strict";

const base = process.env.PREVIEW_URL ?? "http://127.0.0.1:3015";
const browser = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
const request = (path, agent = browser) => fetch(new URL(path, base), { headers: { "User-Agent": agent } });
const checkHeader = response => assert.match(response.headers.get("x-robots-tag") ?? "", /\bnoindex\b/);
let scriptPath;

for (const path of ["/", "/blog", "/azure-lab"]) {
  const response = await request(path);
  assert.equal(response.status, 200, `Normal visitor: ${path}`);
  checkHeader(response);
  const html = await response.text();
  assert.match(html, /<meta name="robots" content="[^"]*noindex/, `No-index metadata: ${path}`);
  if (path === "/") scriptPath = html.match(/<script src="([^\"]*\/_next\/static\/[^\"]+)"/)?.[1];
}

// Warm the public cache, then make sure automation cannot retrieve the bundle
// and that its denial does not poison the subsequent ordinary visitor response.
assert.ok(scriptPath, "Home page includes its JavaScript bundle");
for (const [agent, status] of [[browser, 200], ["GPTBot/1.1", 403], [browser, 200]]) {
  const response = await request(scriptPath, agent);
  assert.equal(response.status, status, "Static bundle cache respects crawler filtering");
  checkHeader(response);
  await response.arrayBuffer();
}

const badge = await request("/certifications/terraform-associate-003.png");
assert.equal(badge.status, 200);
assert.match(badge.headers.get("content-type") ?? "", /image\/png/);
checkHeader(badge);
assert.equal(Buffer.from(await badge.arrayBuffer()).subarray(0, 8).toString("hex"), "89504e470d0a1a0a");

for (const agent of ["Googlebot/2.1", "bingbot/2.0", "GPTBot/1.1", "OAI-SearchBot/1.3", "ChatGPT-User/1.0", "ClaudeBot/1.0", "Claude-User/1.0", "PerplexityBot/1.0", "CCBot/2.0", "ia_archiver", "archive.org_bot", "Archive-It", "meta-externalagent/1.1", "UnknownCrawler/1.0"]) {
  for (const path of ["/", "/blog", "/certifications/terraform-associate-003.png", "/api/github-contributions"]) {
    const response = await request(path, agent);
    assert.equal(response.status, 403, `${agent}: ${path}`);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    checkHeader(response);
    assert.equal(await response.text(), "Automated access is not permitted.\n");
  }
  const policy = await request("/robots.txt", agent);
  assert.equal(policy.status, 200, `${agent} can read robots.txt`);
  const rules = await policy.text();
  assert.match(rules, /User-agent: \*\s+Disallow: \//);
  assert.match(rules, /User-agent: Googlebot\s+User-agent: Bingbot\s+Allow: \//);
  assert.match(rules, /User-agent: Google-Extended\s+Disallow: \//);
}

// Next 14 handles its optimizer before middleware, so that endpoint is disabled
// for everyone. Check twice to cover both initial and repeated requests.
for (const agent of [browser, "GPTBot/1.1", browser, "Googlebot/2.1"]) {
  const response = await request("/_next/image?url=%2Fme.png&w=64&q=75", agent);
  assert.equal(response.status, 404, "Image optimization endpoint is disabled");
  assert.doesNotMatch(response.headers.get("content-type") ?? "", /^image\//);
}

console.log("PASS: normal visitors, page metadata, no-index headers, local badge, crawler denials, readable robots.txt and disabled image optimizer.");
