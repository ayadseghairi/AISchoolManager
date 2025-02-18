import { useAuth } from "@/hooks/use-auth";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { Class } from "@shared/schema";

export default function SectionsPage() {
  const { user } = useAuth();

  const { data: classes, isLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Classes</h1>
            {user.role === "admin" && (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Class
              </Button>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {user.role === "student"
                  ? "Enrolled Classes"
                  : user.role === "teacher"
                  ? "Teaching Schedule"
                  : "All Classes"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class Name</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Teacher</TableHead>
                        {user.role !== "student" && <TableHead>Students</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classes?.map((class_) => (
                        <TableRow key={class_.id}>
                          <TableCell>{class_.name}</TableCell>
                          <TableCell>{class_.schedule}</TableCell>
                          <TableCell>Dr. Smith</TableCell>
                          {user.role !== "student" && (
                            <TableCell>25 Students</TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}