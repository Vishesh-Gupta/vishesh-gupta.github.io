import { build, defineConfig, type Plugin } from 'vite'
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
const CF_BEACON_TOKEN = '045ae6735a954525bc3ec675170fc620'

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
              // type="module" matches the snippet Cloudflare hands out, and
              // modules are deferred by default, so this is non-blocking.
              // beacon.min.js is a classic script, not a module; it works
              // either way because it finds its own tag with
              // `document.currentScript || querySelector('[data-cf-beacon]')`.
              type: 'module',
              src: 'https://static.cloudflareinsights.com/beacon.min.js',
              'data-cf-beacon': JSON.stringify({ token }),
            },
          },
        ],
      }
    },
  }
}

type ServerEntry = { render(): string; structuredData(): string }

/**
 * Prerenders the page into dist/index.html at build time.
 *
 * Without this the HTML ships with an empty #root and everything appears only
 * once JavaScript runs — so search crawlers and link-preview bots that don't
 * run it index an empty page. This renders src/entry-server.tsx to HTML,
 * places it inside #root, and adds the page's structured data to <head>.
 * main.tsx then hydrates the markup instead of rebuilding it.
 *
 * It lives in the Vite build itself (not a post-build script) because CI runs
 * `vite build` directly and deploy runs `pnpm build`: both get it.
 */
function prerender(): Plugin {
  let root = ''
  return {
    name: 'prerender',
    apply: 'build',
    configResolved(config) {
      root = config.root
    },
    transformIndexHtml: {
      order: 'post',
      async handler(html) {
        const placeholder = '<div id="root"></div>'
        if (!html.includes(placeholder)) {
          throw new Error(`prerender: ${placeholder} not found in index.html`)
        }
        const entry = await loadServerEntry(root)
        return {
          html: html.replace(placeholder, `<div id="root">${entry.render()}</div>`),
          tags: [
            {
              tag: 'script',
              attrs: { type: 'application/ld+json' },
              children: entry.structuredData(),
              injectTo: 'head',
            },
          ],
        }
      },
    },
  }
}

/**
 * Compiles src/entry-server.tsx in memory and imports it. Every dependency is
 * bundled in (`noExternal`), so the output has no imports left to resolve and
 * loads straight from a data: URL — no temp files to write or clean up.
 */
async function loadServerEntry(root: string): Promise<ServerEntry> {
  const result = await build({
    root,
    configFile: false,
    logLevel: 'warn',
    plugins: [preact()],
    ssr: { noExternal: true },
    build: { ssr: 'src/entry-server.tsx', write: false, minify: false },
  })
  type Output = { type: string; isEntry?: boolean; code?: string }
  const outputs = (Array.isArray(result) ? result : [result]) as unknown as { output: Output[] }[]
  const chunk = outputs.flatMap((o) => o.output).find((o) => o.type === 'chunk' && o.isEntry)
  if (!chunk?.code) throw new Error('prerender: the server build produced no entry chunk')
  return (await import(`data:text/javascript,${encodeURIComponent(chunk.code)}`)) as ServerEntry
}

// The components are plain function components on useState/useEffect, so
// preact/compat runs them unchanged — the preset aliases react and react-dom
// onto it. See README for why.
export default defineConfig({
  plugins: [preact(), cloudflareAnalytics(CF_BEACON_TOKEN), prerender()],
  base: '/',
})
