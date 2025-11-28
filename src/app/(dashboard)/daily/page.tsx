
"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DailyPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    topics: "",
    field: "frontend",
    timeSpent: 0
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.daily.create(formData);
      alert("Entry saved!");
      setFormData({ title: "", content: "", topics: "", field: "frontend", timeSpent: 0 });
    } catch (error) {
      console.error("Failed to save entry", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>New Daily Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                required 
                placeholder="What did you learn today?"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="field">Field</Label>
                <Select 
                  value={formData.field} 
                  onValueChange={(val) => setFormData({...formData, field: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="dsa">DSA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time Spent (hours)</Label>
                <Input 
                  id="time" 
                  type="number" 
                  step="0.5"
                  value={formData.timeSpent} 
                  onChange={(e) => setFormData({...formData, timeSpent: parseFloat(e.target.value)})} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topics">Topics Covered (comma separated)</Label>
              <Input 
                id="topics" 
                value={formData.topics} 
                onChange={(e) => setFormData({...formData, topics: e.target.value})} 
                placeholder="React, Hooks, Context..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Notes / Reflection</Label>
              <Textarea 
                id="content" 
                value={formData.content} 
                onChange={(e) => setFormData({...formData, content: e.target.value})} 
                placeholder="Detailed notes about what you learned..."
                className="min-h-[150px]"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Entry"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
