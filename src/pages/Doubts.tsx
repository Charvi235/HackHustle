// // import { useState } from 'react';
// // import { 
// //   MessageCircle, 
// //   CheckCircle, 
// //   Clock, 
// //   Plus, 
// //   Star,
// //  // Search, 
// //   MoreVertical 
// // } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Input } from '@/components/ui/input';
// // import { Badge } from '@/components/ui/badge';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// //   DialogFooter,
// // } from "@/components/ui/dialog";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { useToast } from "@/hooks/use-toast";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // const Doubts = () => {
// //   const { toast } = useToast();
// //   const [isAskOpen, setIsAskOpen] = useState(false);
// //   const [viewDoubt, setViewDoubt] = useState(null); // Kaunsa doubt khula h
// //   const [rating, setRating] = useState(0); // Rating ke liye
  
// //   // 👇 Ye 3 lines add karo
// //   const [selectedSubject, setSelectedSubject] = useState("");
// //   const [selectedTopic, setSelectedTopic] = useState("");
// //   const [description, setDescription] = useState("");
  
  
// //   // title hata kar ye use karenge
// //     // ✅ DATA: Yahan apne Subjects aur Topics add kar lena
// // const subjectsData: Record<string, string[]> = {
// //   "Data Structures & Algo": ["Arrays & Strings", "Linked List", "Trees & Graphs", "Dynamic Programming", "Recursion"],
// //   "Web Development": ["HTML/CSS", "React.js", "Node.js / Express", "Database (MongoDB/SQL)", "API Integration"],
// //   "Operating Systems": ["Process Management", "Memory Management", "Deadlocks", "File Systems"],
// //   "Computer Networks": ["OSI Model", "TCP/IP", "IP Addressing", "Routing Protocols"],
// //   "General / Other": ["Interview Queries", "Resume Review", "Career Guidance"]
// // };

  
// //   const [doubts, setDoubts] = useState([
// //     { 
// //       id: 1, 
// //       title: "Graph DP Problem stuck", 
// //       subject: "Data Structures & Algo", 
// //       topic: "Dynamic Programming", 
// //       status: "Resolved", 
// //       date: "2 hours ago", 
// //       desc: "I am trying to solve the Dijkstra algorithm but getting TLE.",
// //       // 👇 Ye nayi line add karni thi
// //       solution: "You need to use a Priority Queue (Min-Heap) instead of a normal Queue to get O(E log V) complexity." 
// //     },
// //     { 
// //       id: 2, 
// //       title: "React useEffect loop", 
// //       subject: "Web Development", 
// //       topic: "React.js", 
// //       status: "Pending", 
// //       date: "5 hours ago", 
// //       desc: "My useEffect is running infinite times, how to fix dependency array?",
// //       solution: null // Pending doubts ke liye null rakho
// //     },
// //     { 
// //       id: 3, 
// //       title: "Spring Boot CORS Error", 
// //       subject: "Web Development", 
// //       topic: "API Integration", 
// //       status: "Pending", 
// //       date: "1 day ago", 
// //       desc: "Getting 403 Forbidden even after adding @CrossOrigin annotation.",
// //       solution: null
// //     },
// //   ]);
// //   const [newDoubt, setNewDoubt] = useState({ title: '', description: '' });

// //   // Stats Calculation
// //   const totalDoubts = doubts.length;
// //   const resolvedDoubts = doubts.filter(d => d.status === "Resolved").length;
// //   const pendingDoubts = doubts.filter(d => d.status === "Pending").length;

// // //   const handleAskSubmit = () => {
// // //     if(!newDoubt.title || !newDoubt.description) return;

// // //     // Add to list (Simulation)
// // //     const newEntry = {
// // //       id: doubts.length + 1,
// // //       title: newDoubt.title,
// // //       status: "Pending",
// // //       date: "Just now",
// // //       desc: newDoubt.description
// // //     };
    
// // //     setDoubts([newEntry, ...doubts]);
// // //     setIsAskOpen(false);
// // //     setNewDoubt({ title: '', description: '' });
    
// // //     toast({
// // //       title: "Doubt Posted!",
// // //       description: "Faculty will review it shortly.",
// // //     });
// // //   };
// // const handleAskSubmit = () => {
// //     // Validation check
// //     if(!selectedSubject || !selectedTopic || !description) {
// //        toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
// //        return;
// //     }

   
// //     const newEntry = {
// //       id: doubts.length + 1,
// //       title: `${selectedSubject} - ${selectedTopic}`,
// //       subject: selectedSubject,   
// //       topic: selectedTopic,       
// //       status: "Pending",
// //       date: "Just now",
// //       desc: description,
// //       solution: null             
// //     };

