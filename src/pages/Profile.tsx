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
  Pencil, 
  Check,  
  X,      
} from "lucide-react";
import { Input } from '@/components/ui/input';
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

  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [questionsSolved, setQuestionsSolved] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);

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


  const handleProfileUpdate = async (updatedData: Partial<User>) => {
  if (!student || !localUser) return;

  try {
    // Determine final first & last names separately
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

    //  Call backend WITHOUT email modification
    const updatedStudent = await updateStudent(student.studentId, {
      ...student,
      firstName: finalFirstName,
      lastName: finalLastName,
      //  emailId NOT taken from updatedData
      emailId: student.emailId,
      password: student.password,
      points: student.points,
      quizAttempted: student.quizAttempted,
    });

    // Update student state
    setStudent(updatedStudent);

    // Update localUser state
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

// ================= UPDATE PROFILE (Inline Edit Logic) =================
  const handleSaveProfile = async () => {
    if (!student || !localUser) return;

    try {
      // 1. Naya payload banaya (sirf naam change hoga, baaki purana rahega)
      const payload = {
        ...student,
        firstName: editData?.firstName || student.firstName,
        lastName: editData?.lastName || student.lastName,
        emailId: student.emailId,       // Email readonly hai
        password: student.password,     // Password backend ko wapas bhejna zaroori hai
        points: student.points,
        quizAttempted: student.quizAttempted,
      };

      // 2. Backend API call 
      const updatedStudent = await updateStudent(student.studentId, payload);

      // 3. Student State Update
      setStudent(updatedStudent);

      // 4. LocalAuth (Navbar/Sidebar) ke liye Update
      const updatedLocalUser = {
        ...localUser,
        first_name: updatedStudent.firstName,
        last_name: updatedStudent.lastName,
      };
      setLocalUser(updatedLocalUser);
      localStorage.setItem("user", JSON.stringify(updatedLocalUser));

      // 5. Success UI
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });

    } catch (error) {
      console.error("Save Profile Error:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Check console!",
        variant: "destructive",
      });
    }
  };


  const getUserInitials = () => {
    if (!student) return "U";
    return `${student.firstName?.[0] || ""}${student.lastName?.[0] || ""}`.toUpperCase();
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
              <Avatar className="h-24 w-24 border-2 border-zinc-700">
    <AvatarFallback className="bg-zinc-800 text-white text-3xl font-bold tracking-widest">
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

        
        

        {/* ===== PROFILE INFORMATION (Inline Edit) ===== */}
        <Card className="relative border-primary/20 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Profile Information</CardTitle>
            
            {/* Edit Toggle Buttons */}
            {!isEditing ? (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => { 
                  setEditData(student); 
                  setIsEditing(true); 
                }}
              >
                <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 text-red-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleSaveProfile}>
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              
              {/* First Name */}
              <div>
                <Label>First Name</Label>
                {isEditing ? (
                  <Input 
                    className="mt-1"
                    value={editData?.firstName || ''} 
                    onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                  />
                ) : (
                  <p className="text-muted-foreground mt-1">{student.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <Label>Last Name</Label>
                {isEditing ? (
                  <Input 
                    className="mt-1"
                    value={editData?.lastName || ''} 
                    onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                  />
                ) : (
                  <p className="text-muted-foreground mt-1">{student.lastName}</p>
                )}
              </div>
            </div>

            {/* Email (Read Only - Email change nahi kar sakte) */}
            <div>
              <Label>Email</Label>
              <p className="text-muted-foreground mt-1">{student.emailId}</p>
              {isEditing && <p className="text-xs text-muted-foreground mt-1">*Email ID cannot be changed</p>}
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

              <Button 
                variant="outline" 
                className="w-full justify-start"
                
                onClick={() => navigate("/doubts")} 
              >
                <BookOpen className="mr-2 h-4 w-4" />
                My Doubts
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/doubts")}
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

     
    </div>
  );
};

export default Profile;
