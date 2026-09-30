# Solent Property Photography

The V1 marketing site for Jamie Doe's independent property photography business in South Hampshire: Fareham, Gosport, Portsmouth and Southampton.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and `next/image`. Every public page is statically prerendered.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
npx tsc --noEmit # type check
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.yourdomain.co.uk`) in production. It drives canonical URLs, Open Graph URLs, the sitemap and structured data.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage: hero, selected work, services, why us, areas, testimonials, CTA |
| `/portfolio`, `/portfolio/[slug]` | Filterable editorial portfolio and project case studies with fullscreen viewer |
| `/services`, `/services/property-photography` | Services overview and the property photography service |
| `/pricing` | Packages, comparison and extras |
| `/areas`, `/areas/[slug]` | Service areas and local pages (Fareham, Gosport, Portsmouth, Southampton) |
| `/about` | Jamie and the approach |
| `/contact` | Enquiry form |
| `/blog`, `/blog/[slug]` | Journal |
| `/gallery/[slug]` | Private client gallery (unlisted, `noindex`) with ZIP download at `/gallery/[slug]/download` |

## Project structure

```
src/
  app/
    (site)/        public pages sharing the header, footer and mobile enquiry bar
    gallery/       private client galleries (own minimal chrome)
    sitemap.ts, robots.ts, icon.svg, not-found.tsx
  components/      reusable UI, grouped by area (home, portfolio, lightbox, pricing…)
  content/         the content layer: all copy, data and images
  lib/             SEO helpers, structured data, enquiry validation/delivery, ZIP writer
```

## Content layer

All content lives in `src/content/` as typed modules. Pages only read from it.

| File | What it holds |
| --- | --- |
| `site.ts` | Business name, contact details, navigation |
| `pages.ts` | Page headlines, intros and CTAs |
| `media.ts` + `media/` | Image library (static imports give sizes and blur placeholders) |
| `portfolio/projects.ts` | Portfolio projects, in display order |
| `services.ts` | Services (available and coming later), what's included, process, FAQs |
| `pricing.ts` | Packages, extras, comparison table; the single source of every price |
| `locations.ts` | Area pages: local copy, neighbourhoods, postcodes, notes |
| `testimonials.ts` | Testimonials (general and per area) |
| `blog/posts.ts` | Journal posts (structured blocks, inline `[links](/path)`) |
| `galleries.ts` | Mock client galleries |

Headlines are written in two halves, `{ lead, accent }`, and render as the extended grotesk followed by the serif italic, e.g. "Property photography *for Hampshire.*"

**Adding content**

- **Project**: copy an entry in `portfolio/projects.ts`. The portfolio, project page, sitemap, location pages and "next project" links update automatically.
- **Post**: add to `blog/posts.ts`. Reading time is calculated.
- **Area**: add to `locations.ts` and to the `LocationSlug` type in `types.ts`.
- **Service**: set a `coming-later` entry to `available`, fill in its fields and add a page under `app/(site)/services/`.
- **Images**: put files in `src/content/media/` and import them where they're used. Always write alt text that describes what's in the frame.

## Before launch: placeholders to replace

Placeholders are marked `PLACEHOLDER` in the content files. Bracketed values such as `[£ ]`, `[N]` and `[X]` render visibly on the site, so nothing unconfirmed can pass for a final figure.

- [ ] **Photography**: every image in `src/content/media/placeholders/` is stock, used for development only. Replace with Jamie's own work.
- [ ] **Portrait**: the About page shows a labelled placeholder frame for Jamie's portrait.
- [ ] **Business name and contact**: `site.ts` (trading name, email, optional phone/WhatsApp, reply time).
- [ ] **Prices and package details**: `pricing.ts` (`amount: null` → a number) and the `[N]`/`[X]` values in packages, services and FAQs.
- [ ] **Licence terms and weather policy**: FAQ answers in `services.ts`.
- [ ] **Testimonials**: all entries in `testimonials.ts` are placeholders. Only publish real, attributable quotes with permission.
- [ ] **Portfolio**: the six projects are samples. Replace them with real shoots.
- [ ] **About copy**: the bracketed paragraph in `pages.ts` (`aboutCopy`).
- [ ] **Journal**: posts are drafts in the studio's voice; review and re-date.
- [ ] **Domain**: set `NEXT_PUBLIC_SITE_URL`.
- [ ] **Privacy notice**: the enquiry form collects personal data; add a privacy page before accepting real enquiries.

## Enquiries

The form (`components/contact/EnquiryForm.tsx`) validates on the client and again on the server (`app/(site)/contact/actions.ts`) using the shared rules in `lib/enquiry/schema.ts`.

**V1 does not send or store enquiries.** `lib/enquiry/deliver.ts` returns `{ delivered: false }`, and the success screen tells the visitor that nothing has been sent and offers a pre-filled email instead. To go live, implement delivery in `deliverEnquiry` (an email API and/or a database, with credentials in server-side environment variables) and return `{ delivered: true }` on success. The form then shows the confirmed state automatically.

## Client galleries

Galleries are mock data in `content/galleries.ts`, reachable by link only, excluded from the sitemap, disallowed in `robots.txt` and marked `noindex`. The viewer supports keyboard, swipe, individual downloads and "download all" as a ZIP built on demand (`lib/zip.ts`, no dependencies).

For production, swap `getGallery()` for a storage-backed source returning the same `ClientGallery` shape, and add access control (password, magic link or accounts) in the gallery page/route or a `proxy.ts`. The UI does not need to change.

## Design system

"Limestone & ink": warm neutrals (tokens in `app/globals.css`), a single rust accent for hover and small moments, Archivo (extended) for display and Instrument Serif italic for accents. Photography has no borders, radii or filters.

Motion is subtle and CSS-only: the hero settles from a slight zoom, headlines rise into place, images scale 1.5% on hover, scroll reveals use scroll-driven animations where supported, and page changes crossfade. All of it switches off under `prefers-reduced-motion`.
