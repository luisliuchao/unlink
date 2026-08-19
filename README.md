# Unlink — [unlink.page](https://unlink.page)

Checklists for identity transitions — cancelling a mobile number or changing address —
done in the order that avoids lockouts, plus a "tell the sender" helper for SMS that
arrive for a number's previous owner. Singapore first; the data model is country-keyed
for future expansion.

Deliberately **not** included: any lookup or scanning of whether a number/address is
registered on other services. There are no legitimate APIs for that, and such a tool
becomes an enumeration service for scammers. This site collects nothing; checklist ticks
are stored only in the visitor's browser (`localStorage`).

## Stack

Vite + React 18 + TypeScript + Tailwind CSS. No backend.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview
```

## Deploy (Cloudflare Pages + unlink.page)

1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → create a Pages project from the repo.
   Build command `npm run build`, output directory `dist`.
3. Add the custom domain `unlink.page` (registered via Cloudflare Registrar, so DNS
   wiring is automatic).

The router uses the History API. Cloudflare Pages serves `index.html` for unknown
paths automatically when no `404.html` is present — no extra config needed. On other
hosts, add an SPA fallback (Netlify `_redirects` catch-all, or copy `index.html` to
`404.html` for GitHub Pages).

## Structure

| Path | Content |
|---|---|
| `/` | Landing: the three tools and the no-data-collection stance |
| `/cancel-sim` | Ordered checklist: prepare → 2FA off SMS → PayNow/banks/Singpass → social → messaging apps last → quiet period → cancel |
| `/moving` | Ordered checklist: ICA eCOA → OSCARS/MyInfo verification → private sector → SingPost redirect safety net |
| `/report` | Sender picker with official contact paths and a paste-ready "number was reassigned" message |

Data layout (country-ready):

- `src/data/types.ts` — shared `Step`/`Phase`/`Checklist`/`Sender`/`Country` types
- `src/data/global/steps.ts` — country-neutral steps (2FA, messaging apps, quiet period)
- `src/data/sg/` — Singapore checklists and senders
- `src/data/countries.ts` — country registry; routes gain a `/<code>` prefix once a
  second country exists
