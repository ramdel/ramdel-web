# Ramdel.dev - Professional Portfolio

Mario de Jesus - DevSecOps Engineer portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌐 **Multilingual**: English, French (Quebec), Spanish (Mexico)
- 🎨 **Terminal Theme**: Synthwave-inspired design
- 📱 **Responsive**: Mobile-first design
- ⚡ **Performance**: Static generation with Next.js
- 🔐 **Security**: Built-in security headers
- 📊 **Analytics**: Consent-gated GA4 page views and contact events
- 📧 **Contact**: Resend delivery when configured

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Hosting**: Vercel
- **Email**: Resend (when configured)
- **Rate Limiting**: Upstash Redis (@upstash/ratelimit)

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
3. Set environment variables in Vercel dashboard

### Contact Email (Optional)
1. Verify the sender domain with Resend.
2. Set `RESEND_API_KEY` in the deployment environment.
3. Without that key, submissions are processed but no email is sent in any environment.

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx       # Homepage
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   └── projects/      # Projects page
│   ├── api/
│   │   └── contact/       # Contact form API
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Navigation, Footer
│   ├── ui/                # Reusable UI components
│   └── forms/             # Contact form
├── lib/                   # Utilities
└── messages/              # i18n translations
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga4_measurement_id
RESEND_API_KEY=your_resend_api_key
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token
```

Google Analytics loads only after cookie consent. Its automatic page views provide visitor
counts; the contact flow adds `contact_open` and `contact_submit` events with only
`contact_source` (`menu` or `contact_section`) and, for submissions,
`contact_outcome` (`sent`, `local_only`, or `failed`). Form fields are never sent to
Analytics. `local_only` means the API processed a request without `RESEND_API_KEY`;
it does not mean an email was delivered.
To compare the entry points in GA4 reports, register `contact_source` as an event-scoped
custom dimension; `contact_outcome` can be registered the same way.

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ in Montreal 🍁