// //     setDoubts([newEntry, ...doubts]);
// //     setIsAskOpen(false);
    
// //     // Reset Form
// //     setSelectedSubject("");
// //     setSelectedTopic("");
// //     setDescription("");
    
// //     toast({
// //       title: "Doubt Posted!",
// //       description: "Faculty will review it shortly.",
// //     });
// //   };
// // // 👇 Ye function add karo
// //   const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     setSelectedSubject(e.target.value);
// //     setSelectedTopic(""); // Subject change hote hi Topic reset ho jayega
// //   };
// //   return (
// //     <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
      
// //       {/* 1. HEADER & STATS SECTION */}
// //       <div className="flex flex-col gap-6 mb-8">
// //         <div className="flex justify-between items-center">
// //           <div>
// //             <h1 className="text-3xl font-bold tracking-tight">Student Doubts</h1>
// //             <p className="text-muted-foreground">Ask questions, get answers, and clear concepts.</p>
// //           </div>

// //           {/* Ask Doubt Button (Opens Popup) */}
// //           {/* ✅ ASK DOUBT POPUP START */}
// //           <Dialog open={isAskOpen} onOpenChange={setIsAskOpen}>
// //             <DialogTrigger asChild>
// //               <Button size="lg" className="gap-2 shadow-md">
// //                 <Plus className="h-5 w-5" /> Ask a Doubt
// //               </Button>
// //             </DialogTrigger>
// //             <DialogContent className="sm:max-w-[500px]">
// //               <DialogHeader>
// //                 <DialogTitle>Ask a New Doubt</DialogTitle>
// //                 <DialogDescription>
// //                   Select the subject and topic to get the right help.
// //                 </DialogDescription>
// //               </DialogHeader>
// //               <div className="grid gap-4 py-4">
                
// //                 {/* 1. Subject Dropdown */}
// //                 <div className="grid gap-2">
// //                   <Label htmlFor="subject">Select Subject</Label>
// //                   <select 
// //                     id="subject"
// //                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
// //                     value={selectedSubject}
// //                     onChange={handleSubjectChange}
// //                   >
// //                     <option value="" disabled>-- Choose Subject --</option>
// //                     {Object.keys(subjectsData).map((subject) => (
// //                       <option key={subject} value={subject}>{subject}</option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 {/* 2. Topic Dropdown (Dynamic) */}
// //                 <div className="grid gap-2">
// //                   <Label htmlFor="topic">Select Topic</Label>
// //                   <select 
// //                     id="topic"
// //                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
// //                     value={selectedTopic}
// //                     onChange={(e) => setSelectedTopic(e.target.value)}
// //                     disabled={!selectedSubject}
// //                   >
// //                     <option value="" disabled>
// //                       {selectedSubject ? "-- Choose Topic --" : "-- Select Subject First --"}
// //                     </option>
// //                     {selectedSubject && subjectsData[selectedSubject].map((topic) => (
// //                       <option key={topic} value={topic}>{topic}</option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 {/* 3. Description Box */}
// //                 <div className="grid gap-2">
// //                   <Label htmlFor="desc">Doubt Description</Label>
// //                   <Textarea 
// //                     id="desc" 
// //                     placeholder="Explain your doubt here..." 
// //                     rows={5}
// //                     value={description}
// //                     onChange={(e) => setDescription(e.target.value)}
// //                   />
// //                 </div>

// //               </div>
              

                

// //               <DialogFooter>
// //                 <Button variant="outline" onClick={() => setIsAskOpen(false)}>Cancel</Button>
// //                 <Button onClick={handleAskSubmit}>Submit Doubt</Button>
// //               </DialogFooter>
// //             </DialogContent>
// //           </Dialog>
// //           {/* ✅ ASK DOUBT POPUP END */}
// //         </div>

// //         {/* 2. STATS CARDS */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <Card className="bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800">
// //             <CardContent className="p-6 flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Doubts</p>
// //                 <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-300">{totalDoubts}</h3>
// //               </div>
// //               <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
// //                 <MessageCircle className="h-6 w-6 text-blue-600" />
// //               </div>
// //             </CardContent>
// //           </Card>
          
