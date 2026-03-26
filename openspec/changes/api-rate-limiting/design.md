# Design: API Rate Limiting

## Technical Approach
Use Upstash Redis with `@upstash/ratelimit` — the standard serverless rate limiting solution for Vercel/Next.js. Free tier: 10k requests/day, sufficient for a portfolio contact form.

## Setup Steps
1. Create free account at https://upstash.com
2. Create a Redis database (region: us-east-1 to match Vercel default)
3. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to `.env.local` and Vercel

## Implementation

```typescript
// src/app/api/contact/route.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
});

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toISOString(),
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // Origin check (CSRF mitigation)
  const origin = request.headers.get('origin');
  const allowedOrigins = ['https://ramdel.dev', 'https://www.ramdel.dev'];
  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // ... existing form handling logic
}
```

## New env vars needed
```bash
UPSTASH_REDIS_REST_URL=https://....upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

## Dependencies to install
```bash
npm install @upstash/ratelimit @upstash/redis
```
