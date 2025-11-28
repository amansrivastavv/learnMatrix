"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { Activity, Clock, Flame, BookOpen, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { StudyHoursChart } from "@/components/features/StudyHoursChart";
import { TopicsDistributionChart } from "@/components/features/TopicsDistributionChart";
import QuestionsProgressChart from "@/components/features/QuestionsProgressChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [progressData, setProgressData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, activityData, progressRes] = await Promise.all([
          api.dashboard.getStats(),
          api.dashboard.getRecentActivity(),
          api.progress.getData()
        ]);
        setStats(statsData);
        setActivity(activityData);
        setProgressData(progressRes);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader variant="fullscreen" />;
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your learning progress and activity.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/daily">New Entry</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.streak || 0} Days</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalHours || 0}h</div>
            <p className="text-xs text-muted-foreground">Study time</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Solved</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.questionsSolved || 0}</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics Covered</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.topicsCovered || 0}</div>
            <p className="text-xs text-muted-foreground">Active topics</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Study Hours</CardTitle>
            <CardDescription>Weekly breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <StudyHoursChart data={progressData?.studyHours || []} />
          </CardContent>
        </Card>
        <Card className="col-span-1 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Topic Distribution</CardTitle>
            <CardDescription>Focus areas</CardDescription>
          </CardHeader>
          <CardContent>
            <TopicsDistributionChart data={progressData?.topicsDistribution || {}} />
          </CardContent>
        </Card>
        <Card className="col-span-1 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Questions Progress</CardTitle>
            <CardDescription>Completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <QuestionsProgressChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 md:col-span-2 lg:col-span-4 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {activity.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type.toUpperCase()} • {formatDate(item.date)}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {/* Add value or status if available */}
                  </div>
                </div>
              ))}
              {activity.length === 0 && <p className="text-sm text-muted-foreground">No recent activity.</p>}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
             <Link href="/daily" className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer group">
                <span className="text-sm font-medium">Start a Daily Entry</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
             </Link>
             <Link href="/practice" className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer group">
                <span className="text-sm font-medium">Practice a Random Question</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
             </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
