"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Search, Filter, Shield, Ban, Lock, Edit } from "lucide-react";

// Mock Data
const users = [
  {
    id: "1",
    name: "Aman Gupta",
    email: "aman@example.com",
    role: "Admin",
    status: "Active",
    hours: 120,
    streak: 45,
    lastActive: "2 mins ago",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Rohan Kumar",
    email: "rohan@example.com",
    role: "User",
    status: "Active",
    hours: 45,
    streak: 12,
    lastActive: "1 hour ago",
    avatar: "",
  },
  {
    id: "3",
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "Moderator",
    status: "Active",
    hours: 89,
    streak: 30,
    lastActive: "5 hours ago",
    avatar: "",
  },
  {
    id: "4",
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Inactive",
    hours: 12,
    streak: 0,
    lastActive: "3 days ago",
    avatar: "",
  },
  {
    id: "5",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
    status: "Active",
    hours: 67,
    streak: 21,
    lastActive: "1 day ago",
    avatar: "",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-8 space-y-8 bg-muted/10 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage your users, roles, and account statuses.
          </p>
        </div>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={roleFilter === "All" ? "default" : "outline"}
            onClick={() => setRoleFilter("All")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={roleFilter === "Admin" ? "default" : "outline"}
            onClick={() => setRoleFilter("Admin")}
            size="sm"
          >
            Admins
          </Button>
          <Button
            variant={roleFilter === "User" ? "default" : "outline"}
            onClick={() => setRoleFilter("User")}
            size="sm"
          >
            Users
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Study Hours</TableHead>
              <TableHead>Streak</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.status === "Active"
                        ? "text-green-500 border-green-500/20 bg-green-500/10"
                        : "text-red-500 border-red-500/20 bg-red-500/10"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.hours}h</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{user.streak}</span>
                    <span className="text-orange-500">🔥</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Lock className="mr-2 h-4 w-4" />
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Ban className="mr-2 h-4 w-4" />
                        Deactivate User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
