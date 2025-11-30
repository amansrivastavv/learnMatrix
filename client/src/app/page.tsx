import Link from "next/link";
import { Zap } from "lucide-react";
import { Hero } from "@/components/landing/Hero";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/5">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">LearnMatrix</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#demo" className="hover:text-foreground transition-colors">Demo</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Hero />
        <div id="features">
          <BentoGrid />
        </div>
        <div id="demo">
          <InteractiveDemo />
        </div>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="container mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Join thousands of students who are already using LearnMatrix to master new skills.
            </p>
            <Link
              href="/register"
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl"
            >
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">LearnMatrix</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LearnMatrix. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
         
        </div>
      </footer>
    </div>
  );
}
