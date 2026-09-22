# apixonn.com

The marketing site for **ApixONN** — a Qatar business-software company — and its two products:

- **ApixONN ERP** — one system for finance, HR & payroll, projects, inventory, property and sales.
- **Dalil (دليل)** — an AI assistant that answers from a company's own documents, citing the exact page. Arabic & English, permission-aware, in the browser and on WhatsApp.

A plain **static site** — no build step. Just HTML, one CSS-in-page, and inline SVG logos.

```
index.html      Home (English + Arabic, RTL toggle)
privacy.html    Privacy policy (English + Arabic)
assets/         favicon
CNAME           custom domain for GitHub Pages
```

## Editing

Open `index.html` / `privacy.html` directly — everything is inline. Copy is in the `I18N` object near the bottom of each file (`en` and `ar`). The two brands share one palette: Navy `#1A1942`, Indigo `#3433C4`, Periwinkle `#93A3FB`, Mist `#E9EDFF`; type is **Readex Pro** (covers Latin + Arabic).

## Deploy

**GitHub Pages (recommended).** Repo → Settings → Pages → Source: `main` / root. The `CNAME` file points it at `apixonn.com`; add the DNS records GitHub shows (apex A records + `www` CNAME), then enable *Enforce HTTPS*. Free automatic TLS.

**Or any static host / Caddy `file_server`** — serve this folder as-is; no server code, no dependencies.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
