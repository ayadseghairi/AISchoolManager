import { useAuth } from "@/hooks/use-auth";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { UserManagementTable } from "@/components/user-management-table";
import { AddUserForm } from "@/components/add-user-form";

export default function SettingsPage() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You don't have permission to access this page.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-6">
          <h1 className="text-2xl font-bold">Settings</h1>

          <div className="grid gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Add New User</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <AddUserForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
              </CardHeader>
              <CardContent>
                <UserManagementTable />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
