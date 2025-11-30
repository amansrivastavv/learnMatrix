"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  TrendingUp,
  Map,
  Code2,
  Timer,
  CheckSquare,
  MessageSquare,
  Shield,
  Trophy,
  Library,
  Bell,
  History,
  Settings,
  FileText,
  Server,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "ADMIN DASHBOARD",
    items: [
      { label: "Overview", icon: LayoutDashboard, href: "/admin", color: "text-sky-500" },
      { label: "Users", icon: Users, href: "/admin/users", color: "text-violet-500" },
      { label: "Analytics", icon: BarChart3, href: "/admin/analytics", color: "text-pink-700" },
      { label: "Learning Trends", icon: TrendingUp, href: "/admin/trends", color: "text-emerald-500" },
      { label: "Roadmaps", icon: Map, href: "/admin/roadmaps", color: "text-orange-500" },
      { label: "DSA Stats", icon: Code2, href: "/admin/dsa", color: "text-blue-500" },
      { label: "Pomodoro Stats", icon: Timer, href: "/admin/pomodoro", color: "text-red-500" },
      { label: "Tasks Stats", icon: CheckSquare, href: "/admin/tasks", color: "text-yellow-500" },
      { label: "Feedback", icon: MessageSquare, href: "/admin/feedback", color: "text-cyan-500" },
    ]
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "Roles & Permissions", icon: Shield, href: "/admin/roles", color: "text-indigo-500" },
      { label: "Weekly Challenges", icon: Trophy, href: "/admin/challenges", color: "text-amber-500" },
      { label: "Content Manager", icon: Library, href: "/admin/content", color: "text-rose-500" },
      { label: "Notifications", icon: Bell, href: "/admin/notifications", color: "text-purple-500" },
      { label: "Activity Log", icon: History, href: "/admin/activity", color: "text-gray-500" },
    ]
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Settings", icon: Settings, href: "/admin/settings", color: "text-slate-500" },
      { label: "System Logs", icon: FileText, href: "/admin/logs", color: "text-zinc-500" },
      { label: "API Usage", icon: Server, href: "/admin/api-usage", color: "text-teal-500" },
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-accent">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-8">
          <div className="relative w-8 h-8 mr-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Admin<span className="text-primary">Panel</span>
          </h1>
        </Link>
        
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-lg transition",
                      pathname === route.href ? "text-sidebar-accent-foreground bg-sidebar-accent" : "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center flex-1">
                      <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                      {route.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 py-2 mt-auto space-y-2">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Back to App
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
