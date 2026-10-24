# StockLink competition brief and submission status

This page describes the implemented prototype and the evidence available in this public repository on 25 October 2026. It replaces the earlier planning template. A link or unchecked status is not evidence that an official submission has been accepted.

## Team and domain

| Field | Detail |
|---|---|
| Team | RM15 Refunders |
| Project | StockLink |
| University | Xiamen University Malaysia |
| Leader | Wang Yanfeng |
| Members | Wang Yanfeng, Liu Jiaming, Zhou Xiaduo, Geng Ruixi, Gao Zijun |
| Assigned domain | Domain 2 — ALPHA RED; Orbyte Smart SME Challenge |
| Primary SDG | SDG 8, targets 8.2 and 8.3 |
| Related SDG | SDG 9, practical digital infrastructure for small businesses |

## Working prototype and evidence

| Resource | Actual evidence or current status |
|---|---|
| Live prototype | https://stock-link.replit.app/ |
| Replit project | https://replit.com/@WilliamWang185/StockLink |
| Replit usage proof | [PDF statement](../submission/REPLIT%20DECLARATION%20OF%20USE.pdf) and [public deployment evidence](replit-usage-evidence.md) |
| Public source repository | https://github.com/RM15-Refunders/StockLink |
| Project license | [Apache License 2.0](../LICENSE), with [NOTICE](../NOTICE) |
| Build validation | [GitHub Actions CI](https://github.com/RM15-Refunders/StockLink/actions/workflows/ci.yml) |
| Replit sponsor credits | Used; no balance or amount spent is claimed |
| Mentor guidance | Dr. Chin Shin Liang |
| Committee collaborators | None |
| RunPod | Not used. No GPU training, fine-tuning or model inference; no endpoint or GPU runtime exists to declare |
| PRD / preliminary proposal | [PDF available in submission](../submission/SDC2026_RM15Refunders_Preliminary.pdf); original public-redacted contact field retained |
| Technical tools declaration | [PDF available in submission](../submission/SDC2026_RM15Refunders_TechDeclaration.pdf); accompanying [maintained disclosure](tech-tools-declaration.md) records current repository details |
| Pitch deck | [Uploaded presentation](../submission/SDC2026_RM15Refunders_Pitchdeck%20Slide.pptx) |
| Pitching video | [Uploaded to YouTube](https://youtu.be/a2iZmWnK0s8) |

## Problem and implemented solution

Small teams may keep customer orders, stock and expected deliveries in separate records, making it difficult to see whether confirmed demand will exhaust stock before the next delivery. This is our problem hypothesis; no representative interview, timing or stock-out baseline is claimed.

StockLink demonstrates a fictional Kopi Corner workflow with five working views: Overview, Orders, Inventory, Deliveries and Activity. Users create drafts, confirm or cancel orders, edit recipe assumptions and stock rules, receive or cancel seeded deliveries, inspect deterministic risk explanations, and record human decisions. Data and events persist only in the current browser.

There is no deployed business backend, authentication, shared inventory database, embedded AI model, live supplier/POS connection or automatic purchasing. API/DB packages in the repository are scaffolding. Development-time AI assistance is disclosed separately from application capabilities.

## Domain 2 requirements and current coverage

| Requirement | Current coverage and limit |
|---|---|
| One clear SME problem | Linking confirmed order demand to ingredient stock and incoming deliveries |
| Trigger → data → logic → approval → logged outcome | Confirm an order → apply editable recipes to stock assumptions → calculate seven-day risk → owner approves/rejects a suggestion → browser-local Activity event |
| Human control | Users review changes and recommendation decisions; no supplier action is executed |
| Orbyte fit and reuse | Proposed integration boundary: order, inventory and delivery events enter the forecast; a human-reviewed result and activity event can be exposed to a future Orbyte connector. No Orbyte connector or API integration is implemented or claimed |
| Business benefit and SDG | Intended reduction in reconciliation work, linked to SDG 8.2 and 8.3. Time savings and error reductions are not measured results |
| Ease of learning | Five task-oriented views, fictional sample data, explanations and a reset action. User learnability has not been validated in a formal study |

## Stack and architecture

React 19.1.0 and TypeScript 5.9.3 run the frontend; Vite 7.3.7 builds it; Tailwind CSS 4.3.3 styles it; Wouter 3.13.0 handles client routes; Lucide React 0.545.0 supplies icons. The chart is an SVG in App.tsx. Recharts 2.15.4 is installed as a dependency but is not the chart implementation in that file.

User input → React state → deterministic forecast/risk checks → visible explanation → human decision → local event and localStorage. See [architecture and assumptions](architecture.md), [current setup](../README.md) and [demo steps](demo-guide.md).

## Impact measurement plan

- Current operational baseline: not measured; no survey, interview or timing dataset is claimed.
- Primary KPI: median minutes to reconcile a confirmed order with inventory.
- Supporting KPIs: order-to-stock mismatch rate and stock-risk alert precision.
- Proposed pilot target: at least 30% lower median reconciliation time without increasing mismatch rate. This is a proposed test target from our proposal, not achieved impact.
- SDG source: [UN Goal 8](https://sdgs.un.org/goals/goal8), targets 8.2 and 8.3.

## Observed challenges and lessons

The GitHub migration required preserving the existing team README and the Replit commit history. GitHub write access also depended on organization approval for the Replit code connector, not only an individual repository role. After authorization, the histories were merged and pushed normally.

The Vite configuration requires PORT and BASE_PATH before evaluation. The Replit terminal default Node wrapper also needed an available installed runtime during validation. Documenting explicit environment values and adding CI produced a reproducible typecheck/build path. These are observed implementation issues, not user-research findings.

## Team roles

| Member | Declared role | GitHub |
|---|---|---|
| Wang Yanfeng | GitHub framework, programming, AI-tool research, video explanation, product testing and PPT production | @WilliamWang185 |
| Liu Jiaming | Market research, pitch presentation, video narration, product testing and PPT production | @liujiaming-maker |
| Zhou Xiaduo | UI design and illustration, product testing and PPT production | @XIA1969 |
| Geng Ruixi | UI design and illustration, product testing and PPT production | @Geng0119 |
| Gao Zijun | Material synthesis and pitch-deck production, product testing and PPT production | @Skyler-Quinn |

We list these roles as responsibilities, rather than independently verified work logs. Work may overlap. We confirm that Zhou Xiaduo and Geng Ruixi jointly created the StockLink logo using ChatGPT image generation, then manually optimized and retouched it with drawing software.

## Submission status and deadline

Orientation slides 28–30 list six deliverables: official PRD, pitch deck, accessible live prototype, Tech and Tools Declaration, public GitHub link, and a 5–7 minute YouTube pitch containing a prototype demo. Replit usage proof is included in the declaration. RunPod evidence applies to GPU work; we report no RunPod use or GPU workload.

The stated deadline is 25 October 2026 at 07:59:59 MYT (UTC+8). The orientation says no late submission, no resubmission and no repository changes after the deadline; Terms and Conditions prevail if requirements conflict. Official submission occurs through sdchack.my, once per team. Repository publication is not official submission.

The repository provides the live build, public source, Apache-2.0 license, Replit URL evidence and the three supplied PDFs in submission. Our [pitch deck](../submission/SDC2026_RM15Refunders_Pitchdeck%20Slide.pptx) is in submission and our [pitch video](https://youtu.be/a2iZmWnK0s8) is uploaded to YouTube. We chose not to add committee accounts during this preparation. We confirm completion of all mandatory GenAI, Database and Cloud workshops, no pre-existing core project, and no employment or internship IP conflict. Replit sponsor credits and guidance from Dr. Chin Shin Liang are team-confirmed. Organizer receipt and acceptance have not been confirmed.
