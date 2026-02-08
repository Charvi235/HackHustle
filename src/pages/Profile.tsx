import { useState, useEffect } from 'react';
import { useAuth, User } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LogOut, 
  BookOpen, 
  MessageSquare, 
  Clock,
  Trophy,
  CheckCircle,
  Star
} from 'lucide-react';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { EditProfileModal } from '@/components/profile/EditProfileModal';

const Profile = () => {
  const { user, isAuthenticated, logout, isFaculty } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [localUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setLocalUser(user);
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (searchParams.get('edit') === 'true' && localUser) {
      setIsEditModalOpen(true);
      setSearchParams({});
    }
  }, [searchParams, localUser, setSearchParams]);

  const getUserInitials = () => {
    if (!localUser) return 'U';
    return `${localUser.first_name?.[0] || ''}${localUser.last_name?.[0] || ''}`.toUpperCase();
  };

  const handleProfileUpdate = (updatedData: Partial<User>) => {
    if (localUser) {
      const updated = { ...localUser, ...updatedData };
      setLocalUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
    }
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || !localUser) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
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

        {/* Profile Details - Read Only */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">First Name</Label>
                <p className="text-sm text-muted-foreground">{localUser.first_name || 'Not set'}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Last Name</Label>
                <p className="text-sm text-muted-foreground">{localUser.last_name || 'Not set'}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Email</Label>
              <p className="text-sm text-muted-foreground">{localUser.emailId}</p>
            </div>

            {/* Student stats*/}

            {isFaculty && (
              <>
                <div className="space-y-2">
                  <Label className="text-foreground">Subject</Label>
                  <p className="text-sm text-muted-foreground">{localUser.subject || 'Subject not added yet'}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Institute</Label>
                  <p className="text-sm text-muted-foreground">{localUser.institute || 'Institute not added yet'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Designation</Label>
                    <p className="text-sm text-muted-foreground">{localUser.designation || 'Designation not added yet'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Department</Label>
                    <p className="text-sm text-muted-foreground">{localUser.department || 'Department not added yet'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Experience</Label>
                  <p className="text-sm text-muted-foreground">
                    {localUser.experience ? `${localUser.experience} years` : 'Experience not added yet'}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Rating</Label>
                  <p className="text-sm text-muted-foreground">{localUser.rating ? `${localUser.rating} ⭐` : 'No ratings yet'}</p>
                </div>
                {/* <div className="space-y-2">
                  <Label className="text-foreground">Bio</Label>
                  <p className="text-muted-foreground">
                    {localUser.bio || 'No bio added yet'}
                  </p>
                </div> */}
              </>
            )}
          </CardContent>
        </Card>

        {/* Stats Card (Faculty only) */}
        {isFaculty && (
          <Card>
            <CardHeader>
              <CardTitle>Teaching Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-3xl font-bold text-primary">
                    {localUser.stats?.studentsMentored || 0}
                  </p>
                  <p className="text-muted-foreground text-sm">Students Mentored</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-3xl font-bold text-primary">
                    {localUser.stats?.doubtsSolved || 0}
                  </p>
                  <p className="text-muted-foreground text-sm">Doubts Solved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Card (Student only) */}
        {!isFaculty && localUser.role?.toLowerCase() === 'student' && (
          <Card>
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-primary">
                    {localUser.stats?.battleWins || 0}
                  </p>
                  <p className="text-muted-foreground text-sm">Battle Wins</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-primary">
                    {localUser.stats?.questionsSolved || 0}
                  </p>
                  <p className="text-muted-foreground text-sm">Questions Solved</p>
                </div>
              </div> */}
              <CardContent>
              {/* Grid ko 3 columns mein kiya */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. NEW POINTS BOX */}
                <div className="text-center p-4 bg-muted rounded-lg">
                  {/* Star Icon Import karna mat bhulna */}
                  <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" /> 
                  <p className="text-3xl font-bold text-primary">
                    {(localUser.stats as any)?.points || 120} {/* Points variable */}
                  </p>
                  <p className="text-muted-foreground text-sm">Total Points</p>
                </div>

                {/* 2. BATTLE WINS */}
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-primary">
                    {localUser.stats?.battleWins || 0}
                  </p>
                  <p className="text-muted-foreground text-sm">Battle Wins</p>
                </div>

                {/* 3. QUESTIONS SOLVED */}
                <div className="text-center p-4 bg-muted rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-primary">
                    {localUser.stats?.questionsSolved || 0}
                  </p>
                  <p className="text-muted-foreground text-sm">Questions Solved</p>
                </div>

              </div>
            </CardContent>
            </CardContent>
          </Card>
        )}

        {/* Contact & Availability (Faculty only) */}
        

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isFaculty ? (
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/faculty-doubts')}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                View Doubts
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/practice')}
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

      {/* Edit Profile Modal */}
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

