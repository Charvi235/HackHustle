import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  BookOpen,
  Code,
  Database,
  Play,
  ChevronRight,
  ChevronLeft,
  Trophy
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2 } from 'lucide-react';
import PracticeQuiz from '../components/practice/PracticeQuiz';
import { questionService, QuestionDto } from '@/services/questionsServices';

const user = JSON.parse(localStorage.getItem('user') || '{}');
const emailId: string = user?.emailId || '';

interface TopicConfig {
  id: number;
  name: string;
}

interface SubjectConfig {
  id: number;
  name: string;
  topics: TopicConfig[];
}

const subjects: SubjectConfig[] = [
  {
    id: 1001,
    name: 'DBMS',
    topics: [
      { id: 1001, name: 'Normalization' },
      { id: 1002, name: 'Concurrency Control' },
      { id: 1003, name: 'Deadlock' },
      { id: 1004, name: 'Keys in DBMS' }
    ]
  },
  {
    id: 1002,
    name: 'OOPS',
    topics: [
      { id: 1005, name: 'Concepts of OOPS' },
      { id: 1006, name: 'Inheritance' },
      { id: 1007, name: 'Abstraction' },
      { id: 1008, name: 'Polymorphism' }
    ]
  },
  {
    id: 1003,
    name: 'Data Structures',
    topics: [
      { id: 1009, name: 'Stack' },
      { id: 1010, name: 'Linked List' },
      { id: 1011, name: 'Queue' },
      { id: 1012, name: 'Tree' },
      { id: 1013, name: 'Heap' },
      { id: 1014, name: 'Graphs' }
    ]
  }
];

const splitIntoSets = (questions: QuestionDto[], size = 10) => {
  const sets: QuestionDto[][] = [];
  for (let i = 0; i < questions.length; i += size) {
    sets.push(questions.slice(i, i + size));
  }
  return sets;
};

