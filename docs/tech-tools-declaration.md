# StockLink technical tools disclosure

Team: RM15 Refunders. Project: StockLink. This public repository disclosure records known implementation and development tools on 25 October 2026. It supports the organizer declaration; it does not sign the official form, attest workshop attendance or certify submission acceptance.

## Application and infrastructure

| Resource | Actual use |
|---|---|
| Replit | Prototype development, execution and static publication; [usage evidence](replit-usage-evidence.md) |
| GitHub | Public source, commit history, team collaboration and GitHub Actions build validation |
| React 19.1.0 / React DOM 19.1.0 | Browser interface and state |
| TypeScript 5.9.3 | Static typing and compiler checks |
| Vite 7.3.7 | Frontend development and production bundling |
| Tailwind CSS 4.3.3 | Styling toolchain |
| Wouter 3.13.0 | Client-side view routing |
| Lucide React 0.545.0 | Interface icons |
| Browser localStorage | Synthetic demo data and activity persistence under stocklink-demo-v1 |
| pnpm 10.26.1 | Workspace dependency installation and build commands |
| Node.js | Replit module/CI target 24; an installed Node 22.22 runtime also passed the Replit build |
| GitHub Actions | Ubuntu x64 clean install, typecheck and build; checkout, setup-node and pnpm/action-setup actions |
| RunPod | Not used, as confirmed by the team. No GPU workload, endpoint, Pod ID or runtime |
| Runtime AI / LLM API | None integrated into the StockLink interface |
| Live POS, supplier messaging or purchasing API | None integrated |
| Backend and database | Express/Drizzle/PostgreSQL scaffolding exists in the repository; not the active persistence layer for demo inventory/orders |

Dependency declarations and resolved versions are recorded in package manifests and pnpm-lock.yaml. [Installed direct-dependency inventory](dependency-inventory.md) distinguishes declared workspace dependencies from the smaller active demo workflow. Recharts is installed, but the active forecast chart is an SVG implemented in App.tsx.

## Development-time AI assistance

| Tool | Observed use in the development record |
|---|---|
| Replit Agent | Prototype/UI implementation, brand styling, code changes and build/preview checks, as reflected in Replit agent messages and commit history |
| OpenAI ChatGPT / Codex | Assistance with GitHub migration, documentation, CI configuration, license compliance and review of submission drafts |
| ChatGPT image generation | StockLink logo generation by Zhou Xiaduo and Geng Ruixi, followed by their manual optimization and retouching in drawing software |

These are development assistants, not AI services embedded in the public application. The precise upstream model identifiers and versions are not recorded in the repository artifacts reviewed here; this disclosure does not guess them. The team must reconcile this record with its tool/account history for the official declaration. Additional tools are not asserted without team confirmation.

The team is responsible for reviewing/adapting generated work, checking correctness and licensing, and being able to explain core functionality. This statement does not certify that every team member has completed those reviews or attended mandatory workshops.

## Data and assets

The Kopi Corner ingredients, orders, suppliers, recipes and quantities are synthetic seed records in App.tsx. No real customer dataset, personal record collection or external training dataset is used by the demo. Sample prices are illustrative assumptions, not measured business values.

The team confirms that the StockLink logo was jointly created by Zhou Xiaduo (周夏朵) and Geng Ruixi (耿睿茜) using ChatGPT image generation. They subsequently optimized and retouched the generated image themselves with drawing software. The finished asset is artifacts/stocklink/public/stocklink-logo.jpg. The specific drawing-software product and underlying image-model version were not supplied; neither is guessed here. This describes the reported creation process and team contributions, rather than an independent legal determination of asset rights. UI icons come from Lucide; third-party assets retain their own notices.

## Sponsor resources and human assistance

Replit usage is evidenced by the published deployment and development project. The team confirms that it used the hackathon Replit sponsor credits and received guidance from Dr. Chin Shin Liang. These two facts are team-reported; the live URLs do not prove credit expenditure or attendance. No exact credit balance, amount spent or detailed mentorship content is claimed. RunPod was not used and no RunPod credit consumption is claimed.

## License and links

The project license is [Apache-2.0](../LICENSE), with [NOTICE](../NOTICE). Dependency licenses remain separate; the project license does not replace upstream licenses.

- Live prototype: https://stock-link.replit.app/
- Replit project: https://replit.com/@WilliamWang185/StockLink
- Source repository: https://github.com/RM15-Refunders/StockLink
- Replit usage evidence: [statement and links](replit-usage-evidence.md)

## Official submission status

The team confirms that its official PRD and technical tools declaration are not yet completed. The pitch deck is not completed, the YouTube pitching video is not uploaded, and the committee GitHub accounts have not been added. This repository disclosure is supporting evidence and does not mark those deliverables as completed.
