# Unlink SG

Checklists for Singapore identity transitions — cancelling a mobile number or changing
address — done in the order that avoids lockouts, plus a "tell the sender" helper for SMS
that arrive for a number's previous owner.

Deliberately **not** included: any lookup or scanning of whether a number/address is
registered on other services. There are no legitimate APIs for that, and such a tool
becomes an enumeration service for scammers. This site collects nothing; checklist ticks
are stored only in the visitor's browser (`localStorage`).

## Stack

Vite + React 18 + TypeScript + Tailwind CSS (same as `jp-kana-typing`). No backend.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview
```

## Deploy

Static output in `dist/` — deployable to GitHub Pages, Cloudflare Pages, or Netlify.
The router uses the History API, so configure SPA fallback (serve `index.html` for
unknown paths):

- **Cloudflare Pages / Netlify:** add a catch-all redirect to `/index.html` (200).
- **GitHub Pages:** copy `index.html` to `404.html` in the deploy step.

## Pages

| Path | Content |
|---|---|
| `/` | Landing: the three tools and the no-data-collection stance |
| `/cancel-sim` | Ordered checklist: prepare → 2FA off SMS → PayNow/banks/Singpass → social → messaging apps last → quiet period → cancel |
| `/moving` | Ordered checklist: ICA eCOA → OSCARS/MyInfo verification → private sector → SingPost redirect safety net |
| `/report` | Sender picker with official contact paths and a paste-ready "number was reassigned" message |
