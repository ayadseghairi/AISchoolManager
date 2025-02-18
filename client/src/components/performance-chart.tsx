import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { subject: "Math", grade: 85 },
  { subject: "Science", grade: 78 },
  { subject: "History", grade: 92 },
  { subject: "English", grade: 88 },
];

export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="grade" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
