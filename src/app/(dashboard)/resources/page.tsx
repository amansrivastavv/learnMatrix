
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Link as LinkIcon, FileText, Video } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      id: 1,
      title: "React Documentation",
      type: "Documentation",
      url: "https://react.dev",
      icon: FileText,
      color: "text-blue-500"
    },
    {
      id: 2,
      title: "Next.js Course",
      type: "Video",
      url: "https://youtube.com",
      icon: Video,
      color: "text-red-500"
    },
    {
      id: 3,
      title: "Tailwind CSS Cheatsheet",
      type: "Tool",
      url: "https://tailwindcss.com",
      icon: LinkIcon,
      color: "text-cyan-500"
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Resources</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className={`p-2 rounded-full bg-secondary ${resource.color} bg-opacity-10`}>
                <resource.icon className={`h-4 w-4 ${resource.color}`} />
              </div>
              <div className="ml-4">
                <CardTitle className="text-base font-medium">{resource.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{resource.type}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground truncate">
                {resource.url}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
