"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/theme-toggle";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Moon, 
  Smartphone, 
  LogOut, 
  Trash2,
  Check,
  Mail,
  Lock
} from "lucide-react";

type Tab = "general" | "account" | "appearance";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const savedNotifications = localStorage.getItem("settings-notifications");
    const savedMarketing = localStorage.getItem("settings-marketing");
    if (savedNotifications !== null) setNotifications(JSON.parse(savedNotifications));
    if (savedMarketing !== null) setMarketing(JSON.parse(savedMarketing));
  }, []);

  useEffect(() => {
    localStorage.setItem("settings-notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("settings-marketing", JSON.stringify(marketing));
  }, [marketing]);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const TabButton = ({ id, label, icon: Icon }: { id: Tab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 w-full md:w-auto",
        activeTab === id 
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105" 
          : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );

  const Toggle = ({ checked, onCheckedChange }: { checked: boolean, onCheckedChange: (c: boolean) => void }) => (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        checked ? "bg-primary" : "bg-input"
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );

  return (
    <div className="p-8 space-y-8 animate-fade-in-up max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and app settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 space-y-2">
          <TabButton id="general" label="General" icon={Globe} />
          <TabButton id="account" label="Account" icon={User} />
          <TabButton id="appearance" label="Appearance" icon={Palette} />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <Card className="border-border/50 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" /> Notifications
                  </CardTitle>
                  <CardDescription>Configure how you receive alerts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Daily Study Reminders</Label>
                      <p className="text-sm text-muted-foreground">Receive a nudge to keep your streak alive.</p>
                    </div>
                    <Toggle checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new features.</p>
                    </div>
                    <Toggle checked={marketing} onCheckedChange={setMarketing} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" /> Language & Region
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Language</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>English (United States)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <Card className="border-border/50 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" /> Security
                  </CardTitle>
                  <CardDescription>Manage your account security.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={user?.email} disabled className="pl-9 bg-muted" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" className="pl-9" />
                    </div>
                  </div>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? <Loader size="sm" className="mr-2" /> : <Check className="h-4 w-4 mr-2" />}
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-red-500/20 shadow-md bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-red-500 flex items-center gap-2">
                    <Trash2 className="h-5 w-5" /> Danger Zone
                  </CardTitle>
                  <CardDescription className="text-red-500/70">
                    Irreversible actions. Proceed with caution.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-muted-foreground">Permanently remove your account and all data.</p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sign Out</p>
                      <p className="text-sm text-muted-foreground">Log out of your account on this device.</p>
                    </div>
                    <Button variant="outline" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" /> Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <Card className="border-border/50 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" /> Theme Preferences
                  </CardTitle>
                  <CardDescription>Customize how the app looks and feels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Theme Mode</Label>
                      <p className="text-sm text-muted-foreground">Select your preferred color scheme.</p>
                    </div>
                    <ThemeToggle />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    <div className="space-y-2 cursor-not-allowed opacity-50">
                      <div className="h-24 rounded-lg bg-zinc-950 border-2 border-muted p-2">
                        <div className="h-full w-full rounded bg-zinc-900" />
                      </div>
                      <p className="text-sm font-medium text-center">Zinc (Default)</p>
                    </div>
                    <div className="space-y-2 cursor-not-allowed opacity-50">
                      <div className="h-24 rounded-lg bg-slate-950 border-2 border-muted p-2">
                        <div className="h-full w-full rounded bg-slate-900" />
                      </div>
                      <p className="text-sm font-medium text-center">Slate</p>
                    </div>
                    <div className="space-y-2 cursor-not-allowed opacity-50">
                      <div className="h-24 rounded-lg bg-rose-950 border-2 border-muted p-2">
                        <div className="h-full w-full rounded bg-rose-900" />
                      </div>
                      <p className="text-sm font-medium text-center">Rose</p>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">More themes coming soon!</p>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
