# SEO and favicon deployment

The existing production redirects were checked on September 25, 2026:
- https://uxora.co/ → 308 → https://www.uxora.co/ → 200
- http://uxora.co/ → HTTPS apex → HTTPS www → 200
- http://www.uxora.co/ → HTTPS www → 200
No loops were observed. Keep the existing Vercel domain redirects; canonical host is https://www.uxora.co.

Run `npm run build`, `npm run lint`, and `node scripts/check-seo.mjs`.
Vercel must run `npm run build` and serve `dist` (do not bypass the post-build SEO generation with just `vite build`).

`scripts/seo.mjs` defines metadata and writes 14 route-specific HTML documents plus the sitemap. Vite's HTML hook also applies metadata during development. These are initial HTML heads; React still renders the page body. Add future public routes to both the SEO registry and Vercel rewrite list. No CSS or visible page content is changed.

`public/favicon.svg` contains only the original green symbol path from `src/assets/logo.svg`, in a square padded viewBox. PNGs and the multi-resolution ICO were rasterized from that vector. `public/uxora-social.png` uses the existing full logo on white at 1200×630. No fabricated claims or organization details were added. WebSite structured data is on the homepage only.

Before this change, production robots.txt and sitemap.xml returned index.html. Explicit Vercel page rewrites replace that catch-all. Static icons/crawl files are served as real files; missing assets are not rewritten to the app. The legacy /work/givit alias permanently redirects to /work/geviti. The sitemap excludes aliases and hash-only sections.

After deployment:
1. Check / and /services/web-app-design with View Source: one title, description and canonical; matching social tags.
2. Request /favicon.svg, /favicon.ico, /favicon-96x96.png and /apple-touch-icon.png: expect 200 and image content types. Also check /robots.txt and /sitemap.xml.
3. Inspect the icon in light and dark browser tabs. Browser automation was unavailable locally; generated artwork was visually inspected and local HTTP and file checks passed.
4. If the old favicon remains, close/reopen the tab, hard-refresh, then try a private window. Clear cached site images/files if necessary; favicon caches can persist beyond a normal reload.
5. In the verified Google Search Console property, inspect https://www.uxora.co/ with URL Inspection, run Test Live URL, and select Request Indexing. Submit https://www.uxora.co/sitemap.xml in Sitemaps. Recrawling is not immediate or guaranteed: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

Deployment, Vercel dashboard/header settings (including any externally configured X-Robots-Tag), and Search Console actions require hosting/account access. No deployment or indexing request was performed here.
