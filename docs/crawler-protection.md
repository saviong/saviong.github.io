# Crawler restrictions

The portfolio remains publicly accessible to ordinary browsers. These controls reduce automated access; they are not a private-site boundary or a guarantee against copying, screenshots, saving, AI training or archiving.

- Root metadata marks pages `noindex`, `nofollow`, `nosnippet` and `noimageindex`; `noarchive` requests no caching from services that support it.
- Next.js sends `X-Robots-Tag` on application routes, including original image assets and APIs.
- `public/robots.txt` disallows automated collection by default and explicitly opts out of Google-Extended. Googlebot and Bingbot can request URLs to discover the server's **403 denial**, allowing existing search listings to be removed over time. They do not receive the portfolio content. Blocking them solely in robots.txt could leave URL-only listings.
- Middleware denies self-identifying search, AI, archive and other crawler clients with a plain 403 response. Denials are not cached. All bots can still retrieve robots.txt. User-agent matching is deliberately only a best-effort filter: clients can use an ordinary browser identity.
- Next.js 14's image optimizer can respond before middleware, so it is disabled (`images.unoptimized`). Images use their original files through the protected public-asset routes; `/_next/image` returns 404. This removes that cache bypass and image transformation work, at the cost of serving original image sizes. Existing screenshot assets are approximately 60–165 KB each.
- No paid service, database, browser challenge or client-side copy/right-click interception is added.

## Hosting and existing copies

Deploy on a Next.js runtime such as Vercel for the middleware and response headers to run. A static GitHub Pages export does **not** execute this middleware or `next.config.mjs` headers; it would retain only HTML metadata and robots.txt. These protections do not change other sites, the public GitHub repository, your separate CV domain or the project demos.

Existing search results do not disappear immediately. After deployment, the verified owner can use [Google Search Console's removal tools](https://support.google.com/webmasters/answer/9689846) for urgent removal. Existing Wayback copies require an [Internet Archive exclusion/removal request](https://archivesupport.zendesk.com/hc/en-us/articles/360004651732-Using-The-Wayback-Machine); this change does not remove stored copies or send that request.

To prevent unauthorised visitors from obtaining the page itself, the site would need authentication/access control. Even authorised visitors can save what they can view.

## Verification

Build and start the production preview, then run:

```sh
PREVIEW_URL=http://127.0.0.1:3015 node scripts/check-crawler-protection.mjs
```

The integration check verifies normal browser access, inherited metadata on multiple routes, headers on pages/assets, the local Terraform badge, crawler denial on pages/assets/API routes, crawler access to robots.txt, and the disabled image optimizer.

References: [Google noindex requirements](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Google handling of 4xx responses](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes), [Google crawler and Google-Extended controls](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers), [OpenAI crawler controls](https://developers.openai.com/api/docs/bots).
