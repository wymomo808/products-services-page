# P&S Persona Journey Flows

Interactive persona journey maps for Products & Solutions fulfillment at `manage.autodesk.com/products`.

**Live site (Autodesk):** https://pages.git.autodesk.com/wuya/products-services-page/

Also mirrored at https://wymomo808.github.io/products-services-page/

Open `ps-persona-journey-flow.html` locally, or use the GitHub Pages URL above.

## Evidence prototypes (customer concept tests)

| Variant | File | Tests |
|---------|------|-------|
| P1 Fulfillment Core | `prototype-p1-fulfillment-core.html` | H1 baseline |
| P2 Admin Ecosystem | `prototype-p2-admin-ecosystem.html` | H2 |
| P3 Discovery-Forward | `prototype-p3-discovery-forward.html` | H3, H4 |

Shared assets: `assets/evidence-prototype-data.js`, `assets/evidence-prototype-app.js`, `assets/evidence-prototype.css`.

## All products & solutions (Weave prototype)

Based on the production P&amp;S page (`manage.autodesk.com/products/updates`). The **All products & solutions** tab shows:

1. **Autodesk products** — install / download / access cards
2. **Marketplace solutions** — filterable by **Apps**, **Agents**, **Templates**, **Skills** (Weave `Chip` filters)

Built to match production `manage.autodesk.com/products/all`: black global header + horizontal Account nav, white content area, production product cards (split Download button, dropdowns, View details). Marketplace solutions section added below with Apps / Agents / Templates / Skills filters.

| Open | Path |
|------|------|
| Prototype (Round 1) | `prototype-all-products-solutions.html` |
| **V1 — Capability Control Center** | `prototype-capability-control-center.html` |
| V2 — Capability Control Center (duplicate) | `prototype-capability-control-center-v2.html` *(after first V2 build)* |
| Assets (Round 1) | `assets/weave-app/` |
| Assets (V1) | `assets/weave-vision-app/` |
| Assets (V2) | `assets/weave-vision-v2-app/` *(after first V2 build)* |
| React source (Round 1) | `prototype-weave/` — `npm install && npm run dev` |
| React source (V1) | `prototype-weave-vision/` — `npm install && npm run dev` (port 5174) |
| React source (V2) | `prototype-weave-vision-v2/` — `npm install && npm run dev` (port 5175) |

Rebuild React versions: `cd prototype-weave && npm run build` · `cd prototype-weave-vision && npm run build` · `cd prototype-weave-vision-v2 && npm run build`

**GitHub release:** [V1](https://github.com/wymomo808/products-services-page/releases/tag/v1) tags the frozen Capability Control Center prototype (`prototype-weave-vision/` → `prototype-capability-control-center.html`). V2 is a working copy for the next iteration.
