"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { StudyHoursChart } from "@/components/features/StudyHoursChart";
import { TopicsDistributionChart } from "@/components/features/TopicsDistributionChart";

export default function ProgressPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.progress.getData();
        setData(res);
      } catch (error) {
        console.error("Failed to load progress data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <Loader variant="fullscreen" />;

  return (
    <div className="p-8 space-y-8 animate-fade-in-up">
      <h2 className="text-3xl font-bold tracking-tight">Learning Progress</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Study Hours (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <StudyHoursChart data={data?.studyHours || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Topic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <TopicsDistributionChart data={data?.topicsDistribution || {}} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
