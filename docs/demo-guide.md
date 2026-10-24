# Demo and manual verification

Open [the live demo](https://stock-link.replit.app/) or follow the root README. Use fictional data. Reset with confirmation before a presentation so relative seed dates are current; this removes existing browser-local edits.

| Action | Expected result |
|---|---|
| Open Overview after reset | Three ingredients, two confirmed orders, two open deliveries; milk and cups flagged within seven days |
| Inspect milk explanation | 30 L stock, 12 L/day baseline, 5 L safety, arrival in three days; about 2.1 days to safety |
| Create 10 Iced lattes for today and save as draft | Draft appears; forecast does not change |
| Confirm the draft | Demand adds 2.2 L milk, 0.18 kg beans and 10 cups; Activity records confirmation |
| Cancel that confirmed order | Its demand is excluded and cancellation is recorded |
| Adjust milk by +5 L with a fictional reason | Stock rises by 5 L; forecast and Activity update |
| Approve or reject a pending recommendation | A human decision is recorded; no purchase or message is sent |
| Receive the open milk delivery and confirm | 48 L added once to stock; removed from incoming quantities; UI prevents repeated receipt |
| Reload | Edits persist in the same browser |
| Navigate every view on a narrow screen | Tables, navigation and dialogs remain usable |

Check recommendation decisions before receiving milk, since risk-dependent suggestions may disappear from Overview after stock improves. Decisions remain visible in Activity.

Report the browser, commit, fictional inputs, observed result and screenshots when a check fails. Passing CI confirms types and builds, not these manual behaviors.
