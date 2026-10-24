# StockLink

> StockLink connects customer orders with inventory and warns Malaysian micro and small businesses about stock risks, while keeping decisions under human control.

## Team Information

| Field | Details |
|---|---|
| Team name | RM15 Refunders |
| Team domain | Domain 2 - ALPHA RED |
| SDG track | SDG 8 — Decent Work and Economic Growth (Targets 8.2 and 8.3) |
| Team leader | Wang Yanfeng |
| University | Xiamen University Malaysia |
| Number of members | 5 |
| Team members | Wang Yanfeng; Liu Jiaming; Zhou Xiaduo; Geng Ruixi; Gao Zijun |

Work may overlap where the team needs to collaborate.

## Links

| Resource | Link / status |
|---|---|
| GitHub repository | https://github.com/RM15-Refunders/StockLink |
| Live prototype | To be added after deployment |
| Replit project | To be added if using Replit |
| RunPod endpoint | To be added if using RunPod |
| Pitch deck | To be added |
| Pitching video (5–7 minutes) | To be added after uploading to YouTube |

## Overview

### Problem

Micro and small business owners and small teams in Malaysia often manage customer orders, stock levels, supplier deliveries, and follow-ups across WhatsApp, spreadsheets, paper records, and manual checks. Because these records are disconnected, teams can confirm orders without enough stock, miss replenishment gaps, or discover too late that an incoming delivery will arrive after stock runs out.

### Proposed AI-enabled solution

StockLink is planned as a reliable, easy-to-learn workflow connecting customer orders with current inventory and incoming purchase orders. A possible AI role is to turn an order message into a structured draft containing items, quantities, and requested dates; a person reviews and confirms that draft. Stock calculations and alert thresholds should remain traceable and deterministic, with the reason and source data shown for each warning. The team still needs to confirm whether this AI-assisted input step will be part of the prototype and name the actual model or service used. No AI integration is currently documented in this repository.

### Target users

Owners and small teams at micro and small businesses in Malaysia, especially businesses that track products or ingredients, customer orders, and supplier deliveries.

### SDG alignment

- **Primary: SDG 8 — Decent Work and Economic Growth.** Target 8.2: improve productivity through technology and innovation. Target 8.3: support entrepreneurship and the growth of micro, small, and medium-sized enterprises.
- **Related: SDG 9 — Industry, Innovation and Infrastructure.** The project explores practical digital infrastructure for small business operations.
- Add SDG 10 or SDG 12 only if the final product scope supports a clear, evidence-based connection.

## Key Features

These are planned capabilities, not claims about features already implemented.

1. **Order-linked stock demand:** Recalculate product or ingredient requirements when a relevant order is confirmed, changed, or cancelled.
2. **Explainable inventory alerts:** Compare on-hand stock, confirmed demand, safety-stock levels, and expected deliveries; show the reason and timing behind each risk.
3. **Purchase-order tracking:** Track supplier, expected arrival, and receiving status. Unconfirmed or not-yet-received goods are not treated as current physical stock.
4. **Human-reviewed action suggestions:** Prepare a supplier follow-up draft or recommendation for a person to approve.
5. **Activity history:** Record important order, stock, delivery, alert, and approval changes so a team can review what happened.

## Example Demo Flow

1. Show an item with enough stock for current demand.
2. Add or change a confirmed customer order.
3. Show updated demand and an alert if stock may run low before the expected delivery.
4. Explain the alert using the related order, stock level, and delivery date.
5. Let a team member review and approve or dismiss a suggested follow-up.
6. Update an arrival date or record received goods, then show the recalculated risk and activity history.

## Technology Stack

No implementation stack has been confirmed or documented yet. Fill in this table with the tools actually used; include versions where practical.

| Layer | Technology |
|---|---|
| Frontend | To be confirmed |
| Backend / API | To be confirmed |
| Database | To be confirmed |
| AI / model / compute | To be confirmed; document provider, model, and purpose if used |
| Hosting / development | To be confirmed (for example, Replit only if the team actually uses it) |
| Other APIs, datasets, cloud services, tools, or sponsor resources | To be declared |

