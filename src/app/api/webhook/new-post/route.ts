import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { wisp } from "@/lib/wisp";
import { emailService } from "@/lib/email";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  verified: boolean;
  token: string;
}

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return parsed.subscribers || [];
  } catch {
    return [];
  }
}

async function sendEmailNotification(
  subscriber: Subscriber,
  post: {
    title: string;
    slug: string;
    description?: string;
    author?: string;
  }
) {
  // In production, integrate with email service provider like:
  // - SendGrid
  // - Mailgun
  // - Amazon SES
  // - Resend
  // - Postmark

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const unsubscribeUrl = `${baseUrl}/api/subscribe?token=${subscriber.token}`;

  // Example email content
  const emailContent = {
    to: subscriber.email,
    subject: `New Post: ${post.title}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Georgia, serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #eee; }
            .content { padding: 30px 0; }
            .title { font-size: 28px; margin-bottom: 10px; color: #222; }
            .description { font-size: 16px; color: #666; margin-bottom: 20px; }
            .button { 
              display: inline-block; 
              padding: 12px 30px; 
              background-color: #222; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer { 
              margin-top: 40px; 
              padding-top: 20px; 
              border-top: 1px solid #eee; 
              font-size: 12px; 
              color: #999;
              text-align: center;
            }
            .footer a { color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="font-size: 24px; margin: 0;">what the ellie</h1>
              <p style="margin: 5px 0; color: #666;">Travel & Adventure Blog</p>
            </div>
            
            <div class="content">
              <h2 class="title">${post.title}</h2>
              ${post.description ? `<p class="description">${post.description}</p>` : ""}
              ${post.author ? `<p style="color: #888;">by ${post.author}</p>` : ""}
              
              <a href="${postUrl}" class="button">Read the full story</a>
              
              <p style="margin-top: 30px; color: #666;">
                Hey there! I just published a new post that I thought you'd enjoy. 
                Click the link above to read about my latest adventure.
              </p>
            </div>
            
            <div class="footer">
              <p>
                You're receiving this because you subscribed to updates from what the ellie.
                <br>
                <a href="${unsubscribeUrl}">Unsubscribe</a> if you no longer wish to receive these emails.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      New Post: ${post.title}
      
      ${post.description || ""}
      
      Read the full story: ${postUrl}
      
      ---
      Unsubscribe: ${unsubscribeUrl}
    `,
  };

  // Send email using our email service
  const result = await emailService.sendEmail({
    to: subscriber.email,
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text,
  });

  if (result) {
    console.log(`✅ Email sent to ${subscriber.email}`);
  } else {
    console.error(`❌ Failed to send email to ${subscriber.email}`);
  }

  return result;
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook authenticity (implement based on Wisp's webhook security)
    const authHeader = request.headers.get("authorization");
    const webhookSecret = process.env.WISP_WEBHOOK_SECRET;

    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Extract post details from webhook payload
    // Note: Adjust based on actual Wisp webhook payload structure
    const { postId, title, slug, description, authorName } = body;

    if (!postId || !title || !slug) {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    // Get all verified subscribers
    const subscribers = await getSubscribers();
    const verifiedSubscribers = subscribers.filter(sub => sub.verified !== false);

    // Send notifications
    const notifications = verifiedSubscribers.map(subscriber =>
      sendEmailNotification(subscriber, {
        title,
        slug,
        description,
        author: authorName,
      })
    );

    await Promise.allSettled(notifications);

    return NextResponse.json(
      { 
        message: "Notifications sent",
        count: verifiedSubscribers.length 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET(request: NextRequest) {
  // This could be used to manually trigger notifications for testing
  const searchParams = request.nextUrl.searchParams;
  const testMode = searchParams.get("test");

  if (testMode !== "true") {
    return NextResponse.json(
      { error: "Test mode not enabled" },
      { status: 400 }
    );
  }

  try {
    // Fetch latest post from Wisp for testing
    const result = await wisp.getPosts({ limit: 1 });
    
    if (!result.posts.length) {
      return NextResponse.json(
        { error: "No posts found" },
        { status: 404 }
      );
    }

    const latestPost = result.posts[0];
    const subscribers = await getSubscribers();

    return NextResponse.json({
      message: "Test mode - would notify subscribers",
      post: {
        title: latestPost.title,
        slug: latestPost.slug,
      },
      subscriberCount: subscribers.length,
    });
  } catch (error) {
    console.error("Test error:", error);
    return NextResponse.json(
      { error: "Test failed" },
      { status: 500 }
    );
  }
}