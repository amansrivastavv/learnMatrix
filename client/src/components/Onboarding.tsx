"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, BrainCircuit, Timer, Trophy, ArrowRight, Check } from "lucide-react";

const STEPS = [
  {
    title: "Welcome to LearnMatrix",
    description: "Your all-in-one platform to master new skills, track progress, and stay focused.",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    title: "AI-Powered Roadmaps",
    description: "Generate personalized learning paths instantly with our AI integration.",
    icon: BrainCircuit,
    color: "text-blue-500",
  },
  {
    title: "Focus with Pomodoro",
    description: "Boost your productivity using our built-in Pomodoro timer with task tracking.",
    icon: Timer,
    color: "text-red-500",
  },
  {
    title: "Gamify Your Learning",
    description: "Earn badges, climb the leaderboard, and keep your streak alive!",
    icon: Trophy,
    color: "text-orange-500",
  },
];

export function Onboarding() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("learnmatrix-onboarding-completed");
    if (!hasSeenOnboarding) {
      // Small delay to not overwhelm user immediately
      const timer = setTimeout(() => setOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem("learnmatrix-onboarding-completed", "true");
    setOpen(false);
  };

  const CurrentIcon = STEPS[step].icon;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleComplete()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full bg-muted ${STEPS[step].color} bg-opacity-10`}>
              <CurrentIcon className={`h-12 w-12 ${STEPS[step].color}`} />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">{STEPS[step].title}</DialogTitle>
          <DialogDescription className="text-center text-lg pt-2">
            {STEPS[step].description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center gap-2 py-4">
          {STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 w-2 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        <DialogFooter className="sm:justify-center">
          <Button onClick={handleNext} className="w-full sm:w-auto min-w-[120px]">
            {step === STEPS.length - 1 ? (
              <>Get Started <Check className="ml-2 h-4 w-4" /></>
            ) : (
              <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
