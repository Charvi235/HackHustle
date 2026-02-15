
// import { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { 
//   Brain, 
//   Video, 
//   Mic, 
//   Clock, 
//   User,
//   Play,
//   Settings,
//   ChevronRight,
//   Star,
//   Award
// } from 'lucide-react';
// import { subjectiveInterviewQuestions, SubjectiveQuestion } from '@/data/subjectiveQuestions';
// import { AudioRecorder } from '@/components/interview/AudioRecorder';
// import { InterviewReport } from '@/components/reports/InterviewReport';
// import { interviewService } from '@/services/interviewService';

// const interviewTypes = [
//   {
//     id: 1,
//     title: 'Technical Interview',
//     duration: '15-20 minutes',
//     icon: Brain,
//     color: 'bg-blue-500',
//     questions: 3,
//   },
//   {
//     id: 2,
//     title: 'Behavioral Interview',
//     duration: '15-20 minutes',
//     icon: User,
//     color: 'bg-green-500',
//     questions: 3,
//   },
// ];

// const experienceLevels = [
//   { label: 'Student / Fresh Graduate', value: 'entry', years: '0-1 years' },
//   { label: 'Junior Developer', value: 'junior', years: '1-3 years' },
//   { label: 'Mid-Level Engineer', value: 'mid', years: '3-5 years' },
//   { label: 'Senior Engineer', value: 'senior', years: '5+ years' },
// ];

// interface QuestionResult {
//   question: string;
//   userResponse: string;
//   betterResponse: string;
//   marks: number;
//   maxMarks: number;
// }

// const Interview = () => {
//   const [selectedType, setSelectedType] = useState<number | null>(null);
//   const [selectedLevel, setSelectedLevel] = useState<string>('junior');
//   const [isSetupMode, setIsSetupMode] = useState(false);
//   const [isInterviewActive, setIsInterviewActive] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [recordings, setRecordings] = useState<{ [key: number]: { audio: Blob; video: Blob | null } }>({});
//   const [showReport, setShowReport] = useState(false);
//   const [totalTime, setTotalTime] = useState(0);
//   const [startTime, setStartTime] = useState<number>(0);
//   const [results, setResults] = useState<QuestionResult[]>([]);

//   // Minimal changes: store backend question
//   const [backendQuestion, setBackendQuestion] = useState<string>("");

//   const [experience, setExperience] = useState("");
//   const [difficulty, setDifficulty] = useState("Medium"); 
//   const [role, setRole] = useState("");                 
//   const [targetCompany, setTargetCompany] = useState(""); 
//   const [techSkills, setTechSkills] = useState("");
//   const [isEvaluating, setIsEvaluating] = useState(false);

//   const handleStartInterview = (typeId: number) => {
//     setSelectedType(typeId);
//     setIsSetupMode(true);
//   };

//   const handleBeginInterview = () => {
//     setIsInterviewActive(true);
//     setCurrentQuestion(0);
//     setRecordings({});
//     setStartTime(Date.now());
//   };

//   // const handleRecordingComplete = (audioBlob: Blob, videoBlob: Blob | null) => {
//   //   const questionId = subjectiveInterviewQuestions[currentQuestion].id;
//   //   setRecordings({ ...recordings, [questionId]: { audio: audioBlob, video: videoBlob } });
    
//   //   if (currentQuestion < 2) { // Only 3 questions (0,1,2)
//   //     setCurrentQuestion(currentQuestion + 1);
//   //   } else {
//   //     handleFinish();
//   //   }
//   // };
// // const handleRecordingComplete = async (audioBlob: Blob, videoBlob: Blob | null) => {
// //   const questionText =
// //     backendQuestion || subjectiveInterviewQuestions[currentQuestion].question;

// //   // 🔹 speech-to-text already happens inside AudioRecorder
// //   // assume AudioRecorder sends transcript (string)
// //   const transcript = "USER ANSWER FROM STT"; // <-- already available there

// //   try {
// //     const evalResponse = await interviewService.evaluateAnswer(
// //       questionText,
// //       transcript
// //     );


// //     // 🔹 Parse score from text
// //     const scoreMatch = evalResponse.match(/Score:\s*(\d+)/);
// //     const marks = scoreMatch ? Number(scoreMatch[1]) : 0;

