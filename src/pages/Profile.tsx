// import { useState, useEffect } from "react";
// import { useAuth } from "@/contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { LogOut, Trophy, CheckCircle, Star } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { Label } from "@/components/ui/label";
// import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { EditProfileModal } from '@/components/profile/EditProfileModal';

// import {
//   getStudentByEmail,
//   updateStudent,
//   getVisitedQuestions,
// } from "@/services/studentService";

// interface Student {
//   studentId: number;
//   firstName: string;
//   lastName: string;
//   emailId: string;
//   password?: string;
//   points: number;
//   quizAttempted: number;
// }

// const Profile = () => {
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [student, setStudent] = useState<Student | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [questionsSolved, setQuestionsSolved] = useState<number>(0);

//   // ================= FETCH PROFILE =================
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!isAuthenticated || !user?.emailId) {
//         navigate("/auth");
//         return;
//       }

//       try {
//         // 1️⃣ Fetch student details
//         const studentData = await getStudentByEmail(user.emailId);
//         setStudent(studentData);

//         // 2️⃣ Fetch visited questions from QuestionStatus table
//         const visitedList = await getVisitedQuestions(user.emailId);
//         setQuestionsSolved(visitedList.length);

//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to load profile data",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [isAuthenticated, user, navigate]);



//   // ================= UPDATE PROFILE =================
//   const handleUpdate = async (updatedData: Partial<Student>) => {
//     if (!student) return;

//     try {
//       const updated = await updateStudent(
//         student.studentId,
//         { ...student, ...updatedData }
//       );

//       setStudent(updated);

//       toast({
//         title: "Success",
//         description: "Profile updated successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Profile update failed",
//         variant: "destructive",
//       });
//     }
//   };

//   const getInitials = () => {
//     if (!student) return "U";
//     return `${student.firstName?.[0] || ""}${
//       student.lastName?.[0] || ""
//     }`.toUpperCase();
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   if (loading) return <div className="text-center mt-20">Loading...</div>;
//   if (!student) return null;

//   return (
//     <div className="container mx-auto px-4 py-8 pt-24">
//       <div className="max-w-2xl mx-auto space-y-6">

//         {/* ===== PROFILE HEADER ===== */}
//         <Card>
//           <CardHeader className="text-center">
//             <div className="flex justify-center mb-4">
//               <Avatar className="h-24 w-24">
//                 <AvatarFallback className="text-2xl">
//                   {getInitials()}
//                 </AvatarFallback>
//               </Avatar>
//             </div>
//             <CardTitle className="text-2xl">
//               {student.firstName} {student.lastName}
//             </CardTitle>
//           </CardHeader>
//         </Card>

//         {/* ===== PROFILE INFO ===== */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Profile Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>First Name</Label>
//                 <p className="text-muted-foreground">
//                   {student.firstName}
//                 </p>
//               </div>

//               <div>
//                 <Label>Last Name</Label>
//                 <p className="text-muted-foreground">
//                   {student.lastName}
//                 </p>
//               </div>
//             </div>

//             <div>
//               <Label>Email</Label>
//               <p className="text-muted-foreground">
//                 {student.emailId}
//               </p>
//             </div>

//           </CardContent>
//         </Card>

//         {/* ===== STATS ===== */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Your Stats</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-3 gap-4">

//               {/* Points */}
//               <div className="text-center p-4 bg-muted rounded-lg">
//                 <Star className="h-8 w-8 mx-auto mb-2 text-blue-500" />
//                 <p className="text-3xl font-bold">
//                   {student.points || 0}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Total Points
//                 </p>
//               </div>

//               {/* Quiz Attempted */}
//               <div className="text-center p-4 bg-muted rounded-lg">
//                 <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
//                 <p className="text-3xl font-bold">
//                   {student.quizAttempted || 0}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Quiz Attempted
//                 </p>
//               </div>

//               {/* Questions Solved (from QuestionStatus table) */}
//               <div className="text-center p-4 bg-muted rounded-lg">
//                 <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
//                 <p className="text-3xl font-bold">
//                   {questionsSolved}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Total Questions Solved
//                 </p>
//               </div>

//             </div>
//           </CardContent>
//         </Card>

//         {/* ===== ACTIONS ===== */}
//         <Card>
//           <CardContent className="space-y-3 pt-6">
//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={() => navigate("/practice")}
//             >
//               My Doubts
//             </Button>

//             <Button
//               variant="destructive"
//               className="w-full"
//               onClick={handleLogout}
//             >
//               <LogOut className="mr-2 h-4 w-4" />
//               Logout
//             </Button>
//           </CardContent>
//         </Card>

//       </div>
//     </div>
//   );
// };

// export default Profile;






import { useState, useEffect } from "react";
import { useAuth, User } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LogOut,
  BookOpen,
  MessageSquare,
  Trophy,
  CheckCircle,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { EditProfileModal } from "@/components/profile/EditProfileModal";

import {
  getStudentByEmail,
  updateStudent,
  getVisitedQuestions,
} from "@/services/studentService";

interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  password?: string;
  points: number;
  quizAttempted: number;
}

