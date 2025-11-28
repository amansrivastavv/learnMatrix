"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Coffee, 
  Brain, 
  Settings, 
  BarChart2, 
  Plus, 
  CheckCircle2, 
  MoreVertical, 
  Trash2,
  Volume2,
  VolumeX
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { playSound } from "@/lib/sounds";

type TimerMode = "focus" | "shortBreak" | "longBreak";

interface Task {
  id: string;
  title: string;
  estPomodoros: number;
  actPomodoros: number;
  completed: boolean;
}

const DEFAULT_MODES = {
  focus: { label: "Focus", minutes: 25, color: "text-blue-500", bg: "bg-blue-500", ring: "stroke-blue-500" },
  shortBreak: { label: "Short Break", minutes: 5, color: "text-emerald-500", bg: "bg-emerald-500", ring: "stroke-emerald-500" },
  longBreak: { label: "Long Break", minutes: 15, color: "text-orange-500", bg: "bg-orange-500", ring: "stroke-orange-500" },
};

export default function PomodoroPage() {
  // Timer State
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_MODES.focus.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Settings State
  const [customTimes, setCustomTimes] = useState({ focus: 25, shortBreak: 5, longBreak: 15 });
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Tasks State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskEst, setNewTaskEst] = useState(1);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  // Stats State
  const [stats, setStats] = useState({ hoursFocused: 12.5, daysStreak: 5 });

  const totalTime = customTimes[mode] * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (soundEnabled) {
        playSound('success');
      }
      // If focusing on a task, increment actual pomodoros
      if (mode === 'focus' && activeTaskId) {
        setTasks(prev => prev.map(t => t.id === activeTaskId ? { ...t, actPomodoros: t.actPomodoros + 1 } : t));
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, mode, activeTaskId, soundEnabled]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(customTimes[mode] * 60);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(customTimes[newMode] * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      estPomodoros: newTaskEst,
      actPomodoros: 0,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTaskTitle("");
    setNewTaskEst(1);
    setIsTaskFormOpen(false);
    if (!activeTaskId) setActiveTaskId(task.id);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    if (activeTaskId === id) setActiveTaskId(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8 animate-fade-in-up space-y-12 max-w-4xl mx-auto">
      
      {/* Timer Section */}
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 transition-colors duration-700",
            DEFAULT_MODES[mode].bg
          )} />
        </div>

        <Card className="w-full max-w-md border-border/50 shadow-2xl backdrop-blur-xl bg-card/60">
          <CardContent className="p-8 flex flex-col items-center space-y-8">
            
            {/* Header Controls */}
            <div className="w-full flex justify-between items-center">
               <div className="flex gap-2">
                 <Dialog>
                   <DialogTrigger asChild>
                     <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                       <Settings className="h-4 w-4 mr-2" /> Settings
                     </Button>
                   </DialogTrigger>
                   <DialogContent>
                     <DialogHeader>
                       <DialogTitle>Timer Settings</DialogTitle>
                       <DialogDescription>Customize your focus sessions.</DialogDescription>
                     </DialogHeader>
                     <div className="space-y-4 py-4">
                       <div className="grid grid-cols-3 gap-4">
                         <div className="space-y-2">
                           <Label>Focus</Label>
                           <Input 
                             type="number" 
                             value={customTimes.focus} 
                             onChange={(e) => setCustomTimes({...customTimes, focus: parseInt(e.target.value) || 25})}
                           />
                         </div>
                         <div className="space-y-2">
                           <Label>Short Break</Label>
                           <Input 
                             type="number" 
                             value={customTimes.shortBreak} 
                             onChange={(e) => setCustomTimes({...customTimes, shortBreak: parseInt(e.target.value) || 5})}
                           />
                         </div>
                         <div className="space-y-2">
                           <Label>Long Break</Label>
                           <Input 
                             type="number" 
                             value={customTimes.longBreak} 
                             onChange={(e) => setCustomTimes({...customTimes, longBreak: parseInt(e.target.value) || 15})}
                           />
                         </div>
                       </div>
                       <div className="flex items-center justify-between">
                         <Label>Sound Notifications</Label>
                         <Button variant="outline" size="icon" onClick={() => setSoundEnabled(!soundEnabled)}>
                           {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                         </Button>
                       </div>
                     </div>
                   </DialogContent>
                 </Dialog>
                 <Dialog>
                   <DialogTrigger asChild>
                     <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                       <BarChart2 className="h-4 w-4 mr-2" /> Report
                     </Button>
                   </DialogTrigger>
                   <DialogContent>
                     <DialogHeader>
                       <DialogTitle>Activity Report</DialogTitle>
                     </DialogHeader>
                     <div className="grid grid-cols-2 gap-4 py-4">
                       <Card>
                         <CardContent className="p-6 flex flex-col items-center justify-center">
                           <div className="text-3xl font-bold text-primary">{stats.hoursFocused}</div>
                           <div className="text-sm text-muted-foreground">Hours Focused</div>
                         </CardContent>
                       </Card>
                       <Card>
                         <CardContent className="p-6 flex flex-col items-center justify-center">
                           <div className="text-3xl font-bold text-orange-500">{stats.daysStreak}</div>
                           <div className="text-sm text-muted-foreground">Day Streak</div>
                         </CardContent>
                       </Card>
                     </div>
                   </DialogContent>
                 </Dialog>
               </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex p-1 bg-muted/50 rounded-full w-full">
              {(Object.keys(DEFAULT_MODES) as TimerMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={cn(
                    "flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300",
                    mode === m 
                      ? "bg-background shadow-sm text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {DEFAULT_MODES[m].label}
                </button>
              ))}
            </div>

            {/* Timer Display */}
            <div className="relative">
              <svg className="transform -rotate-90 w-72 h-72">
                <circle cx="144" cy="144" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                <circle cx="144" cy="144" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className={cn("transition-all duration-1000 ease-linear", DEFAULT_MODES[mode].color)} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={cn("text-6xl font-bold font-mono tracking-tighter transition-colors duration-300", DEFAULT_MODES[mode].color)}>
                  {formatTime(timeLeft)}
                </div>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground font-medium">
                  {mode === 'focus' ? <Brain className="h-4 w-4" /> : <Coffee className="h-4 w-4" />}
                  <span className="uppercase tracking-widest text-xs">{isActive ? "RUNNING" : "PAUSED"}</span>
                </div>
              </div>
            </div>

            {/* Active Task Display */}
            <div className="text-center min-h-[3rem]">
              {activeTaskId ? (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Working on</p>
                  <p className="font-medium text-lg">{tasks.find(t => t.id === activeTaskId)?.title}</p>
                </div>
              ) : (
                <p className="text-muted-foreground italic">Select a task to focus on</p>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 w-full">
              <Button 
                size="lg" 
                className={cn(
                  "flex-1 h-14 text-lg font-semibold shadow-lg transition-all hover:scale-105",
                  isActive ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : DEFAULT_MODES[mode].bg
                )}
                onClick={toggleTimer}
              >
                {isActive ? <><Pause className="mr-2 h-5 w-5" /> Pause</> : <><Play className="mr-2 h-5 w-5" /> Start</>}
              </Button>
              <Button size="icon" variant="outline" className="h-14 w-14 rounded-xl border-2 hover:bg-muted" onClick={resetTimer}>
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Tasks Section */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Tasks</h3>
          <Button onClick={() => setIsTaskFormOpen(!isTaskFormOpen)} variant="secondary">
            <Plus className="h-4 w-4 mr-2" /> Add Task
          </Button>
        </div>

        {isTaskFormOpen && (
          <Card className="animate-in slide-in-from-top-4">
            <CardContent className="p-4 space-y-4">
              <Input 
                placeholder="What are you working on?" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label>Est Pomodoros</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="10" 
                    className="w-20" 
                    value={newTaskEst}
                    onChange={(e) => setNewTaskEst(parseInt(e.target.value))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setIsTaskFormOpen(false)}>Cancel</Button>
                  <Button onClick={addTask} disabled={!newTaskTitle}>Save</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => setActiveTaskId(task.id)}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md",
                activeTaskId === task.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card",
                task.completed && "opacity-60"
              )}
            >
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleTaskComplete(task.id); }}
                  className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors", task.completed ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground")}
                >
                  {task.completed && <CheckCircle2 className="h-4 w-4" />}
                </button>
                <span className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>{task.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground font-mono">
                  {task.actPomodoros} / <span className="text-foreground">{task.estPomodoros}</span>
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {tasks.length === 0 && !isTaskFormOpen && (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
              <p>No tasks yet. Add one to get started!</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-3xl mx-auto prose prose-zinc dark:prose-invert">
        <h2 className="text-3xl font-bold">An online Pomodoro Timer to boost your productivity</h2>
        
        <h3>What is Pomofocus?</h3>
        <p>Pomofocus is a customizable pomodoro timer that works on desktop & mobile browser. The aim of this app is to help you focus on any task you are working on, such as study, writing, or coding. This app is inspired by Pomodoro Technique which is a time management method developed by Francesco Cirillo.</p>
        
        <h3>What is Pomodoro Technique?</h3>
        <p>The Pomodoro Technique is created by Francesco Cirillo for a more productive way to work and study. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student.</p>
        
        <h3>How to use the Pomodoro Timer?</h3>
        <ol>
          <li><strong>Add tasks</strong> to work on today</li>
          <li><strong>Set estimate pomodoros</strong> (1 = 25min of work) for each tasks</li>
          <li><strong>Select a task</strong> to work on</li>
          <li><strong>Start timer</strong> and focus on the task for 25 minutes</li>
          <li><strong>Take a break</strong> for 5 minutes when the alarm ring</li>
          <li><strong>Iterate 3-5 times</strong> until you finish the tasks</li>
        </ol>
      </div>
    </div>
  );
}
