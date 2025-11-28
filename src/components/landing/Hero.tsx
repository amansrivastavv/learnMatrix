"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span>AI-Powered Learning Revolution</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Master Any Skill <br />
              <span className="text-primary">10x Faster</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
              Generate personalized roadmaps, track your progress, and stay focused with our intelligent learning assistant.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="h-12 px-8 text-base gap-2" asChild>
                <Link href="/register">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </div>
          </motion.div>

          {/* 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              rotateX: mousePosition.y * 10 - 5,
              rotateY: mousePosition.x * 10 - 5,
            }}
            className="relative hidden lg:block perspective-1000"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 z-20 bg-background/80 backdrop-blur-xl p-4 rounded-2xl border shadow-2xl w-48"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold">AI Roadmap</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[70%] bg-green-500" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-0 z-30 bg-background/80 backdrop-blur-xl p-4 rounded-2xl border shadow-2xl w-56"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold">Next: React Hooks</div>
                </div>
                <div className="text-xs text-muted-foreground">Recommended by AI Tutor</div>
              </motion.div>

              {/* Main Mock Dashboard Visual */}
              <div className="absolute inset-0 bg-background/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                {/* Mock Header */}
                <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="h-2 w-32 bg-muted rounded-full ml-4" />
                </div>
                
                <div className="flex-1 flex">
                  {/* Mock Sidebar */}
                  <div className="w-16 border-r border-white/5 flex flex-col items-center py-4 gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/20" />
                    <div className="w-8 h-8 rounded-lg bg-muted/20" />
                    <div className="w-8 h-8 rounded-lg bg-muted/20" />
                    <div className="mt-auto w-8 h-8 rounded-full bg-muted/20" />
                  </div>
                  
                  {/* Mock Content */}
                  <div className="flex-1 p-6 space-y-6">
                    {/* Greeting */}
                    <div className="space-y-2">
                      <div className="h-6 w-48 bg-muted/20 rounded-lg" />
                      <div className="h-3 w-32 bg-muted/10 rounded-lg" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 rounded-xl bg-primary/5 border border-primary/10 p-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 mb-2" />
                        <div className="h-4 w-12 bg-muted/20 rounded mb-1" />
                        <div className="h-3 w-20 bg-muted/10 rounded" />
                      </div>
                      <div className="h-24 rounded-xl bg-blue-500/5 border border-blue-500/10 p-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 mb-2" />
                        <div className="h-4 w-12 bg-muted/20 rounded mb-1" />
                        <div className="h-3 w-20 bg-muted/10 rounded" />
                      </div>
                    </div>

                    {/* Chart Area */}
                    <div className="h-32 rounded-xl bg-muted/5 border border-white/5 p-4 flex items-end gap-2">
                      {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary/40 transition-colors"
                          style={{ height: `${h}%` }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
