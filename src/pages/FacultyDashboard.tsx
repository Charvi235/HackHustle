import { useState, useEffect } from 'react'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, Users, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


interface Doubt {
  doubtID: number;
  doubtStatus: string; // "Pending" or "Resolved"
  queryAsked: string;
  answerProvided: string;
  studentId: number;
  teacherID: number;
  selectedSubject: string;
  date: string;
}

const FacultyDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [solvedDoubtsList, setSolvedDoubtsList] = useState<Doubt[]>([]);
  const [studentNames, setStudentNames] = useState<Record<number, string>>({});
  const [dashboardStats, setDashboardStats] = useState({
    rating: 0,
    doubtsSolved: 0,
    studentsMentored: 0
  });
  // 🔥 NAYA FUNCTION: Bulk Fetch All Students
  const fetchAllStudentNames = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/students');
      if (res.ok) {
        const studentsArray = await res.json();
        const namesMap: Record<number, string> = {};
        
        // Loop through all students and save their names against their IDs
        studentsArray.forEach((student: any) => {
          const id = student.studentId || student.id;
          
          // Fiza ne jo bhi field name rakha ho (firstName ya name), ye usko handle kar lega
          const fullName = student.firstName 
            ? `${student.firstName} ${student.lastName || ''}`.trim() 
            : student.studentName || student.name || `Student #${id}`;
            
          if (id) {
            namesMap[id] = fullName;
          }
        });
        
        setStudentNames(namesMap);
      }
    } catch (e) {
      console.error("Failed to load student names", e);
    }
  };
  const fetchResolvedData = async () => {
    setIsLoading(true);
    try {
      const email = localStorage.getItem('emailId'); 
      if (!email) return;
      const teacherRes = await fetch(`http://localhost:8080/api/teachers/email/${email}`);
      if (!teacherRes.ok) throw new Error("Teacher not found");
      const teacherData = await teacherRes.json();
      const tId = teacherData.teacherId; 
      const response = await fetch(`http://localhost:8080/api/doubts/teacher/${tId}/resolved`);     
      if (response.ok) {
        const allDoubts: Doubt[] = await response.json();
        const resolvedOnly = allDoubts.filter(d => d.doubtStatus === "Resolved");
        const uniqueStudents = new Set(resolvedOnly.map(d => d.studentId));
        setDashboardStats({
          rating: teacherData.rating || 0.0,
          doubtsSolved: resolvedOnly.length,
          studentsMentored: uniqueStudents.size
        });
        setSolvedDoubtsList(resolvedOnly);
        
      }
    } catch (error) {
      console.error("Error fetching resolved doubts:", error);
      toast({ title: "Failed to load solved history", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchResolvedData();
    fetchAllStudentNames();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Faculty Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">My Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{dashboardStats.rating.toFixed(1)}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= Math.round(dashboardStats.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

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
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-muted/10">
          <div className="flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Recently Solved Doubts</CardTitle>
              <CardDescription>
                Viewing all queries you have successfully resolved.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-center py-4">Loading your history...</p>
            ) : solvedDoubtsList.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No resolved doubts found in your history.</p>
              </div>
            ) : (
              solvedDoubtsList.map((doubt) => (
                <div 
                  key={doubt.doubtID} 
                  className="flex flex-col md:flex-row md:items-center justify-between p-5 border rounded-xl bg-card hover:bg-muted/20 transition-all border-l-4 border-l-green-500"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs font-semibold">
                        {doubt.selectedSubject}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {new Date(doubt.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-foreground">
                      {doubt.queryAsked}
                    </h4>
                    <p className="text-sm text-muted-foreground italic">
                      <span className="font-medium not-italic text-primary">Ans: </span> 
                      {doubt.answerProvided}
                    </p>
                    {/* <div className="flex items-center gap-2 pt-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        S
                      </div>
                      <span className="text-xs text-muted-foreground">Student ID: {doubt.studentId}</span>
                    </div> */}
                    <div className="flex items-center gap-2 pt-2">
  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary uppercase">
    {/* Ye student ke naam ka pehla letter nikalega */}
    {(studentNames[doubt.studentId] || 'S')[0]}
  </div>
  <span className="text-xs text-muted-foreground font-medium">
    {/* Ye ID ki jagah naam print karega */}
    {studentNames[doubt.studentId] || `Loading Name... (ID: ${doubt.studentId})`}
  </span>
</div>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 px-3 py-1">
                      RESOLVED
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/5 py-4 flex justify-center">
          <Button variant="ghost" size="sm" onClick={fetchResolvedData}>
            Refresh History
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
