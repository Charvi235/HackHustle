import { useState, useEffect } from 'react'; 
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


  // Naye state variables dynamic data ke liye
  const [dashboardStats, setDashboardStats] = useState({
    rating: 0,
    doubtsSolved: 0,
    studentsMentored: 0
  });
  const [solvedDoubtsList, setSolvedDoubtsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const email = localStorage.getItem('emailId'); // Teacher ka email
  //       const token = localStorage.getItem('token'); // Agar auth token hai toh

  //       // 1. Apne backend URL ko yahan update kar lena
  //       // const response = await fetch(`http://localhost:8080/api/teachers/dashboard?email=${email}`, {
  //       //   headers: {
  //       //     'Authorization': `Bearer ${token}` // Agar spring security me zaroorat hai
  //       //   }
  //       // });
  //       const response = await fetch(`http://localhost:8080/api/teachers/email/${email}`);

  //       if (response.ok) {
  //         const data = await response.json();
  //         // Backend se jo data aayega usko state me set kar do
  //         setDashboardStats({
  //           rating: data.rating || 0,
  //           doubtsSolved: data.doubtsSolved || 0,
  //           studentsMentored: data.studentsMentored || 0
  //         });
  //         setSolvedDoubtsList(data.recentDoubts || []);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching dashboard data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []); // Empty array ka matlab hai ye sirf page load hone par ek baar chalega
 
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const email = localStorage.getItem('emailId'); 
        if (!email) return;

        // 1. Get Teacher Details (Rating aur ID nikalne ke liye)
        const teacherResponse = await fetch(`http://localhost:8080/api/teachers/email/${email}`);
        
        if (teacherResponse.ok) {
          const teacherData = await teacherResponse.json();
          const teacherId = teacherData.teacherID || teacherData.teacherId; 

          // 2. Ab Teacher ID se Doubts fetch karo
          const doubtsResponse = await fetch(`http://localhost:8080/api/doubts/teacher/${teacherId}`);
          
          let doubtsData = [];
          
          if (doubtsResponse.ok) {
            doubtsData = await doubtsResponse.json();
          } else if (doubtsResponse.status === 404) {
            // 🚨 FIX: Agar 404 aaya, toh matlab list khali hai (error nahi hai)
            doubtsData = [];
          }

          // 3. Stats Calculate karo
          // Backend me status 'doubtStatus' me aata hai
          const resolvedDoubts = doubtsData.filter((d: any) => 
            d.doubtStatus && d.doubtStatus.toLowerCase() === 'resolved'
          );

          // Unique students (Backend studentId bhej raha hai, studentName nahi)
          const uniqueStudentIds = new Set(resolvedDoubts.map((d: any) => d.studentId));

          setDashboardStats({
            rating: teacherData.rating || 0.0,
            doubtsSolved: resolvedDoubts.length,     // Count dynamic ho gaya
            studentsMentored: uniqueStudentIds.size  // Count dynamic ho gaya
          });

          // 4. List mapping (Backend DTO ke variables use kar rahe hain)
          const formattedDoubts = resolvedDoubts.map((d: any) => ({
            id: d.doubtID,
            title: d.queryAsked ? d.queryAsked.substring(0, 30) + "..." : "Doubt Resolved", 
            studentName: `Student #${d.studentId}`, // Name ki jagah ID dikhayenge kyunki backend name nahi bhej raha
            subject: d.selectedSubject || 'General',
            resolvedAt: d.date
          }));

          setSolvedDoubtsList(formattedDoubts);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Mock doubts data(will convert later)
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
              {/* <span className="text-3xl font-bold">{user?.rating || 4.5}</span> */}
              <span className="text-3xl font-bold">{dashboardStats.rating.toFixed(1)}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= dashboardStats.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
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
             
              <span className="text-3xl font-bold">{dashboardStats.doubtsSolved}</span>
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
             
              <span className="text-3xl font-bold">{dashboardStats.studentsMentored}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Doubts Section */}
      
       
            
           
      {/* View Doubt Modal */}
      {/* <Dialog open={!!selectedDoubt} onOpenChange={() => setSelectedDoubt(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            
      </Dialog> */} 
      <Card>
        <CardHeader>
          <CardTitle>Recently Solved Doubts</CardTitle>
          <CardDescription>
            History of doubts you have answered
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Dynamic Data for Solved Doubts */}
            {solvedDoubtsList.length === 0 ? (
              <p className="text-muted-foreground">No recently solved doubts.</p>
            ) : (
              solvedDoubtsList.map((doubt: any) => (
                <div key={doubt.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  
                  {/* Doubt Details */}
                  <div>
                    <h4 className="font-semibold text-sm">{doubt.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{doubt.studentName}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>{doubt.subject}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>{doubt.resolvedAt ? new Date(doubt.resolvedAt).toLocaleDateString() : 'Recently'}</span>
                    </div>
                  </div>

                  {/* Solved Badge */}
                  <div className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                    SOLVED
                  </div>

                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
