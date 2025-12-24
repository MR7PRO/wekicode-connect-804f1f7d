import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/components/notifications/NotificationSystem";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AIChatBot } from "@/components/ai/AIChatBot";
import Index from "./pages/Index";
import Questions from "./pages/Questions";
import QuestionDetail from "./pages/QuestionDetail";
import Jobs from "./pages/Jobs";
import Courses from "./pages/Courses";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Billing from "./pages/Billing";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/questions/:id" element={<QuestionDetail />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              {/* Protected Routes - require authentication */}
              <Route element={<ProtectedRoute />}>
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AIChatBot />
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
