"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit, Sparkles, Loader2, BookOpen, Layers, Zap } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";

export default function AIRoadmapPage() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("beginner");
  const [roadmap, setRoadmap] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setRoadmap("");

    try {
      const response = await fetch("/api/ai/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level }),
      });

      if (!response.ok) throw new Error("Failed to generate");

      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setRoadmap((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-fade-in-up h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        {/* Left Column: Input */}
        <div className="w-full md:w-1/3 space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <BrainCircuit className="h-8 w-8 text-primary" /> AI Roadmap
            </h2>
            <p className="text-muted-foreground">Generate a personalized learning path in seconds.</p>
          </div>

          <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/50">
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Tell us what you want to learn.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic / Skill</Label>
                  <Input 
                    id="topic" 
                    placeholder="e.g. React Native, Python, System Design" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (Newbie)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (Some exp)</SelectItem>
                      <SelectItem value="advanced">Advanced (Pro)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-primary/25 transition-all" 
                  disabled={loading || !topic}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader size="sm" /> Generating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" /> Generate Roadmap
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="bg-muted/30 rounded-xl p-6 border border-dashed border-border/50">
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-yellow-500" /> Pro Tip
            </h3>
            <p className="text-sm text-muted-foreground">
              Be specific! Instead of "Java", try "Java for Android Development" or "Java Backend with Spring Boot".
            </p>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="flex-1 h-full min-h-[500px] flex flex-col">
          <Card className="flex-1 border-border/50 shadow-xl overflow-hidden flex flex-col">
            <CardHeader className="bg-muted/30 border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" /> Your Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden relative bg-card/50">
              {!roadmap && !loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                  <BookOpen className="h-16 w-16 mb-4 opacity-20" />
                  <p className="text-lg font-medium">Ready to learn?</p>
                  <p className="text-sm">Enter a topic and hit generate to see the magic.</p>
                </div>
              )}
              
              <div className="h-full overflow-y-auto p-8 prose prose-zinc dark:prose-invert max-w-none">
                {roadmap ? (
                  <div className="whitespace-pre-wrap font-mono text-sm md:text-base leading-relaxed">
                    {roadmap}
                  </div>
                ) : null}
                {loading && (
                   <div className="flex items-center gap-2 text-primary animate-pulse mt-4">
                     <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                     <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                     <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                   </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
