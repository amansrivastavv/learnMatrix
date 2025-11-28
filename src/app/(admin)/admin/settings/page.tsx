"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Save, History } from "lucide-react";

const initialFlags = [
  { id: "pomodoro", label: "Enable Pomodoro Timer", description: "Allow users to use the focus timer.", active: true },
  { id: "dsa", label: "Enable DSA Tracker", description: "Show DSA progress and questions.", active: true },
  { id: "leaderboard", label: "Enable Leaderboard", description: "Show global user rankings.", active: true },
  { id: "ai_roadmap", label: "Enable AI Roadmap", description: "Allow AI generation of learning paths.", active: true },
  { id: "achievements", label: "Enable Achievements", description: "Gamification badges and rewards.", active: false },
  { id: "maintenance", label: "Maintenance Mode", description: "Disable access for non-admins.", active: false },
];

const activityLogs = [
  { admin: "Aman", action: "Enabled Maintenance Mode", time: "2 days ago" },
  { admin: "Rohan", action: "Banned user 'spam_bot_99'", time: "3 days ago" },
  { admin: "Aman", action: "Updated 'React' Roadmap", time: "5 days ago" },
  { admin: "System", action: "Auto-cleared cache", time: "1 week ago" },
];

export default function AdminSettingsPage() {
  const [flags, setFlags] = useState(initialFlags);

  const toggleFlag = (id: string) => {
    setFlags(flags.map(f => f.id === id ? { ...f, active: !f.active } : f));
  };

  return (
    <div className="p-8 space-y-8 bg-muted/10 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings & Tools</h2>
          <p className="text-muted-foreground">
            Configure system features and view logs.
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Feature Flags</CardTitle>
            <CardDescription>Toggle features on or off globally.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {flags.map((flag) => (
              <div key={flag.id} className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor={flag.id} className="font-medium">{flag.label}</Label>
                  <span className="text-xs text-muted-foreground">{flag.description}</span>
                </div>
                <Switch
                  id={flag.id}
                  checked={flag.active}
                  onCheckedChange={() => toggleFlag(flag.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Admin Activity Log</CardTitle>
              <CardDescription>Recent actions taken by administrators.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLogs.map((log, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <History className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          <span className="font-bold">{log.admin}</span> {log.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{log.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Clear All Caches</div>
                  <div className="text-xs text-muted-foreground">Force refresh all system data.</div>
                </div>
                <Button variant="destructive" size="sm">Clear Cache</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Reset Database</div>
                  <div className="text-xs text-muted-foreground">Delete all data (Dev only).</div>
                </div>
                <Button variant="destructive" size="sm">Reset DB</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
