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
import { Loader2, Plus } from "lucide-react";
import { Grade } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

export default function GradesPage() {
  const { user } = useAuth();

  const { data: grades, isLoading } = useQuery<Grade[]>({
    queryKey: ["/api/grades", user?.id],
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getGradeVariant = (grade: number) => {
    if (grade >= 90) return "default";
    if (grade >= 80) return "secondary";
    return "destructive";
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Grades</h1>
            {user.role === "teacher" && (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Grade
              </Button>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {user.role === "student" ? "My Grades" : "Student Grades"}
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
                        <TableHead>Subject</TableHead>
                        <TableHead>Grade</TableHead>
                        {user.role === "teacher" && <TableHead>Student</TableHead>}
                        <TableHead>Comments</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grades?.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell>Mathematics</TableCell>
                          <TableCell>
                            <Badge variant={getGradeVariant(grade.grade)}>
                              {grade.grade}%
                            </Badge>
                          </TableCell>
                          {user.role === "teacher" && (
                            <TableCell>John Doe</TableCell>
                          )}
                          <TableCell>{grade.comment || "-"}</TableCell>
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