// //           <Card className="bg-green-50/50 border-green-100 dark:bg-green-900/10 dark:border-green-800">
// //             <CardContent className="p-6 flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-green-600 dark:text-green-400">Resolved</p>
// //                 <h3 className="text-3xl font-bold text-green-700 dark:text-green-300">{resolvedDoubts}</h3>
// //               </div>
// //               <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
// //                 <CheckCircle className="h-6 w-6 text-green-600" />
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card className="bg-orange-50/50 border-orange-100 dark:bg-orange-900/10 dark:border-orange-800">
// //             <CardContent className="p-6 flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Pending</p>
// //                 <h3 className="text-3xl font-bold text-orange-700 dark:text-orange-300">{pendingDoubts}</h3>
// //               </div>
// //               <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
// //                 <Clock className="h-6 w-6 text-orange-600" />
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>

// //       {/* 3. TABS & LIST SECTION */}
// //       <Tabs defaultValue="all" className="w-full">
// //         <div className="flex justify-between items-center mb-4">
// //           <TabsList>
// //             <TabsTrigger value="all">All Doubts</TabsTrigger>
// //             <TabsTrigger value="pending">Pending</TabsTrigger>
// //             <TabsTrigger value="resolved">Resolved</TabsTrigger>
// //           </TabsList>
          
// //           {/* <div className="relative w-64 hidden md:block">
// //            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
// //             <Input placeholder="Search doubts..." className="pl-8" />
// //           </div> */}
// //         </div>  

// //         {/* <TabsContent value="all" className="space-y-4">
// //           {doubts.map((doubt) => (
// //             <DoubtCard key={doubt.id} data={doubt} />
// //           ))}
// //         </TabsContent> */}
// //         <TabsContent value="all" className="space-y-4">
// //           {doubts.map((doubt) => (
// //             // 👇 Yahan onClick add kiya hai
// //             <DoubtCard key={doubt.id} data={doubt} onClick={() => setViewDoubt(doubt)} />
// //           ))}
// //         </TabsContent>
        
// //         {/* <TabsContent value="pending" className="space-y-4">
// //           {doubts.filter(d => d.status === "Pending").map((doubt) => (
// //             <DoubtCard key={doubt.id} data={doubt} />
// //           ))}
// //         </TabsContent> */}
// //         <TabsContent value="pending" className="space-y-4">
// //           {doubts.filter(d => d.status === "Pending").map((doubt) => (
// //             // 👇 Yahan onClick add kiya hai
// //             <DoubtCard key={doubt.id} data={doubt} onClick={() => setViewDoubt(doubt)} />
// //           ))}
// //         </TabsContent>

// //         {/* <TabsContent value="resolved" className="space-y-4">
// //           {doubts.filter(d => d.status === "Resolved").map((doubt) => (
// //             <DoubtCard key={doubt.id} data={doubt} />
// //           ))}
// //         </TabsContent> */}
// //         <TabsContent value="resolved" className="space-y-4">
// //           {doubts.filter(d => d.status === "Resolved").map((doubt) => (
// //             // 👇 Yahan onClick add kiya hai
// //             <DoubtCard key={doubt.id} data={doubt} onClick={() => setViewDoubt(doubt)} />
// //           ))}
// //         </TabsContent>
// //       </Tabs>
// //       {/* ✨ VIEW DOUBT & RATING MODAL (Isse return ke </div> se pehle paste karna) */}
// //       <Dialog open={!!viewDoubt} onOpenChange={(open) => { if(!open) setViewDoubt(null); setRating(0); }}>
// //         <DialogContent className="sm:max-w-[600px]">
// //           {viewDoubt && (
// //             <>
// //               <DialogHeader>
// //                 <DialogTitle className="text-xl flex justify-between items-center">
// //                     {viewDoubt.title}
// //                     <Badge className={viewDoubt.status === "Resolved" ? "bg-green-600" : "bg-orange-500"}>
// //                         {viewDoubt.status}
// //                     </Badge>
// //                 </DialogTitle>
// //               </DialogHeader>

// //               <div className="space-y-4 py-2">
// //                 {/* Question */}
// //                 <div className="p-3 bg-muted/30 rounded-md text-sm">
// //                     <strong>Question:</strong> <br/> {viewDoubt.desc}
// //                 </div>

// //                 {/* Solution */}
// //                 <div>
// //                     <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
// //                         <CheckCircle className="h-4 w-4 text-green-600" /> Faculty Solution
// //                     </h4>
// //                     {viewDoubt.solution ? (
// //                         <div className="p-4 bg-green-50 border border-green-100 rounded-md text-sm text-green-900">
// //                             {viewDoubt.solution}
// //                         </div>
// //                     ) : (
// //                         <div className="text-sm text-orange-600 italic">Waiting for solution...</div>
// //                     )}
// //                 </div>

