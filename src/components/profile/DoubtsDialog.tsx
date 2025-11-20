import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface Doubt {
  id: string;
  questionTitle: string;
  teacherName: string;
  subject: string;
  query: string;
  answer?: string;
  isRead: boolean;
  timestamp: Date;
  studentRating?: number;
}

interface DoubtsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkAsRead: (doubtId: string) => void;
  onRateTeacher: (doubtId: string, rating: number) => void;
}

export const DoubtsDialog = ({ open, onOpenChange, onMarkAsRead, onRateTeacher }: DoubtsDialogProps) => {
  // Mock doubts data - TODO: Connect to MySQL backend
  const [doubts] = useState<Doubt[]>([
    {
      id: '1',
      questionTitle: 'What is polymorphism?',
      teacherName: 'Dr. Sarah Smith',
      subject: 'Object Oriented Programming',
      query: 'I am confused about polymorphism concept. Can you explain with an example?',
      answer: 'Polymorphism allows objects of different classes to be treated as objects of a common parent class. For example, a Shape class can have Circle and Rectangle subclasses...',
      isRead: false,
      timestamp: new Date('2025-01-15T10:30:00'),
    },
    {
      id: '2',
      questionTitle: 'Explain inheritance',
      teacherName: 'Dr. Sarah Smith',
      subject: 'Object Oriented Programming',
      query: 'How does inheritance work in OOP?',
      answer: 'Inheritance is a mechanism where a new class inherits properties and methods from an existing class...',
      isRead: true,
      timestamp: new Date('2025-01-14T15:20:00'),
      studentRating: 5,
    },
  ]);

  const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const handleDoubtClick = (doubt: Doubt) => {
    setSelectedDoubt(doubt);
    if (!doubt.isRead && doubt.answer) {
      onMarkAsRead(doubt.id);
    }
  };

  const handleRating = (doubtId: string, rating: number) => {
    onRateTeacher(doubtId, rating);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>My Doubts</DialogTitle>
        </DialogHeader>
        {!selectedDoubt ? (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {doubts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No doubts yet</p>
              ) : (
                doubts.map((doubt) => (
                  <Card
                    key={doubt.id}
                    className={`cursor-pointer transition-colors hover:bg-accent ${
                      !doubt.isRead && doubt.answer ? 'bg-accent/50' : ''
                    }`}
                    onClick={() => handleDoubtClick(doubt)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{doubt.questionTitle}</h3>
                        {!doubt.isRead && doubt.answer && (
                          <Badge variant="destructive" className="ml-2">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Teacher: {doubt.teacherName} • {doubt.subject}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {doubt.timestamp.toLocaleDateString()} at {doubt.timestamp.toLocaleTimeString()}
                      </p>
                      {doubt.answer && (
                        <Badge variant="secondary" className="mt-2">Resolved</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        ) : (
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedDoubt(null)}
              className="mb-2"
            >
              ← Back to all doubts
            </Button>
            <div>
              <h3 className="font-semibold text-lg mb-2">{selectedDoubt.questionTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Teacher: {selectedDoubt.teacherName} • {selectedDoubt.subject}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Your Query:</h4>
              <p className="text-muted-foreground bg-muted p-3 rounded-md">{selectedDoubt.query}</p>
            </div>
            {selectedDoubt.answer && (
              <>
                <div>
                  <h4 className="font-medium mb-2">Teacher's Answer:</h4>
                  <p className="text-foreground bg-primary/5 p-3 rounded-md border border-primary/20">
                    {selectedDoubt.answer}
                  </p>
                </div>
                {!selectedDoubt.studentRating && (
                  <div>
                    <h4 className="font-medium mb-2">Rate this answer:</h4>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(selectedDoubt.id, star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="text-3xl transition-transform hover:scale-110"
                        >
                          {(hoveredStar >= star || selectedDoubt.studentRating && selectedDoubt.studentRating >= star)
                            ? '⭐'
                            : '☆'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {selectedDoubt.studentRating && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      You rated this answer: {'⭐'.repeat(selectedDoubt.studentRating)}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
