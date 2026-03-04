import { useState, useEffect } from "react";
import { useAuth, User } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LogOut,
  User as UserIcon,
  Mail,
  Briefcase,
  Building2,
  BookOpen,
  School,
  MessageSquare,
  Pencil,    
  Check,     
  X,
} from "lucide-react";
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
// import { EditProfileModal } from "@/components/profile/EditProfileModal";


import {
  getTeacherByEmail,
  updateTeacher,
} from "@/services/teacherService";

// ---------------------- Interface ----------------------

interface TeacherData {
  teacherId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  designation: string;
  department: string;
  subjectAssociated: string;
  institute: string;
}

// ---------------------- Component ----------------------

const TeacherProfile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [loading, setLoading] = useState(true);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null); 
  const [editData, setEditData] = useState<any>(null);


  
  // 🔐 Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  //  Fetch teacher by email
 
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!user?.emailId) return;

      try {
        const data = await getTeacherByEmail(user.emailId);
        setTeacherData(data);
        setProfileData(data); // 🟢 NAYI LINE: Ye zaroori hai taaki form khali na dikhe
      } catch (error) {
        console.error("Fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to load teacher profile",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchTeacherData();
    }
  }, [user?.emailId, isAuthenticated]);

  
 // 🟢 NAYA SAVE FUNCTION (Null issue fix + Original Service API)
const handleSaveProfile = async () => {
    try {
      // 🚨 FIX: Purana saara data (including experience) + tera edit kiya hua data
      // Isse Spring Boot ko har field mil jayegi aur wo 500 error nahi dega
      const payload = {
        ...profileData,
        ...editData
      };
      
      const tId = profileData.teacherId || profileData.teacherID;

      if (!tId) {
        toast({ title: 'Error', description: 'Teacher ID not found!', variant: 'destructive' });
        return;
      }

      // 🚨 FIX: Tera original function use kar rahe hain with perfect payload!
      const savedData = await updateTeacher(tId, payload);
      
      // Update hone ke baad UI refresh
      setProfileData(savedData);
      setTeacherData(savedData); 
      setIsEditing(false);
      toast({ title: 'Success', description: 'Profile updated successfully!' });
    } catch (error) {
      console.error("Save Profile Error:", error);
      toast({ title: 'Error', description: 'Code catch block me gaya. Console check kar!', variant: 'destructive' });
    }
  };

  const getInitials = () => {
    if (!teacherData) return "T";
    return `${teacherData.firstName?.[0] || ""}${
      teacherData.lastName?.[0] || ""
    }`.toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="pt-24 text-center text-lg">
        Loading Teacher Profile...
      </div>
    );
  }

  const modalUserData: any = {
    id: teacherData?.teacherId,
    first_name: teacherData?.firstName,
    last_name: teacherData?.lastName,
    emailId: teacherData?.emailId || "",
    role: "Faculty",
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Profile Header */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <Avatar className="h-28 w-28 border-4 border-muted">
                <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-3xl font-bold">
              {teacherData?.firstName} {teacherData?.lastName}
            </CardTitle>
            <div className="flex justify-center gap-2 mt-2">
              <Badge variant="default">Faculty</Badge>
              {teacherData?.department && (
                <Badge variant="outline">
                  {teacherData.department}
                </Badge>
              )}
            </div>
          </CardHeader>
        </Card>



        {/* Profile Details (Inline Edit Version) */}
        <Card className="bg-zinc-900 border-zinc-800 relative">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
            
            {/* Edit Toggle Buttons */}
            {!isEditing ? (
              <Button variant="ghost" size="icon" onClick={() => { setEditData(profileData); setIsEditing(true); }}>
                <Pencil className="h-4 w-4 text-zinc-400 hover:text-white" />
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

          <CardContent className="grid grid-cols-2 gap-6 mt-4 text-sm">
            
            {/* First Name */}
            <div>
              <p className="text-zinc-500 font-semibold mb-1">First Name</p>
              {isEditing ? (
                <Input 
                  className="bg-black border-zinc-700 h-8 text-white"
                  value={editData?.firstName || ''} 
                  onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                />
              ) : (
                <p className="text-zinc-200">{profileData?.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <p className="text-zinc-500 font-semibold mb-1">Last Name</p>
              {isEditing ? (
                <Input 
                  className="bg-black border-zinc-700 h-8 text-white"
                  value={editData?.lastName || ''} 
                  onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                />
              ) : (
                <p className="text-zinc-200">{profileData?.lastName}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <p className="text-zinc-500 font-semibold mb-1">Subject</p>
              {isEditing ? (
                <Input 
                  className="bg-black border-zinc-700 h-8 text-white"
                  value={editData?.subjectAssociated || ''} 
                  onChange={(e) => setEditData({...editData, subjectAssociated: e.target.value})}
                />
              ) : (
                <p className="text-zinc-200">{profileData?.subjectAssociated}</p>
              )}
            </div>

            {/* Institute */}
            <div>
              <p className="text-zinc-500 font-semibold mb-1">Institute</p>
              {isEditing ? (
                <Input 
                  className="bg-black border-zinc-700 h-8 text-white"
                  value={editData?.institute || ''} 
                  onChange={(e) => setEditData({...editData, institute: e.target.value})}
                />
              ) : (
                <p className="text-zinc-200">{profileData?.institute}</p>
              )}
            </div>

            {/* Designation */}
            <div>
              <p className="text-zinc-500 font-semibold mb-1">Designation</p>
              {isEditing ? (
                <Input 
                  className="bg-black border-zinc-700 h-8 text-white"
                  value={editData?.designation || ''} 
                  onChange={(e) => setEditData({...editData, designation: e.target.value})}
                />
              ) : (
                <p className="text-zinc-200">{profileData?.designation || 'N/A'}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <p className="text-zinc-500 font-semibold mb-1">Department</p>
              {isEditing ? (
                <Input 
                  className="bg-black border-zinc-700 h-8 text-white"
                  value={editData?.department || ''} 
                  onChange={(e) => setEditData({...editData, department: e.target.value})}
                />
              ) : (
                <p className="text-zinc-200">{profileData?.department || 'N/A'}</p>
              )}
            </div>

          </CardContent>
        </Card>
       

        {/* Actions */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-lg py-6"
              onClick={() => navigate("/faculty-doubts")}
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              View Doubts
            </Button>

            <Button
              variant="destructive"
              className="w-full justify-start text-lg py-6"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>

     
    </div>
  );
};

export default TeacherProfile;