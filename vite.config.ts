import { defineConfig, type Plugin } from 'vite'
import preact from '@preact/preset-vite'

/**
 * Cloudflare Web Analytics beacon token.
 *
 * Paste yours between the quotes — dash.cloudflare.com → Analytics → Web
 * Analytics → Add a site → copy the token out of the snippet it shows you.
 *
 * This is public by design: the beacon token ships in the page source of every
 * site that uses it and grants nothing but "report a pageview". It is not a
 * secret, so it belongs here rather than in Actions secrets.
 *
 * Leave it empty and no analytics tag is emitted at all — not a broken script
 * tag, not a request. The site works exactly as it does today.
 */
const CF_BEACON_TOKEN = ''

/**
 * Injects the Cloudflare beacon into the built HTML.
 *
 * `apply: 'build'` is the important part: the tag never exists during
 * `pnpm dev`, so browsing the site locally can't inflate your own numbers.
 * `vite preview` does include it, since that serves a real production build.
 */
function cloudflareAnalytics(token: string): Plugin {
  return {
    name: 'cloudflare-analytics',
    apply: 'build',
    transformIndexHtml(html) {
      if (!token) return html
      return {
        html,
        tags: [
          {
            tag: 'script',
            injectTo: 'body',
            attrs: {
              defer: true,
              src: 'https://static.cloudflareinsights.com/beacon.min.js',
              'data-cf-beacon': JSON.stringify({ token }),
            },
          },
        ],
      }
    },
  }
}

// The components are plain function components on useState/useEffect, so
// preact/compat runs them unchanged — the preset aliases react and react-dom
// onto it. See README for why.
export default defineConfig({
  plugins: [preact(), cloudflareAnalytics(CF_BEACON_TOKEN)],
  base: '/',
})
