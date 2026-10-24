# StockLink source workspace

All application packages, shared libraries and maintenance utilities are grouped here. Run installation and build commands from the repository root; pnpm-workspace.yaml and the lockfile stay there.

| Path | Purpose |
|---|---|
| artifacts/stocklink | Main React inventory demo, static assets and Vite configuration |
| artifacts/api-server | Express health endpoint scaffold; not the demo inventory backend |
| artifacts/mockup-sandbox | Development-only component preview service |
| lib/api-spec | OpenAPI health contract and client generation configuration |
| lib/api-client-react and lib/api-zod | Generated health clients and validation schemas |
| lib/db | Empty database scaffold; browser demo does not use it |
| scripts | Layout verification and Replit merge maintenance |

See the [root setup guide](../README.md), [architecture](../docs/architecture.md) and [submission documents](../submission/README.md).
