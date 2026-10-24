# Contributing

Use the [root README](README.md) to install on Linux x64/WSL2 with Node.js 24 and pnpm 10.26.1. Use fictional data.

1. Pull latest main; create a descriptive branch such as `feature/order-validation`.
2. Describe the observed problem and resulting behavior in an issue or PR. Keep changes focused.
3. Run `PORT=3000 BASE_PATH=/ pnpm run build` from the root; this includes types.
4. For UI or stock-logic changes, run relevant [manual demo checks](docs/demo-guide.md), including order status and receiving deliveries.
5. Open a PR with validation evidence and ask a teammate to review.

## Conventions

- Keep pnpm-lock.yaml aligned with intentional dependency changes. Do not replace it with npm/yarn lockfiles.
- Document changed setup, assumptions and behavior; distinguish implementation from plans.
- Preserve human review. Approving a recommendation must not silently buy stock or contact suppliers.
- Do not commit credentials, local .env files, real customer data, node_modules or generated builds.
- Generated API clients/schemas should follow the API spec. The active demo does not use them for inventory persistence.
- For public bugs, include reproducible fictional examples. For leaked credentials, rotate them and contact a maintainer directly; never paste secrets into a public issue.

Contributions are made under the Apache License 2.0; preserve third-party license and copyright notices.
