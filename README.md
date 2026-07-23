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
| Prototype | `prototype-all-products-solutions.html` |
| Assets | `assets/weave-prototype-app.js`, `assets/weave-prototype-data.js` |
| React source (optional) | `prototype-weave/` — `npm install && npm run dev` |

Rebuild React version (optional): `cd prototype-weave && npm run build`
