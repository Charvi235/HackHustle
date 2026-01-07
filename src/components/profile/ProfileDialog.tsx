import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileDialog = ({ open, onOpenChange }: ProfileDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.emailId || '');

  const handleSave = () => {
    // TODO: Connect to MySQL backend to update user profile
    toast({ title: 'Profile updated successfully!' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>My Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {user?.role?.toLowerCase() === 'student' && (
            <div className="space-y-2">
              <Label>Points</Label>
              <div className="text-2xl font-bold text-primary">{user?.points || 0}</div>
            </div>
          )}
          {user?.role?.toLowerCase() === 'faculty' && (
            <>
              <div className="space-y-2">
                <Label>Subject</Label>
                <div className="text-lg">{user?.subject}</div>
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="text-lg">{user?.rating} ⭐</div>
              </div>
            </>
          )}
        </div>
        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};
