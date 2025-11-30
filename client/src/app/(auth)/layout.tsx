'use client';

import { BrainCircuit, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden bg-background">
      {/* Aurora Background (Global) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      {/* Left Panel - 3D Visuals */}
      <div className="relative hidden h-full flex-col items-center justify-center p-10 text-white dark:border-r lg:flex overflow-hidden bg-muted/5">
        
        {/* 3D Visual Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full max-w-[500px] aspect-square perspective-1000"
        >
          {/* Floating Cards */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 z-20 bg-background/80 backdrop-blur-xl p-4 rounded-2xl border shadow-2xl w-48"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-foreground">AI Roadmap</div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[70%] bg-green-500" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-0 z-30 bg-background/80 backdrop-blur-xl p-4 rounded-2xl border shadow-2xl w-56"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-foreground">Next: React Hooks</div>
            </div>
            <div className="text-xs text-muted-foreground">Recommended by AI Tutor</div>
          </motion.div>

          {/* Main Mock Dashboard Visual */}
          <div className="absolute inset-10 bg-background/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-500">
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
                <div className="h-24 rounded-xl bg-muted/5 border border-white/5 p-4 flex items-end gap-2">
                  {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-primary/20 rounded-t-sm"
                      style={{ height: `${h}%` }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Branding/Quote Overlay */}
        <div className="absolute bottom-10 left-10 right-10 z-20">
             <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2 backdrop-blur-md bg-background/30 p-6 rounded-xl border border-white/10 shadow-lg"
          >
            <div className="flex items-center mb-4">
                <BrainCircuit className="mr-2 h-6 w-6 text-primary" />
                <span className="font-bold text-lg">LearnMatrix</span>
            </div>
            <p className="text-lg font-medium leading-relaxed text-foreground/90">
              &ldquo;Master any skill 10x faster with our AI-powered learning roadmaps.&rdquo;
            </p>
          </motion.blockquote>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="lg:p-8 h-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] relative z-10"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
