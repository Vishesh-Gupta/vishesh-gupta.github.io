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

To wire up the résumé link, drop a PDF at `public/resume.pdf` (or point
`RESUME_URL` at a hosted copy).

## Company notes

Each entry in `COMPANIES` has a `note`. On a pointer device it appears in a
single reserved line under the bio and swaps as you hover or tab across the
company names; on touch, where there's no hover to reveal it, all three are
listed instead.

**The notes currently describe what each company does, not what Vishesh did
there.** Replace them with a line each about what you actually built or owned.

Keep each note within two lines at the prose width — that's what the slot
reserves, and it's what stops the icons below from moving when the note
swaps. Longer notes need `.company-note`'s `min-height` raised in
`src/App.css` to match.

## The photo

**`public/portrait.jpg` is currently a placeholder** — a stock landscape from
Unsplash, not a photo of Vishesh. Overwrite that file with a real one and
update `PORTRAIT.alt` in `src/site.ts` to describe it. The Unsplash License
allows use without attribution, so nothing else needs to change on the swap.

It renders 136px wide in a 4:5 crop, so
roughly **544×680** covers a 2x screen; anything larger is wasted bytes.
`object-fit: cover` handles the crop, so the source doesn't have to be 4:5
already — but it centres the crop, so centre the subject.

It sits desaturated and fades to full colour on hover. If the file isn't
there, the portrait column removes itself and the page falls back to the
single-column layout rather than showing a broken image.

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
page makes no external requests at all. Both are variable fonts covering
their full weight range in one file, subset to latin.

The non-latin greetings (你好, नमस्ते, مرحبا, …) aren't in either file and
fall through to system fonts — same as they did when the fonts came from
Google. The `unicode-range` on each `@font-face` is what keeps the browser
from downloading them pointlessly for those glyphs.

To change weights or add a subset, refetch from Google Fonts with a browser
user-agent (so you get woff2), drop the files in `public/fonts/`, and update
the `@font-face` blocks at the top of `src/index.css`.

## Theming

Light and dark follow the OS setting via `prefers-color-scheme` — there's no
toggle. Both schemes are defined as custom properties at the top of
`src/index.css`; nothing else in the CSS hardcodes a colour, so changing the
palette means editing those two blocks. The favicon and the `theme-color`
meta tags switch with the scheme too.

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

Deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.
