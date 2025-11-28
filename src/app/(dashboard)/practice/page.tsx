"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PracticePage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState({ title: "", difficulty: "Easy", topic: "" });
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await api.practice.list();
      setQuestions(data);
    } catch (error) {
      console.error("Failed to load questions", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const added = await api.practice.add(newQuestion);
      setQuestions([...questions, added]);
      setOpen(false);
      setNewQuestion({ title: "", difficulty: "Easy", topic: "" });
    } catch (error) {
      console.error("Failed to add question", error);
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      await api.practice.toggleStatus(id);
      setQuestions(questions.map(q => 
        q.id === id ? { ...q, status: q.status === 'done' ? 'todo' : 'done' } : q
      ));
    } catch (error) {
      console.error("Failed to toggle status", error);
    }
  };

  const filteredQuestions = questions.filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Practice Questions</h2>
          <p className="text-muted-foreground">Manage and track your coding practice problems.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Question
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
              <DialogDescription>Add a new problem to your practice list.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Question Title</Label>
                <Input 
                  id="title" 
                  value={newQuestion.title} 
                  onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})} 
                  required 
                  placeholder="e.g. Two Sum"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input 
                  id="topic" 
                  value={newQuestion.topic} 
                  onChange={(e) => setNewQuestion({...newQuestion, topic: e.target.value})} 
                  required 
                  placeholder="e.g. Arrays, DP"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select 
                  value={newQuestion.difficulty} 
                  onValueChange={(val) => setNewQuestion({...newQuestion, difficulty: val})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Add Question</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Questions</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search questions..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Status</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Difficulty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.map((q) => (
                  <TableRow key={q.id} className="hover:bg-muted/50">
                    <TableCell>
                      <button onClick={() => toggleStatus(q.id)} className="hover:opacity-80 transition-opacity">
                        {q.status === 'done' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="font-medium">{q.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{q.topic}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={q.difficulty === 'Hard' ? 'destructive' : q.difficulty === 'Medium' ? 'default' : 'secondary'}
                        className={q.difficulty === 'Medium' ? 'bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25 border-yellow-500/20' : ''}
                      >
                        {q.difficulty}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredQuestions.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                      No questions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
