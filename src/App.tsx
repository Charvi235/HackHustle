import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext"; 
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Practice from "@/pages/Practice";
import Interview from "@/pages/Interview";
import Battle from "@/pages/Battle";
import QuestionDetail from "@/pages/QuestionDetail";
import Assessment from "@/pages/Assessment";
import Auth from "@/pages/Auth";
import FacultyDashboard from "@/pages/FacultyDashboard";
import FacultyDoubts from "@/pages/FacultyDoubts";
import FacultyStudents from "@/pages/FacultyStudents";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import TeacherProfile from "./pages/TeacherProfile";
import Doubts from "./pages/Doubts";
const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isPublicPage = location.pathname === '/auth';
return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Render sidebar only if user is logged in and not on public page */}
        {isAuthenticated && !isPublicPage && <AppSidebar />}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={
                <ProtectedRoute allowFaculty={true} allowStudent={true}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              {/* Student-only routes */}
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
              {/* Student Routes ke beech mein kahin bhi daal do */}
<Route 
  path="/doubts" 
  element={
    <ProtectedRoute>
      <Doubts />
    </ProtectedRoute>
  } 
/>
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
              {/* Faculty-only routes */}
              <Route path="/faculty-dashboard" element={
                <ProtectedRoute allowFaculty={true} allowStudent={false}>
                  <FacultyDashboard />
                </ProtectedRoute>
              } />
              <Route path="/faculty-doubts" element={
                <ProtectedRoute allowFaculty={true} allowStudent={false}>
                  <FacultyDoubts />
                </ProtectedRoute>
              } />
              <Route path="/faculty-students" element={
                <ProtectedRoute allowFaculty={true} allowStudent={false}>
                  <FacultyStudents />
                </ProtectedRoute>
              } />
              <Route path="/teacher-profile" element={
  <ProtectedRoute allowFaculty={true} allowStudent={false}>
    <TeacherProfile />
  </ProtectedRoute>
} />
              <Route path="/profile" element={
                <ProtectedRoute allowFaculty={true} allowStudent={true}>
                  <Profile />
                </ProtectedRoute>

              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {/* Render footer only if user is logged in and not on public page */}
          {isAuthenticated && !isPublicPage && <Footer />}
        </div>
      </div>
    </SidebarProvider>
  );
};

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
