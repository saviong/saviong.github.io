import { NextResponse } from "next/server";

const GITHUB_USERNAME = "saviong";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

export const revalidate = 3600;

export async function GET() {
  try {
    const response = await fetch(CONTRIBUTIONS_API, {
      headers: { Accept: "application/json" },
      next: { revalidate },
    });

    if (!response.ok) {
      throw new Error(`Contribution service returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "GitHub contributions are temporarily unavailable." },
      { status: 502 },
    );
  }
}
