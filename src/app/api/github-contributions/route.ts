import { NextResponse } from "next/server";

const GITHUB_USERNAME = "saviong";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

// Without this the handler is prerendered at build time and its response is
// baked into the deployment, so contributions freeze at the last deploy.
export const dynamic = "force-dynamic";

// How long a shared cache may reuse a response before we ask GitHub again.
const CDN_TTL_SECONDS = 900;

export async function GET() {
  try {
    const response = await fetch(CONTRIBUTIONS_API, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Contribution service returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        // max-age=0 keeps browsers revalidating on every visit, while s-maxage
        // lets the CDN absorb traffic so the upstream API isn't hit per request.
        "Cache-Control": `public, max-age=0, s-maxage=${CDN_TTL_SECONDS}, stale-while-revalidate=${CDN_TTL_SECONDS}`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "GitHub contributions are temporarily unavailable." },
      // Never cache a failure, or one blip would persist for the whole TTL.
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