// //                 {/* ✨ RATING STARS */}
// //                 {viewDoubt.solution && (
// //                     <div className="pt-2 text-center">
// //                         <p className="text-sm font-semibold mb-2">Rate this Solution</p>
// //                         <div className="flex justify-center gap-2">
// //                             {[1, 2, 3, 4, 5].map((star) => (
// //                                 <Star 
// //                                     key={star}
// //                                     className={`h-8 w-8 cursor-pointer transition-colors ${rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
// //                                     onClick={() => setRating(star)}
// //                                 />
// //                             ))}
// //                         </div>
// //                     </div>
// //                 )}
// //               </div>

// //               <DialogFooter>
// //                  {/* Rating Submit Button */}
// //                  {viewDoubt.solution && (
// //                     <Button onClick={() => {
// //                         toast({ title: "Rated!", description: `You gave ${rating} stars.` });
// //                         setViewDoubt(null);
// //                         setRating(0);
// //                     }}>
// //                         Submit Rating
// //                     </Button>
// //                  )}
// //               </DialogFooter>
// //             </>
// //           )}
// //         </DialogContent>
// //       </Dialog>
// //     </div>
    
// //   );
// // };



// // // Helper Component for List Item
// // const DoubtCard = ({ data, onClick }: { data: any, onClick: () => void }) => (
  
// //   <div onClick={onClick}>
// //     <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary">
// //       <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between">
// //         <div className="space-y-1">
// //           <div className="flex items-center gap-2">
// //               <Badge variant="outline" className="text-xs">{data.subject}</Badge>
// //               <Badge variant="secondary" className="text-xs">{data.topic}</Badge>
// //           </div>
// //           <h4 className="font-semibold text-lg">{data.title}</h4>
// //           <p className="text-muted-foreground text-sm line-clamp-1">{data.desc || "No description provided."}</p>
// //         </div>
// //         <div className="flex items-center gap-4 text-sm">
// //           <Badge className={data.status === "Resolved" ? "bg-green-600" : "bg-orange-500"}>{data.status}</Badge>
// //           <span className="text-muted-foreground">{data.date}</span>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   </div>
// // );


// // export default Doubts;





// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { 
//   MessageCircle, 
//   CheckCircle, 
//   Clock, 
//   Plus, 
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";

// // --- Interfaces matching your Java Backend ---
// interface SubjectDto {
//   subjectID: number;     
//   subjectName: string;
// }

// interface TopicDto {
//   topicID: number;       
//   topicName: string;
// }

// interface TeacherDto {
//   teacherId: number;     // Matches private Long teacherId in TeacherDto
//   subjectAssociated: string;
//   firstName: string;
//   lastName: string;
// }

// interface DoubtDto {
//   doubtID?: number;
//   doubtStatus?: string; 
//   date?: string;
//   queryAsked: string;
//   answerProvided?: string;
//   selectedSubject: string;
//   studentId: number;
//   teacherId: number;
// }

// const Doubts = () => {
//   const { toast } = useToast();
  
//   const [isAskOpen, setIsAskOpen] = useState(false);
//   const [viewDoubt, setViewDoubt] = useState<DoubtDto | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [subjects, setSubjects] = useState<SubjectDto[]>([]);
//   const [topics, setTopics] = useState<TopicDto[]>([]);
//   const [teachers, setTeachers] = useState<TeacherDto[]>([]);
  
//   const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
//   const [selectedTopicName, setSelectedTopicName] = useState("");
//   const [description, setDescription] = useState("");
  
//   const [studentId, setStudentId] = useState<number | null>(null);
//   const [doubts, setDoubts] = useState<DoubtDto[]>([]);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       const email = localStorage.getItem("emailId");
//       if (!email) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const [studentRes, subjectRes, teacherRes] = await Promise.all([
//           axios.get(`http://localhost:8080/api/students/email/${email}`),
//           axios.get(`http://localhost:8080/api/subjects`),
//           axios.get(`http://localhost:8080/api/teachers`)
//         ]);

//         const sId = studentRes.data.studentId;
//         setStudentId(sId);
//         setSubjects(subjectRes.data);
//         setTeachers(teacherRes.data);
        
