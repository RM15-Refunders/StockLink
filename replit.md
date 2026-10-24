# StockLink

StockLink is a browser-local order and inventory demo for the fictional Kopi Corner workspace, developed and published on Replit by RM15 Refunders.

## Presentation and submission

Our [pitch video](https://youtu.be/a2iZmWnK0s8) and [pitch deck](submission/SDC2026_RM15Refunders_Pitchdeck%20Slide.pptx) are available. Original documents are archived in [submission](submission/README.md).

## Run and validate

Use Node.js 24 and pnpm 10.26.1 from the repository root on Linux x64 or WSL2.

- Install: `pnpm install --frozen-lockfile`
- Frontend: `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/stocklink run dev`
- Validate and build: `PORT=3000 BASE_PATH=/ pnpm run build`

PORT and BASE_PATH must be set before Vite configuration loads. The frontend demo does not require a running API, DATABASE_URL or an AI key. Static output is src/artifacts/stocklink/dist/public/.

## Stack and repository map

- src/artifacts/stocklink/src/App.tsx: React 19, TypeScript, five views and deterministic forecast logic.
- src/artifacts/stocklink/src/brand-theme.css: StockLink brand styling.
- src/artifacts/stocklink/public/: public brand assets.
- Browser localStorage key stocklink-demo-v1: demo state and events.
- src/artifacts/api-server and src/lib/: API/DB scaffolding and generated contracts, not the active inventory persistence layer.
- docs/replit-usage-evidence.md: verified deployment link and Replit use statement.

## Product and implementation decisions

Confirmed orders contribute recipe demand; draft/cancelled orders do not. Baseline daily usage is additional. Risk is checked before and after same-day deliveries. Receiving a delivery adds stock once and removes it from incoming quantities. Recommendation approval records a human decision without contacting suppliers.

Local state deliberately supports a synthetic demo. It is not a shared production database or a tamper-resistant audit log. RunPod was not used and no GPU workload is present.

## Collaboration and constraints

Keep factual claims aligned with the implemented demo. Do not add unsupported AI capabilities or measured impact. Use synthetic data only. Preserve the Apache-2.0 project license and third-party notices. Follow CONTRIBUTING.md and docs/demo-guide.md when changing behavior. Current native dependency overrides target Linux x64.

## References

- README.md: run instructions and current scope
- docs/architecture.md: forecasting assumptions and limitations
- docs/demo-guide.md: manual verification
- docs/competition-reference.md: competition brief and submission status
