"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center animate-fade-in-up">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
        <Ghost className="h-32 w-32 text-primary animate-bounce relative z-10" />
      </div>
      
      <h1 className="text-6xl font-black tracking-tighter mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-4">Lost in the Matrix?</h2>
      <p className="text-muted-foreground max-w-md mb-8 text-lg">
        The page you are looking for seems to have glitched out of existence. 
        Let's get you back to safety.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="gap-2">
          <Link href="/dashboard">
            <Home className="h-5 w-5" /> Return to Dashboard
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" /> Go Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
