"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/ui/loader";
import { 
  User, 
  MapPin, 
  Link as LinkIcon, 
  Twitter, 
  Github, 
  Linkedin, 
  Edit2, 
  Save, 
  Flame, 
  Target, 
  Clock, 
  Trophy,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Heatmap
const generateHeatmapData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5), // 0-4 intensity
    });
  }
  return data.reverse();
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [heatmapData, setHeatmapData] = useState<any[]>([]);
  const [profile, setProfile] = useState({
    name: "Aman Gupta",
    role: "Full Stack Developer",
    bio: "Passionate about building beautiful UIs and scalable backends. Learning Next.js and AI integration.",
    location: "New Delhi, India",
    website: "https://aman.dev",
    github: "github.com/aman",
    twitter: "twitter.com/aman",
    linkedin: "linkedin.com/in/aman",
    avatar: "https://github.com/shadcn.png"
  });

  useEffect(() => {
    // Simulate API load
    const timer = setTimeout(() => {
      setHeatmapData(generateHeatmapData());
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 800);
  };

  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-muted/50";
    if (count === 1) return "bg-emerald-200 dark:bg-emerald-900/50";
    if (count === 2) return "bg-emerald-300 dark:bg-emerald-800";
    if (count === 3) return "bg-emerald-400 dark:bg-emerald-600";
    return "bg-emerald-500 dark:bg-emerald-500";
  };

  if (loading && !heatmapData.length) return <Loader variant="fullscreen" />;

  return (
    <div className="p-8 space-y-8 animate-fade-in-up">
      {/* Header / Cover */}
      <div className="relative h-48 rounded-2xl bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 border border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            className="backdrop-blur-md bg-background/30 hover:bg-background/50 border border-white/10"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit2 className="h-4 w-4 mr-2" />}
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-20 relative z-10">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/80">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="relative inline-block">
                <Avatar className="h-32 w-32 border-4 border-background shadow-2xl">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>AG</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-green-500 border-4 border-background" title="Online" />
              </div>
              
              <div className="space-y-2">
                {isEditing ? (
                  <Input 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="text-center text-2xl font-bold h-auto py-1"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                )}
                
                {isEditing ? (
                  <Input 
                    value={profile.role} 
                    onChange={(e) => setProfile({...profile, role: e.target.value})}
                    className="text-center text-muted-foreground h-auto py-1"
                  />
                ) : (
                  <p className="text-muted-foreground font-medium">{profile.role}</p>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-violet-500/10 text-violet-500 hover:bg-violet-500/20">PRO Member</Badge>
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Level 42</Badge>
              </div>

              <div className="pt-4 space-y-3 text-sm text-left">
                {isEditing ? (
                  <Textarea 
                    value={profile.bio} 
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                )}
                
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {isEditing ? (
                      <Input 
                        value={profile.location} 
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        className="h-8"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <LinkIcon className="h-4 w-4" />
                    <a href={profile.website} className="hover:text-primary transition-colors">{profile.website}</a>
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <Button variant="ghost" size="icon" className="hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10">
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-white hover:bg-black/10 dark:hover:bg-white/10">
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-[#0A66C2] hover:bg-[#0A66C2]/10">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Stats & Heatmap */}
        <div className="lg:col-span-2 space-y-6 pt-20">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
                <Flame className="h-8 w-8 text-orange-500 mb-2" />
                <div className="text-2xl font-bold">45</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Day Streak</div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
                <Clock className="h-8 w-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold">128h</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Study</div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
                <Target className="h-8 w-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold">342</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Questions</div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
                <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                <div className="text-2xl font-bold">#42</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Global Rank</div>
              </CardContent>
            </Card>
          </div>

          {/* Heatmap Card */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Learning Activity
              </CardTitle>
              <CardDescription>365 days of consistency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 justify-center">
                {heatmapData.map((day, i) => (
                  <div 
                    key={i}
                    title={`${day.date}: ${day.count} activities`}
                    className={cn(
                      "w-3 h-3 rounded-sm transition-all hover:scale-125 hover:ring-2 ring-offset-1 ring-offset-background ring-primary/50",
                      getIntensityColor(day.count)
                    )}
                  />
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-muted/50" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-200 dark:bg-emerald-900/50" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-300 dark:bg-emerald-800" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-400 dark:bg-emerald-600" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-500 dark:bg-emerald-500" />
                </div>
                <span>More</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
