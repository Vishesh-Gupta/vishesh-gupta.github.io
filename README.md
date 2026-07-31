# vishesh-gupta.github.io

Personal site. One white page: a greeting that cycles through languages, a short
bio with the companies linked inline, and a row of icon links.

## Editing content

- **Bio prose** — [`src/components/Bio.tsx`](src/components/Bio.tsx). It's plain
  JSX so the sentences stay readable; company names are wrapped in `<At />`,
  which pulls the URL from `COMPANIES`.
- **Links and company notes** — `COMPANIES` and `ELSEWHERE` in
  [`src/site.ts`](src/site.ts).
- **Greetings** — the array at the top of
  [`src/components/Greeting.tsx`](src/components/Greeting.tsx).
- **Icons** — [`src/components/Icons.tsx`](src/components/Icons.tsx). Adding an
  entry to `ELSEWHERE` needs a matching key here and in `IconName`.

The résumé is `public/resume.pdf`, linked from the last icon. Replacing that
file is all a résumé update needs — but check `ROLE`, the bio prose, and the
company notes still match it.

## Company notes

Each entry in `COMPANIES` has a `note`. On a pointer device it appears in a
single reserved line under the bio and swaps as you hover or tab across the
company names; on touch, where there's no hover to reveal it, all three are
listed instead.

Each entry carries a `where` (location and dates) and a `note` (what the work
was). Both are drawn from the résumé in `public/resume.pdf` — keep them in
step when that changes.

Keep each note within two lines at the prose width. The slot reserves three
lines total — one for `where`, two for `note` — and that reserve is what stops
the icons below from moving when the detail swaps. Longer notes need
`.company-note`'s `min-height` raised in `src/App.css` to match.

## The photo

Two files — `portrait@2x.webp` at **448×774** and `portrait@3x.webp` at
**672×1161**. The browser fetches whichever matches the screen; it never loads
both.

On a pointer device the photo **stretches to the height of the text beside
it**: the grid row is sized by the prose and the image fills it, so the two
columns always finish level and the photo can never push the layout around as
it decodes. That's why the files are ~0.58 aspect rather than 4:5 — it matches
the rendered box, so `cover` neither upscales nor trims the sides. Below 640px
the layout stacks and the photo takes a fixed 4:5 instead, since there's no
text column to match.

It sits desaturated and fades to full colour on hover. If the files are
missing, the portrait column removes itself and the page falls back to the
single-column layout rather than showing a broken image.

To swap the photo, regenerate both sizes from the same crop and update
`PORTRAIT.alt` in `src/site.ts`.

## Social preview

`public/og.png` is the 1200×630 card that Slack, iMessage, LinkedIn and
Twitter show when the site is linked. It's a static file, so it only changes
when you regenerate it.

To regenerate after editing [`tools/og-card.html`](tools/og-card.html):

```bash
pnpm build
npx http-server dist -p 4173 -s &
cp tools/og-card.html dist/
# screenshot http://127.0.0.1:4173/og-card.html at exactly 1200x630 -> public/og.png
rm dist/og-card.html
```

The card pulls the same self-hosted fonts as the site, so it has to be
rendered against a served build rather than opened from disk.

## Fonts

Newsreader and Inter are self-hosted from `public/fonts/` rather than fetched
from Google, so first paint doesn't wait on a third-party connection and the
page makes no external requests at all. Both are latin-subset variable fonts,
further instanced with `fonttools` to only the axes the site actually uses:

- **Newsreader** — weight pinned to 400 (the only weight used), optical-size
  axis kept, since that's what stops the 64px greeting rendering with
  text-size letterforms. 132 kB → 58 kB.
- **Inter** — weight range narrowed to 400–500. 48 kB → 34 kB.

Pinning a weight means the browser can't interpolate others, so if you start
using, say, Newsreader 600, re-instance from the Google original with a wider
range rather than letting the browser fake it.

The non-latin greetings (你好, नमस्ते, مرحبا, …) aren't in either file and
fall through to system fonts — same as they did when the fonts came from
Google. The `unicode-range` on each `@font-face` is what keeps the browser
from downloading them pointlessly for those glyphs.

To change weights or add a subset, refetch from Google Fonts with a browser
user-agent (so you get woff2), drop the files in `public/fonts/`, and update
the `@font-face` blocks at the top of `src/index.css`.

## Performance

The page is four components and no router, so it runs on **Preact** rather
than React — `@preact/preset-vite` aliases `react`/`react-dom` onto
`preact/compat`, and the component code is unchanged. That alone took the JS
bundle from 149 kB to 25 kB (48.7 → 10.5 kB gzipped).

Measured on the production build:

| | before | after |
| --- | --- | --- |
| Total transferred | 380 kB | 139 kB |
| JS (gzipped) | 48.7 kB | 10.5 kB |
| Fonts | 180 kB | 92 kB |
| Portrait | 52 kB | 65 kB (2x) |
| Requests | 6 | 6 |
| Build | ~770 ms | ~250 ms |

Everything is same-origin — there are no third-party requests at all.

The portrait grew when it went from a 136px thumbnail to a column-height
photo; that's the one number that moved the wrong way, and deliberately.

If you ever add a React-only dependency that reaches into internals, that's
the point to reconsider the Preact alias; everything in `preact/compat` today
covers what this site uses.

## Theming

Light and dark follow the OS setting via `prefers-color-scheme` — there's no
toggle. Both schemes are defined as custom properties at the top of
`src/index.css`; nothing else in the CSS hardcodes a colour, so changing the
palette means editing those two blocks. The favicon and the `theme-color`
meta tags switch with the scheme too.

## Responsive behaviour

Checked from 320px to 1920px, including landscape phone: no horizontal
overflow and nothing clipped off the top at any width. The single breakpoint
that matters is 640px, where the portrait column stacks above the prose;
below 480px the page also switches from vertically centred to top-aligned so
short viewports don't push content off-screen.

The greeting animation holds 60fps — 300 sampled frames, p95 16.8 ms, no
frame over 20 ms.

## Layout stability

The greeting line has a reserved height sized for the tallest script in the
rotation, so swapping languages never moves the bio beneath it. If you add a
greeting in a script with taller glyphs, check `.greeting-word`'s `height` in
`src/App.css`.

The company-note slot works the same way — see above.

## Local development

```bash
pnpm install
pnpm dev      # dev server
pnpm build    # typecheck + production build to dist/
pnpm lint
pnpm preview  # serve the production build
```

`packageManager` in `package.json` pins pnpm, and CI installs with
`--frozen-lockfile` — so if you change dependencies, commit the updated
`pnpm-lock.yaml` or the deploy will fail.

## Deployment

Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds and publishes `dist/` straight to Pages via `upload-pages-artifact` and
`deploy-pages`. There's no `gh-pages` branch and nothing to publish by hand.

This requires **Settings → Pages → Source: GitHub Actions**. With the source
set to a branch instead, Pages serves the repo root — where `index.html` is
the Vite dev shell pointing at `/src/main.tsx` — and the site renders blank.
That is the first thing to check if it ever goes blank again.

`pnpm build` runs `tsc` first, so a type error fails the deploy rather than
shipping. Deploys are serialised and never cancelled mid-flight, and each one
shows up under the repo's Environments tab with a rollback button.
