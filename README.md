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
