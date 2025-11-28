"use client";

import { useState } from "react";
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  ArrowRight,
  Trash2,
  Edit2,
  GripVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Priority = "Low" | "Medium" | "High";
type Status = "Todo" | "In Progress" | "Done";

interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Research Next.js 14",
    description: "Look into the new server actions and partial prerendering features.",
    status: "Todo",
    priority: "High",
    dueDate: "2024-04-15"
  },
  {
    id: "2",
    title: "Build Kanban Board",
    description: "Implement a drag-and-drop kanban board for task management.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2024-04-10"
  },
  {
    id: "3",
    title: "Update Documentation",
    description: "Refresh the README and add contribution guidelines.",
    status: "Done",
    priority: "Low",
    dueDate: "2024-04-01"
  }
];

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo"
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const columns: Status[] = ["Todo", "In Progress", "Done"];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;

    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title,
      description: newTask.description || "",
      priority: (newTask.priority as Priority) || "Medium",
      status: (newTask.status as Status) || "Todo",
      dueDate: new Date().toISOString().split('T')[0] // Default to today
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", priority: "Medium", status: "Todo" });
    setIsDialogOpen(false);
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !editingTask.title) return;

    setTasks(tasks.map(t => t.id === editingTask.id ? editingTask : t));
    setEditingTask(null);
    setIsDialogOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleMoveTask = (id: string, newStatus: Status) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "Medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Low": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  return (
    <div className="h-full flex flex-col space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Board</h2>
          <p className="text-muted-foreground">Manage your tasks and track progress.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingTask(null);
        }}>
          <DialogTrigger asChild>
            <Button className="shadow-md hover:shadow-lg transition-all">
              <Plus className="mr-2 h-4 w-4" /> New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingTask ? "Edit Task" : "Create New Task"}</DialogTitle>
              <DialogDescription>
                {editingTask ? "Make changes to your task here." : "Add a new task to your board."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={editingTask ? handleUpdateTask : handleAddTask} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={editingTask ? editingTask.title : newTask.title} 
                  onChange={(e) => editingTask 
                    ? setEditingTask({...editingTask, title: e.target.value})
                    : setNewTask({...newTask, title: e.target.value})
                  }
                  placeholder="e.g. Redesign Homepage"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={editingTask ? editingTask.description : newTask.description} 
                  onChange={(e) => editingTask 
                    ? setEditingTask({...editingTask, description: e.target.value})
                    : setNewTask({...newTask, description: e.target.value})
                  }
                  placeholder="Add details about this task..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={editingTask ? editingTask.priority : newTask.priority} 
                    onValueChange={(val: Priority) => editingTask 
                      ? setEditingTask({...editingTask, priority: val})
                      : setNewTask({...newTask, priority: val})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={editingTask ? editingTask.status : newTask.status} 
                    onValueChange={(val: Status) => editingTask 
                      ? setEditingTask({...editingTask, status: val})
                      : setNewTask({...newTask, status: val})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todo">Todo</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingTask ? "Save Changes" : "Create Task"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-auto pb-4">
        {columns.map((column) => (
          <div key={column} className="flex flex-col space-y-4 min-w-full md:min-w-[300px]">
            <div className="flex items-center justify-between p-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{column}</h3>
                <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">
                  {tasks.filter(t => t.status === column).length}
                </Badge>
              </div>
            </div>
            
            <div className={cn(
              "flex-1 rounded-xl border bg-muted/30 p-4 space-y-4 transition-colors",
              "hover:bg-muted/50"
            )}>
              {tasks.filter(t => t.status === column).map((task) => (
                <Card key={task.id} className="group cursor-grab active:cursor-grabbing hover:shadow-md transition-all border-l-4" style={{
                  borderLeftColor: task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#eab308' : '#3b82f6'
                }}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {task.title}
                      </h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openEditDialog(task)}>
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Move to...</DropdownMenuLabel>
                          {columns.filter(c => c !== task.status).map(c => (
                            <DropdownMenuItem key={c} onClick={() => handleMoveTask(task.id, c)}>
                              <ArrowRight className="mr-2 h-4 w-4" /> {c}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDeleteTask(task.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="outline" className={cn("text-xs font-normal", getPriorityColor(task.priority))}>
                        {task.priority}
                      </Badge>
                      {task.dueDate && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {task.dueDate}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {tasks.filter(t => t.status === column).length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-muted-foreground border-2 border-dashed rounded-lg">
                  <p className="text-sm">No tasks</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
