import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { analyzePerformance } from "@/lib/analytics-service";

export function AIAnalyticsCard() {
  const { user } = useAuth();
  
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["/api/grades", user?.id],
    queryFn: async ({ queryKey }) => {
      const grades = await fetch(`/api/grades/${queryKey[1]}`).then(res => res.json());
      return analyzePerformance(grades);
    },
    enabled: !!user && user.role === "student"
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Analytics</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!analytics) return null;

  const TrendIcon = {
    improving: TrendingUp,
    declining: TrendingDown,
    stable: Minus
  }[analytics.trend];

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Average Grade</span>
            <span className="text-lg font-semibold">{analytics.averageGrade}%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Performance Trend</span>
            <TrendIcon className="h-4 w-4" />
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Strengths</span>
            <div className="flex flex-wrap gap-2">
              {analytics.strengths.map((strength, i) => (
                <Badge key={i} variant="default">{strength}</Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Areas for Improvement</span>
            <div className="flex flex-wrap gap-2">
              {analytics.areasForImprovement.map((area, i) => (
                <Badge key={i} variant="outline">{area}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