//         const doubtRes = await axios.get(`http://localhost:8080/api/doubts/student/${sId}`);
//         setDoubts(Array.isArray(doubtRes.data) ? doubtRes.data : []);
//       } catch (error) {
//         console.error("Initialization error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   useEffect(() => {
//     const fetchTopics = async () => {
//       if (!selectedSubjectId) {
//         setTopics([]);
//         return;
//       }
//       try {
//         const res = await axios.get(`http://localhost:8080/api/topics/subject/${selectedSubjectId}`);
//         setTopics(Array.isArray(res.data) ? res.data : []);
//       } catch (error) {
//         setTopics([]);
//       }
//     };
//     fetchTopics();
//   }, [selectedSubjectId]);

//   const handleAskSubmit = async () => {
//     const selectedSubObj = subjects.find(s => s.subjectID.toString() === selectedSubjectId);
    
//     if (!studentId || !selectedSubObj || !description) {
//       toast({ title: "Error", description: "Please fill required fields.", variant: "destructive" });
//       return;
//     }

//     // ROBUST TEACHER LOOKUP: Trim whitespace and ignore case
//     const targetSubject = selectedSubObj.subjectName.trim().toLowerCase();
//     const associatedTeacher = teachers.find(t => 
//       t.subjectAssociated.trim().toLowerCase() === targetSubject
//     );

//     if (!associatedTeacher) {
//       toast({ 
//         title: "Teacher Assignment Error", 
//         description: `No faculty is currently assigned to the subject: ${selectedSubObj.subjectName}`, 
//         variant: "destructive" 
//       });
//       return;
//     }

//     const payload: DoubtDto = {
//       queryAsked: selectedTopicName ? `[${selectedTopicName}] ${description}` : description,
//       selectedSubject: selectedSubObj.subjectName,
//       studentId: studentId,
//       teacherId: associatedTeacher.teacherId, // Using lowercase 'd' from TeacherDto
//       doubtStatus: "Pending"
//     };

//     try {
//       const response = await axios.post("http://localhost:8080/api/doubts", payload);
//       if (response.status === 201 || response.status === 200) {
//         toast({ title: "Success!", description: `Doubt sent to Prof. ${associatedTeacher.lastName}` });
//         setIsAskOpen(false);
//         setSelectedSubjectId("");
//         setSelectedTopicName("");
//         setDescription("");
        
//         const updated = await axios.get(`http://localhost:8080/api/doubts/student/${studentId}`);
//         setDoubts(Array.isArray(updated.data) ? updated.data : []);
//       }
//     } catch (error) {
//       toast({ title: "Submission Failed", description: "Backend error while saving doubt.", variant: "destructive" });
//     }
//   };

//   // UI rendering remains the same as previous logic but with ID fixes applied
//   const stats = {
//     total: doubts.length,
//     resolved: doubts.filter(d => d.doubtStatus === "Resolved").length,
//     pending: doubts.filter(d => d.doubtStatus === "Pending").length,
//   };

//   if (loading) return <div className="p-20 text-center text-white">Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl text-white">
//       <div className="flex flex-col gap-6 mb-8">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">Academic Doubts</h1>
//             <p className="text-zinc-400">Connect with subject experts.</p>
//           </div>

//           <Dialog open={isAskOpen} onOpenChange={setIsAskOpen}>
//             <DialogTrigger asChild>
//               <Button size="lg" className="gap-2 bg-[#ef4444] hover:bg-red-600">
//                 <Plus className="h-5 w-5" /> Ask a Doubt
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="bg-[#121212] text-white border-zinc-800">
//               <DialogHeader>
//                 <DialogTitle>Ask Question</DialogTitle>
//               </DialogHeader>

//               <div className="grid gap-4 py-4">
//                 <div className="grid gap-2">
//                   <Label>Subject</Label>
//                   <select 
//                     className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
//                     value={selectedSubjectId}
//                     onChange={(e) => { setSelectedSubjectId(e.target.value); setSelectedTopicName(""); }}
//                   >
//                     <option value="">-- Select Subject --</option>
//                     {subjects.map((s, i) => (
//                       <option key={`sub-${s.subjectID || i}`} value={s.subjectID}>{s.subjectName}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="grid gap-2">
//                   <Label>Topic</Label>
//                   <select 
//                     className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm disabled:opacity-50"
//                     value={selectedTopicName}
//                     onChange={(e) => setSelectedTopicName(e.target.value)}
//                     disabled={!selectedSubjectId || topics.length === 0}
//                   >
//                     <option value="">-- Select Topic --</option>
//                     {topics.map((t, i) => (
//                       <option key={`top-${t.topicID || i}`} value={t.topicName}>{t.topicName}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="grid gap-2">
//                   <Label>Description</Label>
//                   <Textarea 
//                     value={description} 
//                     onChange={(e) => setDescription(e.target.value)} 
//                     placeholder="Describe your issue..." 
//                     className="bg-zinc-900 border-zinc-700"
//                     rows={4}
//                   />
//                 </div>
//               </div>

