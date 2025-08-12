import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// AWS SES configuration (opcional - para cuando lo configures)
// import AWS from 'aws-sdk';
// 
// const ses = new AWS.SES({
//   region: process.env.AWS_REGION || 'us-east-2',
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = contactSchema.parse(body);
    
    // Get client info for security tracking
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // For now, we'll simulate email sending
    // In production, you'd use AWS SES here
    console.log('Contact form submission:', {
      ...validatedData,
      clientIP,
      userAgent,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Replace with actual AWS SES email sending
    // const emailParams = {
    //   Destination: {
    //     ToAddresses: ['contacto@ramdel.dev'],
    //   },
    //   Message: {
    //     Body: {
    //       Text: {
    //         Data: `
    //           New contact form submission:
    //           
    //           Name: ${validatedData.name}
    //           Email: ${validatedData.email}
    //           Subject: ${validatedData.subject}
    //           
    //           Message:
    //           ${validatedData.message}
    //           
    //           ---
    //           Client IP: ${clientIP}
    //           User Agent: ${userAgent}
    //           Timestamp: ${new Date().toISOString()}
    //         `,
    //       },
    //     },
    //     Subject: {
    //       Data: `Contact Form: ${validatedData.subject}`,
    //     },
    //   },
    //   Source: 'no-reply@ramdel.dev',
    //   ReplyToAddresses: [validatedData.email],
    // };
    
    // await ses.sendEmail(emailParams).promise();

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid form data', errors: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}