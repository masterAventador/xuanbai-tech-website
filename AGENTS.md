# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Locked design direction

- Brand name: 玄白科技.
- Use a modern sans-serif Chinese type system. Do not use serif, Songti, or Ming-style fonts.
- The company homepage follows `design-references/home-selected.png`: premium dark architectural theatre with a warm luminous doorway.
- 白泽 follows `design-references/baize-selected.png`: enterprise AI capability foundation, knowledge + business systems + digital employees.
- 天工 follows `design-references/tiangong-selected.png`: one creative workspace spanning idea, design, presentation, and motion content.
- 千手 follows `design-references/qianshou-selected.png`: trend-first AI new-media operations with human publish confirmation and visible platform-source labels.
- Avoid a catalogue-like product grid. The homepage must tell a coherent story across enterprise intelligence and content growth.
- Product capability claims must remain honest: use “申请产品内测” or “预约企业演示”, never fabricated adoption, ROI, customer logos, or awards.
- This is a standalone company website. Do not modify or embed production code from the three source products.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
