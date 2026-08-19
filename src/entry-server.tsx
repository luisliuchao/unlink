import { renderToString } from 'react-dom/server';
import App from './App';
import { defaultCountry } from './data/countries';
import { Checklist } from './data/types';
import { siteUrl } from './pageMeta';

export { pageMeta, siteUrl } from './pageMeta';

type JsonLd = Record<string, unknown>;

const howToJsonLd = (checklist: Checklist, url: string): JsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: checklist.title,
    description: checklist.intro,
    url,
    step: checklist.phases.flatMap((phase) => {
      return phase.steps.map((step) => {
        return {
          '@type': 'HowToStep',
          name: step.title,
          text: step.detail
        };
      });
    })
  };
};

const jsonLdForPath = (path: string): JsonLd => {
  switch (path) {
    case '/cancel-sim':
      return howToJsonLd(defaultCountry.simChecklist, `${siteUrl}/cancel-sim`);
    case '/moving':
      return howToJsonLd(defaultCountry.moveChecklist, `${siteUrl}/moving`);
    case '/report':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Receiving SMS meant for your number’s previous owner?',
        description:
          'What to do when a recycled Singapore mobile number still receives the previous owner’s bank OTPs and app messages: report to the sender, never use the codes.',
        url: `${siteUrl}/report`
      };
    default:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Unlink',
        description:
          'Checklists for cancelling a mobile number or changing address in Singapore without losing accounts.',
        url: `${siteUrl}/`
      };
  }
};

export type RenderResult = {
  html: string;
  jsonLd: string;
};

export function render(path: string): RenderResult {
  const html = renderToString(<App ssrPath={path} />);
  const jsonLd = JSON.stringify(jsonLdForPath(path));
  return { html, jsonLd };
}
