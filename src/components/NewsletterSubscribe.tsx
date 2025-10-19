"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

interface NewsletterSubscribeProps {
  variant?: "inline" | "card";
  className?: string;
  stacked?: boolean;
}

export function NewsletterSubscribe({ variant = "inline", className, stacked = false }: NewsletterSubscribeProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(result.message || "Successfully subscribed!");
        form.reset();
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  if (variant === "inline") {
    return (
      <div className={cn("w-full", className)}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className={cn(stacked ? "flex flex-col gap-2" : "flex gap-2")}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={cn(stacked ? "w-full space-y-0" : "flex-1 space-y-0")}>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        disabled={status === "loading"}
                        className="h-10"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                size="sm"
                className={cn("h-10", stacked && "w-full")}
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormMessage />
              )}
            />
          </form>
        </Form>
        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "text-sm mt-2",
                status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 lg:p-8 shadow-lg dark:shadow-xl border border-border",
        className
      )}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-garamond font-medium text-foreground mb-2">
            Never miss an adventure
          </h3>
          <p className="text-sm text-muted-foreground">
            Get notified when new travel stories and guides are published.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                    disabled={status === "loading"}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full"
            size="lg"
          >
            {status === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {status === "success" && <CheckCircle className="mr-2 h-4 w-4" />}
            {status === "error" && <AlertCircle className="mr-2 h-4 w-4" />}
            {status === "loading" ? "Subscribing..." : "Subscribe to updates"}
          </Button>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "p-3 rounded-lg text-sm",
                  status === "success"
                    ? "bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200"
                    : "bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200"
                )}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-xs text-center text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </Form>
    </div>
  );
}