// //     setResults(prev => [
// //       ...prev,
// //       {
// //         question: questionText,
// //         userResponse: transcript,
// //         betterResponse: evalResponse,
// //         marks,
// //         maxMarks: 10
// //       }
// //     ]);
// //   } catch (e) {
// //     console.error("Evaluation failed", e);
// //   }

// //   if (currentQuestion < 2) {
// //     setCurrentQuestion(prev => prev + 1);
// //   } else {
// //     handleFinish();
// //   }
// // };
//   // const handleRecordingComplete = async (
//   //   audioBlob: Blob,
//   //   videoBlob: Blob | null,
//   //   transcript: string
//   // ) => {
//   //   const questionText =
//   //     backendQuestion || subjectiveInterviewQuestions[currentQuestion].question;

//   //   try {
//   //     const evalResponse = await interviewService.evaluateAnswer(
//   //       questionText,
//   //       transcript
//   //     );

//   //     setResults(prev => [
//   //       ...prev,
//   //       {
//   //         question: questionText,
//   //         userResponse: transcript,
//   //         betterResponse: evalResponse.better_answer ?? "No suggestion",
//   //         marks: evalResponse.score ?? 0,
//   //         maxMarks: 5
//   //       }
//   //     ]);
//   //   } catch (e) {
//   //     console.error("Evaluation failed", e);
//   //   }

//   //   if (currentQuestion < 2) {
//   //     setCurrentQuestion(prev => prev + 1);
//   //   } else {
//   //     handleFinish();
//   //   }
//   // };
//   // const handleRecordingComplete = async (
//   //   audioBlob: Blob,
//   //   videoBlob: Blob | null,
//   //   transcript: string
//   // ) => {
//   //   const questionText =
//   //     backendQuestion ||
//   //     subjectiveInterviewQuestions[currentQuestion].question;

//   //   try {
//   //     const evalResponse = await interviewService.evaluateAnswer(
//   //       questionText,
//   //       transcript
//   //     );

//   //     setResults(prev => [
//   //       ...prev,
//   //       {
//   //         question: questionText,
//   //         userResponse: transcript,
//   //         betterResponse: evalResponse.better_answer || "No suggestion",
//   //         marks: evalResponse.score ?? 0,
//   //         maxMarks: 5
//   //       }
//   //     ]);
//   //   } catch (e) {
//   //     console.error("Evaluation failed", e);

//   //     // fallback so flow never breaks
//   //     setResults(prev => [
//   //       ...prev,
//   //       {
//   //         question: questionText,
//   //         userResponse: transcript,
//   //         betterResponse: "Evaluation failed",
//   //         marks: 0,
//   //         maxMarks: 10
//   //       }
//   //     ]);
//   //   }

//   //   // 🔥 THIS is what moves to next question
//   //   if (currentQuestion <= 2) {
//   //     setCurrentQuestion(prev => prev + 1);
//   //   } else {
//   //     handleFinish(); // report page
//   //   }
//   // };
//   const handleRecordingComplete = async (
//     audioBlob: Blob,
//     videoBlob: Blob | null,
//     transcript: string
//   ) => {
//     const questionText =
//       backendQuestion || subjectiveInterviewQuestions[currentQuestion].question;

//     // 🔥 1. UI FEEDBACK IMMEDIATELY
//     setIsEvaluating(true);

//     // 🔥 2. MOVE USER FORWARD INSTANTLY (optimistic)
//     const isLastQuestion = currentQuestion >= 2;

//     if (!isLastQuestion) {
//       setCurrentQuestion(prev => prev + 1);
//     }

//     try {
//       const evalResponse = await interviewService.evaluateAnswer(
//         questionText,
//         transcript
//       );

//       setResults(prev => [
//         ...prev,
//         {
//           question: questionText,
//           userResponse: transcript,
//           betterResponse: evalResponse.better_answer || "No suggestion",
//           marks: evalResponse.score ?? 0,
//           maxMarks: 10
//         }
//       ]);
//     } catch (e) {
//       console.error("Evaluation failed", e);
//     } finally {
//       setIsEvaluating(false);

//       if (isLastQuestion) {
//         handleFinish();
//       }
//     }
//   };

//   // Minimal changes: fetch backend question
//   const handleStart = async () => {
//     if (!role.trim() || !experience.trim()) {
//       alert("Please enter Job Role and Experience.");
//       return;
//     }

//     const skillsArray = techSkills 
//         ? techSkills.split(',').map(s => s.trim()).filter(s => s !== "") 
//         : [];

