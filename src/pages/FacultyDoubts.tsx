// import { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Textarea } from '@/components/ui/textarea';
// import { useToast } from '@/hooks/use-toast';
// import { MessageSquare, Clock, User } from 'lucide-react';

// interface Doubt {
//   id: string;
//   title: string;
//   studentName: string;
//   question: string;
//   subject: string;
//   status: 'pending' | 'resolved';
//   createdAt: string;
// }

// const FacultyDoubts = () => {
//   const { user, isFaculty } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();
  
//   const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);
//   const [answer, setAnswer] = useState('');

//   // Mock data for doubts
//   const [doubts] = useState<Doubt[]>([
//     {
//       id: '1',
//       title: 'Array vs ArrayList Difference',
//       studentName: 'Charvi',
//       question: 'What is the main difference between Array and ArrayList in Java?',
//       subject: 'DSA',
//       status: 'pending',
//       createdAt: '2024-01-10'
//     },
//     {
//       id: '2',
//       title: 'Time Complexity of QuickSort',
//       studentName: 'Rahul',
//       question: 'Why is QuickSort O(n log n) in average case but O(n²) in worst case?',
//       subject: 'DSA',
//       status: 'pending',
//       createdAt: '2024-01-09'
//     },
//     {
//       id: '3',
//       title: 'Stack vs Queue',
//       studentName: 'Priya',
//       question: 'Can you explain when to use Stack and when to use Queue?',
//       subject: 'DSA',
//       status: 'pending',
//       createdAt: '2024-01-08'
//     },
//   ]);

//   const pendingDoubts = doubts.filter(d => d.status === 'pending');

//   const handleViewDoubt = (doubt: Doubt) => {
//     setSelectedDoubt(doubt);
//     setAnswer('');
//   };

//   const handleSendAnswer = () => {
//     if (!answer.trim()) {
//       toast({ title: 'Please enter an answer', variant: 'destructive' });
//       return;
//     }
//     toast({ title: 'Answer sent successfully!' });
//     setSelectedDoubt(null);
//     setAnswer('');
//   };

//   if (!isFaculty) {
//     navigate('/dashboard');
//     return null;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 pt-24">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center gap-3 mb-6">
//           <MessageSquare className="h-8 w-8 text-primary" />
//           <h1 className="text-3xl font-bold">Student Doubts</h1>
//         </div>

//         <div className="grid gap-4">
//           {pendingDoubts.length === 0 ? (
//             <Card>
//               <CardContent className="py-8 text-center text-muted-foreground">
//                 No pending doubts at the moment.
//               </CardContent>
//             </Card>
//           ) : (
//             pendingDoubts.map((doubt) => (
//               <Card key={doubt.id} className="hover:border-primary/50 transition-colors">
//                 <CardHeader className="pb-2">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <CardTitle className="text-lg">{doubt.title}</CardTitle>
//                       <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
//                         <span className="flex items-center gap-1">
//                           <User className="h-4 w-4" />
//                           {doubt.studentName}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Clock className="h-4 w-4" />
//                           {doubt.createdAt}
//                         </span>
//                       </div>
//                     </div>
//                     <Badge variant="secondary">{doubt.subject}</Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-muted-foreground mb-4">{doubt.question}</p>
//                   <Button onClick={() => handleViewDoubt(doubt)}>
//                     Answer
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>

//         {/* Answer Dialog */}
//         <Dialog open={!!selectedDoubt} onOpenChange={() => setSelectedDoubt(null)}>
//           <DialogContent className="max-w-lg">
//             <DialogHeader>
//               <DialogTitle>{selectedDoubt?.title}</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">Question from {selectedDoubt?.studentName}:</p>
//                 <p className="bg-muted p-3 rounded-lg">{selectedDoubt?.question}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground mb-2">Your Answer:</p>
//                 <Textarea
//                   value={answer}
//                   onChange={(e) => setAnswer(e.target.value)}
//                   placeholder="Type your answer here..."
//                   className="min-h-[120px]"
//                 />
//               </div>
//               <Button onClick={handleSendAnswer} className="w-full">
//                 Send Answer
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default FacultyDoubts;



import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Clock, Loader2, AlertCircle } from 'lucide-react';

