"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Users, Mail, CheckCircle, XCircle, RefreshCw, Send, 
  TrendingUp, Calendar, Shield 
} from "lucide-react";
import { motion } from "framer-motion";

interface SubscriberStats {
  total: number;
  verified: number;
  unverified: number;
  recentSubscriptions: Array<{
    email: string;
    subscribedAt: string;
    verified: boolean;
  }>;
  dailyStats: Array<{
    date: string;
    count: number;
  }>;
}

export default function SubscribersAdminPage() {
  const [stats, setStats] = useState<SubscriberStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe/stats", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();
      setStats(data);
      setAuthenticated(true);
    } catch (err) {
      setError("Failed to load statistics. Check your admin token.");
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      fetchStats();
    }
  };

  const triggerTestEmail = async () => {
    try {
      const response = await fetch("/api/webhook/new-post?test=true");
      const data = await response.json();
      alert(`Test mode: ${data.message}\nSubscribers: ${data.subscriberCount}`);
    } catch (err) {
      alert("Failed to trigger test");
    }
  };

  if (!authenticated) {
    return (
      <div className="container mx-auto px-5 mb-10">
        <Header />
        <div className="max-w-md mx-auto mt-20">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-garamond">Admin Access</h2>
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
                Access Dashboard
              </Button>
            </form>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-4">{error}</p>
            )}
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      
      <div className="mt-8 mb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-garamond">Subscriber Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={fetchStats} variant="outline" size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={triggerTestEmail} variant="outline" size="sm">
              <Send className="w-4 h-4 mr-2" />
              Test Email
            </Button>
          </div>
        </div>

        {stats && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Subscribers</p>
                      <p className="text-3xl font-bold mt-1">{stats.total}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary opacity-50" />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Verified</p>
                      <p className="text-3xl font-bold mt-1 text-green-600 dark:text-green-400">
                        {stats.verified}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 opacity-50" />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Unverified</p>
                      <p className="text-3xl font-bold mt-1 text-orange-600 dark:text-orange-400">
                        {stats.unverified}
                      </p>
                    </div>
                    <XCircle className="w-8 h-8 text-orange-600 dark:text-orange-400 opacity-50" />
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Daily Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Last 7 Days
              </h3>
              <div className="flex items-end gap-2 h-32">
                {stats.dailyStats.map((day, i) => (
                  <div key={day.date} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary/20 rounded-t"
                      style={{
                        height: `${day.count > 0 ? Math.max(20, (day.count / Math.max(...stats.dailyStats.map(d => d.count))) * 100) : 5}%`,
                      }}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                    </p>
                    {day.count > 0 && (
                      <p className="text-xs font-medium">{day.count}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Subscriptions */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Subscriptions
              </h3>
              <div className="space-y-3">
                {stats.recentSubscriptions.map((sub, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-mono">{sub.email}</span>
                      {sub.verified ? (
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {stats.recentSubscriptions.length === 0 && (
                  <p className="text-sm text-muted-foreground">No recent subscriptions</p>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}