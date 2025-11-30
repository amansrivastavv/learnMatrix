"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Crown, Star, Zap, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/loader";

interface User {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  streak: number;
  rank: number;
  badges: string[];
}

const MOCK_USERS: User[] = [
  { id: "1", name: "Alex Johnson", points: 12500, streak: 45, rank: 1, badges: ["React Master", "Bug Hunter"] },
  { id: "2", name: "Sarah Smith", points: 11200, streak: 32, rank: 2, badges: ["Design Guru"] },
  { id: "3", name: "Mike Chen", points: 10800, streak: 28, rank: 3, badges: ["Fast Coder"] },
  { id: "4", name: "Emma Wilson", points: 9500, streak: 15, rank: 4, badges: [] },
  { id: "5", name: "David Brown", points: 8900, streak: 12, rank: 5, badges: [] },
];

const ACHIEVEMENTS = [
  { id: 1, title: "7 Day Streak", description: "Study for 7 days in a row", icon: Flame, color: "text-orange-500", progress: 100 },
  { id: 2, title: "Problem Solver", description: "Solve 50 practice questions", icon: Target, color: "text-blue-500", progress: 85 },
  { id: 3, title: "Early Bird", description: "Complete a session before 8 AM", icon: Zap, color: "text-yellow-500", progress: 40 },
  { id: 4, title: "Master Mind", description: "Complete an entire roadmap", icon: Crown, color: "text-purple-500", progress: 20 },
];

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader variant="fullscreen" />;

  return (
    <div className="p-8 space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" /> Leaderboard
          </h2>
          <p className="text-muted-foreground">Compete with others and track your achievements.</p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg">
          <span className="text-sm font-medium">Your Rank:</span>
          <Badge variant="default" className="bg-primary text-primary-foreground">#42</Badge>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Top Learners Column */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-lg overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle>Top Learners</CardTitle>
              <CardDescription>This week's highest performers</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {users.map((user) => (
                  <div 
                    key={user.id} 
                    className={cn(
                      "flex items-center p-4 hover:bg-muted/50 transition-colors",
                      user.rank <= 3 ? "bg-gradient-to-r from-transparent via-transparent to-transparent" : ""
                    )}
                  >
                    <div className="w-12 flex justify-center font-bold text-lg text-muted-foreground">
                      {user.rank === 1 && <Crown className="h-6 w-6 text-yellow-500 animate-bounce" />}
                      {user.rank === 2 && <Medal className="h-6 w-6 text-gray-400" />}
                      {user.rank === 3 && <Medal className="h-6 w-6 text-amber-600" />}
                      {user.rank > 3 && `#${user.rank}`}
                    </div>
                    
                    <Avatar className="h-10 w-10 border-2 border-background mr-4">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate flex items-center gap-2">
                        {user.name}
                        {user.badges.map(badge => (
                          <span key={badge} title={badge} className="inline-block w-2 h-2 rounded-full bg-primary" />
                        ))}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-500" /> {user.streak} day streak
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-primary">{user.points.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Column */}
        <div className="space-y-6">
          <Card className="h-full border-border/50 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" /> Achievements
              </CardTitle>
              <CardDescription>Unlock badges by learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {ACHIEVEMENTS.map((achievement) => (
                <div key={achievement.id} className="group relative">
                  <div className="flex items-start gap-4 mb-2">
                    <div className={cn("p-2 rounded-lg bg-muted group-hover:scale-110 transition-transform duration-300", achievement.color.replace('text-', 'bg-').replace('500', '500/10'))}>
                      <achievement.icon className={cn("h-5 w-5", achievement.color)} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-1000 ease-out", achievement.progress === 100 ? "bg-green-500" : "bg-primary")} 
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                  {achievement.progress === 100 && (
                    <div className="absolute top-0 right-0">
                      <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
