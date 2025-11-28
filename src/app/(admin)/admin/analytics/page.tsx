"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const roadmapData = {
  labels: ["React", "Node.js", "Python", "Java", "C++", "Go"],
  datasets: [
    {
      label: "Completed Roadmaps",
      data: [120, 90, 80, 60, 40, 30],
      backgroundColor: "rgba(99, 102, 241, 0.8)",
      borderRadius: 4,
    },
    {
      label: "In Progress",
      data: [200, 150, 120, 100, 80, 50],
      backgroundColor: "rgba(99, 102, 241, 0.3)",
      borderRadius: 4,
    },
  ],
};

const categoryData = {
  labels: ["Frontend", "Backend", "DSA", "DevOps", "Mobile", "AI/ML"],
  datasets: [
    {
      data: [35, 25, 20, 10, 5, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
      ],
      borderWidth: 0,
    },
  ],
};

const activityData = {
  labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  datasets: [
    {
      label: "User Activity (Today)",
      data: [20, 10, 150, 400, 550, 800],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8 bg-muted/10 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Analytics</h2>
          <p className="text-muted-foreground">
            Deep dive into platform usage and trends.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Roadmap Completion vs In-Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <Bar 
                data={roadmapData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                      grid: { display: false }
                    }
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full flex items-center justify-center">
              <Doughnut 
                data={categoryData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Real-time User Activity (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <Line 
              data={activityData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                  },
                  x: {
                    grid: { display: false }
                  }
                }
              }} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
