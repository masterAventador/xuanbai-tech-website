# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Locked design direction

- Brand name: 玄白科技.
- Use a modern sans-serif Chinese type system. Do not use serif, Songti, or Ming-style fonts.
- The company homepage follows `design-references/home-selected.png`: premium dark architectural theatre with a warm luminous doorway.
- 白泽 follows `design-references/baize-selected.png`: enterprise AI capability foundation connecting knowledge, existing business systems, workflows, and permissioned digital employees. Knowledge sources can update on a schedule; digital employees understand intent, use permitted business capabilities, and explain returned data. Workflows use draggable nodes and can run on a schedule. The public website must describe customer value without disclosing the implementation path: never mention HTTP-to-MCP conversion, MCP, parameter mapping, protocol wrapping, or similarly reproducible technical architecture.
- 天工 follows `design-references/tiangong-selected.png`: one conversational creative workspace spanning idea, design, prototypes, presentations, images, and motion content, delivered through web and desktop clients. The public website must never mention, display, or expose Open Design, Claude Design, or any underlying third-party project name, logo, identifier, screenshot branding, or implementation detail.
- 千手 follows `design-references/qianshou-selected.png`: a desktop RPA self-operation platform for trend discovery, text-to-video, automatic narration and editing, cross-platform publishing, social comment and direct-message operation, and desktop WeChat operation. It can monitor category hotspots from roughly the latest hour, publish automatically under user-defined rules and permissions, and pause for human handling only when configured or when an exception/risk rule is triggered. Keep visible platform-source labels.
- Avoid a catalogue-like product grid. The homepage must tell a coherent story across enterprise intelligence and content growth.
- Product capability claims must remain honest: use “申请产品内测” or “预约企业演示”, never fabricated adoption, ROI, customer logos, or awards.
- This is a standalone company website. Do not modify or embed production code from the three source products.
- The contact form is a real lead-capture workflow: only show success after the backend confirms a durable database write. Keep contact records private and query them from the server database rather than exposing a public listing endpoint.
- Use a branded custom product selector in the contact form; do not fall back to the operating system's native select menu. The selector spans the form width and keeps its arrow aligned at the far right.
- The browser favicon uses the same white CubeFocus-style mark as the site header, not the architectural doorway artwork.
- The primary header navigation is organized by recognizable business scenarios rather than internal product names. Each scenario link lands on the matching capability section inside the relevant product page, and only the current scenario shows the active indicator.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
