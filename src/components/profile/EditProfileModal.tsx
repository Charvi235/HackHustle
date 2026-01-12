import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/contexts/AuthContext';

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  onSave: (updatedUser: Partial<User>) => void;
}

export const EditProfileModal = ({ open, onOpenChange, user, onSave }: EditProfileModalProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    emailId: '',
    institute: '',
    designation: '',
    department: '',
    experience: 0,
    bio: '',
    subject: '',
    officeHours: '',
    linkedin: '',
    github: '',
    website: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        emailId: user.emailId || '',
        institute: user.institute || '',
        designation: user.designation || '',
        department: user.department || '',
        experience: user.experience || 0,
        bio: user.bio || '',
        subject: user.subject || '',
        officeHours: user.officeHours || '',
        linkedin: user.socials?.linkedin || '',
        github: user.socials?.github || '',
        website: user.socials?.website || '',
      });
    }
  }, [user, open]);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updatedUser: Partial<User> = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      emailId: formData.emailId,
      institute: formData.institute,
      designation: formData.designation,
      department: formData.department,
      experience: Number(formData.experience),
      bio: formData.bio,
      subject: formData.subject,
      officeHours: formData.officeHours,
      socials: {
        linkedin: formData.linkedin || undefined,
        github: formData.github || undefined,
        website: formData.website || undefined,
      },
    };
    
    onSave(updatedUser);
    toast({ title: 'Profile updated successfully!' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Basic Info Section */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleChange('first_name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleChange('last_name', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="emailId">Email</Label>
              <Input
                id="emailId"
                type="email"
                value={formData.emailId}
                onChange={(e) => handleChange('emailId', e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* Professional Info Section */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Professional Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institute">Institute</Label>
                <Input
                  id="institute"
                  value={formData.institute}
                  onChange={(e) => handleChange('institute', e.target.value)}
                  placeholder="e.g., IIT Delhi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="e.g., DSA"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                  placeholder="e.g., Associate Professor"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  placeholder="e.g., Computer Science"
                />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                value={formData.experience}
                onChange={(e) => handleChange('experience', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="bio">Bio / About Me</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                placeholder="Tell students about yourself..."
                rows={3}
              />
            </div>
          </div>

          <Separator />

          {/* Socials & Availability Section */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Socials & Availability</h3>
            <div className="space-y-2">
              <Label htmlFor="officeHours">Office Hours</Label>
              <Input
                id="officeHours"
                value={formData.officeHours}
                onChange={(e) => handleChange('officeHours', e.target.value)}
                placeholder="e.g., Mon-Fri, 5 PM - 7 PM"
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="github">GitHub URL</Label>
              <Input
                id="github"
                value={formData.github}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="website">Personal Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
