import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import ArticlesPage from "@/pages/articles-page";
import SettingsPage from "@/pages/settings-page";
import ProfilePage from "@/pages/profile-page";
import SectionsPage from "@/pages/sections-page";
import GradesPage from "@/pages/grades-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <ProtectedRoute path="/sections" component={SectionsPage} />
      <ProtectedRoute path="/grades" component={GradesPage} />
      <ProtectedRoute path="/articles" component={ArticlesPage} />
      <ProtectedRoute path="/settings" component={SettingsPage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;