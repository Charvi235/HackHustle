import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  rating: number;
}

interface AskDoubtPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: string;
  subject: string;
}

// Mock teachers data - TODO: fetch from database
const mockTeachers: Teacher[] = [
  { id: '1', name: 'Dr. Sarah Smith', subject: 'Object Oriented Programming', rating: 4.5 },
  { id: '2', name: 'Prof. John Davis', subject: 'Object Oriented Programming', rating: 4.3 },
  { id: '3', name: 'Dr. Emily Johnson', subject: 'Object Oriented Programming', rating: 4.7 },
];

export const AskDoubtPanel = ({ open, onOpenChange, question, subject }: AskDoubtPanelProps) => {
  const { user, isFaculty } = useAuth();
  const { toast } = useToast();
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [doubtQuery, setDoubtQuery] = useState('');

  // Faculty cannot send doubts
  if (isFaculty) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Faculty Access Restricted</SheetTitle>
            <SheetDescription>
              As a faculty member, you can only respond to student doubts, not send them.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Button onClick={() => onOpenChange(false)} className="w-full">
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const handleSendDoubt = () => {
    if (!selectedTeacher) {
      toast({ title: 'Please select a teacher', variant: 'destructive' });
      return;
    }
    if (!doubtQuery.trim()) {
      toast({ title: 'Please write your query', variant: 'destructive' });
      return;
    }

    // TODO: Send doubt to database
    toast({ title: 'Doubt sent successfully!', description: 'The teacher will respond soon.' });
    
    // Reset form
    setSelectedTeacher('');
    setDoubtQuery('');
    onOpenChange(false);
  };

  const selectedTeacherData = mockTeachers.find(t => t.id === selectedTeacher);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {selectedTeacherData 
              ? `Ask ${selectedTeacherData.name}` 
              : 'Select a Teacher'}
          </SheetTitle>
          <SheetDescription>
            {selectedTeacherData && `${selectedTeacherData.subject} • ⭐ ${selectedTeacherData.rating}`}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Teacher Selection */}
          <div className="space-y-2">
            <Label>Select Teacher</Label>
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a teacher for this subject" />
              </SelectTrigger>
              <SelectContent>
                {mockTeachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name} (⭐ {teacher.rating})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Question Display */}
          <div className="space-y-2">
            <Label>Question</Label>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">{question}</p>
            </div>
          </div>

          {/* Doubt Query */}
          <div className="space-y-2">
            <Label htmlFor="doubt-query">Your Query</Label>
            <Textarea
              id="doubt-query"
              value={doubtQuery}
              onChange={(e) => setDoubtQuery(e.target.value)}
              placeholder="Describe what you're confused about or what you'd like to understand better..."
              className="min-h-[150px]"
            />
          </div>

          {/* Send Button */}
          <Button 
            onClick={handleSendDoubt} 
            className="w-full"
            disabled={!selectedTeacher || !doubtQuery.trim()}
          >
            Send Doubt to Teacher
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