interface DoubtDto {
  doubtID: number;
  doubtStatus: string;
  date: string;
  queryAsked: string;
  answerProvided: string;
  studentId: number;
  teacherID: number;
  selectedSubject: string;
}

const FacultyDoubts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [doubts, setDoubts] = useState<DoubtDto[]>([]);
  const [selectedDoubt, setSelectedDoubt] = useState<DoubtDto | null>(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    const fetchInitialData = async () => {
      const email = localStorage.getItem("emailId");
      if (!email) {
        setDebugInfo("No email found in localStorage. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        // 1. Fetch Teacher Profile
        const teacherRes = await axios.get(`http://localhost:8080/api/teachers/email/${email}`);
        
        // 2. Extract ID (Checking all possible naming variants)
        const tId = teacherRes.data.teacherID || teacherRes.data.teacherId;
        
        if (!tId) {
          setDebugInfo(`Teacher found for ${email}, but ID field is missing in response.`);
          setLoading(false);
          return;
        }

        // 3. Fetch Doubts for this ID
        // Note: Your backend DoubtRepository.findByTeacher_TeacherIDAndDoubtStatus uses "Pending"
        const doubtRes = await axios.get(`http://localhost:8080/api/doubts/teacher/${tId}`);
        
        if (Array.isArray(doubtRes.data)) {
          setDoubts(doubtRes.data);
          if (doubtRes.data.length === 0) {
            setDebugInfo(`Connected to API. Teacher ID ${tId} has 0 'Pending' doubts in DB.`);
          }
        }
      } catch (error: any) {
        console.error("Fetch error:", error);
        setDebugInfo(`API Error: ${error.response?.status || "Network Error"}. Check if backend is running.`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSendAnswer = async () => {
    if (!answer.trim() || !selectedDoubt) return;

    try {
      const payload = {
        doubtID: selectedDoubt.doubtID,
        answerProvided: answer,
        doubtStatus: "Resolved" 
      };

      await axios.put(`http://localhost:8080/api/doubts/update`, payload);
      toast({ title: 'Success', description: 'Answer submitted!' });
      
      setDoubts(prev => prev.filter(d => d.doubtID !== selectedDoubt.doubtID));
      setSelectedDoubt(null);
      setAnswer('');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update doubt.', variant: 'destructive' });
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-black">
        <Loader2 className="animate-spin text-red-500 h-10 w-10" />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 pt-24 min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold">Student Doubts</h1>
          </div>
          {doubts.length > 0 && <Badge className="bg-red-600">{doubts.length} New</Badge>}
        </div>

        {/* DEBUG ALERT: Only shows if no doubts are found */}
        {doubts.length === 0 && debugInfo && (
          <div className="mb-6 p-4 bg-zinc-900 border border-yellow-700/50 rounded-lg flex items-start gap-3 text-yellow-500/80 text-sm">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{debugInfo}</p>
          </div>
        )}

        <div className="grid gap-4">
          {doubts.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="py-16 text-center text-zinc-500">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">Your inbox is empty</p>
                <p className="text-sm">New student queries for your subject will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            doubts.map((doubt) => (
              <Card key={doubt.doubtID} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="text-red-400 border-red-900/50">{doubt.selectedSubject}</Badge>
                    <span className="text-xs text-zinc-500">{new Date(doubt.date).toLocaleDateString()}</span>
                  </div>
                  <CardTitle className="text-lg mt-3 text-zinc-200">{doubt.queryAsked}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setSelectedDoubt(doubt)} className="bg-white text-black hover:bg-zinc-200 font-semibold">
                    Resolve Now
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Answer Modal */}
        <Dialog open={!!selectedDoubt} onOpenChange={() => setSelectedDoubt(null)}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle>Reply to Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-4 bg-black rounded-md border border-zinc-800">
                <p className="text-xs text-zinc-500 uppercase font-bold mb-2">Question:</p>
                <p className="text-sm text-zinc-300">{selectedDoubt?.queryAsked}</p>
              </div>
              <Textarea 
                placeholder="Type your explanation..." 
                className="bg-black border-zinc-800 min-h-[150px] focus:border-red-500 transition-colors"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <Button onClick={handleSendAnswer} className="w-full bg-red-600 hover:bg-red-700 py-6 text-lg font-bold">
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
