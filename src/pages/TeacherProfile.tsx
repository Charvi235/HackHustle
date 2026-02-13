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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { EditProfileModal } from "@/components/profile/EditProfileModal";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 🔐 Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  // 📡 Fetch teacher by email
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!user?.emailId) return;

      try {
        const data = await getTeacherByEmail(user.emailId);
        setTeacherData(data);
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

  // 🔄 Open Edit Modal if URL contains ?edit=true
  useEffect(() => {
    if (searchParams.get("edit") === "true" && teacherData) {
      setIsEditModalOpen(true);
      setSearchParams({});
    }
  }, [searchParams, teacherData]);

  // ✏️ Update Teacher
  const handleTeacherUpdate = async (updatedData: Partial<User>) => {
    if (!teacherData) return;

    try {
      const payload = {
        teacherId: teacherData.teacherId,
        firstName: updatedData.first_name || teacherData.firstName,
        lastName: updatedData.last_name || teacherData.lastName,
        emailId: teacherData.emailId,
        designation: teacherData.designation,
        department: teacherData.department,
        subjectAssociated: teacherData.subjectAssociated,
        institute: teacherData.institute,
      };

      const savedData = await updateTeacher(
        teacherData.teacherId,
        payload
      );

      setTeacherData(savedData);

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
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

        {/* Profile Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              <CardTitle>Personal Information</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>First Name</Label>
                <div className="border-b pb-1">
                  {teacherData?.firstName}
                </div>
              </div>

              <div>
                <Label>Last Name</Label>
                <div className="border-b pb-1">
                  {teacherData?.lastName}
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email
              </Label>
              <div className="border-b pb-1">
                {teacherData?.emailId}
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Subject
              </Label>
              <div className="border-b pb-1">
                {teacherData?.subjectAssociated}
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <School className="h-4 w-4" /> Institute
              </Label>
              <div className="border-b pb-1">
                {teacherData?.institute}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Designation
                </Label>
                <div className="border-b pb-1">
                  {teacherData?.designation}
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" /> Department
                </Label>
                <div className="border-b pb-1">
                  {teacherData?.department}
                </div>
              </div>
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

      {/* Edit Modal */}
      {teacherData && (
        <EditProfileModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          user={modalUserData}
          onSave={handleTeacherUpdate}
        />
      )}
    </div>
  );
};

export default TeacherProfile;