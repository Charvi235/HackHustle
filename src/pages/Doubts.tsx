import { useState } from 'react';
import { 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  Plus, 
  Search, 
  MoreVertical 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const Doubts = () => {
  const { toast } = useToast();
  const [isAskOpen, setIsAskOpen] = useState(false);
  
  
  // 👇 Ye 3 lines add karo
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [description, setDescription] = useState(""); // title hata kar ye use karenge
    // ✅ DATA: Yahan apne Subjects aur Topics add kar lena
const subjectsData: Record<string, string[]> = {
  "Data Structures & Algo": ["Arrays & Strings", "Linked List", "Trees & Graphs", "Dynamic Programming", "Recursion"],
  "Web Development": ["HTML/CSS", "React.js", "Node.js / Express", "Database (MongoDB/SQL)", "API Integration"],
  "Operating Systems": ["Process Management", "Memory Management", "Deadlocks", "File Systems"],
  "Computer Networks": ["OSI Model", "TCP/IP", "IP Addressing", "Routing Protocols"],
  "General / Other": ["Interview Queries", "Resume Review", "Career Guidance"]
};

  // Fake Data (Backend connect hone tak)
  const [doubts, setDoubts] = useState([
    { id: 1, title: "Graph DP Problem stuck", status: "Resolved", date: "2 hours ago", desc: "I am trying to solve the Dijkstra algorithm but getting TLE." },
    { id: 2, title: "React useEffect loop", status: "Pending", date: "5 hours ago", desc: "My useEffect is running infinite times, how to fix dependency array?" },
    { id: 3, title: "Spring Boot CORS Error", status: "Pending", date: "1 day ago", desc: "Getting 403 Forbidden even after adding @CrossOrigin annotation." },
  ]);

  const [newDoubt, setNewDoubt] = useState({ title: '', description: '' });

  // Stats Calculation
  const totalDoubts = doubts.length;
  const resolvedDoubts = doubts.filter(d => d.status === "Resolved").length;
  const pendingDoubts = doubts.filter(d => d.status === "Pending").length;

//   const handleAskSubmit = () => {
//     if(!newDoubt.title || !newDoubt.description) return;

//     // Add to list (Simulation)
//     const newEntry = {
//       id: doubts.length + 1,
//       title: newDoubt.title,
//       status: "Pending",
//       date: "Just now",
//       desc: newDoubt.description
//     };
    
//     setDoubts([newEntry, ...doubts]);
//     setIsAskOpen(false);
//     setNewDoubt({ title: '', description: '' });
    
//     toast({
//       title: "Doubt Posted!",
//       description: "Faculty will review it shortly.",
//     });
//   };
const handleAskSubmit = () => {
    // Validation check
    if(!selectedSubject || !selectedTopic || !description) {
       toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
       return;
    }

    const newEntry = {
      id: doubts.length + 1,
      title: `${selectedSubject} - ${selectedTopic}`, // Title auto-create hoga
      status: "Pending",
      date: "Just now",
      desc: description
    };
    
    setDoubts([newEntry, ...doubts]);
    setIsAskOpen(false);
    
    // Reset Form
    setSelectedSubject("");
    setSelectedTopic("");
    setDescription("");
    
    toast({
      title: "Doubt Posted!",
      description: "Faculty will review it shortly.",
    });
  };
// 👇 Ye function add karo
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
    setSelectedTopic(""); // Subject change hote hi Topic reset ho jayega
  };
  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
      
      {/* 1. HEADER & STATS SECTION */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Doubts</h1>
            <p className="text-muted-foreground">Ask questions, get answers, and clear concepts.</p>
          </div>

          {/* Ask Doubt Button (Opens Popup) */}
          {/* ✅ ASK DOUBT POPUP START */}
          <Dialog open={isAskOpen} onOpenChange={setIsAskOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 shadow-md">
                <Plus className="h-5 w-5" /> Ask a Doubt
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ask a New Doubt</DialogTitle>
                <DialogDescription>
                  Select the subject and topic to get the right help.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                
                {/* 1. Subject Dropdown */}
                <div className="grid gap-2">
                  <Label htmlFor="subject">Select Subject</Label>
                  <select 
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                  >
                    <option value="" disabled>-- Choose Subject --</option>
                    {Object.keys(subjectsData).map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Topic Dropdown (Dynamic) */}
                <div className="grid gap-2">
                  <Label htmlFor="topic">Select Topic</Label>
                  <select 
                    id="topic"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    disabled={!selectedSubject}
                  >
                    <option value="" disabled>
                      {selectedSubject ? "-- Choose Topic --" : "-- Select Subject First --"}
                    </option>
                    {selectedSubject && subjectsData[selectedSubject].map((topic) => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Description Box */}
                <div className="grid gap-2">
                  <Label htmlFor="desc">Doubt Description</Label>
                  <Textarea 
                    id="desc" 
                    placeholder="Explain your doubt here..." 
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

              </div>
              {/* <div className="grid gap-4 py-4">
                
                
                <div className="grid gap-2">
                  <Label htmlFor="subject">Select Subject</Label>
                  <select 
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                  >
                    <option value="" disabled>-- Choose Subject --</option>
                    {Object.keys(subjectsData).map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div> */}

                {/* 2. Topic Dropdown (Dynamic) */}
                {/* <div className="grid gap-2">
                  <Label htmlFor="topic">Select Topic</Label>
                  <select 
                    id="topic"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    disabled={!selectedSubject} // Disable agar subject select nahi kiya
                  >
                    <option value="" disabled>
                      {selectedSubject ? "-- Choose Topic --" : "-- Select Subject First --"}
                    </option>
                    {selectedSubject && subjectsData[selectedSubject].map((topic) => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div> */}

                {/* 3. Description Box */}
                {/* <div className="grid gap-2">
                  <Label htmlFor="desc">Doubt Description</Label>
                  <Textarea 
                    id="desc" 
                    placeholder="Explain your doubt here..." 
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

              </div>  */}

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAskOpen(false)}>Cancel</Button>
                <Button onClick={handleAskSubmit}>Submit Doubt</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* ✅ ASK DOUBT POPUP END */}
        </div>

        {/* 2. STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Doubts</p>
                <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-300">{totalDoubts}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50/50 border-green-100 dark:bg-green-900/10 dark:border-green-800">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Resolved</p>
                <h3 className="text-3xl font-bold text-green-700 dark:text-green-300">{resolvedDoubts}</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50/50 border-orange-100 dark:bg-orange-900/10 dark:border-orange-800">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Pending</p>
                <h3 className="text-3xl font-bold text-orange-700 dark:text-orange-300">{pendingDoubts}</h3>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. TABS & LIST SECTION */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Doubts</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search doubts..." className="pl-8" />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {doubts.map((doubt) => (
            <DoubtCard key={doubt.id} data={doubt} />
          ))}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          {doubts.filter(d => d.status === "Pending").map((doubt) => (
            <DoubtCard key={doubt.id} data={doubt} />
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {doubts.filter(d => d.status === "Resolved").map((doubt) => (
            <DoubtCard key={doubt.id} data={doubt} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper Component for List Item
const DoubtCard = ({ data }: { data: any }) => (
  <Card className="hover:shadow-md transition-shadow cursor-pointer">
    <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div className="space-y-1 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-lg">{data.title}</h4>
          <Badge variant={data.status === "Resolved" ? "default" : "secondary"} className={data.status === "Resolved" ? "bg-green-600" : "bg-orange-500 text-white"}>
            {data.status}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-1">{data.desc}</p>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{data.date}</span>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default Doubts;