import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "wouter";
import {
  Calendar,
  UserCircle,
  Book,
  GraduationCap,
  LogOut,
  Settings,
  BookOpen,
} from "lucide-react";

export function DashboardSidebar() {
  const { user, logoutMutation } = useAuth();
  const [location, setLocation] = useLocation();

  const menuItems = [
    { icon: Calendar, label: "Schedule", path: "/", show: ["admin", "teacher", "student"] },
    { icon: UserCircle, label: "Profile", path: "/profile", show: ["admin", "teacher", "student"] },
    { icon: Book, label: "Classes", path: "/classes", show: ["admin", "teacher", "student"] },
    { icon: GraduationCap, label: "Grades", path: "/grades", show: ["teacher", "student"] },
    { icon: BookOpen, label: "Articles", path: "/articles", show: ["teacher", "student"] },
    { icon: Settings, label: "Settings", path: "/settings", show: ["admin"] },
  ].filter((item) => item.show.includes(user?.role || ""));

  return (
    <div className="w-64 border-r bg-sidebar">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            School MS
          </h2>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant={location === item.path ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setLocation(item.path)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="p-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}