//               <DialogFooter>
//                 <Button className="bg-[#ef4444] hover:bg-red-600" onClick={handleAskSubmit}>Submit</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <StatCard title="Total" count={stats.total} icon={<MessageCircle className="text-blue-500"/>} />
//           <StatCard title="Resolved" count={stats.resolved} icon={<CheckCircle className="text-green-500"/>} />
//           <StatCard title="Pending" count={stats.pending} icon={<Clock className="text-orange-500"/>} />
//         </div>
//       </div>

//       <Tabs defaultValue="all">
//         <TabsList className="bg-zinc-900 border-zinc-800">
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="pending">Pending</TabsTrigger>
//           <TabsTrigger value="resolved">Resolved</TabsTrigger>
//         </TabsList>
//         <div className="mt-4 space-y-4">
          
//         <TabsContent value="all">
//           {doubts.length > 0 ? (
//             doubts.map(d => (
//               <DoubtCard key={`all-${d.doubtID}`} data={d} onClick={() => setViewDoubt(d)} />
//             ))
//             ) : (
//            <div className="text-center p-10 text-zinc-500">No doubts found.</div>
//            )}
//           </TabsContent>

//         <TabsContent value="pending">
//         {doubts.filter(d => d.doubtStatus === "Pending").length > 0 ? (
//            doubts
//           .filter(d => d.doubtStatus === "Pending")
//           .map(d => (
//             <DoubtCard key={`pending-${d.doubtID}`} data={d} onClick={() => setViewDoubt(d)} />
//           ))
//             ) : (
//         <div className="text-center p-10 text-zinc-500">No pending doubts!</div>
//         )}
//         </TabsContent>

//         <TabsContent value="resolved">
//           {doubts.filter(d => d.doubtStatus === "Resolved").length > 0 ? (
//             doubts
//             .filter(d => d.doubtStatus === "Resolved")
//             .map(d => (
//            <DoubtCard key={`resolved-${d.doubtID}`} data={d} onClick={() => setViewDoubt(d)} />
//           ))
//           ) : (
//         <div className="text-center p-10 text-zinc-500">No resolved doubts yet.</div>
//         )}
//       </TabsContent>
//         </div>
//       </Tabs>

//       <Dialog open={!!viewDoubt} onOpenChange={(o) => !o && setViewDoubt(null)}>
//         <DialogContent className="bg-[#121212] text-white border-zinc-800">
//           {viewDoubt && (
//             <div className="space-y-4">
//               <Badge className={viewDoubt.doubtStatus === "Resolved" ? "bg-green-600" : "bg-orange-500"}>{viewDoubt.doubtStatus}</Badge>
//               <div className="p-4 bg-zinc-900 rounded-md">
//                 <p className="text-sm">{viewDoubt.queryAsked}</p>
//               </div>
//               {viewDoubt.answerProvided && (
//                 <div className="p-4 bg-green-900/20 border-green-800 rounded-md">
//                   <p className="text-sm">{viewDoubt.answerProvided}</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// const StatCard = ({ title, count, icon }: any) => (
//   <Card className="bg-zinc-900 border-zinc-800"><CardContent className="p-6 flex items-center justify-between"><div><p className="text-sm text-zinc-400">{title}</p><h3 className="text-3xl font-bold">{count}</h3></div>{icon}</CardContent></Card>
// );

// const DoubtCard = ({ data, onClick }: any) => (
//   <Card onClick={onClick} className="bg-zinc-900 border-zinc-800 cursor-pointer hover:border-red-500">
//     <CardContent className="p-4 flex justify-between items-center">
//       <div><Badge variant="outline">{data.selectedSubject}</Badge><h4 className="font-semibold">{data.queryAsked}</h4></div>
//       <Badge className={data.doubtStatus === "Resolved" ? "bg-green-600" : "bg-orange-500"}>{data.doubtStatus}</Badge>
//     </CardContent>
//   </Card>
// );

// export default Doubts;



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