//     const interviewData = {
//       role,
//       experience,
//       difficulty,
//       tech_skills: skillsArray,
//       target_company: targetCompany,
//       interview_type: selectedType === 1 ? "technical" : "behavioral"
//     };

//     console.log("Sending Data:", interviewData);

//     try {
//       const response = await interviewService.setupInterview(interviewData);
//       if (response.question) {
//         setBackendQuestion(response.question);
//         setIsInterviewActive(true);
//         setStartTime(Date.now());
//       }
//     } catch (error) {
//       console.log("Backend error, starting locally for test...");
//       setIsInterviewActive(true); // fallback
//       setStartTime(Date.now());
//     }
//   };

//   const handleFinish = () => {
//     const timeTaken = Math.floor((Date.now() - startTime) / 1000);
//     setTotalTime(timeTaken);
//     setIsInterviewActive(false);
//     setShowReport(true);
//   };

//   const handleBackToMenu = () => {
//     setShowReport(false);
//     setIsSetupMode(false);
//     setCurrentQuestion(0);
//     setRecordings({});
//   };

//   // const generateResults = (): QuestionResult[] => {
//   //   return subjectiveInterviewQuestions.slice(0, 3).map((q, idx) => ({
//   //     question: q.question,
//   //     userResponse: "To be connected to api.",
//   //     betterResponse: q.sampleAnswer,
//   //     marks: Math.floor(Math.random() * 3) + 7,
//   //     maxMarks: 10
//   //   }));
//   // };

//   if (showReport) {
//     return (
//       <InterviewReport
//         results={results}
//         totalTime={totalTime}
//         onBack={handleBackToMenu}
//       />

//     );
//   }

//   if (isInterviewActive) {
//     const question = {
//       id: currentQuestion,
//       question: backendQuestion || subjectiveInterviewQuestions[currentQuestion].question,
//       sampleAnswer: subjectiveInterviewQuestions[currentQuestion].sampleAnswer
//     };

//     return (
//       <div className="min-h-screen bg-background pt-20 pb-16">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Progress */}
//           <div className="mb-8">
//             <div className="flex justify-between text-sm mb-2">
//               <span>Question {currentQuestion + 1} of 3</span>
//               <span>{Math.round(((currentQuestion ) / 3) * 100)}% Complete</span>
//             </div>
//             <Progress value={((currentQuestion) / 3) * 100} className="h-2" />
//           </div>

//           {/* Audio Recorder */}
//           <AudioRecorder 
//             question={question.question}
//             onRecordingComplete={handleRecordingComplete}
//           />
//         </div>
//       </div>
//     );
//   }

//   // ----------------- FULL ORIGINAL UI -----------------
//   return (
//     <div className="min-h-screen bg-background pt-20 pb-16">
//       <div className="container mx-auto px-4">
//         {!isSetupMode ? (
//           <>
//             {/* Header */}
//             <div className="text-center mb-12">
//               <Badge variant="secondary" className="mb-4">
//                 <Video className="w-4 h-4 mr-2" />
//                 AI Mock Interview
//               </Badge>
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">
//                 Practice with{' '}
//                 <span className="bg-gradient-primary bg-clip-text text-transparent">
//                   AI Interviewer
//                 </span>
//               </h1>
//               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                 Get personalized feedback on your interview performance. Our AI analyzes 
//                 your responses, body language, and communication skills.
//               </p>
//             </div>

//             {/* Features */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//               <Card className="p-6 text-center bg-gradient-card">
//                 <Video className="w-8 h-8 text-blue-500 mx-auto mb-2" />
//                 <div className="font-semibold">Video Analysis</div>
//                 <div className="text-sm text-muted-foreground">Body language & eye contact</div>
//               </Card>
//               <Card className="p-6 text-center bg-gradient-card">
//                 <Mic className="w-8 h-8 text-green-500 mx-auto mb-2" />
//                 <div className="font-semibold">Speech Recognition</div>
//                 <div className="text-sm text-muted-foreground">Clarity & confidence</div>
//               </Card>
//               <Card className="p-6 text-center bg-gradient-card">
//                 <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
//                 <div className="font-semibold">AI Feedback</div>
//                 <div className="text-sm text-muted-foreground">Detailed performance report</div>
//               </Card>
//               <Card className="p-6 text-center bg-gradient-card">
//                 <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
//                 <div className="font-semibold">Skill Scoring</div>
//                 <div className="text-sm text-muted-foreground">Track your improvement</div>
//               </Card>
//             </div>

