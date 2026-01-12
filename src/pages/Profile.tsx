import { useState, useEffect } from 'react';
import { useAuth, User } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LogOut, 
  BookOpen, 
  MessageSquare, 
  Edit, 
  Clock
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
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [localUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setLocalUser(user);
  }, [isAuthenticated, user, navigate]);

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

        {/* Profile Details - Read Only (no pencil icon) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profile Information</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">First Name</Label>
                <p className="text-lg">{localUser.first_name || 'Not set'}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Last Name</Label>
                <p className="text-lg">{localUser.last_name || 'Not set'}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Email</Label>
              <p className="text-lg">{localUser.emailId}</p>
            </div>

            {/* Role-specific info */}
            {localUser.role?.toLowerCase() === 'student' && (
              <div className="space-y-2">
                <Label className="text-muted-foreground">Points</Label>
                <p className="text-2xl font-bold text-primary">{localUser.points || 0}</p>
              </div>
            )}

            {isFaculty && (
              <>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Subject</Label>
                  <p className="text-lg">{localUser.subject || 'Add Subject'}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Institute</Label>
                  <p className="text-lg">{localUser.institute || 'Add Institute'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Designation</Label>
                    <p className="text-lg">{localUser.designation || 'Add Designation'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Department</Label>
                    <p className="text-lg">{localUser.department || 'Add Department'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Experience</Label>
                  <p className="text-lg">
                    {localUser.experience ? `${localUser.experience} years` : 'Add Experience'}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Rating</Label>
                  <p className="text-lg">{localUser.rating ? `${localUser.rating} ⭐` : 'No rating yet'}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Bio</Label>
                  <p className="text-muted-foreground">
                    {localUser.bio || 'No bio added yet'}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Contact & Availability (Faculty only) */}
        {isFaculty && (
          <Card>
            <CardHeader>
              <CardTitle>Contact & Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Office Hours */}
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <Label className="text-muted-foreground">Office Hours</Label>
                  <p className="text-lg">
                    {localUser.officeHours || 'Not specified'}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Social Links */}
              <div>
                <Label className="text-muted-foreground mb-3 block">Social Links</Label>
                <div className="flex gap-3">
                  {localUser.socials?.linkedin && (
                    <a
                      href={localUser.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-[#0077B5] hover:text-white transition-colors"
                    >
                      <FaLinkedin className="h-5 w-5" />
                    </a>
                  )}
                  {localUser.socials?.github && (
                    <a
                      href={localUser.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-foreground hover:text-background transition-colors"
                    >
                      <FaGithub className="h-5 w-5" />
                    </a>
                  )}
                  {localUser.socials?.website && (
                    <a
                      href={localUser.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <FaGlobe className="h-5 w-5" />
                    </a>
                  )}
                  {!localUser.socials?.linkedin && !localUser.socials?.github && !localUser.socials?.website && (
                    <p className="text-muted-foreground text-sm">No social links added yet.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
