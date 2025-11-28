"use client";

import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "fullscreen" | "overlay";
}

export function Loader({ 
  size = "md", 
  variant = "default", 
  className,
  ...props 
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const LoaderContent = () => (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
      {/* Outer Ring - Static with pulse */}
      <div className="absolute inset-0 rounded-full border-4 border-foreground/30 animate-pulse" />
      
      {/* Middle Ring - Spinning Clockwise */}
      <div className="absolute inset-0 rounded-full border-4 border-t-foreground border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      
      {/* Inner Ring - Spinning Counter-Clockwise */}
      <div className="absolute inset-2 rounded-full border-4 border-b-foreground border-t-transparent border-l-transparent border-r-transparent animate-spin-reverse" />
      
      {/* Center Dot - Breathing */}
      <div className="absolute w-2 h-2 bg-foreground rounded-full animate-ping" />
    </div>
  );

  if (variant === "fullscreen") {
    return (
      <div className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300",
        className
      )} {...props}>
        <LoaderContent />
        <p className="mt-6 text-sm font-medium text-foreground/80 animate-pulse tracking-widest uppercase">
          Loading
        </p>
      </div>
    );
  }

  if (variant === "overlay") {
    return (
      <div className={cn(
        "absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-[2px]",
        className
      )} {...props}>
        <LoaderContent />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <LoaderContent />
    </div>
  );
}
