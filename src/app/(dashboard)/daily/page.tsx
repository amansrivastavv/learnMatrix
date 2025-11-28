"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Smile, 
  Meh, 
  Frown, 
  Zap, 
  Clock, 
  Tag, 
  Save, 
  Sparkles, 
  Quote,
  Calendar as CalendarIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOODS = [
  { value: "great", icon: Zap, label: "Great", color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20" },
  { value: "good", icon: Smile, label: "Good", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { value: "neutral", icon: Meh, label: "Neutral", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  { value: "bad", icon: Frown, label: "Bad", color: "text-red-500 bg-red-500/10 border-red-500/20" },
];

const QUOTES = [
  "The beautiful thing about learning is that no one can take it away from you.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The expert in anything was once a beginner.",
];

export default function DailyPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    topics: "",
    field: "frontend",
    timeSpent: 0,
    mood: "good"
  });
  const [loading, setLoading] = useState(false);
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.daily.create(formData);
      // Reset form or show success message
      setFormData({ title: "", content: "", topics: "", field: "frontend", timeSpent: 0, mood: "good" });
    } catch (error) {
      console.error("Failed to save entry", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col md:flex-row gap-8 animate-fade-in-up">
      {/* Left Column: Form */}
      <div className="flex-1 space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Daily Reflection</h2>
          <p className="text-muted-foreground">Capture your learning journey, one day at a time.</p>
        </div>

        <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/50">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Mood Selector */}
              <div className="space-y-3">
                <Label className="text-base font-medium">How are you feeling?</Label>
                <div className="flex gap-4">
                  {MOODS.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, mood: m.value })}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105",
                        formData.mood === m.value 
                          ? m.color + " ring-2 ring-offset-2 ring-offset-background" 
                          : "border-transparent hover:bg-muted"
                      )}
                    >
                      <m.icon className="h-8 w-8" />
                      <span className="text-xs font-medium">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">Title</Label>
                <Input 
                  id="title" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  required 
                  placeholder="What was the highlight of your learning today?"
                  className="h-12 text-lg bg-background/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="field" className="text-base font-medium">Focus Area</Label>
                  <Select 
                    value={formData.field} 
                    onValueChange={(val) => setFormData({...formData, field: val})}
                  >
                    <SelectTrigger className="h-12 bg-background/50">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend Development</SelectItem>
                      <SelectItem value="backend">Backend Development</SelectItem>
                      <SelectItem value="devops">DevOps & Cloud</SelectItem>
                      <SelectItem value="dsa">Data Structures & Algo</SelectItem>
                      <SelectItem value="system-design">System Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-base font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Time Spent (Hours)
                  </Label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="12" 
                      step="0.5" 
                      value={formData.timeSpent}
                      onChange={(e) => setFormData({...formData, timeSpent: parseFloat(e.target.value)})}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="text-lg font-bold w-12 text-center">{formData.timeSpent}h</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topics" className="text-base font-medium flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Topics Covered
                </Label>
                <Input 
                  id="topics" 
                  value={formData.topics} 
                  onChange={(e) => setFormData({...formData, topics: e.target.value})} 
                  placeholder="e.g. React Hooks, Docker, Graph Algorithms..."
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-base font-medium">Key Takeaways</Label>
                <Textarea 
                  id="content" 
                  value={formData.content} 
                  onChange={(e) => setFormData({...formData, content: e.target.value})} 
                  placeholder="Write down your thoughts, challenges, and victories..."
                  className="min-h-[200px] resize-none bg-background/50 p-4 leading-relaxed"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader size="sm" /> Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-5 w-5" /> Save Daily Entry
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Inspiration & Summary */}
      <div className="w-full md:w-80 space-y-6">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" /> Daily Inspiration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
              <p className="text-lg font-medium italic text-muted-foreground relative z-10 pl-4">
                "{quote}"
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" /> Today's Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">Current Streak</span>
              <span className="text-xl font-bold text-orange-500 flex items-center gap-1">
                <Zap className="h-4 w-4" /> 12
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">Entries this Month</span>
              <span className="text-xl font-bold text-primary">18</span>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-xl bg-muted/30 p-4 border border-dashed text-center">
          <p className="text-sm text-muted-foreground">
            "Consistency is the key to mastery."
          </p>
        </div>
      </div>
    </div>
  );
}
