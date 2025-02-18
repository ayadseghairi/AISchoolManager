import { useAuth } from "@/hooks/use-auth";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserCircle, Mail, BookOpen, GraduationCap } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const roleVariant = 
    user.role === "admin" 
      ? "default" 
      : user.role === "teacher" 
        ? "secondary" 
        : "outline";

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-6">
          <h1 className="text-2xl font-bold">Profile</h1>

          <div className="grid gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    <UserCircle className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <Badge variant={roleVariant} className="mt-1">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{user.username}</span>
                </div>

                {user.role === "student" && (
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Enrolled Classes: 4</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>Current GPA: 3.8</span>
                    </div>
                  </div>
                )}

                {user.role === "teacher" && (
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Classes Teaching: 3</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>Students: 87</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}