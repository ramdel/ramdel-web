# Ramdel.dev - Professional Portfolio

Mario de Jesus - DevSecOps Engineer portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌐 **Multilingual**: English, French (Quebec), Spanish (Mexico)
- 🎨 **Terminal Theme**: Synthwave-inspired design
- 📱 **Responsive**: Mobile-first design
- ⚡ **Performance**: Static generation with Next.js
- 🔐 **Security**: Built-in security headers
- 📊 **Analytics**: Multi-domain tracking
- 📧 **Contact**: AWS SES integration ready

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Hosting**: Vercel
- **Email**: AWS SES (when configured)
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

### AWS SES Setup (Optional)
1. Verify domain in AWS SES
2. Create IAM user with SES send permissions
3. Add AWS credentials to environment variables

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
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token
```

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ in Montreal 🍁
