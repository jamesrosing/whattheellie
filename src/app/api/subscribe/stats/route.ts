import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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

export async function GET(request: NextRequest) {
  // Simple authentication - in production use proper auth
  const authHeader = request.headers.get("authorization");
  const adminToken = process.env.ADMIN_TOKEN || "admin-secret-token";

  if (authHeader !== `Bearer ${adminToken}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const subscribers = await getSubscribers();
    
    const stats = {
      total: subscribers.length,
      verified: subscribers.filter(s => s.verified).length,
      unverified: subscribers.filter(s => !s.verified).length,
      recentSubscriptions: subscribers
        .sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime())
        .slice(0, 5)
        .map(s => ({
          email: s.email.replace(/^(.{2}).*(@.*)$/, "$1***$2"), // Partially hide email
          subscribedAt: s.subscribedAt,
          verified: s.verified
        })),
      dailyStats: getDailyStats(subscribers),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to get stats" },
      { status: 500 }
    );
  }
}

function getDailyStats(subscribers: Subscriber[]) {
  const now = new Date();
  const stats = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const count = subscribers.filter(s => {
      const subDate = new Date(s.subscribedAt).toISOString().split('T')[0];
      return subDate === dateStr;
    }).length;

    stats.push({
      date: dateStr,
      count
    });
  }

  return stats;
}