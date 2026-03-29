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
  feedback: string;
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
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [backendQuestion, setBackendQuestion] = useState<string>("");
  const [experience, setExperience] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [role, setRole] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [techSkills, setTechSkills] = useState<string[]>([]); // Ab ye array hai
  const [skillInput, setSkillInput] = useState(""); // Jo user type kar raha hai
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const jobRolesList = [
    "Software Development Engineer (SDE)", "Frontend Developer", "Backend Developer",
    "Full Stack Developer", "Mobile App Developer", "Game Developer",
    "Data Scientist", "Data Analyst", "Machine Learning Engineer",
    "AI Prompt Engineer",  "DevOps Engineer",
    "Cloud Architect",
    "Cybersecurity Analyst",
    "Product Manager", "UI/UX Designer", "Systems Analyst"
  ];

  const techSkillsList = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "C","HTML","CSS",
    "React", "Angular", "Next.js", "Node.js", "Express.js", "Spring Boot", "Django", "Flutter",
    "SQL", "MySQL", "MongoDB", "Oracle",
    "Machine Learning", "Deep Learning", "TensorFlow", "Pandas",
    "Google Cloud (GCP)", "Linux", "Git",
    "Selenium", "Cybersecurity"
  ].sort();

  const handleStartInterview = (typeId: number) => {
    setSelectedType(typeId);
    setIsSetupMode(true);
  };

  const handleStart = async () => {
    if (!role.trim() || !experience.trim()) {
      alert("Please enter Job Role and Experience.");
      return;
    }
    const skillsArray = techSkills;

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

      setBackendQuestion(response.question);  
      setSessionId(response.session_id);          
      setIsInterviewActive(true);
      setCurrentQuestion(0);
      setStartTime(Date.now());

    } catch (error) {
      console.error("Setup failed", error);
    }
  };
  const handleRecordingComplete = async (
    audioBlob: Blob,
    videoBlob: Blob | null,
    transcript: string
  ) => {
    const questionText = backendQuestion;
    setIsEvaluating(true);

    try {
      const evalResponse = await interviewService.evaluateAnswer(
        questionText,
        transcript
      );

      setResults(prev => [
        ...prev,
        {
          question: questionText,
          userResponse: transcript,
          betterResponse: evalResponse.betterAnswer || "No better answer provided",
          feedback: evalResponse.feedback || "No feedback",
          marks: evalResponse.score ?? 0,
          maxMarks: 10
        }
      ]);
      if (sessionId) {
        const next = await interviewService.getNextQuestion(sessionId);

        if (!next.question) {
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
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4">
        {!isSetupMode ? (
          <>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="p-6 text-center bg-gradient-card">
                <Video className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold">Video Analysis</div>
                <div className="text-sm text-muted-foreground">Real Interview feel</div>
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
          </>
        ) : (
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
                    <div className="relative">
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 appearance-none outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer transition-all"
                      >
                        <option value="" disabled>Select your experience</option>
                        <option value="Fresher (0 Years)">Fresher (0 Years)</option>
                        <option value="0 - 1 Years">0 - 1 Years</option>
                        <option value="1 - 3 Years">1 - 3 Years</option>
                        <option value="3 - 5 Years">3 - 5 Years</option>
                        <option value="5 - 8 Years">5 - 8 Years</option>
                        <option value="8+ Years">8+ Years</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Job Role 
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setShowRoleDropdown(true);
                    }}
                    onFocus={() => setShowRoleDropdown(true)}
                    onBlur={() => setTimeout(() => setShowRoleDropdown(false), 300)} // 👈 Thoda time badhaya taaki safe rahe
                    placeholder="Type or select a role (e.g., Data Scientist)..."
                    className="w-full bg-[#1d1d2e] border border-gray-700 text-white rounded-lg p-4 outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                    {showRoleDropdown && (
                      <ul className="absolute z-50 w-full mt-1 bg-[#1d1d2e] border border-gray-700 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                        {jobRolesList
                          .filter((r) => r.toLowerCase().includes(role.toLowerCase()))
                          .map((r, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                setRole(r);
                                setShowRoleDropdown(false);
                              }}
                              className="p-4 hover:bg-red-600/20 hover:text-red-400 text-gray-300 cursor-pointer border-b border-gray-800/50 transition-colors"
                            >
                              {r}
                            </li>
                          ))}
                        {jobRolesList.filter((r) => r.toLowerCase().includes(role.toLowerCase())).length === 0 && (
                          <li className="p-4 text-gray-500 italic">No matching roles found...</li>
                        )}
                      </ul>
                    )}
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
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Tech Skills (Optional)
                    </label>
                    <div 
                      className="w-full bg-[#1d1d2e] border border-gray-700 rounded-lg p-3 min-h-[56px] flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-red-500 transition-all cursor-text"
                      onClick={() => document.getElementById('skill-input')?.focus()}
                    >
                      {techSkills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-sm flex items-center gap-1 animate-in fade-in zoom-in duration-200"
                        >
                          {skill}
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTechSkills(techSkills.filter(s => s !== skill));
                            }}
                            className="hover:text-red-200 focus:outline-none ml-1 font-bold"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    <input
                        id="skill-input"
                        type="text"
                        value={skillInput}
                        onChange={(e) => {
                          setSkillInput(e.target.value);
                          setShowSkillsDropdown(true);
                        }}
                        onFocus={() => setShowSkillsDropdown(true)}
                        onBlur={() => setTimeout(() => setShowSkillsDropdown(false), 300)} 
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && skillInput === '' && techSkills.length > 0) {
                            setTechSkills(prev => prev.slice(0, -1));
                          }
                        }}
                        placeholder={techSkills.length === 0 ? "Ex: React, Java, C++..." : ""}
                        className="flex-1 bg-transparent outline-none min-w-[120px] text-white placeholder-gray-500"
                      />
                    </div>
                    {showSkillsDropdown && (
                      <ul className="absolute z-50 w-full mt-1 bg-[#1d1d2e] border border-gray-700 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                        {techSkillsList
                          .filter((s) => s.toLowerCase().includes(skillInput.toLowerCase()) && !techSkills.includes(s))
                          .map((s, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                setTechSkills([...techSkills, s]); // Naya skill array me add kiya
                                setSkillInput(""); // Input khali kiya
                                document.getElementById('skill-input')?.focus(); // Taki user turant dusra type kar sake
                              }}
                              className="p-4 hover:bg-red-600/20 hover:text-red-400 text-gray-300 cursor-pointer border-b border-gray-800/50 transition-colors"
                            >
                              {s}
                            </li>
                          ))}
                        {skillInput.trim() !== '' && !techSkillsList.some(s => s.toLowerCase() === skillInput.toLowerCase()) && !techSkills.includes(skillInput.trim()) && (
                          <li 
                            onClick={() => {
                              setTechSkills([...techSkills, skillInput.trim()]);
                              setSkillInput("");
                              document.getElementById('skill-input')?.focus();
                            }}
                            className="p-4 hover:bg-red-600/20 hover:text-red-400 text-gray-300 cursor-pointer italic"
                          >
                            Add "{skillInput}"...
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
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