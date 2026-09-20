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

Actual browser captures of public demo interfaces, taken 20 September 2026, without sign-in or player-account creation. Dashboard widgets were configured in a fresh browser tab using public MTR status and Hong Kong Observatory data. Transport and weather values are snapshots, not current information.

| Asset in `public/projects/` | Source |
| --- | --- |
| `ffa-remake.png` | https://ffa-remake.vercel.app/ — world exploration |
| `hk-transit-challenge.png` | https://hk-transit-challenge.vercel.app/ — challenge selection |
| `info-dashboard.png` | https://info-sav.vercel.app/ — MTR status and weather board |

To refresh: open the public demo, choose a useful public view, capture the browser viewport, and replace the corresponding PNG. Keep the descriptive alt text and capture date in sync in `src/data/ai-projects.ts` and `src/components/ai-projects.tsx`. Do not use account details or private player information in portfolio captures.

## Platform references

Consulted official documentation to qualify cost statements; these links also appear below the deployment cards:

- [Vercel Hobby plan](https://vercel.com/docs/plans/hobby): personal/non-commercial plan restrictions and usage allowances.
- [Azure Cosmos DB free tier](https://learn.microsoft.com/en-us/azure/cosmos-db/free-tier): eligible provisioned throughput and storage allowances.
- [Azure Container Apps billing](https://learn.microsoft.com/en-us/azure/container-apps/billing): compute usage and plan-dependent billing; supporting infrastructure may add costs.

## UI verification

Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`. Run the preview **after** the build: Next.js dev and build processes share `.next` and must not run concurrently.

Check all three tabs with mouse and Left/Right/Home/End, image zoom with close button and Escape, focus restoration, deployment disclosures, external links, mobile width and light/dark themes. The project transition uses `useReducedMotion`; CSS disables showcase hover transitions for reduced-motion users. Captures are lazy-loaded through Next Image, and no live demo is embedded or polled by the portfolio.

Verified on 20 September 2026: production build, ESLint, TypeScript and `git diff --check` passed. Browser checks confirmed all three project views, keyboard selection (Right/Home/End), screenshot loading, native modal dismissal with both Escape and the close button, focus return to the screenshot trigger, deployment disclosure content, light/dark rendering and a 390px mobile viewport without horizontal overflow. No browser warnings or errors were recorded in the preview. Reduced-motion handling was reviewed in the implementation; an OS-level reduced-motion preference was not changed during verification.
