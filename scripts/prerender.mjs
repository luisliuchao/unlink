import { readFileSync, writeFileSync } from 'node:fs';
import { render, pageMeta, siteUrl } from '../dist-ssr/entry-server.js';

const template = readFileSync('dist/index.html', 'utf8');
const routes = Object.keys(pageMeta);

for (const route of routes) {
  const { html, jsonLd } = render(route);
  const meta = pageMeta[route];
  const url = route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`;

  let out = template
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${meta.title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[\s\S]*?("\s*\/>)/,
      (_m, p1, p2) => p1 + meta.description + p2
    )
    .replace(
      /(<meta property="og:title" content=")[\s\S]*?("\s*\/>)/,
      (_m, p1, p2) => p1 + meta.title + p2
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[\s\S]*?("\s*\/>)/,
      (_m, p1, p2) => p1 + meta.description + p2
    )
    .replace(
      /(<meta property="og:url" content=")[\s\S]*?("\s*\/>)/,
      (_m, p1, p2) => p1 + url + p2
    )
    .replace(
      /(<link rel="canonical" href=")[\s\S]*?("\s*\/>)/,
      (_m, p1, p2) => p1 + url + p2
    )
    .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
    .replace(
      '</head>',
      () => `<script type="application/ld+json">${jsonLd}</script>\n  </head>`
    );

  const file = route === '/' ? 'dist/index.html' : `dist${route}.html`;
  writeFileSync(file, out);
  console.log(`prerendered ${file} (${out.length} bytes)`);
}
