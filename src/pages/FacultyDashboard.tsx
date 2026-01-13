import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, CheckCircle, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Doubt {
  id: string;
  title: string;
  studentName: string;
  question: string;
  subject: string;
  status: 'pending' | 'resolved';
}

const FacultyDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);
  const [answer, setAnswer] = useState('');

  // Mock doubts data
  const [doubts, setDoubts] = useState<Doubt[]>([
    {
      id: '1',
      title: 'what is normalization',
      studentName: 'Student A',
      question: 'Can you explain what normalization is in database design?',
      subject: 'Database Management',
      status: 'pending',
    },
    {
      id: '2',
      title: 'what is time complexity of graph',
      studentName: 'Student B',
      question: 'What is the time complexity of graph traversal algorithms?',
      subject: 'Data Structures',
      status: 'pending',
    },
  ]);

  const handleViewDoubt = (doubt: Doubt) => {
    setSelectedDoubt(doubt);
    setAnswer('');
  };

  const handleSendAnswer = () => {
    if (!answer.trim()) {
      toast({ title: 'Please write an answer', variant: 'destructive' });
      return;
    }

    // TODO: Send answer to database
    setDoubts(doubts.map(d => 
      d.id === selectedDoubt?.id ? { ...d, status: 'resolved' as const } : d
    ));
    
    toast({ title: 'Answer sent successfully!' });
    setSelectedDoubt(null);
    setAnswer('');
  };

  const pendingDoubts = doubts.filter(d => d.status === 'pending');

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Faculty Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Rating Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">My Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{user?.rating || 4.5}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= (user?.rating || 4.5)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doubts Solved Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Doubts Solved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <span className="text-3xl font-bold">{user?.stats?.doubtsSolved || 450}</span>
            </div>
          </CardContent>
        </Card>

        {/* Students Mentored Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students Mentored</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{user?.stats?.studentsMentored || 120}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Doubts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Student Doubts</CardTitle>
          <CardDescription>
            {pendingDoubts.length} doubt(s) awaiting your response
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingDoubts.length === 0 ? (
              <p className="text-muted-foreground">No pending doubts at the moment.</p>
            ) : (
              pendingDoubts.map((doubt) => (
                <Card key={doubt.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{doubt.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          from {doubt.studentName}
                        </p>
                        <Badge variant="secondary">{doubt.subject}</Badge>
                      </div>
                      <Button onClick={() => handleViewDoubt(doubt)} size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Doubt Modal */}
      <Dialog open={!!selectedDoubt} onOpenChange={() => setSelectedDoubt(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedDoubt?.title}</DialogTitle>
            <DialogDescription>
              From {selectedDoubt?.studentName} • {selectedDoubt?.subject}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Student's Question:</h4>
              <p className="text-muted-foreground">{selectedDoubt?.question}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Your Answer:</h4>
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-[200px]"
              />
            </div>

            <Button onClick={handleSendAnswer} className="w-full">
              Send Answer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FacultyDashboard;
