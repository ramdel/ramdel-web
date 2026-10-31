import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const TARGETS: Record<string, string> = {
  upwork: 'https://www.upwork.com/freelancers/~01e0c14a020588c784',
};
const SOURCES = new Set(['footer', 'cv', 'github', 'linkedin', 'direct']);
const BOT = /bot|crawl|spider|preview|slurp|facebookexternalhit/i;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const target = TARGETS[slug];
  if (!target) return new NextResponse('Not found', { status: 404 });

  const s = request.nextUrl.searchParams.get('s') ?? 'direct';
  const source = SOURCES.has(s) ? s : 'direct';
  const ua = request.headers.get('user-agent') ?? '';

  if (
    !BOT.test(ua) &&
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    try {
      const day = new Date().toISOString().slice(0, 10);
      const redis = Redis.fromEnv();
      await Promise.all([
        redis.incr(`go:${slug}:total`),
        redis.incr(`go:${slug}:src:${source}`),
        redis.incr(`go:${slug}:day:${day}`),
      ]);
    } catch {
      // Tracking must never block the redirect.
    }
  }

  const res = NextResponse.redirect(target, 307);
  res.headers.set('X-Robots-Tag', 'noindex');
  res.headers.set('Cache-Control', 'no-store');
  return res;
}