const Profile = () => {
  const { user, isAuthenticated, logout, isFaculty } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [questionsSolved, setQuestionsSolved] = useState<number>(0);

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !user?.emailId) {
        navigate("/auth");
        return;
      }

      try {
        const studentData = await getStudentByEmail(user.emailId);
        setStudent(studentData);

        const visitedList = await getVisitedQuestions(user.emailId);
        setQuestionsSolved(visitedList.length);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user, navigate]);

  // Sync AuthContext user
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    setLocalUser(user);
  }, [isAuthenticated, user, navigate]);

  // Open modal if ?edit=true
  useEffect(() => {
    if (searchParams.get("edit") === "true" && localUser) {
      setIsEditModalOpen(true);
      setSearchParams({});
    }
  }, [searchParams, localUser, setSearchParams]);

  const getUserInitials = () => {
    if (!localUser) return "U";
    return `${localUser.first_name?.[0] || ""}${
      localUser.last_name?.[0] || ""
    }`.toUpperCase();
  };

  // ================= UPDATE PROFILE =================
  // const handleProfileUpdate = async (updatedData: Partial<User>) => {
  //   if (!student || !localUser) return;

  //   try {
  //     const updatedStudent = await updateStudent(student.studentId, {
  //       ...student,
  //       firstName: updatedData.first_name ?? student.firstName,
  //       lastName: updatedData.last_name ?? student.lastName,
  //       emailId: student.emailId,
  //       password: student.password,
  //       points: student.points,
  //       quizAttempted: student.quizAttempted,
  //     });

  //     setStudent(updatedStudent);

  //     const updatedLocalUser = {
  //       ...localUser,
  //       first_name: updatedStudent.firstName,
  //       last_name: updatedStudent.lastName,
  //     };

  //     setLocalUser(updatedLocalUser);
  //     localStorage.setItem("user", JSON.stringify(updatedLocalUser));

  //     toast({
  //       title: "Success",
  //       description: "Profile updated successfully",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to update profile",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const handleProfileUpdate = async (updatedData: Partial<User>) => {
  if (!student || !localUser) return;

  try {
    // ✅ Determine final first & last names separately
    const finalFirstName =
      updatedData.first_name !== undefined &&
      updatedData.first_name.trim() !== ""
        ? updatedData.first_name
        : student.firstName;

    const finalLastName =
      updatedData.last_name !== undefined &&
      updatedData.last_name.trim() !== ""
        ? updatedData.last_name
        : student.lastName;

    // ✅ Call backend WITHOUT email modification
    const updatedStudent = await updateStudent(student.studentId, {
      ...student,
      firstName: finalFirstName,
      lastName: finalLastName,
      // 🚫 emailId NOT taken from updatedData
      emailId: student.emailId,
      password: student.password,
      points: student.points,
      quizAttempted: student.quizAttempted,
    });

    // ✅ Update student state
    setStudent(updatedStudent);

    // ✅ Update localUser state
    const updatedLocalUser = {
      ...localUser,
      first_name: updatedStudent.firstName,
      last_name: updatedStudent.lastName,
    };

    setLocalUser(updatedLocalUser);
    localStorage.setItem("user", JSON.stringify(updatedLocalUser));

    toast({
      title: "Success",
      description: "Profile updated successfully",
    });

  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to update profile",
      variant: "destructive",
    });
  }
};


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated || !localUser || loading) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* ===== PROFILE HEADER ===== */}
        <Card>
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">
              {localUser.first_name} {localUser.last_name}
            </CardTitle>
            <Badge variant="secondary" className="w-fit mx-auto mt-2">
              {localUser.role}
            </Badge>
          </CardHeader>
        </Card>

        
         <Card>
           <CardHeader>
             <CardTitle>Profile Information</CardTitle>
           </CardHeader>
          <CardContent className="space-y-4">

             <div className="grid grid-cols-2 gap-4">
               <div>
                 <Label>First Name</Label>
                 <p className="text-muted-foreground">
                   {student.firstName}
                 </p>
               </div>

               <div>
                 <Label>Last Name</Label>
                 <p className="text-muted-foreground">
                  {student.lastName}
                 </p>
               </div>
             </div>

             <div>
              <Label>Email</Label>
               <p className="text-muted-foreground">
                 {student.emailId}
              </p>
            </div>
          </CardContent>
        </Card>

         {/* ===== STATS ===== */}
         <Card>
           <CardHeader>
             <CardTitle>Your Stats</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="grid grid-cols-3 gap-4">

               {/* Points */}
               <div className="text-center p-4 bg-muted rounded-lg">
                 <Star className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                 <p className="text-3xl font-bold">
                   {student.points || 0}
                 </p>
                 <p className="text-sm text-muted-foreground">
                   Total Points
                 </p>
               </div>
               {/* Quiz Attempted */}
               <div className="text-center p-4 bg-muted rounded-lg">
                 <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                 <p className="text-3xl font-bold">
                   {student.quizAttempted || 0}
                 </p>
                 <p className="text-sm text-muted-foreground">
                   Quiz Attempted
                 </p>
               </div>

               {/* Questions Solved (from QuestionStatus table) */}
              <div className="text-center p-4 bg-muted rounded-lg">
                 <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                 <p className="text-3xl font-bold">
                   {questionsSolved}
                 </p>
                 <p className="text-sm text-muted-foreground">
                   Total Questions Solved
                 </p>
               </div>

             </div>
           </CardContent>
         </Card>

        {/* ===== QUICK ACTIONS ===== */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isFaculty ? (
              // <Button
              //   variant="outline"
              //   className="w-full justify-start"
              //   onClick={() => navigate("/faculty-doubts")}
              // >
              //   <MessageSquare className="mr-2 h-4 w-4" />
              //   View Doubts
              // </Button>
              /* src/pages/Profile.tsx mein Quick Actions card ke andar */

              <Button 
                variant="outline" 
                className="w-full justify-start"
                // 👇 Bas ye line change karni hai: '/practice' hata ke '/doubts' likh do
                onClick={() => navigate("/doubts")} 
              >
                <BookOpen className="mr-2 h-4 w-4" />
                My Doubts
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/practice")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                My Doubts
              </Button>
            )}

            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ===== EDIT PROFILE MODAL ===== */}
      {localUser && (
        <EditProfileModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          user={localUser}
          onSave={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default Profile;
