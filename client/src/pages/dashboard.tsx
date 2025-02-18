import { useAuth } from "@/hooks/use-auth";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ScheduleCalendar } from "@/components/schedule-calendar";
import { AttendanceCard } from "@/components/attendance-card";
import { PerformanceChart } from "@/components/performance-chart";
import { AIAnalyticsCard } from "@/components/ai-analytics-card";
import { AIChat } from "@/components/ai-chat";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-6">
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ScheduleCalendar />
            <AttendanceCard />
            <PerformanceChart />
            {user?.role === "student" && <AIAnalyticsCard />}
          </div>

          <AIChat />
        </div>
      </main>
    </div>
  );
}