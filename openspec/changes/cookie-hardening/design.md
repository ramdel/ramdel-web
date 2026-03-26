# Design: Cookie Hardening

## Technical Approach
Override how next-intl sets the `NEXT_LOCALE` cookie by intercepting the response in `src/middleware.ts` and rewriting the cookie with proper flags.

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Harden the NEXT_LOCALE cookie set by next-intl
  const localeCookie = response.cookies.get('NEXT_LOCALE');
  if (localeCookie) {
    response.cookies.set('NEXT_LOCALE', localeCookie.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```
