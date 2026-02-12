import { useState, useEffect } from 'react';
import { useAuth, User } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User as UserIcon, Mail, Briefcase, Building2, BookOpen, School, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { EditProfileModal } from '@/components/profile/EditProfileModal';

// Teacher Interface
interface TeacherData {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
  designation: string;
  department: string;
  subject: string;   
  institute: string;
}

const TeacherProfile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams(); // ✅ URL params padhne ke liye
  
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // ✅ Modal State

  // 1. Initial Auth Check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // 2. FETCH TEACHER DATA
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!user?.emailId) return;

      try {
        const response = await fetch(`http://localhost:8080/api/teachers/${user.emailId}`);
        if (response.ok) {
          const data = await response.json();
          setTeacherData(data);
        } else {
          console.error("Failed to fetch teacher data");
          setTeacherData({
            id: 0,
            firstName: user.first_name || 'Teacher',
            lastName: user.last_name || 'User',
            emailId: user.emailId,
            designation: 'Assistant Professor',
            department: 'Computer Science',
            subject: 'Data Structure',
            institute : 'BV'
          });
        }
      } catch (error) {
        console.error("Connection Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchTeacherData();
    }
  }, [user?.emailId, isAuthenticated]);

  // ✅ 3. HANDLE EDIT PARAMETER (URL se Modal kholna)
  useEffect(() => {
    if (searchParams.get('edit') === 'true' && teacherData) {
      setIsEditModalOpen(true);
      setSearchParams({}); // URL saaf kar do
    }
  }, [searchParams, teacherData, setSearchParams]);

  // ✅ 4. HANDLE UPDATE (Save Changes)
  const handleTeacherUpdate = async (updatedData: Partial<User>) => {
    if (!teacherData) return;

    try {
        // Teacher Controller ke hisab se Payload
        // const payload = {
        //     id: teacherData.id,
        //     firstName: updatedData.first_name || teacherData.firstName,
        //     lastName: updatedData.last_name || teacherData.lastName,
        //     emailId: teacherData.emailId,
        //     designation: teacherData.designation,
        //     department: teacherData.department,
        //     ...updatedData
        // };
        // ✅ Change 3: Payload mein mandatory fields bhejna
    const payload = {
        id: teacherData.id,
        firstName: updatedData.first_name || teacherData.firstName,
        lastName: updatedData.last_name || teacherData.lastName,
        emailId: teacherData.emailId,
        designation: teacherData.designation,
        department: teacherData.department,
        subject: updatedData.subject || teacherData.subject,       // 👈 Data loss nahi hoga
        institute: updatedData.institute || teacherData.institute, // 👈 Data loss nahi hoga
        ...updatedData
    };

        // Backend PUT Request
        const response = await fetch(`http://localhost:8080/api/teachers/${teacherData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const savedData = await response.json();
            
            // Local State Update
            setTeacherData({
                ...teacherData,
                firstName: savedData.firstName,
                lastName: savedData.lastName
            });
            
            toast({ title: "Success", description: "Profile updated successfully!" });
        } else {
            toast({ title: "Error", description: "Update failed.", variant: "destructive" });
        }
    } catch (error) {
        console.error("Update Error:", error);
        toast({ title: "Error", description: "Server unreachable.", variant: "destructive" });
    }
  };

  const getInitials = () => {
    if (!teacherData) return 'T';
    return `${teacherData.firstName?.[0] || ''}${teacherData.lastName?.[0] || ''}`.toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || loading) {
    return <div className="pt-24 text-center">Loading Teacher Profile...</div>;
  }

  // ✅ Data conversion for EditModal (TeacherData -> User format)
  // const modalUserData: User = {
  //   id: teacherData?.id,
  //   first_name: teacherData?.firstName,
  //   last_name: teacherData?.lastName,
  //   emailId: teacherData?.emailId || '',
  //   role: 'Faculty'
  // };
  // ✅ Data conversion for EditModal (TeacherData -> User format)
  const modalUserData: any = {     // 👈 Bas yahan 'any' likh do
    id: teacherData?.id,
    first_name: teacherData?.firstName,
    last_name: teacherData?.lastName,
    emailId: teacherData?.emailId || '',
    role: 'Faculty'
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
                <Badge variant="default" className="text-sm px-3 py-1">Faculty</Badge>
                {teacherData?.department && (
                    <Badge variant="outline" className="text-sm px-3 py-1">{teacherData.department}</Badge>
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
              <div className="space-y-2">
                <Label className="text-muted-foreground">First Name</Label>
                <div className="font-medium text-lg border-b pb-1 border-muted">{teacherData?.firstName}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Last Name</Label>
                <div className="font-medium text-lg border-b pb-1 border-muted">{teacherData?.lastName}</div>
              </div>
            </div>
            <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2"><Mail className="h-4 w-4" /> Email Address</Label>
                <div className="font-medium text-lg border-b pb-1 border-muted">{teacherData?.emailId}</div>
            </div>
            
<div className="space-y-2">
  <Label className="text-muted-foreground flex items-center gap-2">
      <BookOpen className="h-4 w-4" /> Subject
  </Label>
  <div className="font-medium text-lg border-b pb-1 border-muted">
      {teacherData?.subject} 
  </div>
</div>

<div className="space-y-2">
  <Label className="text-muted-foreground flex items-center gap-2">
      <School className="h-4 w-4" /> Institute
  </Label>
  <div className="font-medium text-lg border-b pb-1 border-muted">
      {teacherData?.institute}
  </div>
</div>
            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2"><Briefcase className="h-4 w-4" /> Designation</Label>
                <div className="font-medium text-lg border-b pb-1 border-muted">{teacherData?.designation}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2"><Building2 className="h-4 w-4" /> Department</Label>
                <div className="font-medium text-lg border-b pb-1 border-muted">{teacherData?.department}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent className="pt-6 space-y-3">
             <Button 
                variant="outline" 
                className="w-full justify-start text-lg py-6"
                onClick={() => navigate('/faculty-doubts')} // 👈 Ab ye Doubts page par le jayega
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

      {/* ✅ Edit Profile Modal Connected */}
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