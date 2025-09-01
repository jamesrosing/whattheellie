import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/lib/email";
import crypto from "crypto";

// In production, you should use a proper database like PostgreSQL, MongoDB, or Supabase
// For now, we'll use email notifications and in-memory storage

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  verified: boolean;
  token: string;
}

// In-memory storage for development/demo purposes
// In production, this should be replaced with a database
const subscribers = new Map<string, Subscriber>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Check if already subscribed
    if (subscribers.has(normalizedEmail)) {
      return NextResponse.json(
        { message: "You're already subscribed! Thank you for your interest." },
        { status: 200 }
      );
    }

    // Create new subscriber
    const newSubscriber: Subscriber = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      verified: false,
      token: crypto.randomBytes(32).toString("hex"),
    };

    // Store in memory (in production, use a database)
    subscribers.set(normalizedEmail, newSubscriber);

    // Send notification email to admin/owner
    const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER || process.env.RESEND_FROM_EMAIL;
    
    if (adminEmail) {
      await emailService.sendEmail({
        to: adminEmail,
        subject: "New Newsletter Subscriber",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Newsletter Subscriber!</h2>
            <p>A new subscriber has joined your newsletter:</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Email:</strong> ${normalizedEmail}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <p style="color: #666; font-size: 12px;">This is an automated notification from your travel blog.</p>
          </div>
        `,
      });
    }

    // Optionally send welcome email to subscriber
    await emailService.sendEmail({
      to: normalizedEmail,
      subject: "Welcome to What the Ellie!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to What the Ellie!</h1>
          <p>Thank you for subscribing to our travel blog newsletter!</p>
          <p>You'll be the first to know when new travel stories and guides are published.</p>
          <div style="margin: 30px 0;">
            <p>In the meantime, check out our latest content:</p>
            <ul>
              <li><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://whattheellie.com'}/map">Interactive Travel Map</a></li>
              <li><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://whattheellie.com'}/spain">Spain Travel Guide</a></li>
              <li><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://whattheellie.com'}">Latest Blog Posts</a></li>
            </ul>
          </div>
          <p style="color: #666; font-size: 12px;">If you didn't subscribe to this newsletter, you can safely ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json(
      { 
        message: "Successfully subscribed! Check your email for a welcome message.",
        id: newSubscriber.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // This endpoint could be used to verify subscription status
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Token required" },
      { status: 400 }
    );
  }

  try {
    // Find subscriber by token
    let foundSubscriber: Subscriber | undefined;
    for (const [_, subscriber] of subscribers) {
      if (subscriber.token === token) {
        foundSubscriber = subscriber;
        break;
      }
    }

    if (!foundSubscriber) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 404 }
      );
    }

    // Mark as verified
    if (!foundSubscriber.verified) {
      foundSubscriber.verified = true;
      subscribers.set(foundSubscriber.email, foundSubscriber);
    }

    return NextResponse.json(
      { 
        message: "Email verified successfully",
        email: foundSubscriber.email 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Unsubscribe endpoint
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token && !email) {
    return NextResponse.json(
      { error: "Token or email required" },
      { status: 400 }
    );
  }

  try {
    let deleted = false;
    
    if (email) {
      const normalizedEmail = email.toLowerCase();
      if (subscribers.has(normalizedEmail)) {
        subscribers.delete(normalizedEmail);
        deleted = true;
      }
    } else if (token) {
      for (const [email, subscriber] of subscribers) {
        if (subscriber.token === token) {
          subscribers.delete(email);
          deleted = true;
          break;
        }
      }
    }

    if (!deleted) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Successfully unsubscribed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}