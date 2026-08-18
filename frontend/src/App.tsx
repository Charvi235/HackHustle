// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";
// import { AppSidebar } from "@/components/layout/AppSidebar";
// import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
// import { useAuth } from "@/contexts/AuthContext"; 
// import Index from "@/pages/Index";
// import Dashboard from "@/pages/Dashboard";
// import Practice from "@/pages/Practice";
// import Interview from "@/pages/Interview";
// import Battle from "@/pages/Battle";
// import QuestionDetail from "@/pages/QuestionDetail";
// import Assessment from "@/pages/Assessment";
// import Auth from "@/pages/Auth";
// import FacultyDashboard from "@/pages/FacultyDashboard";
// import FacultyDoubts from "@/pages/FacultyDoubts";
// import FacultyStudents from "@/pages/FacultyStudents";
// import Profile from "@/pages/Profile";
// import NotFound from "@/pages/NotFound";
// import TeacherProfile from "./pages/TeacherProfile";
// import Doubts from "./pages/Doubts";
// import { AdminDashboard } from './pages/admin/AdminDashboard';
// import { ManageSubjects } from './pages/admin/ManageSubjects';

// import { ManageTopics } from './pages/admin/ManageTopics';
// import { ManageQuestions } from './pages/admin/ManageQuestions';
// import { ManageStudents } from './pages/admin/ManageStudents';

// import { ManageTeachers } from './pages/admin/ManageTeachers';

// const queryClient = new QueryClient();

// const AppContent = () => {
//   const location = useLocation();
//   const { isAuthenticated } = useAuth();
//   const isPublicPage = location.pathname === '/auth';
// return (
//     <SidebarProvider>
//       <div className="min-h-screen flex w-full">
//         {/* sidebar only if user is logged in and not on public page */}
//         {isAuthenticated && !isPublicPage && <AppSidebar />}
//         <div className="flex-1 flex flex-col">
//           <Header />
//           <main className="flex-1 pt-16">
//             <Routes>
//               <Route path="/" element={<Index />} />
//               <Route path="/auth" element={<Auth />} />
//               <Route path="/dashboard" element={
//                 <ProtectedRoute allowFaculty={true} allowStudent={true}>
//                   <Dashboard />
//                 </ProtectedRoute>
//               } />
//               {/* Student-only routes */}
//               <Route path="/practice" element={
//                 <ProtectedRoute allowFaculty={false} allowStudent={true}>
//                   <Practice />
//                 </ProtectedRoute>
//               } />
//               <Route path="/interview" element={
//                 <ProtectedRoute allowFaculty={false} allowStudent={true}>
//                   <Interview />
//                 </ProtectedRoute>
//               } />
//               <Route path="/battle" element={
//                 <ProtectedRoute allowFaculty={false} allowStudent={true}>
//                   <Battle />
//                 </ProtectedRoute>
//               } />
//                 <Route 
//                   path="/doubts" 
//                   element={
//                     <ProtectedRoute>
//                       <Doubts />
//                     </ProtectedRoute>
//                   } 
//                 />
//               <Route path="/question-detail" element={
//                 <ProtectedRoute allowFaculty={false} allowStudent={true}>
//                   <QuestionDetail />
//                 </ProtectedRoute>
//               } />
//               <Route path="/assessment" element={
//                 <ProtectedRoute allowFaculty={false} allowStudent={true}>
//                   <Assessment />
//                 </ProtectedRoute>
//               } />
//               {/* Faculty-only routes */}
//               <Route path="/faculty-dashboard" element={
//                 <ProtectedRoute allowFaculty={true} allowStudent={false}>
//                   <FacultyDashboard />
//                 </ProtectedRoute>
//               } />
//               <Route path="/faculty-doubts" element={
//                 <ProtectedRoute allowFaculty={true} allowStudent={false}>
//                   <FacultyDoubts />
//                 </ProtectedRoute>
//               } />
//               <Route path="/faculty-students" element={
//                 <ProtectedRoute allowFaculty={true} allowStudent={false}>
//                   <FacultyStudents />
//                 </ProtectedRoute>
//               } />
//               <Route path="/teacher-profile" element={
//                 <ProtectedRoute allowFaculty={true} allowStudent={false}>
//                   <TeacherProfile />
//                 </ProtectedRoute>
//               } />
//               <Route path="/profile" element={
//                 <ProtectedRoute allowFaculty={true} allowStudent={true}>
//                   <Profile />
//                 </ProtectedRoute>

//               } />
//               <Route path="/admin-dashboard" element={<AdminDashboard />} />
//               <Route path="/admin/subjects" element={<ManageSubjects />} />
//               <Route path="/admin/subjects" element={<ManageSubjects />} />
//   <Route path="/admin/topics" element={<ManageTopics />} />
//   <Route path="/admin/questions" element={<ManageQuestions />} />
//   <Route path="/admin/students" element={<ManageStudents />} />
//   //<Route path="/admin/teachers" element={<ManageTeachers />} />
//               {/* <Route path="/admin-dashboard" element={
//   <ProtectedRoute allowAdmin={true} allowFaculty={false} allowStudent={false}>
//     <AdminDashboard />
//   </ProtectedRoute>
// } />

// <Route path="/admin/subjects" element={
//   <ProtectedRoute allowAdmin={true} allowFaculty={false} allowStudent={false}>
//     <ManageSubjects />
//   </ProtectedRoute>
// } /> */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </main>
//           {!isPublicPage && <Footer />}
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <AppContent />
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;






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

// 🔥 NAYE ADMIN IMPORTS (Yahi missing the isliye error aa raha tha)
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageSubjects } from './pages/admin/ManageSubjects';
import { ManageTopics } from './pages/admin/ManageTopics';
import { ManageQuestions } from './pages/admin/ManageQuestions';
import { ManageStudents } from './pages/admin/ManageStudents';
import { ManageTeachers } from './pages/admin/ManageTeachers';
import { AdminLogin } from './pages/admin/AdminLogin';
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

              {/* 🔥 ADMIN ROUTES (Maine uncomment karke add kar diye hain) */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/subjects" element={<ManageSubjects />} />
              <Route path="/admin/topics" element={<ManageTopics />} />
              <Route path="/admin/questions" element={<ManageQuestions />} />
              <Route path="/admin/students" element={<ManageStudents />} />
              <Route path="/admin/teachers" element={<ManageTeachers />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {/* Render footer only if user is logged in and not on public page */}
          {!isPublicPage && <Footer />}
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