//             {/* Interview Types */}
//             <div className="mb-12">
//               <h2 className="text-2xl font-bold mb-6 text-center">Choose Interview Type</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {interviewTypes.map((type) => (
//                   <Card 
//                     key={type.id} 
//                     className="p-6 bg-gradient-card hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50 group cursor-pointer"
//                     onClick={() => handleStartInterview(type.id)}
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center shadow-md`}>
//                         <type.icon className="w-6 h-6 text-white" />
//                       </div>
//                     </div>
                    
//                     <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                    
//                     <div className="flex justify-between text-sm text-muted-foreground mb-4">
//                       <span className="flex items-center">
//                         <Clock className="w-4 h-4 mr-1" />
//                         {type.duration}
//                       </span>
//                       <span>{type.questions} Questions</span>
//                     </div>
                    
//                     <Button className="w-full justify-between group-hover:bg-primary/90">
//                       <span className="flex items-center">
//                         <Play className="w-4 h-4 mr-2" />
//                         Start Interview
//                       </span>
//                       <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                     </Button>
//                   </Card>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Sessions */}
//             <Card className="p-8 bg-gradient-card">
//               <h3 className="text-xl font-semibold mb-6">Recent Interview Sessions</h3>
//               <div className="space-y-4">
//                 {[1, 2, 3].map((session) => (
//                   <div key={session} className="flex items-center justify-between p-4 border border-border rounded-lg">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
//                         <Brain className="w-5 h-5" />
//                       </div>
//                       <div>
//                         <div className="font-medium">Technical Interview #{session}</div>
//                         <div className="text-sm text-muted-foreground">2 days ago • 45 minutes</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center space-x-1">
//                         {[1, 2, 3, 4].map((star) => (
//                           <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                         ))}
//                         <Star className="w-4 h-4 text-muted-foreground" />
//                       </div>
//                       <Button variant="ghost" size="sm">View Report</Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </>
//         ) : (
//           /* Setup Mode: KEEP ALL INPUTS */
//           <div className="max-w-2xl mx-auto">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold mb-4">Interview Setup</h1>
//               <p className="text-muted-foreground">Configure your interview preferences</p>
//             </div>

//             <Card className="p-8 bg-gradient-card">
//               <div className="space-y-6">
//                 <div className="space-y-6 mb-8">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-2">
//                       Years of Experience 
//                     </label>
//                     <input
//                       type="text"
//                       value={experience} 
//                       onChange={(e) => setExperience(e.target.value)}
//                       placeholder="Ex: Fresher, 2 Years, or Senior Developer..." 
//                       className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 transition-all"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-2">
//                       Interview Difficulty
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={difficulty}
//                         onChange={(e) => setDifficulty(e.target.value)}
//                         className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 appearance-none outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer transition-all"
//                       >
//                         <option value="Easy">Easy</option>
//                         <option value="Medium">Medium</option>
//                         <option value="Hard">Hard</option>
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-2">
//                       Job Role (Optional)
//                     </label>
//                     <input
//                       type="text"
//                       value={role}
//                       onChange={(e) => setRole(e.target.value)}
//                       placeholder="Ex: Frontend Developer, Data Scientist..."
//                       className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 outline-none focus:ring-2 focus:ring-red-500 transition-all"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-2">
//                       Target Company (Optional)
//                     </label>
//                     <input
//                       type="text"
//                       value={targetCompany}
//                       onChange={(e) => setTargetCompany(e.target.value)}
//                       placeholder="Ex: Google, Amazon..."
//                       className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 outline-none focus:ring-2 focus:ring-red-500 transition-all"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-2">
//                       Tech Skills (Optional)
//                     </label>
//                     <input
//                       type="text"
//                       value={techSkills}
//                       onChange={(e) => setTechSkills(e.target.value)}
//                       placeholder="Ex: React, Java, Python (Comma separated)"
//                       className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 outline-none focus:ring-2 focus:ring-red-500 transition-all"
//                     />
//                   </div>

//                   {/* Start Button */}
//                   <button
//                     onClick={handleStart}
//                     disabled={!role.trim() || !experience.trim()} 
//                     className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
//                       role.trim() && experience.trim()
//                         ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white shadow-lg transform hover:scale-[1.02] cursor-pointer"
//                         : "bg-gray-800 text-gray-500 cursor-not-allowed"
//                     }`}
//                   >
//                     Start Interview &rarr;
//                   </button>
//                 </div>

