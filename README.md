# RM15 Refunders

> Working concept: an order-aware inventory automation product for Malaysian micro and small businesses. Product name: to be confirmed.

## Project Overview

### Problem
Micro and small business owners and small teams in Malaysia often manage customer orders, stock levels, supplier deliveries, and follow-ups across WhatsApp, spreadsheets, paper records, and manual checks. Because these records are disconnected, teams can confirm orders without enough stock, miss replenishment gaps, or discover too late that an incoming delivery will arrive after stock runs out.

### Proposed Solution
We are exploring a reliable, easy-to-learn workflow that connects customer orders with current inventory and incoming purchase orders. It would identify stock risks early, explain the data behind each alert, and prepare suggested next steps for a person to review. People remain in control of approvals and operational decisions.

### Target Users
Owners and small teams at micro and small businesses in Malaysia. The initial workflow will focus on businesses that track products or ingredients, customer orders, and supplier deliveries.

## SDG Alignment

- **Primary: SDG 8 – Decent Work and Economic Growth.** Target 8.2: improve productivity through technology and innovation. Target 8.3: support entrepreneurship and the growth of micro, small, and medium-sized enterprises.
- **Related: SDG 9 – Industry, Innovation and Infrastructure.** The project explores practical digital infrastructure for small business operations.

SDG 10 or SDG 12 may be added if the final product scope supports a clear, evidence-based connection.

## Proposed MVP Features

These are planned capabilities, not claims about features already implemented.

1. **Order-linked stock demand:** Recalculate product or ingredient requirements when a relevant order is confirmed, changed, or cancelled.
2. **Explainable inventory alerts:** Compare on-hand stock, confirmed demand, safety-stock levels, and expected deliveries; show the reason and timing behind each risk.
3. **Purchase-order tracking:** Track supplier, expected arrival, and receiving status. Unconfirmed or not-yet-received goods are not treated as current physical stock.
4. **Human-reviewed action suggestions:** Prepare a supplier follow-up draft or other recommendation for a person to approve. Keep an activity record of decisions and status changes.

## Example Demo Flow

1. Show an item with enough stock for current demand.
2. Add or change a confirmed customer order.
3. Show the updated demand and an alert if stock may run low before the expected delivery.
4. Explain the alert using the related order, stock level, and delivery date.
5. Let a team member review and approve or dismiss a suggested follow-up.
6. Update an arrival date or record received goods, then show the recalculated risk and activity history.

## Product Principles

- Make alerts traceable to the underlying order, stock, and delivery information.
- Distinguish physical stock from forecast demand and expected incoming stock.
- Recalculate when relevant orders or deliveries change.
- Keep operational actions under human review and approval.
- Avoid presenting estimates as guaranteed outcomes.

## Team Information

| Field | Details |
|---|---|
| Team | RM15 Refunders |
| Team domain | Domain 2 - ALPHA RED |
| Primary SDG track | SDG 8 |
| Team leader | Wang Yanfeng |
| University | Xiamen University Malaysia |
| Number of members | 5 |
| Team members | Liu Jiaming; Zhou Xiaduo; Geng Ruixi; Gao Zijun |

## Links

| Resource | Link |
|---|---|
| GitHub repository | https://github.com/WilliamWang185/rm15-refunders |
| Live prototype | To be added |
| Pitch deck | To be added |
| Demo video | To be added |

## Technology and Tools

Technology choices and external resources have not been confirmed. Add the actual languages, frameworks, APIs, AI models, datasets, cloud services, development tools, and sponsor resources here once selected. Do not include credentials or API keys in this repository.

## Architecture and Implementation Status

The product workflow and implementation architecture are still being defined. Update this section with the actual components and data flow once the team has selected its stack and built the prototype.

## How to Run

Setup and run instructions will be added after the application and its technology stack are in place.

## Platform Usage and Proof of Use

Document only platforms the team actually uses. Add the required Replit and RunPod usage descriptions and proof-of-use documents if those platforms are used and required by the competition.

## Challenges and Learnings

To be completed during development.

## Future Improvements

Potential areas to evaluate include supplier follow-up workflows, configurable safety-stock rules, and integrations with existing business tools. These are ideas for future consideration, not committed or implemented features.

## Submission Checklist

- [ ] Confirm the product name.
- [ ] Complete the official product requirement document.
- [ ] Add the pitch deck, live prototype, and demo video links.
- [ ] Declare all technologies, tools, services, datasets, models, and sponsor resources actually used.
- [ ] Add required platform proof-of-use documents where applicable.
- [ ] Add verified setup and run instructions.
- [ ] Check that no secrets or API keys are committed.
- [ ] Select and add an appropriate license.
