"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center animate-fade-in-up">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-destructive/20 blur-[100px] rounded-full" />
        <AlertTriangle className="h-32 w-32 text-destructive animate-pulse relative z-10" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-2">System Malfunction</h1>
      <p className="text-muted-foreground max-w-md mb-8 text-lg">
        Something went wrong on our end. Don't worry, it's not you, it's us.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset} size="lg" className="gap-2">
          <RefreshCcw className="h-5 w-5" /> Try Again
        </Button>
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/dashboard">
            <Home className="h-5 w-5" /> Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