//                 {/* Device Check */}
//                 <div className="border border-border rounded-lg p-6">
//                   <h3 className="font-medium mb-4 flex items-center">
//                     <Settings className="w-4 h-4 mr-2" />
//                     Device Check
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="flex items-center">
//                         <Video className="w-4 h-4 mr-2" />
//                         Camera Access
//                       </span>
//                       <Badge variant="secondary">Ready</Badge>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="flex items-center">
//                         <Mic className="w-4 h-4 mr-2" />
//                         Microphone Access
//                       </span>
//                       <Badge variant="secondary">Ready</Badge>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Back / Begin Buttons */}
//                 <div className="flex gap-4">
//                   <Button 
//                     variant="outline" 
//                     className="flex-1"
//                     onClick={() => setIsSetupMode(false)}
//                   >
//                     Back
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Interview;






import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  Video,
  Mic,
  Clock,
  User,
  Play,
  Settings,
  ChevronRight,
  Star,
  Award
} from 'lucide-react';
import { subjectiveInterviewQuestions } from '@/data/subjectiveQuestions';
import { AudioRecorder } from '@/components/interview/AudioRecorder';
import { InterviewReport } from '@/components/reports/InterviewReport';
import { interviewService } from '@/services/interviewService';

interface QuestionResult {
  question: string;
  userResponse: string;
  betterResponse: string;
  marks: number;
  maxMarks: number;
}
const interviewTypes = [
  {
    id: 1,
    title: 'Technical Interview',
    duration: '15-20 minutes',
    icon: Brain,
    color: 'bg-blue-500',
    questions: 3,
  },
  {
    id: 2,
    title: 'Behavioral Interview',
    duration: '15-20 minutes',
    icon: User,
    color: 'bg-green-500',
    questions: 3,
  },
];
const Interview = () => {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // 🔥 ADDED (session-based interview)
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [backendQuestion, setBackendQuestion] = useState<string>("");

  const [experience, setExperience] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [role, setRole] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [techSkills, setTechSkills] = useState("");

  const handleStartInterview = (typeId: number) => {
    setSelectedType(typeId);
    setIsSetupMode(true);
  };

  // 🔥 UPDATED – setup → get question + session_id
  const handleStart = async () => {
    if (!role.trim() || !experience.trim()) {
      alert("Please enter Job Role and Experience.");
      return;
    }

    const skillsArray = techSkills
      ? techSkills.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const interviewData = {
      role,
      experience,
      difficulty,
      tech_skills: skillsArray,
      target_company: targetCompany,
      interview_type: selectedType === 1 ? "technical" : "behavioral"
    };

    try {
      const response = await interviewService.setupInterview(interviewData);

      setBackendQuestion(response.question);      // 🔥 Q1
      setSessionId(response.session_id);          // 🔥 STORE SESSION
      setIsInterviewActive(true);
      setCurrentQuestion(0);
      setStartTime(Date.now());

    } catch (error) {
      console.error("Setup failed", error);
    }
  };

  // 🔥 UPDATED – evaluate + next-question
  const handleRecordingComplete = async (
    audioBlob: Blob,
    videoBlob: Blob | null,
    transcript: string
  ) => {
    const questionText = backendQuestion;
    setIsEvaluating(true);

    try {
      // 1️⃣ evaluate answer
      const evalResponse = await interviewService.evaluateAnswer(
        questionText,
        transcript
      );

      setResults(prev => [
        ...prev,
        {
          question: questionText,
          userResponse: transcript,
          betterResponse: evalResponse.better_answer || "No suggestion",
          marks: evalResponse.score ?? 0,
          maxMarks: 10
        }
      ]);

      // 2️⃣ get next question using SAME session
      if (sessionId) {
        const next = await interviewService.getNextQuestion(sessionId);

        if (next.done) {
          handleFinish();
          return;
        }

        setBackendQuestion(next.question);
        setCurrentQuestion(prev => prev + 1);
      }

    } catch (e) {
      console.error("Interview flow failed", e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleFinish = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    setTotalTime(timeTaken);
    setIsInterviewActive(false);
    setShowReport(true);
  };

  const handleBackToMenu = () => {
    setShowReport(false);
    setIsSetupMode(false);
    setCurrentQuestion(0);
    setResults([]);
    setBackendQuestion("");
    setSessionId(null);
  };

  if (showReport) {
    return (
      <InterviewReport
        results={results}
        totalTime={totalTime}
        onBack={handleBackToMenu}
      />
    );
  }

  if (isInterviewActive) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Question {currentQuestion + 1} of 3</span>
              <span>{Math.round((currentQuestion / 3) * 100)}% Complete</span>
            </div>
            <Progress value={(currentQuestion / 3) * 100} className="h-2" />
          </div>

          <AudioRecorder
            question={backendQuestion}
            onRecordingComplete={handleRecordingComplete}
          />
        </div>
      </div>
    );
  }
  // ----------------- FULL ORIGINAL UI -----------------
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4">
        {!isSetupMode ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Video className="w-4 h-4 mr-2" />
                AI Mock Interview
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Practice with{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  AI Interviewer
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get personalized feedback on your interview performance. Our AI analyzes 
                your responses, body language, and communication skills.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="p-6 text-center bg-gradient-card">
                <Video className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold">Video Analysis</div>
                <div className="text-sm text-muted-foreground">Body language & eye contact</div>
              </Card>
              <Card className="p-6 text-center bg-gradient-card">
                <Mic className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="font-semibold">Speech Recognition</div>
                <div className="text-sm text-muted-foreground">Clarity & confidence</div>
              </Card>
              <Card className="p-6 text-center bg-gradient-card">
                <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="font-semibold">AI Feedback</div>
                <div className="text-sm text-muted-foreground">Detailed performance report</div>
              </Card>
              <Card className="p-6 text-center bg-gradient-card">
                <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="font-semibold">Skill Scoring</div>
                <div className="text-sm text-muted-foreground">Track your improvement</div>
              </Card>
            </div>

            {/* Interview Types */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Choose Interview Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {interviewTypes.map((type) => (
                  <Card 
                    key={type.id} 
                    className="p-6 bg-gradient-card hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50 group cursor-pointer"
                    onClick={() => handleStartInterview(type.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center shadow-md`}>
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {type.duration}
                      </span>
                      <span>{type.questions} Questions</span>
                    </div>
                    
                    <Button className="w-full justify-between group-hover:bg-primary/90">
                      <span className="flex items-center">
                        <Play className="w-4 h-4 mr-2" />
                        Start Interview
                      </span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Sessions */}
            <Card className="p-8 bg-gradient-card">
              <h3 className="text-xl font-semibold mb-6">Recent Interview Sessions</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((session) => (
                  <div key={session} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">Technical Interview #{session}</div>
                        <div className="text-sm text-muted-foreground">2 days ago • 45 minutes</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <Button variant="ghost" size="sm">View Report</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        ) : (
          /* Setup Mode: KEEP ALL INPUTS */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Interview Setup</h1>
              <p className="text-muted-foreground">Configure your interview preferences</p>
            </div>

            <Card className="p-8 bg-gradient-card">
              <div className="space-y-6">
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Years of Experience 
                    </label>
                    <input
                      type="text"
                      value={experience} 
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Ex: Fresher, 2 Years, or Senior Developer..." 
                      className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Interview Difficulty
                    </label>
                    <div className="relative">
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 appearance-none outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer transition-all"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Job Role (Optional)
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ex: Frontend Developer, Data Scientist..."
                      className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Target Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={targetCompany}
                      onChange={(e) => setTargetCompany(e.target.value)}
                      placeholder="Ex: Google, Amazon..."
                      className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Tech Skills (Optional)
                    </label>
                    <input
                      type="text"
                      value={techSkills}
                      onChange={(e) => setTechSkills(e.target.value)}
                      placeholder="Ex: React, Java, Python (Comma separated)"
                      className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    />
                  </div>

                  {/* Start Button */}
                  <button
                    onClick={handleStart}
                    disabled={!role.trim() || !experience.trim()} 
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                      role.trim() && experience.trim()
                        ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white shadow-lg transform hover:scale-[1.02] cursor-pointer"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Start Interview &rarr;
                  </button>
                </div>

                {/* Device Check */}
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-medium mb-4 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Device Check
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Video className="w-4 h-4 mr-2" />
                        Camera Access
                      </span>
                      <Badge variant="secondary">Ready</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Mic className="w-4 h-4 mr-2" />
                        Microphone Access
                      </span>
                      <Badge variant="secondary">Ready</Badge>
                    </div>
                  </div>
                </div>

                {/* Back / Begin Buttons */}
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsSetupMode(false)}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;