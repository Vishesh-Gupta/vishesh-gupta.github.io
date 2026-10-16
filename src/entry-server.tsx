// Build-time only. The prerender plugin in vite.config.ts compiles this,
// calls it once, and writes the result into dist/index.html. Nothing here is
// shipped to the browser.
import { renderToString } from 'preact-render-to-string'
import App from './App'
import {
  COMPANIES,
  DEFAULT_COMPANY,
  ELSEWHERE,
  NAME,
  PORTRAIT,
  ROLE,
  SCHOOL,
  SITE_URL,
} from './site'

/** The page as static HTML, so crawlers that don't run JavaScript see it. */
export function render(): string {
  return renderToString(<App />)
}

/**
 * schema.org Person, so search engines can tie the page to a person, their
 * role, employer, school and profiles. Built from site.ts so it can't drift
 * from what the page says.
 */
export function structuredData(): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: NAME,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}${PORTRAIT.src}`,
    jobTitle: ROLE,
    worksFor: {
      '@type': 'Organization',
      name: DEFAULT_COMPANY,
      url: COMPANIES[DEFAULT_COMPANY].url,
    },
    alumniOf: { '@type': 'CollegeOrUniversity', name: SCHOOL.name, url: SCHOOL.url },
    sameAs: ELSEWHERE.filter((link) => link.url.startsWith('https://')).map((link) => link.url),
  }
  // Escape '<' so no value can ever close the <script> element early.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
