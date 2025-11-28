"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  Target, 
  Zap, 
  Trophy, 
  BarChart3, 
  Users,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "AI-Powered Roadmaps",
    description: "Generate personalized learning paths in seconds. Our AI analyzes your goals and creates a custom curriculum.",
    icon: Brain,
    className: "md:col-span-2",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Focus Timer",
    description: "Built-in Pomodoro timer to keep you in the flow state.",
    icon: Zap,
    className: "md:col-span-1",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    title: "Gamification",
    description: "Earn badges, maintain streaks, and climb the global leaderboard.",
    icon: Trophy,
    className: "md:col-span-1",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Detailed Analytics",
    description: "Visualize your progress with GitHub-style heatmaps and detailed charts.",
    icon: BarChart3,
    className: "md:col-span-2",
    color: "bg-blue-500/10 text-blue-500",
  },
];

export function BentoGrid() {
  return (
    <section className="py-24 container px-4 md:px-6">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
          Everything You Need to <span className="text-primary">Excel</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
          A complete ecosystem of tools designed to supercharge your learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "group relative overflow-hidden rounded-3xl border bg-background p-8 hover:shadow-2xl transition-all duration-300",
              feature.className
            )}
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", feature.color)}>
              <feature.icon className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {feature.title}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>

            {/* Decorative Gradient Blob */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
