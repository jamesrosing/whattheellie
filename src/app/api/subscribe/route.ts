import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

// In production, you'd want to use a proper database like PostgreSQL, MongoDB, or Supabase
// For now, we'll use a JSON file to store subscribers
const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  verified: boolean;
  token: string;
}

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(SUBSCRIBERS_FILE);
  } catch {
    // Create directory and file if they don't exist
    const dir = path.dirname(SUBSCRIBERS_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify({ subscribers: [] }));
  }
}

async function getSubscribers(): Promise<Subscriber[]> {
  await ensureDataFile();
  const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
  const parsed = JSON.parse(data);
  return parsed.subscribers || [];
}

async function saveSubscribers(subscribers: Subscriber[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(
    SUBSCRIBERS_FILE,
    JSON.stringify({ subscribers }, null, 2)
  );
}

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

    // Get existing subscribers
    const subscribers = await getSubscribers();

    // Check if already subscribed
    const existingSubscriber = subscribers.find(
      (sub) => sub.email.toLowerCase() === email.toLowerCase()
    );

    if (existingSubscriber) {
      return NextResponse.json(
        { message: "You're already subscribed! Thank you for your interest." },
        { status: 200 }
      );
    }

    // Create new subscriber
    const newSubscriber: Subscriber = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      verified: false,
      token: crypto.randomBytes(32).toString("hex"),
    };

    // Add to list and save
    subscribers.push(newSubscriber);
    await saveSubscribers(subscribers);

    // In production, you would:
    // 1. Send a verification email
    // 2. Store in a proper database
    // 3. Integrate with email service (SendGrid, Mailgun, etc.)

    return NextResponse.json(
      { 
        message: "Successfully subscribed! You'll be notified when new content is published.",
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
    const subscribers = await getSubscribers();
    const subscriber = subscribers.find((sub) => sub.token === token);

    if (!subscriber) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 404 }
      );
    }

    // Mark as verified
    if (!subscriber.verified) {
      subscriber.verified = true;
      await saveSubscribers(subscribers);
    }

    return NextResponse.json(
      { 
        message: "Email verified successfully",
        email: subscriber.email 
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
    const subscribers = await getSubscribers();
    const filteredSubscribers = subscribers.filter((sub) => {
      if (token) return sub.token !== token;
      if (email) return sub.email.toLowerCase() !== email.toLowerCase();
      return true;
    });

    if (filteredSubscribers.length === subscribers.length) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    await saveSubscribers(filteredSubscribers);

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