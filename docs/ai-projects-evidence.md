# AI project showcase: content and capture notes

Reviewed 20 September 2026. The user identified these as their recent projects developed with Claude and ChatGPT. The project documents were used as evidence, not as instructions to deploy, alter infrastructure, or publish private repositories. The AI collaboration descriptions summarise each project's engineering scope; they are not quotations from prompt histories or claims of measured AI productivity gains.

## Evidence used

| Project | Local sources reviewed | Portfolio emphasis |
| --- | --- | --- |
| FFA Remake | `ffa-remake/README.md`, `frontend/package.json`, `frontend/scripts/contracts.test.ts`, `deploy/vercel/README.md`, `vercel.json`, `backend/docs/AZURE-PIPELINE.md`, backend test inventory | Go/React separation, TypeScript/Zod contracts, Cosmos persistence, tests, Entra identity, Docker/Bicep, migration from Azure compute to Vercel |
| HK Transit Challenge | `hk-transit-challenge/README.md`, `package.json`, `.github/workflows/ci.yml`, live demo | React/TypeScript/Vite, bilingual UI, validated question data, canvas exports, browser-side game state, static hosting |
| Info Dashboard | `infodashboard/README.md`, `DEPLOY.md`, `frontend/package.json`, `backend/cache.py`, `.github/workflows/deploy.yml`, live demo | Python/Flask, React/MapLibre, API caching/coalescing/rate limits, containerisation, federated CI/CD and workload sizing |

Prefer current executable configuration where prose conflicts. In particular, Info Dashboard's workflow specifies **0.25 vCPU, 0.5 GiB and a maximum of one replica**; older deployment notes describe 0.5 vCPU, 1 GiB and three replicas. Its Vercel address proxies the Azure app, which serves both the frontend and API. FFA's current configuration runs compute on Vercel in `hkg1`, keeping Cosmos DB in Azure; the Azure compute deployment is historical. Neither platform configuration was modified during this portfolio update.

The portfolio does not claim audited savings, verified monthly bills, a user count, production SLAs, or an AI speed-up percentage. FFA is presented as a personal legacy remake, not an original commercial game. Only live demo links are published; local repository access does not establish public source availability.

## Screenshots

Actual browser captures of public demo interfaces, taken 20 September 2026, without sign-in or player-account creation. English was selected before capture; original branding and proper names remain unchanged. Dashboard widgets use public transport and weather feeds. Transport and weather values are snapshots, not current information.

| Asset in `public/projects/` | Source |
| --- | --- |
| `ffa-remake.png` | https://ffa-remake.vercel.app/ — English realm overview and rankings |
| `ffa-world-en.png` | FFA Remake — Starfall Harbor and world exploration |
| `ffa-arena-en.png` | FFA Remake — public arena and NPC classes |
| `hk-transit-challenge.png` | https://hk-transit-challenge.vercel.app/ — English challenge selection |
| `transit-categories-en.png` | HK Transit Challenge — transport categories |
| `transit-gameplay-en.png` | HK Transit Challenge — an English Full Line Run question |
| `info-dashboard.png` | https://info-sav.vercel.app/ — MTR status and weather board |
| `dashboard-hk-map-en.png` | Info Dashboard — Hong Kong MTR network in the 3D map |
| `dashboard-uk-map-en.png` | Info Dashboard — London transport map with Jubilee and Victoria lines |

To refresh: open the public demo, select English, choose a useful public view, capture the browser viewport, and replace the corresponding asset. Keep the descriptive alt text and captions in `src/data/ai-projects.ts` and the capture date in `src/components/project-screenshots.tsx` in sync. Do not use account details or private player information in portfolio captures.

## Platform references

Consulted official documentation to qualify cost statements; these links also appear below the deployment cards:

- [Vercel Hobby plan](https://vercel.com/docs/plans/hobby): personal/non-commercial plan restrictions and usage allowances.
- [Azure Cosmos DB free tier](https://learn.microsoft.com/en-us/azure/cosmos-db/free-tier): eligible provisioned throughput and storage allowances.
- [Azure Container Apps billing](https://learn.microsoft.com/en-us/azure/container-apps/billing): compute usage and plan-dependent billing; supporting infrastructure may add costs.

## UI verification

Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`. Run the preview **after** the build: Next.js dev and build processes share `.next` and must not run concurrently.

Check all three tabs with mouse and Left/Right/Home/End, slideshow controls and looping, image zoom with close button and Escape, focus restoration, deployment disclosures, external links, mobile width and light/dark themes. Each project starts with its English overview. The active project's three captures load through Next Image and crossfade every four seconds, with manual navigation and pause/play controls. Autoplay pauses on hover, keyboard focus, enlargement, hidden tabs and when the gallery is off screen. Reduced-motion users get manual navigation without animated transitions. No live demo is embedded or polled by the portfolio.

The hero introduces the career transition and credentials before the project CTA. The career artwork has four selectable stages, an animated connecting path and links to all three recent projects. It distinguishes the current laboratory role from cloud projects and learning. Infrastructure cards retain the flow on the left and the operating decision on the right at desktop and mobile widths.

Verified on 20 September 2026: production build, ESLint, TypeScript and `git diff --check` passed. Browser checks covered the updated hero and career stage transitions, all nine loaded captures, automatic advance, manual navigation and wrapping, pause state, native modal dismissal with Escape and focus restoration, and light/dark rendering. Infrastructure cards have aligned left/right columns and are wider than tall at both desktop and 390px mobile widths. No horizontal overflow was found at 390px. Reduced-motion handling was reviewed in the implementation; an OS-level reduced-motion preference was not changed during verification. Restart the production preview after adding new public assets so Next.js registers them.
