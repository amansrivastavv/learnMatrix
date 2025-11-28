"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Zap, Trophy, TrendingUp, Activity } from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const widgets = [
  {
    title: "Total Users",
    value: "1,234",
    icon: Users,
    description: "+12% from last month",
    color: "text-blue-500",
  },
  {
    title: "Active Today",
    value: "432",
    icon: Activity,
    description: "35% of total users",
    color: "text-green-500",
  },
  {
    title: "Study Hours",
    value: "12,450",
    icon: Clock,
    description: "Total time spent learning",
    color: "text-orange-500",
  },
  {
    title: "Questions Solved",
    value: "8,921",
    icon: Zap,
    description: "DSA & Quiz questions",
    color: "text-yellow-500",
  },
];

const lineChartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Active Users",
      data: [120, 190, 300, 500, 200, 300, 450],
      borderColor: "rgb(99, 102, 241)",
      backgroundColor: "rgba(99, 102, 241, 0.5)",
      tension: 0.4,
    },
    {
      label: "New Registrations",
      data: [20, 30, 45, 60, 40, 50, 80],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.5)",
      tension: 0.4,
    },
  ],
};

const barChartData = {
  labels: ["AI", "Web Dev", "DSA", "DevOps", "Mobile", "Data Science"],
  datasets: [
    {
      label: "Roadmaps Generated",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
      ],
      borderRadius: 4,
    },
  ],
};

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8 bg-muted/10 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">System Operational</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {widgets.map((widget, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {widget.title}
              </CardTitle>
              <widget.icon className={`h-4 w-4 ${widget.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{widget.value}</div>
              <p className="text-xs text-muted-foreground">
                {widget.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User Growth & Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <Line 
                data={lineChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <Bar 
                data={barChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { user: "Aman Gupta", action: "Created a new roadmap", time: "2 min ago" },
                { user: "Rohan Kumar", action: "Completed React Module", time: "15 min ago" },
                { user: "System", action: "Daily backup completed", time: "1 hour ago" },
                { user: "Sarah Smith", action: "Joined the platform", time: "2 hours ago" },
              ].map((log, i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{log.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {log.action}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground">{log.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="p-2 rounded-full bg-red-500/20 text-red-500">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-500">High Drop-off Rate</h4>
                  <p className="text-sm text-muted-foreground">Users are struggling with the "Advanced Redux" module in the React Roadmap.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="p-2 rounded-full bg-green-500/20 text-green-500">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-500">Engagement Spike</h4>
                  <p className="text-sm text-muted-foreground">DSA practice questions usage increased by 45% this weekend.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="p-2 rounded-full bg-blue-500/20 text-blue-500">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-500">Peak Learning Time</h4>
                  <p className="text-sm text-muted-foreground">Most users are active between 8 PM and 11 PM IST.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
