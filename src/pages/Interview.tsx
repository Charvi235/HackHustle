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
import { subjectiveInterviewQuestions, SubjectiveQuestion } from '@/data/subjectiveQuestions';
import { AudioRecorder } from '@/components/interview/AudioRecorder';
import { InterviewReport } from '@/components/reports/InterviewReport';

const interviewTypes = [
  {
    id: 1,
    title: 'Technical Interview',
    description: 'Data structures, algorithms, and coding challenges',
    duration: '15-20 minutes',
    difficulty: 'Intermediate',
    icon: Brain,
    color: 'bg-blue-500',
    questions: 3,
  },
  {
    id: 2,
    title: 'Behavioral Interview',
    description: 'Soft skills, teamwork, and problem-solving scenarios',
    duration: '15-20 minutes',
    difficulty: 'All Levels',
    icon: User,
    color: 'bg-green-500',
    questions: 3,
  },
];

const experienceLevels = [
  { label: 'Student / Fresh Graduate', value: 'entry', years: '0-1 years' },
  { label: 'Junior Developer', value: 'junior', years: '1-3 years' },
  { label: 'Mid-Level Engineer', value: 'mid', years: '3-5 years' },
  { label: 'Senior Engineer', value: 'senior', years: '5+ years' },
];

interface QuestionResult {
  question: string;
  userResponse: string;
  betterResponse: string;
  marks: number;
  maxMarks: number;
}

const Interview = () => {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('junior');
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recordings, setRecordings] = useState<{ [key: number]: { audio: Blob; video: Blob | null } }>({});
  const [showReport, setShowReport] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  const handleStartInterview = (typeId: number) => {
    setSelectedType(typeId);
    setIsSetupMode(true);
  };

  const handleBeginInterview = () => {
    setIsInterviewActive(true);
    setCurrentQuestion(0);
    setRecordings({});
    setStartTime(Date.now());
  };

  const handleRecordingComplete = (audioBlob: Blob, videoBlob: Blob | null) => {
    const questionId = subjectiveInterviewQuestions[currentQuestion].id;
    setRecordings({ ...recordings, [questionId]: { audio: audioBlob, video: videoBlob } });
    
    // Move to next question or finish
    if (currentQuestion < 2) { // Only 3 questions (0, 1, 2)
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinish();
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
    setRecordings({});
  };

  // Generate mock results for report
  const generateResults = (): QuestionResult[] => {
    return subjectiveInterviewQuestions.slice(0, 3).map((q, idx) => ({
      question: q.question,
      userResponse: "This is a simulated user response based on the recording. In a real implementation, this would be transcribed from the audio.",
      betterResponse: q.sampleAnswer,
      marks: Math.floor(Math.random() * 3) + 7, // Random marks between 7-10
      maxMarks: 10
    }));
  };

  if (showReport) {
    return (
      <InterviewReport
        results={generateResults()}
        totalTime={totalTime}
        onBack={handleBackToMenu}
      />
    );
  }

  if (isInterviewActive) {
    const question = subjectiveInterviewQuestions[currentQuestion];

    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Question {currentQuestion + 1} of 3</span>
              <span>{Math.round(((currentQuestion + 1) / 3) * 100)}% Complete</span>
            </div>
            <Progress value={((currentQuestion + 1) / 3) * 100} className="h-2" />
          </div>

          {/* Interview Interface */}
          <AudioRecorder 
            question={question.question}
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
                      <Badge variant="outline">{type.difficulty}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    
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
          /* Setup Mode */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Interview Setup</h1>
              <p className="text-muted-foreground">Configure your interview preferences</p>
            </div>

            <Card className="p-8 bg-gradient-card">
              <div className="space-y-6">
                {/* Experience Level */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Experience Level</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {experienceLevels.map((level) => (
                      <Button
                        key={level.value}
                        variant={selectedLevel === level.value ? "default" : "outline"}
                        className="justify-start h-auto p-4"
                        onClick={() => setSelectedLevel(level.value)}
                      >
                        <div className="text-left">
                          <div className="font-medium">{level.label}</div>
                          <div className="text-xs text-muted-foreground">{level.years}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Camera/Mic Check */}
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

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsSetupMode(false)}
                  >
                    Back
                  </Button>
                  <Button 
                    variant="hero" 
                    className="flex-1"
                    onClick={handleBeginInterview}
                  >
                    Begin Interview
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