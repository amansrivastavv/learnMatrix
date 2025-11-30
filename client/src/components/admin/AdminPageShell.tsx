"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function AdminPageShell({ title }: { title: string }) {
  return (
    <div className="p-8 space-y-8 bg-muted/10 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">
            Manage {title.toLowerCase()} settings and data.
          </p>
        </div>
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-yellow-500" />
            Under Construction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This module is currently being built. Check back soon for updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
