import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./components/ui/sidebar";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { AppSidebar } from "./components/layout/AppSidebar";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Interview from "./pages/Interview";
import Battle from "./pages/Battle";
import QuestionDetail from "./pages/QuestionDetail";
import Assessment from "./pages/Assessment";
import Auth from "./pages/Auth";
import FacultyDashboard from "./pages/FacultyDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute allowFaculty={true} allowStudent={true}>
                <Dashboard />
              </ProtectedRoute>
            } />
            {/* Student-only routes - Faculty cannot access */}
            <Route path="/practice" element={
              <ProtectedRoute allowFaculty={false} allowStudent={true}>
                <Practice />
              </ProtectedRoute>
            } />
            <Route path="/interview" element={
              <ProtectedRoute allowFaculty={false} allowStudent={true}>
                <Interview />
              </ProtectedRoute>
            } />
            <Route path="/battle" element={
              <ProtectedRoute allowFaculty={false} allowStudent={true}>
                <Battle />
              </ProtectedRoute>
            } />
            <Route path="/question-detail" element={
              <ProtectedRoute allowFaculty={false} allowStudent={true}>
                <QuestionDetail />
              </ProtectedRoute>
            } />
            <Route path="/assessment" element={
              <ProtectedRoute allowFaculty={false} allowStudent={true}>
                <Assessment />
              </ProtectedRoute>
            } />
            {/* Faculty-only route */}
            <Route path="/faculty-dashboard" element={
              <ProtectedRoute allowFaculty={true} allowStudent={false}>
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
