# vishesh-gupta.github.io

Personal site. White background, one column, three routes, and a greeting that
cycles through languages.

## Editing content

Everything you'd normally want to change — bio, work links, elsewhere links,
résumé URL — lives in [`src/site.ts`](src/site.ts). The list of greetings lives
at the top of [`src/components/Greeting.tsx`](src/components/Greeting.tsx).

To wire up the résumé link, drop a PDF at `public/resume.pdf` (or point
`RESUME_URL` at a hosted copy).

## Layout stability

The greeting sits above the router outlet and has a reserved height, and
`.view` has a reserved `min-height`, so switching routes doesn't move the
greeting or the nav. If you add a page taller than the current reserve, bump
`.view`'s `min-height` in `src/App.css` to match.

## Local development

```bash
pnpm install
pnpm dev      # dev server
pnpm build    # typecheck + production build to dist/
pnpm lint
pnpm preview  # serve the production build
```

Deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.
