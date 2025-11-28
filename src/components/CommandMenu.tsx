"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  User,
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  BarChart2,
  BrainCircuit,
  Trophy,
  Timer,
  Search
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <div 
        className="hidden md:flex items-center text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md border border-border/50 cursor-pointer hover:bg-muted transition-colors"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4 opacity-50" />
        <span>Search...</span>
        <kbd className="pointer-events-none ml-4 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/daily"))}>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Daily Entry</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/practice"))}>
              <CheckSquare className="mr-2 h-4 w-4" />
              <span>Practice</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/pomodoro"))}>
              <Timer className="mr-2 h-4 w-4" />
              <span>Focus Timer</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/ai"))}>
              <BrainCircuit className="mr-2 h-4 w-4" />
              <span>AI Roadmap</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/leaderboard"))}>
              <Trophy className="mr-2 h-4 w-4" />
              <span>Leaderboard</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => router.push("/profile"))}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
