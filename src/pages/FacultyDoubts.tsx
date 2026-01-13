import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Clock, User } from 'lucide-react';

interface Doubt {
  id: string;
  title: string;
  studentName: string;
  question: string;
  subject: string;
  status: 'pending' | 'resolved';
  createdAt: string;
}

const FacultyDoubts = () => {
  const { user, isFaculty } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);
  const [answer, setAnswer] = useState('');

  // Mock data for doubts
  const [doubts] = useState<Doubt[]>([
    {
      id: '1',
      title: 'Array vs ArrayList Difference',
      studentName: 'Charvi',
      question: 'What is the main difference between Array and ArrayList in Java?',
      subject: 'DSA',
      status: 'pending',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Time Complexity of QuickSort',
      studentName: 'Rahul',
      question: 'Why is QuickSort O(n log n) in average case but O(n²) in worst case?',
      subject: 'DSA',
      status: 'pending',
      createdAt: '2024-01-09'
    },
    {
      id: '3',
      title: 'Stack vs Queue',
      studentName: 'Priya',
      question: 'Can you explain when to use Stack and when to use Queue?',
      subject: 'DSA',
      status: 'pending',
      createdAt: '2024-01-08'
    },
  ]);

  const pendingDoubts = doubts.filter(d => d.status === 'pending');

  const handleViewDoubt = (doubt: Doubt) => {
    setSelectedDoubt(doubt);
    setAnswer('');
  };

  const handleSendAnswer = () => {
    if (!answer.trim()) {
      toast({ title: 'Please enter an answer', variant: 'destructive' });
      return;
    }
    toast({ title: 'Answer sent successfully!' });
    setSelectedDoubt(null);
    setAnswer('');
  };

  if (!isFaculty) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Student Doubts</h1>
        </div>

        <div className="grid gap-4">
          {pendingDoubts.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No pending doubts at the moment.
              </CardContent>
            </Card>
          ) : (
            pendingDoubts.map((doubt) => (
              <Card key={doubt.id} className="hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{doubt.title}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {doubt.studentName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {doubt.createdAt}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary">{doubt.subject}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{doubt.question}</p>
                  <Button onClick={() => handleViewDoubt(doubt)}>
                    Answer
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Answer Dialog */}
        <Dialog open={!!selectedDoubt} onOpenChange={() => setSelectedDoubt(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedDoubt?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Question from {selectedDoubt?.studentName}:</p>
                <p className="bg-muted p-3 rounded-lg">{selectedDoubt?.question}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Your Answer:</p>
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-[120px]"
                />
              </div>
              <Button onClick={handleSendAnswer} className="w-full">
                Send Answer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FacultyDoubts;
