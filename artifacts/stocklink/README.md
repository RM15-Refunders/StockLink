# StockLink · Kopi Corner demo

See the [root README](../../README.md) for current scope, setup and team information. Use Node.js 24 and pnpm 10.26.1 on Linux x64. From the repository root:

```sh
pnpm install --frozen-lockfile
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/stocklink run dev
PORT=3000 BASE_PATH=/ pnpm run build
```

Do not run npm install in this directory: this package uses workspace packages and a shared catalog. PORT and BASE_PATH must exist before Vite evaluates configuration.

[Architecture and assumptions](../../docs/architecture.md) · [Demo checks](../../docs/demo-guide.md)

Data is fictional and browser-local. No live AI, automatic purchasing or supplier messaging is integrated. Human approvals record decisions only.
