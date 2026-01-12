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
  Clock, 
  Users, 
  HelpCircle,
  Building,
  GraduationCap,
  Briefcase,
  Mail
} from 'lucide-react';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
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
      // Also update localStorage for persistence
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
      {isFaculty ? (
        // Faculty 2-Column Layout
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-6">
                    <Avatar className="h-24 w-24 flex-shrink-0">
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h1 className="text-2xl font-bold">
                            {localUser.first_name} {localUser.last_name}
                          </h1>
                          <p className="text-muted-foreground">
                            {localUser.designation || 'Add designation'}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsEditModalOpen(true)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="secondary">{localUser.role}</Badge>
                        {localUser.subject && (
                          <Badge variant="outline">{localUser.subject}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {localUser.bio || 'No bio added yet. Click Edit Profile to add one.'}
                  </p>
                </CardContent>
              </Card>

              {/* Professional Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Institute</p>
                        <p className="font-medium">{localUser.institute || 'Add Institute'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Department</p>
                        <p className="font-medium">{localUser.department || 'Add Department'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Experience</p>
                        <p className="font-medium">
                          {localUser.experience ? `${localUser.experience} years` : 'Add Experience'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-medium">{localUser.emailId}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Availability Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact & Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Office Hours */}
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Office Hours</p>
                      <p className="font-medium">
                        {localUser.officeHours || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Social Links */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-3">Social Links</p>
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
            </div>

            {/* Right Column - Stats & Quick Actions */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{localUser.stats?.studentsMentored || 0}</p>
                      <p className="text-xs text-muted-foreground">Students Mentored</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <HelpCircle className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{localUser.stats?.doubtsSolved || 0}</p>
                      <p className="text-xs text-muted-foreground">Doubts Solved</p>
                    </div>
                  </div>
                  {localUser.rating && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <p className="text-2xl font-bold">{localUser.rating}</p>
                        <p className="text-xs text-muted-foreground">Average Rating</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/faculty-doubts')}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    View Doubts
                  </Button>
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
        </div>
      ) : (
        // Student Layout (existing)
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

          {/* Profile Details */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">First Name</p>
                  <p className="text-lg">{localUser.first_name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Last Name</p>
                  <p className="text-lg">{localUser.last_name}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg">{localUser.emailId}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Points</p>
                <p className="text-2xl font-bold text-primary">{localUser.points || 0}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/practice')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                My Doubts
              </Button>
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
      )}

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
