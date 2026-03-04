import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  Plus, 
  Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// --- Interfaces matching Java Backend ---
interface SubjectDto {
  subjectID: number;     
  subjectName: string;
}

interface TopicDto {
  topicID: number;       
  topicName: string;
}

interface TeacherDto {
  teacherId: number; 
  subjectAssociated: string;
  firstName: string;
  lastName: string;
}

interface DoubtDto {
  doubtID?: number;
  doubtStatus?: string; 
  date?: string;
  queryAsked: string;
  answerProvided?: string;
  selectedSubject: string;
  studentId: number;
  teacherId?: number; // Backend might send teacherId
  teacherID?: number; // Backend might send teacherID (matches Entity)
}

const Doubts = () => {
  const { toast } = useToast();
  
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [viewDoubt, setViewDoubt] = useState<DoubtDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0); 

  const [subjects, setSubjects] = useState<SubjectDto[]>([]);
  const [topics, setTopics] = useState<TopicDto[]>([]);
  const [teachers, setTeachers] = useState<TeacherDto[]>([]);
  
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [selectedTopicName, setSelectedTopicName] = useState("");
  const [description, setDescription] = useState("");
  
  const [studentId, setStudentId] = useState<number | null>(null);
  const [doubts, setDoubts] = useState<DoubtDto[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const email = localStorage.getItem("emailId");
      if (!email) { setLoading(false); return; }

      try {
        const [studentRes, subjectRes, teacherRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/students/email/${email}`),
          axios.get(`http://localhost:8080/api/subjects`),
          axios.get(`http://localhost:8080/api/teachers`)
        ]);

        setStudentId(studentRes.data.studentId);
        setSubjects(subjectRes.data);
        setTeachers(teacherRes.data);
        
        const doubtRes = await axios.get(`http://localhost:8080/api/doubts/student/${studentRes.data.studentId}`);
        setDoubts(Array.isArray(doubtRes.data) ? doubtRes.data : []);
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      if (!selectedSubjectId) { setTopics([]); return; }
      try {
        const res = await axios.get(`http://localhost:8080/api/topics/subject/${selectedSubjectId}`);
        setTopics(Array.isArray(res.data) ? res.data : []);
      } catch (error) { setTopics([]); }
    };
    fetchTopics();
  }, [selectedSubjectId]);

