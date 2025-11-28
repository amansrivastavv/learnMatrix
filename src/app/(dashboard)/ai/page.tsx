
"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit, Loader2, CheckCircle2, Calendar, Clock, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIPage() {
  const [formData, setFormData] = useState({
    field: "frontend",
    duration: 30,
    dailyTime: 2
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      // Simulate a slightly longer delay for the "AI" feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      const data = await api.ai.generateRoadmap(formData.field, formData.duration, formData.dailyTime);
      setResult(data);
    } catch (error) {
      console.error("Failed to generate roadmap", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
          <BrainCircuit className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          AI Learning Architect
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Design your perfect learning journey. Our AI analyzes your goals and creates a personalized, step-by-step roadmap just for you.
        </p>
      </div>

      {/* Input Section */}
      <Card className="border-2 border-muted/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Configure Your Path
          </CardTitle>
          <CardDescription>Customize the parameters for your learning adventure.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="grid gap-8 md:grid-cols-3 items-end">
            <div className="space-y-3">
              <Label htmlFor="field" className="text-base font-medium">Target Field</Label>
              <Select 
                value={formData.field} 
                onValueChange={(val) => setFormData({...formData, field: val})}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend Development</SelectItem>
                  <SelectItem value="backend">Backend Development</SelectItem>
                  <SelectItem value="fullstack">Fullstack Engineering</SelectItem>
                  <SelectItem value="mobile">Mobile App Development</SelectItem>
                  <SelectItem value="datascience">Data Science & AI</SelectItem>
                  <SelectItem value="devops">DevOps & Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="duration" className="text-base font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Duration (Days)
              </Label>
              <div className="relative">
                <Input 
                  id="duration" 
                  type="number" 
                  className="h-12 pl-4"
                  value={formData.duration} 
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})} 
                  min={7}
                  max={365}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="time" className="text-base font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" /> Daily Commitment (Hours)
              </Label>
              <div className="relative">
                <Input 
                  id="time" 
                  type="number" 
                  className="h-12 pl-4"
                  value={formData.dailyTime} 
                  onChange={(e) => setFormData({...formData, dailyTime: parseFloat(e.target.value)})} 
                  min={0.5}
                  max={12}
                  step="0.5"
                />
              </div>
            </div>

            <div className="md:col-span-3 pt-4">
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Crafting your roadmap...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Generate My Roadmap <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-2xl font-bold text-foreground">
              Your <span className="text-emerald-600">{result.field}</span> Mastery Path
            </h3>
            <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
              {result.roadmap.length} Weeks • {formData.duration} Days Total
            </div>
          </div>

          <div className="relative border-l-2 border-emerald-200 dark:border-emerald-800 ml-4 md:ml-8 space-y-12 pb-12">
            {result.roadmap.map((week: any, index: number) => (
              <div key={index} className="relative pl-8 md:pl-12 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-background bg-emerald-500 group-hover:scale-125 transition-transform duration-300" />
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-sm font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded w-fit">
                      Week {week.week}
                    </span>
                    <h4 className="text-xl font-bold text-foreground">{week.topic}</h4>
                  </div>

                  <Card className="group-hover:border-emerald-500/50 transition-colors duration-300">
                    <CardContent className="pt-6">
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {week.tasks.map((task: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
