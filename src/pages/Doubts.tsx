import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  Plus, 
  Star,
  Loader2
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
  teacherID?: number; 
  isRated?: boolean;
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
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [description, setDescription] = useState("");
  
  const [studentId, setStudentId] = useState<number | null>(null);
  const [doubts, setDoubts] = useState<DoubtDto[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const email = localStorage.getItem("emailId");
      if (!email) { setLoading(false); return; }

      try {
        const [studentRes, subjectRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/students/email/${email}`),
          axios.get(`http://localhost:8080/api/subjects`)
        ]);

        setStudentId(studentRes.data.studentId);
        setSubjects(subjectRes.data);
        
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
    const fetchSubjectContext = async () => {
      if (!selectedSubjectId) { 
        setTopics([]); 
        setTeachers([]); 
        return; 
      }

      const selectedSub = subjects.find(s => s.subjectID.toString() === selectedSubjectId);
      if (!selectedSub) return;

      try {
        const topicRes = await axios.get(`http://localhost:8080/api/topics/subject/${selectedSubjectId}`);
        setTopics(Array.isArray(topicRes.data) ? topicRes.data : []);

        const teacherRes = await axios.get(`http://localhost:8080/api/teachers/subject/${selectedSub.subjectName}`);
        setTeachers(Array.isArray(teacherRes.data) ? teacherRes.data : []);
      } catch (error) { 
        console.error("Error fetching subject context:", error);
        setTopics([]);
        setTeachers([]);
      }
    };
    fetchSubjectContext();
  }, [selectedSubjectId, subjects]);



    const handleAskSubmit = async () => {
    const selectedSubObj = subjects.find(s => s.subjectID.toString() === selectedSubjectId);

    if (!studentId || !selectedSubObj || !description || !selectedTeacherId) {
      toast({ 
        title: "Error", 
        description: "Please fill all fields, including selecting a teacher.", 
        variant: "destructive" 
      });
      return;
    }
    const payload = {
      queryAsked: selectedTopicName ? `[${selectedTopicName}] ${description}` : description,
      selectedSubject: selectedSubObj.subjectName,
      studentId: studentId,
      teacherID: Number(selectedTeacherId),
      doubtStatus: "Pending" 
    };

    try {
      console.log("Sending payload:", payload);
      const response = await axios.post("http://localhost:8080/api/doubts", payload);
      
      if (response.status === 201 || response.status === 200) {
        toast({ title: "Success!", description: "Doubt sent successfully!" });
        setIsAskOpen(false);
        setSelectedSubjectId("");
        setSelectedTopicName("");
        setSelectedTeacherId("");
        setDescription("");
        
        const updated = await axios.get(`http://localhost:8080/api/doubts/student/${studentId}`);
        setDoubts(Array.isArray(updated.data) ? updated.data : []);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast({ 
        title: "Submission Failed", 
        description: "Check backend console. Ensure IDs are not null.", 
        variant: "destructive" 
      });
    }
  };



  // const handleRateSubmit = async () => {
  //   const tId = viewDoubt?.teacherID; 
  //   if (!tId) return;

  //   try {
  //     await axios.put(`http://localhost:8080/api/teachers/${tId}/rate`, {}, {
  //       params: { 
  //         rating: rating 
  //       }
  //     });

  //     toast({ title: "Feedback Sent", description: "Teacher rating updated!" });
  //     setViewDoubt(null);
  //     setRating(0);
      
  //   } catch (error) {
  //     console.error("Rating Error:", error);
  //     toast({ 
  //       title: "Error", 
  //       description: "Could not submit rating. Technical error: 415", 
  //       variant: "destructive" 
  //     });
  //   }
  // };
const handleRateSubmit = async () => {
  const tId = viewDoubt?.teacherID; 
  const dId = viewDoubt?.doubtID; // Doubt ID for tracking

  if (!tId || !dId) return;

  try {
    
    await axios.put(`http://localhost:8080/api/teachers/${tId}/rate`, {}, {
      params: { 
        rating: rating 
      }
    });

   
    toast({ title: "Feedback Sent", description: "Teacher rating updated!" });

    
    setDoubts(prev => prev.map(d => 
      d.doubtID === dId ? { ...d, isRated: true } : d
    ));

   
    setViewDoubt(null);
    setRating(0);
    
  } catch (error) {
    
    console.error("Rating Error:", error);
    toast({ 
      title: "Error", 
      description: "Could not submit rating. Technical error: 415", 
      variant: "destructive" 
    });
  }
};
  const stats = {
    total: doubts.length,
    resolved: doubts.filter(d => d.doubtStatus === "Resolved").length,
    pending: doubts.filter(d => d.doubtStatus === "Pending").length,
  };

  if (loading) return (
    <div className="p-20 text-center text-white flex flex-col items-center gap-4">
      <Loader2 className="animate-spin h-10 w-10" />
      <p>Loading your academic profile...</p>
    </div>
  );

return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl text-white">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Academic Doubts</h1>
            <p className="text-zinc-400">Connect with subject experts.</p>
          </div>
          <Dialog open={isAskOpen} onOpenChange={setIsAskOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 bg-[#ef4444] hover:bg-red-600 transition-colors">
                <Plus className="h-5 w-5" /> Ask a Doubt
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#121212] text-white border-zinc-800">
              <DialogHeader>
                <DialogTitle>Ask Question</DialogTitle>
                <DialogDescription className="text-zinc-500">Select subject and teacher to submit your query.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Subject</Label>
                  <select className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm" 
                    value={selectedSubjectId} 
                    onChange={(e) => { setSelectedSubjectId(e.target.value); setSelectedTopicName(""); setSelectedTeacherId(""); }}>
                    <option value="">-- Select Subject --</option>
                    {subjects.map((s) => <option key={s.subjectID} value={s.subjectID}>{s.subjectName}</option>)}
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label>Topic (Optional)</Label>
                  <select className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm disabled:opacity-50" 
                    value={selectedTopicName} 
                    onChange={(e) => setSelectedTopicName(e.target.value)} 
                    disabled={!selectedSubjectId || topics.length === 0}>
                    <option value="">-- Select Topic --</option>
                    {topics.map((t) => <option key={t.topicID} value={t.topicName}>{t.topicName}</option>)}
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label>Select Teacher</Label>
                  <select className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm disabled:opacity-50" 
                    value={selectedTeacherId} 
                    onChange={(e) => setSelectedTeacherId(e.target.value)} 
                    disabled={!selectedSubjectId || teachers.length === 0}>
                    <option value="">-- Select Faculty Member --</option>
                    {teachers.map((t) => (
                      <option key={t.teacherId} value={t.teacherId}>Prof. {t.firstName} {t.lastName}</option>
                    ))}
                  </select>
                  {selectedSubjectId && teachers.length === 0 && (
                    <p className="text-[10px] text-red-500">No faculty assigned to this subject yet.</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Explain your doubt in detail..." className="bg-zinc-900 border-zinc-700" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-[#ef4444] hover:bg-red-600 w-full" onClick={handleAskSubmit}>Submit Doubt</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Questions" count={stats.total} icon={<MessageCircle className="text-blue-500"/>} />
          <CheckCard title="Resolved" count={stats.resolved} icon={<CheckCircle className="text-green-500"/>} />
          <StatCard title="Awaiting Answer" count={stats.pending} icon={<Clock className="text-orange-500"/>} />
        </div>
      </div>

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

      <Dialog open={!!viewDoubt} onOpenChange={(o) => { if(!o) { setViewDoubt(null); setRating(0); } }}>
      




        <DialogContent className="bg-[#121212] text-white border-zinc-800 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{viewDoubt?.selectedSubject}</DialogTitle>
          </DialogHeader>
          
          {viewDoubt && (
            <div className="space-y-6 pt-2">
              {/* Status Badge */}
              <Badge className={viewDoubt.doubtStatus === "Resolved" ? "bg-green-600" : "bg-orange-500"}>
                {viewDoubt.doubtStatus}
              </Badge>

              {/* Student's Question */}
              <div className="space-y-2">
                <Label className="text-zinc-400 uppercase text-[10px] font-bold tracking-widest">Your Question</Label>
                <div className="p-4 bg-zinc-900 rounded-md border border-zinc-800">
                  <p className="text-sm leading-relaxed">{viewDoubt.queryAsked}</p>
                </div>
              </div>

              {/* ONLY ONE CLEAN CONDITION: Is it Resolved or Pending? */}
              {viewDoubt.doubtStatus === "Resolved" ? (
                <div className="space-y-4">
                  
                  {/* Single Faculty Response */}
                  <div className="space-y-2">
                    <Label className="text-green-500 uppercase text-[10px] font-bold tracking-widest">Faculty Response</Label>
                    <div className="p-4 bg-green-900/10 border border-green-800/30 rounded-md">
                      <p className="text-sm text-green-50 leading-relaxed">
                        {viewDoubt.answerProvided || "Solution has been updated. Please check."}
                      </p>
                    </div>
                  </div>

                  {/* Rating Section: Only shows if not already rated */}
                  {!viewDoubt.isRated ? (
                    <div className="pt-4 border-t border-zinc-800 text-center">
                      <p className="text-sm mb-3 font-medium">How helpful was this solution?</p>
                      <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star 
                            key={s} 
                            className={`h-8 w-8 cursor-pointer transition-all ${rating >= s ? "fill-yellow-500 text-yellow-500 scale-110" : "text-zinc-700"}`} 
                            onClick={() => setRating(s)} 
                          />
                        ))}
                      </div>
                      <Button 
                        onClick={handleRateSubmit} 
                        disabled={rating === 0} 
                        className="w-full bg-white text-black hover:bg-zinc-200"
                      >
                        Submit Feedback
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-zinc-800 text-center">
                      <div className="flex items-center justify-center gap-2 text-green-500 py-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <CheckCircle className="h-5 w-5" />
                        <p className="text-sm font-medium">Feedback already submitted!</p>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                /* Pending State View */
                <div className="p-8 bg-zinc-900 border border-zinc-800 text-center rounded-md">
                  <Clock className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
                  <p className="text-sm text-zinc-500 italic">
                    Faculty is currently reviewing your request. Feedback will be available once the status is Resolved.
                  </p>
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
      <div><p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">{title}</p><h3 className="text-3xl font-bold mt-1">{count}</h3></div>{icon}
    </CardContent>
  </Card>
);

// Added missing CheckCard or just use StatCard for consistency
const CheckCard = ({ title, count, icon }: any) => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardContent className="p-6 flex items-center justify-between">
      <div><p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">{title}</p><h3 className="text-3xl font-bold mt-1">{count}</h3></div>{icon}
    </CardContent>
  </Card>
);

const DoubtCard = ({ data, onClick }: any) => (
  <Card onClick={onClick} className="bg-zinc-900 border-zinc-800 cursor-pointer hover:border-[#ef4444] transition-all group mb-4">
    <CardContent className="p-4 flex justify-between items-center">
      <div className="space-y-1">
        <Badge variant="outline" className="text-[10px] text-zinc-500 border-zinc-800 group-hover:text-zinc-300">{data.selectedSubject}</Badge>
        <h4 className="font-semibold text-zinc-100 group-hover:text-white transition-colors">{data.queryAsked}</h4>
        <p className="text-[10px] text-zinc-500">{data.date ? new Date(data.date).toLocaleDateString() : 'N/A'}</p>
      </div>
      <Badge className={data.doubtStatus === "Resolved" ? "bg-green-600" : "bg-orange-500"}>{data.doubtStatus}</Badge>
    </CardContent>
  </Card>
);

export default Doubts;