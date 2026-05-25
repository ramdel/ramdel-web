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

    // Collect client metadata
    const clientIP = (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim();
    const userAgent = request.headers.get('user-agent') ?? 'unknown';
    const referer = request.headers.get('referer') ?? 'direct';
    const acceptLanguage = request.headers.get('accept-language')?.split(',')[0] ?? 'unknown';
    const timestamp = new Date().toISOString();

    // Parse OS and browser from User-Agent (no external library)
    const os = /Windows/.test(userAgent) ? 'Windows'
      : /Mac OS X/.test(userAgent) ? 'macOS'
      : /Android/.test(userAgent) ? 'Android'
      : /iPhone|iPad/.test(userAgent) ? 'iOS'
      : /Linux/.test(userAgent) ? 'Linux'
      : 'Unknown';

    const browser = /Edg\//.test(userAgent) ? 'Edge'
      : /OPR\/|Opera/.test(userAgent) ? 'Opera'
      : /Brave/.test(userAgent) ? 'Brave'
      : /Firefox\//.test(userAgent) ? 'Firefox'
      : /Chrome\//.test(userAgent) ? 'Chrome'
      : /Safari\//.test(userAgent) ? 'Safari'
      : 'Unknown';

    // HTML email template
    const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px 16px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#0a0a0a;padding:24px 32px;">
      <p style="margin:0;font-family:monospace;font-size:15px;">
        <span style="color:#00d4ff;">ramdel</span><span style="color:#f4f4f5;">.dev</span>
      </p>
      <p style="margin:6px 0 0;color:#71717a;font-size:12px;letter-spacing:0.04em;">NEW CONTACT FORM SUBMISSION</p>
    </div>

    <!-- Contact info -->
    <div style="padding:24px 32px;border-bottom:1px solid #e4e4e7;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:5px 0;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;width:72px;">Name</td>
          <td style="padding:5px 0;font-size:14px;font-weight:600;color:#09090b;">${validatedData.name}</td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Email</td>
          <td style="padding:5px 0;font-size:14px;color:#0284c7;">
            <a href="mailto:${validatedData.email}" style="color:#0284c7;text-decoration:none;">${validatedData.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Subject</td>
          <td style="padding:5px 0;font-size:14px;color:#09090b;">${validatedData.subject}</td>
        </tr>
      </table>
    </div>

    <!-- Message -->
    <div style="padding:24px 32px;border-bottom:1px solid #e4e4e7;">
      <p style="margin:0 0 12px;color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">Message</p>
      <div style="background:#f9fafb;border-left:3px solid #00d4ff;border-radius:0 6px 6px 0;padding:16px 20px;">
        <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;">${validatedData.message}</p>
      </div>
    </div>

    <!-- Metadata footer -->
    <div style="padding:18px 32px;background:#fafafa;border-top:1px solid #e4e4e7;">
      <p style="margin:0 0 6px;color:#a1a1aa;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;">Technical info</p>
      <table style="width:100%;border-collapse:collapse;font-family:monospace;font-size:11px;color:#71717a;">
        <tr><td style="padding:2px 12px 2px 0;white-space:nowrap;">IP</td><td style="padding:2px 0;">${clientIP}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;white-space:nowrap;">OS</td><td style="padding:2px 0;">${os}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;white-space:nowrap;">Browser</td><td style="padding:2px 0;">${browser}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;white-space:nowrap;">Language</td><td style="padding:2px 0;">${acceptLanguage}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;white-space:nowrap;">Referer</td><td style="padding:2px 0;">${referer}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;white-space:nowrap;">Timestamp</td><td style="padding:2px 0;">${timestamp}</td></tr>
      </table>
    </div>

  </div>
</body>
</html>`;

    // Plain-text fallback
    const textBody = `New contact form submission — ramdel.dev

Name:     ${validatedData.name}
Email:    ${validatedData.email}
Subject:  ${validatedData.subject}

Message:
${validatedData.message}

--- Technical info ---
IP:        ${clientIP}
OS:        ${os}
Browser:   ${browser}
Language:  ${acceptLanguage}
Referer:   ${referer}
Timestamp: ${timestamp}`;

    if (resend) {
      const { error } = await resend.emails.send({
        from: 'Portfolio Contact <no-reply@ramdel.dev>',
        to: 'contacto@ramdel.dev',
        replyTo: validatedData.email,
        subject: `[Portfolio] ${validatedData.subject}`,
        html: htmlBody,
        text: textBody,
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
        os,
        browser,
        acceptLanguage,
        referer,
        timestamp,
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
