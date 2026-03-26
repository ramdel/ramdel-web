# Design: Security Headers — CSP + Permissions-Policy

## Technical Approach
Add security headers via `next.config.js` using Next.js `headers()` async function. This is the canonical approach for Next.js on Vercel — headers are injected at the CDN edge for all matching routes.

## Implementation

### next.config.js changes

```javascript
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",   // unsafe-inline needed for Next.js hydration
      "style-src 'self' 'unsafe-inline'",     // unsafe-inline needed for Tailwind
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; '),
  },
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'browsing-topics=()',
      'payment=()',
      'usb=()',
      'interest-cohort=()',
    ].join(', '),
  },
];

const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
```

## Notes
- `'unsafe-inline'` in `script-src` is required for Next.js inline scripts during hydration. To remove it, Next.js supports nonce-based CSP (more complex — future change).
- `connect-src 'self'` covers `/api/contact/`. If analytics uses an external endpoint, add it here.
- `img-src 'self' data: https:` allows all HTTPS images (needed for any external images, OG images, etc.)

## Validation Steps
1. Build locally: `npm run build && npm start`
2. Check browser console for CSP violations on all 3 locales
3. Validate at: https://csp-evaluator.withgoogle.com
4. Check headers: `curl -sI https://ramdel.dev | grep -i content-security`

## Potential Issues
- If analytics (`NEXT_PUBLIC_ANALYTICS_ID`) sends data to an external domain, add that domain to `connect-src`
- Check `src/lib/analytics.ts` to identify any external endpoints before implementing
