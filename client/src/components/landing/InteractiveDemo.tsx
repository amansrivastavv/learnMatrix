"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function InteractiveDemo() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            {/* Interactive Mini-App */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <Card className="max-w-md mx-auto p-8 bg-background/80 backdrop-blur-xl border-primary/20 shadow-2xl">
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Focus Timer</h3>
                    <p className="text-muted-foreground">Try it out right here!</p>
                  </div>

                  <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-muted" />
                    <motion.div 
                      className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
                      animate={{ rotate: isActive ? 360 : 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="text-4xl font-mono font-bold tracking-tighter">
                      {formatTime(timeLeft)}
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      size="lg"
                      className="w-12 h-12 rounded-full p-0"
                      onClick={() => setIsActive(!isActive)}
                    >
                      {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-12 h-12 rounded-full p-0"
                      onClick={() => {
                        setIsActive(false);
                        setTimeLeft(25 * 60);
                      }}
                    >
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10" />
          </div>

          <div className="order-1 lg:order-2 space-y-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Experience the <span className="text-primary">Flow</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our tools are designed to be intuitive, beautiful, and effective. No clutter, just focus.
            </p>
            <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
              {[
                "Distraction-free interface",
                "Customizable timer durations",
                "Integrated task tracking",
                "Ambient soundscapes"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
