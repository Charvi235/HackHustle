import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Pencil, Save, X, LogOut, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const { user, isAuthenticated, logout, isFaculty } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    // Initialize form with user data
    setFirstName(user?.first_name || '');
    setLastName(user?.last_name || '');
    setEmail(user?.emailId || '');
  }, [isAuthenticated, user, navigate]);

  const getUserInitials = () => {
    if (!user) return 'U';
    return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();
  };

  const handleSave = () => {
    // TODO: Connect to backend to update user profile
    toast({ title: 'Profile updated successfully!' });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setFirstName(user?.first_name || '');
    setLastName(user?.last_name || '');
    setEmail(user?.emailId || '');
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || !user) {
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
              {user.first_name} {user.last_name}
            </CardTitle>
            <Badge variant="secondary" className="w-fit mx-auto mt-2">
              {user.role}
            </Badge>
          </CardHeader>
        </Card>

        {/* Profile Details */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profile Information</CardTitle>
            {!isEditing ? (
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                {isEditing ? (
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                ) : (
                  <p className="text-lg">{user.first_name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                {isEditing ? (
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                ) : (
                  <p className="text-lg">{user.last_name}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <p className="text-lg">{user.emailId}</p>
              )}
            </div>

            {/* Role-specific info */}
            {user.role?.toLowerCase() === 'student' && (
              <div className="space-y-2">
                <Label>Points</Label>
                <p className="text-2xl font-bold text-primary">{user.points || 0}</p>
              </div>
            )}
            {isFaculty && (
              <>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <p className="text-lg">{user.subject}</p>
                </div>
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <p className="text-lg">{user.rating} ⭐</p>
                </div>
              </>
            )}

            {isEditing && (
              <Button onClick={handleSave} className="w-full mt-4">
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!isFaculty && (
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
    </div>
  );
};

export default Profile;