Never commit API keys, passwords, tokens, or other secrets. Store local secrets outside source control and provide only variable names in .env.example.

## Architecture

The proposed workflow is: order input → human review of the order → inventory and demand calculation → explainable stock-risk alert → suggested action → human approval. Update this section with the real components and data flow after the prototype is built. If AI is used, document its exact role and the human review step.

## Project Structure

The repository currently contains only this README. The following structure is a guide from the tutorial, not a claim that these files already exist. Adopt only the parts that match the actual stack and platforms used.

~~~text
.
├── docs/                         # Screenshots and architecture diagrams
├── src/                          # Application code (structure depends on chosen stack)
├── tests/                        # Tests, if applicable
├── submission/                   # Final submission PDFs and proof-of-use documents
├── .env.example                  # Variable names only; no secret values
├── .gitignore
├── LICENSE
└── README.md
~~~

If the team chooses the tutorial's Python + Replit + RunPod example, it also shows requirements.txt, .replit, runpod/handler.py, and src/main.py. Add those only if they match the real implementation.

## How to Run

Not available yet: this repository currently has no application code, dependency file, or run configuration. Add verified setup and run steps after the team selects a stack and commits a working prototype. Do not publish guessed commands.

## Replit Use and Proof of Use

The tutorial labels Replit usage and proof of use as required. The team has not documented Replit use in this repository. If required for your submission, record what the team actually built, ran, or deployed on Replit and include the official proof-of-use document at:

submission/SDC2026_RM15_Refunders_Replit_POU.pdf

Do not claim Replit usage or create proof until the team has actually used the platform.

## RunPod Use and Proof of Use

The tutorial labels RunPod usage and proof of use as required. The team has not documented RunPod use in this repository. If required for your submission, describe the real workload and endpoint integration, and include the official proof-of-use document at:

submission/SDC2026_RM15_Refunders_RunPod_POU.pdf

Do not claim RunPod usage or create proof until the team has actually used the platform.

## Challenges and Learnings

To be completed during development. Record a real challenge, how the team addressed it, and what changed as a result.

## Future Improvements

Potential areas to evaluate include supplier follow-up workflows, configurable safety-stock rules, and integrations with existing business tools. These are ideas for future consideration, not committed or implemented features.

## Team Declaration

| Name | Role | GitHub username |
|---|---|---|
| Wang Yanfeng | GitHub framework, programming, AI-tool research, and video explanation | @WilliamWang185 |
| Liu Jiaming | Market research, pitch presentation, and recording the video narration | @liujiaming-maker |
| Zhou Xiaduo | User interface design and illustration | @XIA1969 |
| Geng Ruixi | User interface design and illustration | @Geng0119 |
| Gao Zijun | Synthesize final materials; build and produce the pitch deck | @Skyler-Quinn |

## Submission Checklist

The provided tutorial also asks the team to complete these repository items. Confirm with the organizers whether Replit and RunPod proof documents are both mandatory for your team.

- [ ] Complete the official Product Requirement Document (PRD).
- [ ] Complete the pitch deck with the problem, solution, technical approach, and expected impact.
- [ ] Deploy an accessible live prototype; a video or static mock-up alone does not meet the preliminary requirement.
- [ ] Complete the Tech & Tools Declaration, including actual APIs, cloud services, AI tools/models, datasets, and sponsor resources.
- [ ] Keep this GitHub repository public and aligned with the prototype.
- [ ] Record a 5–7 minute pitching video with a prototype demo and upload it to YouTube.
- [ ] Add the actual Replit and RunPod usage descriptions and required proof-of-use PDFs, following the organizer's format.
- [ ] Add verified setup and run instructions and the actual project files.
- [ ] Confirm each team member’s GitHub access to the repository.
- [ ] Check that no secrets or API keys are committed.
- [ ] Select and add an appropriate open-source license.
- [ ] Rename submission files with the team's name as required by the tutorial.
- [ ] Submit one official team submission through sdchack.my.
