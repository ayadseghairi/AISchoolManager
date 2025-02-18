import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function AttendanceCard() {
  const attendanceRate = 85; // Example data

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={attendanceRate} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {attendanceRate}% attendance rate this semester
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
