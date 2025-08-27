import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, testType = "welcome" } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Check which provider is configured
    const provider = emailService.getProviderInfo();
    console.log("Using email provider:", provider);

    let subject = "";
    let html = "";

    if (testType === "welcome") {
      subject = "Welcome to what the ellie! 🌍";
      html = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Georgia, serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; padding: 20px 0; }
              .title { font-size: 32px; color: #222; margin-bottom: 10px; }
              .content { padding: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="title">what the ellie</h1>
                <p>Welcome aboard! 🎉</p>
              </div>
              <div class="content">
                <p>Hey there!</p>
                <p>This is a test email to confirm your subscription is working.</p>
                <p>You'll receive notifications whenever new travel stories are published.</p>
                <p>Email provider: <strong>${provider}</strong></p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #666;">
                  This is a test email. If you received this, your email configuration is working correctly!
                </p>
              </div>
            </div>
          </body>
        </html>
      `;
    } else if (testType === "newpost") {
      subject = "New Adventure: Testing the Mountains 🏔️";
      html = `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Georgia, serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="font-size: 24px;">what the ellie</h1>
              <h2>Testing the Mountains</h2>
              <p>This is what a new post notification would look like.</p>
              <p>Click here to read the full story (this is just a test).</p>
              <p style="margin-top: 40px; font-size: 12px; color: #999;">
                Email sent via: ${provider}
              </p>
            </div>
          </body>
        </html>
      `;
    }

    const success = await emailService.sendEmail({
      to: email,
      subject,
      html,
    });

    if (success) {
      return NextResponse.json({
        message: "Test email sent successfully!",
        provider,
        to: email,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to send test email. Check your configuration." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      { error: `Email test failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

// GET endpoint to check configuration
export async function GET() {
  const provider = emailService.getProviderInfo();
  
  const configured = provider !== 'No email provider configured';
  
  return NextResponse.json({
    configured,
    provider,
    instructions: configured 
      ? "Email is configured! Use POST /api/test-email with {email: 'test@example.com'} to send a test."
      : "No email provider configured. Add Gmail or Resend credentials to .env file.",
  });
}