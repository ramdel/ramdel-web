# ramdel.dev

Mario de Jesus's professional portfolio — [ramdel.dev](https://ramdel.dev)

DevSecOps Engineer and Technical Lead with 15+ years building secure, scalable cloud infrastructure. This site walks through real engagements: an enterprise security transformation that remediated 111+ critical vulnerabilities, a compliance program that took an insurance platform from 29% to 87% in under six weeks, and a multi-tenant AWS platform running in production with zero open inbound ports.

## Features

- **Multilingual** — English, French (Quebec), Spanish (Mexico), fully parallel content across all three locales
- **Case studies** — five in-depth write-ups of real security and infrastructure engagements, each with verified metrics
- **Lain03 design system** — a custom cyberpunk/portal-themed hero and case-study layout, built with inline SVG motion and Anime.js
- **Security headers** — CSP, Permissions-Policy, and standard hardening headers applied at the edge
- **Analytics, honestly scoped** — GA4 loads only after explicit cookie consent; Vercel Web Analytics runs unconditionally since it's cookieless and collects no personal data
- **Contact form** — Resend-backed delivery, rate-limited via Upstash Redis, CSRF-checked via origin validation
- **Resilient by design** — a weekly Vercel Cron job keeps the Upstash Redis database active so the free tier doesn't get reclaimed for inactivity

## Tech Stack

- **Framework**: Next.js 16.4, App Router, Turbopack
- **Language**: TypeScript
- **UI**: React 19.3, Tailwind CSS 4.3
- **i18n**: next-intl
- **Forms**: React Hook Form + Zod
- **Motion**: Motion + Anime.js for the Lain03 hero
- **Icons**: Lucide React
- **Hosting**: Vercel
- **Email**: Resend
- **Rate limiting & cron state**: Upstash Redis (`@upstash/ratelimit`, `@upstash/redis`)
- **Analytics**: Vercel Web Analytics (cookieless) + Google Analytics 4 (consent-gated)

## Quick Start

1. Clone and install:
```bash
git clone https://github.com/ramdel/ramdel-web.git
cd ramdel-web
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure custom domains:
   - ramdel.dev (primary)
   - ramdel.mx (redirect to ramdel.dev)
3. Set environment variables in Vercel dashboard (see below)
4. Enable Web Analytics in the project's Analytics tab — the `<Analytics />` component is a no-op until this is turned on

### Contact Email
1. Verify the sender domain with Resend.
2. Set `RESEND_API_KEY` in the deployment environment.
3. Without that key, submissions are processed but no email is sent in any environment.

### Rate Limiting & Keep-Alive Cron
1. Create an Upstash Redis database and set `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`.
2. Set `CRON_SECRET` (16+ random characters) — Vercel sends it automatically as a Bearer token to `/api/cron/keepalive/` on the schedule defined in `vercel.json`.
3. Free-tier Upstash databases are deleted after 14 days of inactivity; the cron keeps the database active with a real write, not just a ping.

## Project Structure

```
src/
├── app/
│   ├── [locale]/                    # Internationalized routes
│   │   ├── layout.tsx               # Root layout: fonts, analytics, cookie banner
│   │   ├── page.tsx                 # Homepage — composed from section components
│   │   └── case-studies/[slug]/     # 5 statically generated case study pages
│   ├── api/
│   │   ├── contact/                 # Contact form submission (Resend + rate limiting)
│   │   └── cron/keepalive/          # Weekly Upstash keep-alive, Vercel Cron
│   ├── icon.tsx                     # Generated favicon (next/og)
│   └── globals.css
├── components/
│   ├── lain/                        # Lain03 hero, portal visual, motion
│   ├── layout/                      # Navigation, Footer
│   ├── sections/                    # Hero, About, Skills, Case Studies sections
│   ├── ui/                          # ContactDrawer, CookieBanner, reusable UI
│   └── forms/                       # ContactForm
├── lib/                             # analytics.ts, contactEvents.ts
├── middleware.ts                    # i18n routing + security headers
└── messages/                        # i18n translations (en, es, fr)
```

Contact is a slide-in drawer (`ContactDrawer`), not a standalone route — there's no `/contact` page.

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga4_measurement_id
RESEND_API_KEY=your_resend_api_key
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token
CRON_SECRET=a_random_16plus_character_string
```

Google Analytics loads only after cookie consent. Its automatic page views provide visitor
counts; the contact flow adds `contact_open` and `contact_submit` events with only
`contact_source` (`menu` or `contact_section`) and, for submissions,
`contact_outcome` (`sent`, `local_only`, or `failed`). Form fields are never sent to
Analytics. `local_only` means the API processed a request without `RESEND_API_KEY`;
it does not mean an email was delivered.
To compare the entry points in GA4 reports, register `contact_source` as an event-scoped
custom dimension; `contact_outcome` can be registered the same way.

Vercel Web Analytics requires no consent gate — it's cookieless and collects no personal
data, so it tracks traffic that the consent-gated GA4 setup misses.

## License

MIT License - see LICENSE file for details.
