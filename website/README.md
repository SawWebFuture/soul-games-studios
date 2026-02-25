# Soul Games Studios Website (Starting Point)

This `/website` folder is now the **primary starting point** for the Soul Games Studios site.

It uses Next.js + Tailwind-style utility classes (via global CSS) and includes:

- Modern animated landing page
- Brand-colored UI
- SEO metadata + OG image
- Logo assets in `public/`

## Run locally

```bash
cd website
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Structure

- `app/page.tsx` — landing page content + sections
- `app/layout.tsx` — SEO metadata and root layout
- `app/globals.css` — animations and style utilities
- `public/logo.jpg` — brand logo
- `public/og-image.svg` — social preview image
