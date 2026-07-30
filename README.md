# vishesh-gupta.github.io

Personal site. One white page: a greeting that cycles through languages, a short
bio with the companies linked inline, and a row of icon links.

## Editing content

- **Bio prose** — [`src/components/Bio.tsx`](src/components/Bio.tsx). It's plain
  JSX so the sentences stay readable; company names are wrapped in `<At />`,
  which pulls the URL from `COMPANIES`.
- **Links** — `COMPANIES` and `ELSEWHERE` in [`src/site.ts`](src/site.ts).
- **Greetings** — the array at the top of
  [`src/components/Greeting.tsx`](src/components/Greeting.tsx).
- **Icons** — [`src/components/Icons.tsx`](src/components/Icons.tsx). Adding an
  entry to `ELSEWHERE` needs a matching key here and in `IconName`.

To wire up the résumé link, drop a PDF at `public/resume.pdf` (or point
`RESUME_URL` at a hosted copy).

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

## Local development

```bash
pnpm install
pnpm dev      # dev server
pnpm build    # typecheck + production build to dist/
pnpm lint
pnpm preview  # serve the production build
```

Deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.