const Practice = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectConfig | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicConfig | null>(null);
  const [questionSets, setQuestionSets] = useState<QuestionDto[][]>([]);
  const [selectedSet, setSelectedSet] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(0);


  const handleSubmitAssessment = async () => {
    
    setShowResult(true);
    try {
      await fetch('http://localhost:8080/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailId: emailId,
          topicID: selectedTopic?.id || 1015,
      //    subjectID: selectedSubject!.id,
      subjectID: selectedSubject.id,
          assessmentScore 
        })
      });
      console.log("Data saved successfully");
    } catch (err) {
      console.error('Data save nahi hua (Backend Error):', err);
    }
  };

  const [showResult, setShowResult] = useState(false);
  // --- NAYA:Progress Tracker States ---
  const [topicProgress, setTopicProgress] = useState<Record<number, { solved: number, total: number }>>({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);

  // Jab bhi koi Subject select hoga, backend se progress fetch hogi
  useEffect(() => {
    if (selectedSubject && emailId) {
      const fetchProgress = async () => {
        setIsLoadingProgress(true);
        try {
          // 🚨 TERI FRIEND KI API YAHA AAYEGI 🚨
          // Example API: GET http://localhost:8080/api/progress/student@gmail.com/1001 (subjectId)
          const response = await fetch(`http://localhost:8080/api/progress/${emailId}/${selectedSubject.id}`);
          
          if (response.ok) {
            const data = await response.json();
            // Data ko dictionary me map kar rahe hain taaki ID se turant mil jaye
            const progressMap: Record<number, { solved: number, total: number }> = {};
            data.forEach((item: any) => {
              progressMap[item.topicId] = { solved: item.solvedQuestions, total: item.totalQuestions };
            });
            setTopicProgress(progressMap);
          }
        } catch (error) {
          console.error('Progress load nahi hui:', error);
        } finally {
          setIsLoadingProgress(false);
        }
      };

      fetchProgress();
    }
  }, [selectedSubject, emailId]);

  // --- NAYA: Subject Home Progress Tracker States ---
  const [subjectProgress, setSubjectProgress] = useState<Record<number, { solved: number, total: number }>>({});
  const [isLoadingSubjectProgress, setIsLoadingSubjectProgress] = useState(false);

  // Jab user Home Screen pe hoga (koi subject select nahi kiya), tab ye chalega
  useEffect(() => {
    if (!selectedSubject && emailId) {
      const fetchSubjectProgress = async () => {
        setIsLoadingSubjectProgress(true);
        try {
          // 🚨 TERI FRIEND KI EK AUR NAYI API YAHA AAYEGI 🚨
          const response = await fetch(`http://localhost:8080/api/progress/subjects/${emailId}`);
          
          if (response.ok) {
            const data = await response.json();
            const progressMap: Record<number, { solved: number, total: number }> = {};
            data.forEach((item: any) => {
              progressMap[item.subjectId] = { solved: item.solvedQuestions, total: item.totalQuestions };
            });
            setSubjectProgress(progressMap);
          }
        } catch (error) {
          console.error('Subject progress load nahi hui:', error);
        } finally {
          setIsLoadingSubjectProgress(false);
        }
      };

      fetchSubjectProgress();
    }
  }, [selectedSubject, emailId]);
  // const handleSubmitAssessment = async () => {
    
  //   setShowResult(true);
  //   try {
  //     await fetch('http://localhost:8080/api/assessments', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         emailId: emailId,
  //         topicID: selectedTopic?.id || 1015,
  //     //    subjectID: selectedSubject!.id,
  //     subjectID: selectedSubject.id,
  //         assessmentScore 
  //       })
  //     });
  //     console.log("Data saved successfully");
  //   } catch (err) {
  //     console.error('Data save nahi hua (Backend Error):', err);
  //   }
  // };

  //const [showResult, setShowResult] = useState(false);



  const handleSelectSubject = (subject: SubjectConfig) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
    setQuestionSets([]);
    setStartQuiz(false);
  };

  const handleSelectTopic = async (topic: TopicConfig) => {
    setSelectedTopic(topic);
    setLoading(true);
    try {
      const data = await questionService.getQuestionsByTopic(topic.name);
      setQuestionSets(splitIntoSets(data, 10));
      setSelectedSet(0);
    } catch (err) {
      console.error(err);
      setQuestionSets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicAssessment = async () => {
    if (!selectedTopic) return;
    setLoading(true);
    try {
      const data = await questionService.getTopicAssessmentQuestions(selectedTopic.name);
      setQuestionSets([data]);
      setSelectedSet(0);
      setStartQuiz(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectAssessment = async () => {
    if (!selectedSubject) return;
    setLoading(true);
    try {
      const data = await questionService.getQuestionsBySubject(selectedSubject.id);
      setQuestionSets([data]);
      setSelectedSet(0);
      setStartQuiz(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedTopic(null);
    setQuestionSets([]);
    setStartQuiz(false);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setQuestionSets([]);
    setStartQuiz(false);
  };

  // const handleSubmitAssessment = async () => {
  //   try {
  //     await fetch('http://localhost:8080/api/assessments', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         emailId,
  //         topicID: selectedTopic?.id || 1015,
  //         subjectID: selectedSubject?.id || null,
  //         assessmentScore
  //       })
  //     });

  //     setShowResult(true);
  //   } catch (err) {
  //     console.error('Assessment submission failed', err);
  //   }
  // };

  /* ================= ASSESSMENT MODE ================= */
  if (startQuiz && selectedSubject) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-24">
        <PracticeQuiz
          questions={questionSets[selectedSet] || []}
          subjectName={selectedSubject.name}
          topicName={selectedTopic?.name}
          onBack={() => setStartQuiz(false)}
          totalQuestionsInTopic={questionSets.flat().length}
          onScoreCalculated={setAssessmentScore}
          isAssessment={true}
          subjectId={selectedSubject.id}

          topicId={selectedTopic?.id || 1015}


   

        />

        <div className="p-4 flex justify-center">
          <Button className="w-[240px]" onClick={handleSubmitAssessment}>
            Submit Assessment
          </Button>
        </div>

        <Dialog open={showResult} onOpenChange={setShowResult}>
          <DialogContent className="bg-[#1a1a2e] border border-gray-800 text-white sm:max-w-md p-0 overflow-hidden">
            <div className="flex flex-col items-center justify-center p-8 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 rounded-full"></div>
                <div className="relative bg-[#2a2a3e] p-5 rounded-full border border-gray-700 shadow-xl">
                  <Trophy className="h-10 w-10 text-red-500" />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold">Assessment Submitted!</h2>
                <p className="text-gray-400 text-sm">
                  Here is your final score
                </p>
              </div>

              <div className="bg-[#0f0f1a] w-full py-6 rounded-xl border border-gray-800 flex flex-col items-center">
                <span className="text-gray-500 text-xs uppercase font-bold mb-2">
                  Total Score
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-red-500">
                    {assessmentScore}
                  </span>
                  <span className="text-xl text-gray-600">Points</span>
                </div>
              </div>

              <button
                onClick={() => setShowResult(false)}
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Close Result
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  /* ================= PRACTICE MODE ================= */
  if (selectedSubject && selectedTopic) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="outline" onClick={handleBackToTopics} className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Topics
          </Button>

          <Badge variant="secondary">{selectedSubject.name}</Badge>
          <h1 className="text-3xl font-bold mt-2 mb-6">
            {selectedTopic.name}
          </h1>

          {!loading && questionSets.length > 0 && (
            <>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex gap-3 flex-wrap">
                  {questionSets.map((_, index) => (
                    <Button
                      key={index}
                      variant={index === selectedSet ? 'default' : 'outline'}
                      onClick={() => setSelectedSet(index)}
                    >
                      Set {index + 1}
                    </Button>
                  ))}
                </div>

                <Button variant="secondary" onClick={handleTopicAssessment}>
                  Take Topic-wise Assessment
                </Button>
              </div>

              <PracticeQuiz
                questions={questionSets[selectedSet] || []}
                topicName={selectedTopic.name}
                subjectName={selectedSubject.name}
                onBack={handleBackToTopics}
                totalQuestionsInTopic={questionSets.flat().length}
                isAssessment={false}
                subjectId={selectedSubject.id}
                topicId={selectedTopic.id}
              />
            </>
          )}
        </div>
      </div>
    );
  }

  /* ================= SUBJECT LIST ================= */
  // if (selectedSubject) {
  //   return (
  //     <div className="min-h-screen bg-background pt-20 pb-16">
  //       <div className="container mx-auto px-4 max-w-4xl">
  //         <Button variant="outline" onClick={handleBackToSubjects} className="mb-6">
  //           <ChevronLeft className="w-4 h-4 mr-2" /> Back to Subjects
  //         </Button>

  //         <h1 className="text-4xl font-bold mb-6">
  //           {selectedSubject.name}
  //         </h1>

  //         <div className="space-y-4">
  //           {selectedSubject.topics.map(topic => (
  //             <Card
  //               key={topic.id}
  //               className="p-6 cursor-pointer hover:shadow-md"
  //               onClick={() => handleSelectTopic(topic)}
  //             >
  //               <div className="flex justify-between items-center">
  //                 <h3 className="text-xl font-semibold">{topic.name}</h3>
  //                 <ChevronRight />
  //               </div>
  //             </Card>
  //           ))}
  //         </div>

  //         <Button
  //           className="w-full mt-14"
  //           variant="secondary"
  //           onClick={handleSubjectAssessment}
  //         >
  //           Start {selectedSubject.name}'s Assessment
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }
  /* ================= SUBJECT LIST (TUF STYLE PROGRESS) ================= */
  if (selectedSubject && !selectedTopic && !startQuiz) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="outline" onClick={handleBackToSubjects} className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Subjects
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              {selectedSubject.name} Practice
            </h1>
            <p className="text-zinc-400">Track your progress and complete all topics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedSubject.topics.map((topic) => {
              // API se data lo, warna default 0/10 dikhao
              const prog = topicProgress[topic.id] || { solved: 0, total: 10 };
              const progressPercentage = Math.round((prog.solved / Math.max(prog.total, 1)) * 100);
              const isCompleted = prog.solved > 0 && prog.solved === prog.total;

              return (
                <Card
  key={topic.id}
  className="bg-[#09090b] border-zinc-800/80 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,214,0.15)] transition-all duration-300 cursor-pointer group rounded-xl relative overflow-hidden"
  onClick={() => handleSelectTopic(topic)}
>
  {/* Hover par ek subtle radiant background gradient aayega */}
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/10 transition-all duration-500 z-0" />

  <CardContent className="p-5 flex flex-col justify-between h-full space-y-6 relative z-10">
    {/* Top Section: Name & Count */}
    <div className="flex justify-between items-start">
      <div className="space-y-1.5">
        <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2 group-hover:text-white transition-colors">
          {topic.name}
          {/* Completed hone par glowing green tick */}
          {isCompleted && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          )}
        </h3>
        <p className="text-sm text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors">
          {isLoadingProgress ? (
            <span className="animate-pulse text-cyan-500/70">Fetching data...</span>
          ) : (
            `${prog.solved} / ${prog.total} Problems`
          )}
        </p>
      </div>

      {/* Right Arrow - Hover pe glow karega */}
      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_10px_rgba(6,182,214,0.2)] transition-all duration-300">
        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>

    {/* Bottom Section: Radiant Progress Bar */}
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold tracking-wider uppercase">
        <span className="text-zinc-600">Progress</span>
        {/* Percentage text neon effect ke sath */}
        <span className={isCompleted ? "text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" : "text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,214,0.5)]"}>
          {progressPercentage}%
        </span>
      </div>
      
      {/* Magic Here: Shadcn progress bar ko modify karke usme gradient aur glow dala hai!
        [&>div] likhne se progress bar ke andar ka indicator color change hota hai
      */}
      <Progress
        value={progressPercentage}
        className="h-2 bg-zinc-900 border border-zinc-800/50 
        [&>div]:bg-gradient-to-r [&>div]:from-cyan-400 [&>div]:to-blue-600 
        [&>div]:shadow-[0_0_10px_rgba(6,182,214,0.6)]"
      />
    </div>
  </CardContent>
</Card>

              );
            })}
          </div>

          <Button
            className="w-full mt-10"
            variant="secondary"
            onClick={handleSubjectAssessment}
          >
            Start {selectedSubject.name}'s Final Assessment
          </Button>
        </div>
      </div>
    );
  }
  /* ================= SUBJECT HOME ================= */
  // return (
  //   <div className="min-h-screen bg-background pt-20 pb-16">
  //     <div className="container mx-auto px-4">
  //       <div className="text-center mb-12">
  //         <Badge variant="secondary" className="mb-4">
  //           <BookOpen className="w-4 h-4 mr-2" /> Practice Mode
  //         </Badge>
  //         <h1 className="text-4xl font-bold">
  //           Choose Your Subject
  //         </h1>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  //         {subjects.map(subject => (
  //           <Card key={subject.id} className="p-6">
  //             <div className="flex items-center gap-4 mb-4">
  //               <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
  //                 {subject.name === 'DBMS' ? (
  //                   <Database className="text-white" />
  //                 ) : (
  //                   <Code className="text-white" />
  //                 )}
  //               </div>
  //               <h3 className="text-xl font-semibold">
  //                 {subject.name}
  //               </h3>
  //             </div>

  //             <Button
  //               className="w-full"
  //               onClick={() => handleSelectSubject(subject)}
  //             >
  //               <Play className="w-4 h-4 mr-2" /> Start Practice
  //             </Button>
  //           </Card>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
  /* ================= SUBJECT HOME ================= */
  /* ================= SUBJECT HOME ================= */
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" /> Practice Mode
          </Badge>
          <h1 className="text-4xl font-bold text-white">
            Choose Your Subject
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {subjects.map((subject) => {
            const prog = subjectProgress[subject.id] || { solved: 0, total: 50 }; 
            const progressPercentage = Math.round((prog.solved / Math.max(prog.total, 1)) * 100);
            const isCompleted = prog.solved > 0 && prog.solved === prog.total;

            return (
              <Card
                key={subject.id}
                className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 transition-colors duration-200"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div className="flex items-center gap-4">
                      {/* Clean flat icon container */}
                      <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center">
                        {subject.name === 'DBMS' ? (
                          <Database className="text-red-500 w-6 h-6" />
                        ) : (
                          <Code className="text-red-500 w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                          {subject.name}
                          {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        </h3>
                        <p className="text-sm text-zinc-400 mt-1">
                          {isLoadingSubjectProgress ? (
                            <span className="animate-pulse">Loading progress...</span>
                          ) : (
                            `${prog.solved} / ${prog.total} Total Questions Solved`
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Minimal button */}
                    {/* <Button
                      variant="outline"
                      className="w-full md:w-auto bg-transparent border-zinc-700 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => handleSelectSubject(subject)}
                    >
                      <Play className="w-4 h-4 mr-2" /> Continue Practice
                    </Button> */}
                    {/* Right: Start Button (Minimal SOLID RED, NO Flash) */}
{/* Right: Start Button (Minimal SOLID RED) */}
<Button
  className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white border-0 transition-colors"
  onClick={() => handleSelectSubject(subject)}
>
  <Play className="w-4 h-4 mr-2" /> Continue Practice
</Button>
                  </div>

                  {/* Clean flat progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold tracking-wider uppercase">
                      <span className="text-zinc-500">Overall Progress</span>
                      <span className={isCompleted ? "text-green-500" : "text-zinc-300"}>
                        {progressPercentage}%
                      </span>
                    </div>
                    <Progress
                      value={progressPercentage}
                      className="h-2 bg-zinc-950 [&>div]:bg-red-500"
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Practice;