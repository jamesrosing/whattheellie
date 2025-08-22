'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Something went wrong!</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          We encountered an unexpected error. Please try refreshing the page or come back later.
        </p>
        <Button onClick={reset} variant="default">
          Try again
        </Button>
      </div>
      <Footer />
    </div>
  );
}