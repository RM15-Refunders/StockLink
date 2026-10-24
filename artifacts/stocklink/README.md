# StockLink · Kopi Corner demo

StockLink is a local, synthetic inventory-and-orders prototype for a small food team. It runs entirely in the browser; there is no sign-in, backend, network API, supplier messaging, or automatic purchasing.

## Run

From this directory:

```sh
npm install
npm run dev
```

Use `npm run build` for a production build and `npm run typecheck` for TypeScript checks. All routes (`/`, `/orders`, `/inventory`, `/deliveries`, `/activity`) are client-side views.

## Forecast assumptions

- Projected stock at day *d* = current stock − baseline daily demand × *d* − confirmed order recipe demand scheduled by *d* + open delivery quantities due by *d*.
- Draft and cancelled orders do not affect forecast demand. Confirming an order adds its editable recipe-based ingredient demand to the forecast.
- Safety stock is a warning threshold, not stock to add or subtract. Risk timing uses `(on hand − safety stock) / baseline daily demand`.
- Incoming deliveries are assumed to arrive on the expected date. Receiving one manually adds the listed quantity to on-hand stock; cancelling excludes it from the forecast.
- The Kopi Corner seed scenario has 30 L milk, 12 L/day baseline demand, 5 L safety stock and milk due in 3 days. The baseline-only arithmetic is `30 − (12 × 3) = −6 L` just before that delivery; the safety threshold is crossed in about 2.1 days. This is why delivery timing is flagged as a stockout risk.
- The chart scales each ingredient independently so unrelated metric units are not presented as directly comparable.

## Data and integrations

All names, order labels, suppliers and quantities are fictional. Changes and timestamped activity events persist in browser `localStorage`; **Reset to demo data** restores the original seed. Do not enter real customer or business-sensitive data.

Implemented integrations: **none**. No data leaves the browser. Supplier actions and recommendations require a human decision; approving a suggestion only records that decision and does not place an order or contact a supplier.

Planned only: an optional Orbyte connector may be considered as a future extension point. Orbyte is not connected or implemented in this prototype.
