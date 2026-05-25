import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Resend client — only instantiated when API key is present
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Rate limiter — only active when Upstash env vars are present
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(5, '1 h'),
        analytics: true,
      })
    : null;

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(2000),
});

const allowedOrigins = [
  'https://ramdel.dev',
  'https://www.ramdel.dev',
  // Allow localhost in development
  ...(process.env.NODE_ENV === 'development'
    ? ['http://localhost:3000', 'http://localhost:3001']
    : []),
];

export async function POST(request: NextRequest) {
  try {
    // Origin check (CSRF mitigation)
    const origin = request.headers.get('origin');
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Rate limiting (skipped if Upstash is not configured)
    if (ratelimit) {
      const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        'anonymous';
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
    }

    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Get client info for security tracking
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    if (resend) {
      const { error } = await resend.emails.send({
        from: 'Portfolio Contact <no-reply@ramdel.dev>',
        to: 'contacto@ramdel.dev',
        replyTo: validatedData.email,
        subject: `[Portfolio] ${validatedData.subject}`,
        text: `
New contact form submission from ramdel.dev

Name:    ${validatedData.name}
Email:   ${validatedData.email}
Subject: ${validatedData.subject}

Message:
${validatedData.message}

---
IP:        ${clientIP}
User-Agent: ${userAgent}
Timestamp: ${new Date().toISOString()}
        `.trim(),
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json(
          { error: 'Failed to send message. Please try again later.' },
          { status: 500 }
        );
      }
    } else {
      // Fallback for local dev without RESEND_API_KEY
      console.log('[dev] Contact form submission (email not sent):', {
        ...validatedData,
        clientIP,
        userAgent,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
