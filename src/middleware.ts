import { NextResponse, type NextRequest } from "next/server";

// Best-effort filtering of self-identifying automation, not authentication.
// A client can impersonate a browser; robots.txt covers compliant crawlers.
const AUTOMATED_CLIENT = /bot\b|crawler|spider|slurp|ia_archiver|archive\.org|archive-it|archive\.today|archive\.is|wayback|heritrix|GPTBot|ChatGPT-User|OAI-SearchBot|OAI-AdsBot|ClaudeBot|Claude-User|Claude-SearchBot|anthropic-ai|cohere-ai|CCBot|PerplexityBot|Perplexity-User|Google-Extended|GoogleOther|Google-CloudVertexBot|Google-InspectionTool|Bytespider|Amazonbot|Applebot|FacebookExternalHit|meta-externalagent|meta-externalfetcher|Diffbot|YouBot|DuckAssistBot|PetalBot|SemrushBot|AhrefsBot/i;

export function middleware(request: NextRequest) {
  // Every crawler must be able to retrieve the policy, even when blocked.
  if (request.nextUrl.pathname === "/robots.txt") {
    return NextResponse.next();
  }

  if (AUTOMATED_CLIENT.test(request.headers.get("user-agent") ?? "")) {
    return new NextResponse("Automated access is not permitted.\n", {
      status: 403,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
      },
    });
  }

  return NextResponse.next();
}

// Include static assets, API routes and Next data requests as well as pages.
export const config = { matcher: "/:path*" };
