"use client";

import { useState } from "react";
import { 
  Plus, 
  Link as LinkIcon, 
  FileText, 
  Video, 
  Search, 
  ExternalLink,
  Book,
  Wrench,
  GraduationCap,
  MoreVertical,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type ResourceType = "Documentation" | "Video" | "Course" | "Tool" | "Article";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  tags: string[];
}

const initialResources: Resource[] = [
  {
    id: "1",
    title: "React Documentation",
    description: "The official documentation for React. Learn how to build user interfaces.",
    type: "Documentation",
    url: "https://react.dev",
    tags: ["Frontend", "React", "Official"]
  },
  {
    id: "2",
    title: "Next.js App Router Course",
    description: "Comprehensive guide to the new App Router in Next.js 14.",
    type: "Course",
    url: "https://nextjs.org/learn",
    tags: ["Next.js", "Fullstack", "Free"]
  },
  {
    id: "3",
    title: "Tailwind CSS",
    description: "A utility-first CSS framework for rapidly building modern websites.",
    type: "Tool",
    url: "https://tailwindcss.com",
    tags: ["CSS", "Styling", "UI"]
  },
  {
    id: "4",
    title: "TypeScript Handbook",
    description: "The official guide to learning TypeScript.",
    type: "Documentation",
    url: "https://www.typescriptlang.org/docs/",
    tags: ["TypeScript", "Language"]
  },
  {
    id: "5",
    title: "Fireship YouTube",
    description: "High-intensity code tutorials to help you build apps faster.",
    type: "Video",
    url: "https://youtube.com/@Fireship",
    tags: ["Video", "Tutorials", "News"]
  }
];

const CATEGORIES: { label: string; value: ResourceType | "All" }[] = [
  { label: "All Resources", value: "All" },
  { label: "Documentation", value: "Documentation" },
  { label: "Courses", value: "Course" },
  { label: "Videos", value: "Video" },
  { label: "Tools", value: "Tool" },
];

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ResourceType | "All">("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newResource, setNewResource] = useState<Partial<Resource>>({
    title: "",
    description: "",
    type: "Documentation",
    url: "",
    tags: []
  });
  const [tagInput, setTagInput] = useState("");

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "All" || resource.type === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    const resource: Resource = {
      id: Math.random().toString(36).substr(2, 9),
      title: newResource.title || "Untitled",
      description: newResource.description || "",
      type: (newResource.type as ResourceType) || "Documentation",
      url: newResource.url || "#",
      tags: newResource.tags || []
    };
    setResources([resource, ...resources]);
    setNewResource({ title: "", description: "", type: "Documentation", url: "", tags: [] });
    setIsDialogOpen(false);
  };

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const getIcon = (type: ResourceType) => {
    switch (type) {
      case "Documentation": return <FileText className="h-5 w-5 text-blue-500" />;
      case "Video": return <Video className="h-5 w-5 text-red-500" />;
      case "Course": return <GraduationCap className="h-5 w-5 text-emerald-500" />;
      case "Tool": return <Wrench className="h-5 w-5 text-orange-500" />;
      case "Article": return <Book className="h-5 w-5 text-purple-500" />;
      default: return <LinkIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Learning Resources</h2>
          <p className="text-muted-foreground">Curated collection of tools, guides, and tutorials.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-md hover:shadow-lg transition-all">
              <Plus className="mr-2 h-4 w-4" /> Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>Share a helpful link with your future self.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddResource} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={newResource.title} 
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})} 
                  required 
                  placeholder="e.g. React Documentation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input 
                  id="url" 
                  value={newResource.url} 
                  onChange={(e) => setNewResource({...newResource, url: e.target.value})} 
                  required 
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={newResource.type} 
                  onValueChange={(val) => setNewResource({...newResource, type: val as ResourceType})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Documentation">Documentation</SelectItem>
                    <SelectItem value="Course">Course</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="Tool">Tool</SelectItem>
                    <SelectItem value="Article">Article</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  value={newResource.description} 
                  onChange={(e) => setNewResource({...newResource, description: e.target.value})} 
                  placeholder="Brief description..."
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add Resource</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Custom Tabs */}
        <div className="flex p-1 bg-muted rounded-lg overflow-x-auto max-w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap",
                activeCategory === cat.value 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search resources..." 
            className="pl-9 bg-background/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm hover:-translate-y-1">
            <CardHeader className="space-y-1">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-secondary/50 group-hover:bg-secondary transition-colors">
                  {getIcon(resource.type)}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteResource(resource.id)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="line-clamp-1 flex items-center gap-2">
                {resource.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {resource.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {resource.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="font-normal text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" className="w-full group/btn" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  Visit Resource 
                  <ExternalLink className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium">No resources found</h3>
          <p>Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
}