const handleAskSubmit = async () => {
    const selectedSubObj = subjects.find(s => s.subjectID.toString() === selectedSubjectId);
    
    if (!studentId || !selectedSubObj || !description) {
      toast({ title: "Error", description: "Please fill required fields.", variant: "destructive" });
      return;
    }

    // ROBUST TEACHER LOOKUP: Trim whitespace and ignore case
    const targetSubject = selectedSubObj.subjectName.trim().toLowerCase();
    const associatedTeacher = teachers.find(t => 
      t.subjectAssociated.trim().toLowerCase() === targetSubject
    );

    if (!associatedTeacher) {
      toast({ 
        title: "Teacher Assignment Error", 
        description: `No faculty is currently assigned to the subject: ${selectedSubObj.subjectName}`, 
        variant: "destructive" 
      });
      return;
    }

    const payload: DoubtDto = {
      queryAsked: selectedTopicName ? `[${selectedTopicName}] ${description}` : description,
      selectedSubject: selectedSubObj.subjectName,
      studentId: studentId,
      teacherId: associatedTeacher.teacherId, // Using lowercase 'd' from TeacherDto
      doubtStatus: "Pending"
    };

    try {
      const response = await axios.post("http://localhost:8080/api/doubts", payload);
      if (response.status === 201 || response.status === 200) {
        toast({ title: "Success!", description: `Doubt sent to Prof. ${associatedTeacher.lastName}` });
        setIsAskOpen(false);
        setSelectedSubjectId("");
        setSelectedTopicName("");
        setDescription("");
        
        const updated = await axios.get(`http://localhost:8080/api/doubts/student/${studentId}`);
        setDoubts(Array.isArray(updated.data) ? updated.data : []);
      }
    } catch (error) {
      toast({ title: "Submission Failed", description: "Backend error while saving doubt.", variant: "destructive" });
    }
  };

  // const handleRateSubmit = async () => {
  //   // Robust check for ID (handles teacherId or teacherID from JSON)
  //   const tId = viewDoubt?.teacherId || viewDoubt?.teacherID;

  //   if (!tId) {
  //     toast({ title: "Error", description: "Teacher ID missing. Please check backend DTO.", variant: "destructive" });
  //     return;
  //   }

  //   try {
  //     await axios.post(`http://localhost:8080/api/teachers/${tId}/rate`, {
  //       rating: rating
  //     });

  //     toast({ title: "Success!", description: `Rated ${rating} stars.` });
  //     setViewDoubt(null);
  //     setRating(0);
  //   } catch (error) {
  //     toast({ title: "Rating Failed", description: "Backend refused the request.", variant: "destructive" });
  //   }
  // };

  const handleRateSubmit = async () => {
  const tId = viewDoubt?.teacherId || viewDoubt?.teacherID;
  if (!tId) return;

  try {
    // We only send the NEW rating. 
    // The backend handles the "maintenance" of the average and count.
    await axios.put(`http://localhost:8080/api/teachers/${tId}/rate`, {
      rating: rating // e.g., 5
    });

    toast({ title: "Feedback Sent", description: "Teacher rating updated!" });
    setViewDoubt(null);
  } catch (error) {
    toast({ title: "Error", variant: "destructive" });
  }
};
  const stats = {
    total: doubts.length,
    resolved: doubts.filter(d => d.doubtStatus === "Resolved").length,
    pending: doubts.filter(d => d.doubtStatus === "Pending").length,
  };

  if (loading) return <div className="p-20 text-center text-white">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl text-white">
      {/* HEADER */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Academic Doubts</h1>
            <p className="text-zinc-400">Connect with subject experts.</p>
          </div>
          <Dialog open={isAskOpen} onOpenChange={setIsAskOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 bg-[#ef4444] hover:bg-red-600">
                <Plus className="h-5 w-5" /> Ask a Doubt
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#121212] text-white border-zinc-800">
              <DialogHeader>
                <DialogTitle>Ask Question</DialogTitle>
                <DialogDescription className="text-zinc-500">Provide details about your query.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Subject</Label>
                  <select className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" value={selectedSubjectId} onChange={(e) => { setSelectedSubjectId(e.target.value); setSelectedTopicName(""); }}>
                    <option value="">-- Select Subject --</option>
                    {subjects.map((s) => <option key={s.subjectID} value={s.subjectID}>{s.subjectName}</option>)}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label>Topic</Label>
                  <select className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm disabled:opacity-50" value={selectedTopicName} onChange={(e) => setSelectedTopicName(e.target.value)} disabled={!selectedSubjectId || topics.length === 0}>
                    <option value="">-- Select Topic --</option>
                    {topics.map((t) => <option key={t.topicID} value={t.topicName}>{t.topicName}</option>)}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe..." className="bg-zinc-900 border-zinc-700" rows={4} />
                </div>
              </div>
              <DialogFooter><Button className="bg-[#ef4444] hover:bg-red-600" onClick={handleAskSubmit}>Submit</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total" count={stats.total} icon={<MessageCircle className="text-blue-500"/>} />
          <StatCard title="Resolved" count={stats.resolved} icon={<CheckCircle className="text-green-500"/>} />
          <StatCard title="Pending" count={stats.pending} icon={<Clock className="text-orange-500"/>} />
        </div>
      </div>

      {/* LIST TABS */}
      <Tabs defaultValue="all">
        <TabsList className="bg-zinc-900 border-zinc-800">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        <div className="mt-4 space-y-4">
          <TabsContent value="all">{doubts.map(d => <DoubtCard key={`all-${d.doubtID}`} data={d} onClick={() => setViewDoubt(d)} />)}</TabsContent>
          <TabsContent value="pending">{doubts.filter(d => d.doubtStatus === "Pending").map(d => <DoubtCard key={`p-${d.doubtID}`} data={d} onClick={() => setViewDoubt(d)} />)}</TabsContent>
          <TabsContent value="resolved">{doubts.filter(d => d.doubtStatus === "Resolved").map(d => <DoubtCard key={`r-${d.doubtID}`} data={d} onClick={() => setViewDoubt(d)} />)}</TabsContent>
        </div>
      </Tabs>

      {/* VIEW MODAL (WITH ACCESSIBILITY FIXES) */}
      <Dialog open={!!viewDoubt} onOpenChange={(o) => { if(!o) { setViewDoubt(null); setRating(0); } }}>
        <DialogContent className="bg-[#121212] text-white border-zinc-800 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{viewDoubt?.selectedSubject || "Doubt Details"}</DialogTitle>
            <DialogDescription className="text-zinc-500">View resolution and rate faculty performance.</DialogDescription>
          </DialogHeader>
          
          {viewDoubt && (
            <div className="space-y-6 pt-2">
              <Badge className={viewDoubt.doubtStatus === "Resolved" ? "bg-green-600" : "bg-orange-500"}>
                {viewDoubt.doubtStatus}
              </Badge>

              <div className="space-y-2">
                <Label className="text-zinc-400 uppercase text-[10px] font-bold">Query Asked</Label>
                <div className="p-4 bg-zinc-900 rounded-md border border-zinc-800">
                  <p className="text-sm">{viewDoubt.queryAsked}</p>
                </div>
              </div>

              {viewDoubt.answerProvided ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-green-500 uppercase text-[10px] font-bold">Faculty Answer</Label>
                    <div className="p-4 bg-green-900/10 border border-green-800/30 rounded-md">
                      <p className="text-sm text-green-50">{viewDoubt.answerProvided}</p>
                    </div>
                  </div>

                  {/* Rating Logic */}
                  <div className="pt-4 border-t border-zinc-800 text-center">
                    <p className="text-sm mb-3">Rate this solution</p>
                    <div className="flex justify-center gap-2 mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s}
                          className={`h-8 w-8 cursor-pointer ${rating >= s ? "fill-yellow-500 text-yellow-500" : "text-zinc-700"}`}
                          onClick={() => setRating(s)}
                        />
                      ))}
                    </div>
                    <Button onClick={handleRateSubmit} disabled={rating === 0} className="w-full bg-white text-black hover:bg-zinc-200">
                      Submit Feedback
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-zinc-900 border border-zinc-800 text-center rounded-md">
                  <p className="text-sm text-zinc-500 italic">Solution pending from faculty...</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const StatCard = ({ title, count, icon }: any) => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardContent className="p-6 flex items-center justify-between">
      <div><p className="text-sm text-zinc-400">{title}</p><h3 className="text-3xl font-bold">{count}</h3></div>{icon}
    </CardContent>
  </Card>
);

const DoubtCard = ({ data, onClick }: any) => (
  <Card onClick={onClick} className="bg-zinc-900 border-zinc-800 cursor-pointer hover:border-red-500 transition-colors">
    <CardContent className="p-4 flex justify-between items-center">
      <div className="space-y-1">
        <Badge variant="outline" className="text-zinc-500 border-zinc-800">{data.selectedSubject}</Badge>
        <h4 className="font-semibold">{data.queryAsked}</h4>
      </div>
      <Badge className={data.doubtStatus === "Resolved" ? "bg-green-600" : "bg-orange-500"}>{data.doubtStatus}</Badge>
    </CardContent>
  </Card>
);

export default Doubts;