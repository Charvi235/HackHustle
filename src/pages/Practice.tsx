// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { 
//   BookOpen, 
//   Code, 
//   Database, 
//   Globe, 
//   Brain,
//   Trophy,
//   Clock,
//   Target,
//   Play,
//   ChevronRight,
//   ChevronLeft,
//   FileText
// } from 'lucide-react';
// import { subjects, Subject, Topic, Question } from '@/data/questions';

// const subjectIcons: { [key: string]: any } = {
//   "Database Management System": Database,
//   "Operating System": Target,
//   "Computer Network": Globe,
//   "Object Oriented Programming": Code,
//   "Data Structure and Algorithms": Brain,
//   "Java Programming": Code
// };

// const subjectColors: { [key: string]: string } = {
//   "Database Management System": "bg-green-500",
//   "Operating System": "bg-purple-500",
//   "Computer Network": "bg-orange-500",
//   "Object Oriented Programming": "bg-red-500",
//   "Data Structure and Algorithms": "bg-blue-500",
//   "Java Programming": "bg-indigo-500"
// };

// const subjectStats = [
//   {
//     title: 'Data Structure and Algorithms',
//     topics: 15,
//     questions: 450,
//     difficulty: 'Intermediate',
//     progress: 65,
//   },
//   {
//     title: 'Database Management System',
//     topics: 12,
//     questions: 380,
//     difficulty: 'Intermediate',
//     progress: 80,
//   },
//   {
//     title: 'Operating System',
//     topics: 10,
//     questions: 320,
//     difficulty: 'Intermediate',
//     progress: 45,
//   },
//   {
//     title: 'Computer Network',
//     topics: 8,
//     questions: 280,
//     difficulty: 'Intermediate',
//     progress: 55,
//   },
//   {
//     title: 'Object Oriented Programming',
//     topics: 12,
//     questions: 350,
//     difficulty: 'Beginner',
//     progress: 70,
//   },
//   {
//     title: 'Java Programming',
//     topics: 14,
//     questions: 420,
//     difficulty: 'Intermediate',
//     progress: 60,
//   },
// ];

// const Practice = () => {
//   const navigate = useNavigate();
//   const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
//   const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
//   const [selectedSet, setSelectedSet] = useState(0);

//   const handleSelectSubject = (subject: Subject) => {
//     setSelectedSubject(subject);
//     setSelectedTopic(null);
//     setSelectedSet(0);
//   };

//   const handleSelectTopic = (topic: Topic) => {
//     setSelectedTopic(topic);
//     setSelectedSet(0);
//   };

//   const handleQuestionClick = (question: Question, questionIndex: number) => {
//     const currentQuestions = selectedTopic?.questions[selectedSet] || [];
//     navigate('/question-detail', {
//       state: {
//         question,
//         questionIndex,
//         topicName: selectedTopic?.name,
//         subjectName: selectedSubject?.name,
//         questions: currentQuestions,
//         setNumber: selectedSet + 1
//       }
//     });
//   };

//   const handleTopicAssessment = (topic: Topic) => {
//     const allQuestions = topic.questions.flat();
//     navigate('/assessment', {
//       state: {
//         questions: allQuestions,
//         assessmentName: `${topic.name} Assessment`,
//         subjectName: selectedSubject?.name,
//         type: 'topic'
//       }
//     });
//   };

//   const handleSubjectAssessment = () => {
//     if (!selectedSubject) return;
//     const allQuestions = selectedSubject.topics.flatMap(t => t.questions.flat());
//     navigate('/assessment', {
//       state: {
//         questions: allQuestions,
//         assessmentName: `${selectedSubject.name} Assessment`,
//         subjectName: selectedSubject.name,
//         type: 'subject'
//       }
//     });
//   };

//   const handleBackToSubjects = () => {
//     setSelectedSubject(null);
//     setSelectedTopic(null);
//     setSelectedSet(0);
//   };

//   const handleBackToTopics = () => {
//     setSelectedTopic(null);
//     setSelectedSet(0);
//   };

//   // Show question list for selected topic
//   if (selectedTopic && selectedSubject) {
//     const currentQuestions = selectedTopic.questions[selectedSet] || [];
    
//     return (
//       <div className="min-h-screen bg-background pt-20 pb-16">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <Button variant="outline" onClick={handleBackToTopics} className="mb-6">
//             <ChevronLeft className="w-4 h-4 mr-2" />
//             Back to Topics
//           </Button>

//           {/* Header */}
//           <div className="mb-8">
//             <Badge variant="secondary" className="mb-2">{selectedSubject.name}</Badge>
//             <h1 className="text-3xl font-bold mb-4">{selectedTopic.name}</h1>
            
//             {/* Set Selector */}
//             <div className="flex gap-2 flex-wrap">
//               {selectedTopic.questions.map((_, index) => (
//                 <Button
//                   key={index}
//                   variant={selectedSet === index ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setSelectedSet(index)}
//                 >
//                   Set {index + 1}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* Questions List */}
//           <div className="space-y-3 mb-6">
//             {currentQuestions.map((question, index) => (
//               <Card
//                 key={question.id}
//                 className="p-4 bg-gradient-card hover:shadow-glow transition-all cursor-pointer"
//                 onClick={() => handleQuestionClick(question, index)}
//               >
//                 <div className="flex items-start gap-4">
//                   <Badge variant="outline" className="mt-1">
//                     {index + 1}
//                   </Badge>
//                   <div className="flex-1">
//                     <p className="font-medium line-clamp-2">{question.question}</p>
//                   </div>
//                   <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
//                 </div>
//               </Card>
//             ))}
//           </div>

//           {/* Topic Assessment Button */}
//           <Card className="p-6 bg-gradient-card text-center">
//             <h3 className="text-xl font-bold mb-2">Ready to Test Your Knowledge?</h3>
//             <p className="text-muted-foreground mb-4">
//               Take the complete {selectedTopic.name} assessment
//             </p>
//             <Button onClick={() => handleTopicAssessment(selectedTopic)} size="lg">
//               <Target className="w-5 h-5 mr-2" />
//               Take {selectedTopic.name} Assessment
//             </Button>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   // Show topics view
//   if (selectedSubject) {
//     return (
//       <div className="min-h-screen bg-background pt-20 pb-16">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <Button variant="outline" onClick={handleBackToSubjects} className="mb-6">
//             <ChevronLeft className="w-4 h-4 mr-2" />
//             Back to Subjects
//           </Button>

//           {/* Subject Header */}
//           <div className="text-center mb-12">
//             <Badge variant="secondary" className="mb-4">
//               {selectedSubject.name}
//             </Badge>
//             <h1 className="text-4xl font-bold mb-4">
//               Choose a <span className="bg-gradient-primary bg-clip-text text-transparent">Topic</span>
//             </h1>
//             <p className="text-muted-foreground">
//               Select a topic to start practicing
//             </p>
//           </div>

//           {/* Topics List */}
//           <div className="space-y-3 mb-8">
//             {selectedSubject.topics.map((topic, index) => {
//               const totalQuestions = topic.questions.flat().length;
//               const totalSets = topic.questions.length;
              
//               return (
//                 <Card 
//                   key={topic.id}
//                   className="p-6 bg-gradient-card hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50 group cursor-pointer"
//                   onClick={() => handleSelectTopic(topic)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                       <Badge variant="outline" className="text-lg px-3 py-1">
//                         {index + 1}
//                       </Badge>
//                       <div>
//                         <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
//                           {topic.name}
//                         </h3>
//                         <p className="text-sm text-muted-foreground">
//                           {totalQuestions} questions • {totalSets} sets
//                         </p>
//                       </div>
//                     </div>
//                     <ChevronRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" />
//                   </div>
//                 </Card>
//               );
//             })}
//           </div>

//           {/* Subject Assessment */}
//           <Card className="p-8 bg-gradient-card text-center">
//             <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold mb-2">Complete {selectedSubject.name} Assessment</h2>
//             <p className="text-muted-foreground mb-6">
//               Test your knowledge across all topics in {selectedSubject.name}
//             </p>
//             <Button onClick={handleSubjectAssessment} size="lg">
//               <Target className="w-5 h-5 mr-2" />
//               Take {selectedSubject.name} Assessment
//             </Button>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   // Show subjects view (default)
//   return (
//     <div className="min-h-screen bg-background pt-20 pb-16">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <Badge variant="secondary" className="mb-4">
//             <BookOpen className="w-4 h-4 mr-2" />
//             Practice Mode
//           </Badge>
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">
//             Choose Your{' '}
//             <span className="bg-gradient-primary bg-clip-text text-transparent">
//               Learning Path
//             </span>
//           </h1>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Master technical concepts through structured practice. Each subject contains 
//             curated MCQs organized by difficulty and topics.
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//           <Card className="p-6 text-center bg-gradient-card">
//             <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
//             <div className="text-2xl font-bold">2,450</div>
//             <div className="text-sm text-muted-foreground">Total Questions</div>
//           </Card>
//           <Card className="p-6 text-center bg-gradient-card">
//             <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
//             <div className="text-2xl font-bold">85%</div>
//             <div className="text-sm text-muted-foreground">Avg. Accuracy</div>
//           </Card>
//           <Card className="p-6 text-center bg-gradient-card">
//             <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
//             <div className="text-2xl font-bold">45 min</div>
//             <div className="text-sm text-muted-foreground">Avg. Session</div>
//           </Card>
//           <Card className="p-6 text-center bg-gradient-card">
//             <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
//             <div className="text-2xl font-bold">6</div>
//             <div className="text-sm text-muted-foreground">Subjects</div>
//           </Card>
//         </div>

//         {/* Subjects Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {subjects.map((subject) => {
//             const SubjectIcon = subjectIcons[subject.name] || Code;
//             const stats = subjectStats.find(s => s.title === subject.name);
            
//             return (
//               <Card 
//                 key={subject.id} 
//                 className="p-6 bg-gradient-card hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50 group"
//               >
//                 {/* Subject Header */}
//                 <div className="flex items-center justify-between mb-4">
//                   <div className={`w-12 h-12 ${subjectColors[subject.name]} rounded-lg flex items-center justify-center shadow-md`}>
//                     <SubjectIcon className="w-6 h-6 text-white" />
//                   </div>
//                   <Badge variant="outline" className="text-xs">
//                     {stats?.difficulty}
//                   </Badge>
//                 </div>

//                 {/* Subject Info */}
//                 <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
//                 <p className="text-muted-foreground mb-4">Master the fundamentals</p>

//                 {/* Progress */}
//                 <div className="mb-4">
//                   <div className="flex justify-between text-sm mb-2">
//                     <span>Progress</span>
//                     <span>{stats?.progress}%</span>
//                   </div>
//                   <Progress value={stats?.progress || 0} className="h-2" />
//                 </div>

//                 {/* Stats */}
//                 <div className="flex justify-between text-sm text-muted-foreground mb-4">
//                   <span>{subject.topics.length} Topics</span>
//                   <span>{stats?.questions} Questions</span>
//                 </div>

//                 {/* Action Button */}
//                 <Button 
//                   onClick={() => handleSelectSubject(subject)}
//                   className="w-full justify-between group-hover:bg-primary/90"
//                 >
//                   <span className="flex items-center">
//                     <Play className="w-4 h-4 mr-2" />
//                     Start Practice
//                   </span>
//                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Bottom CTA */}
//         <div className="text-center mt-16">
//           <Card className="p-8 bg-gradient-card max-w-2xl mx-auto">
//             <h3 className="text-2xl font-bold mb-4">
//               Ready for a Challenge?
//             </h3>
//             <p className="text-muted-foreground mb-6">
//               Test your skills across multiple subjects with our comprehensive assessment.
//             </p>
//             <Button variant="hero" size="lg">
//               Take Mixed Assessment
//             </Button>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Practice;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Code,
  Database,
  Globe,
  Brain,
  Trophy,
  Clock,
  Target,
  Play,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

import { questionService, QuestionDto } from '@/services/questionsServices';

/* ---------------- SUBJECT & TOPIC UI CONFIG (NO QUESTIONS HERE) ---------------- */

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
  }
];

/* ---------------- ICONS & COLORS ---------------- */

const subjectIcons: { [key: string]: any } = {
  'DBMS': Database,
  // 'Operating System': Target,
  // 'Computer Network': Globe,
  'OOPS': Code,
  // 'Data Structure and Algorithms': Brain,
  // 'Java Programming': Code
};

const subjectColors: { [key: string]: string } = {
  'DBMS': 'bg-green-500',
  //'Operating System': 'bg-purple-500',
  //'Computer Network': 'bg-orange-500',
  'OOPS': 'bg-red-500',
  //'Data Structure and Algorithms': 'bg-blue-500',
 // 'Java Programming': 'bg-indigo-500'
};

/* ---------------- COMPONENT ---------------- */

const Practice = () => {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState<SubjectConfig | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicConfig | null>(null);

  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- HANDLERS ---------------- */

  const handleSelectSubject = (subject: SubjectConfig) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
    setQuestions([]);
  };

  const handleSelectTopic = async (topic: TopicConfig) => {
    setSelectedTopic(topic);
    setLoading(true);

    try {
      const data = await questionService.getQuestionsByTopic(topic.name);
      setQuestions(data);
    } catch (err) {
      console.error(err);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedTopic(null);
    setQuestions([]);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setQuestions([]);
  };

  /* ---------------- QUESTIONS VIEW ---------------- */

  if (selectedSubject && selectedTopic) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Button variant="outline" onClick={handleBackToTopics} className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Topics
          </Button>

          <Badge variant="secondary">{selectedSubject.name}</Badge>
          <h1 className="text-3xl font-bold mt-2 mb-6">{selectedTopic.name}</h1>

          {loading && <p>Loading questions...</p>}

          {!loading && questions.length === 0 && (
            <p>No questions found for this topic</p>
          )}

          <div className="space-y-3">
            {questions.map((q, index) => (
              <Card key={q.questionID} className="p-4 cursor-pointer">
                <div className="flex items-start gap-4">
                  <Badge variant="outline">{index + 1}</Badge>
                  <div>
                    <p className="font-medium">{q.questionText}</p>
                  </div>
                  <ChevronRight className="ml-auto w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- TOPICS VIEW ---------------- */

  if (selectedSubject) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Button variant="outline" onClick={handleBackToSubjects} className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Subjects
          </Button>

          <h1 className="text-4xl font-bold mb-8">{selectedSubject.name}</h1>

          <div className="space-y-3">
            {selectedSubject.topics.map((topic, index) => (
              <Card
                key={topic.id}
                className="p-6 cursor-pointer"
                onClick={() => handleSelectTopic(topic)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <Badge variant="outline">{index + 1}</Badge>
                    <h3 className="text-xl font-semibold mt-2">{topic.name}</h3>
                  </div>
                  <ChevronRight className="w-6 h-6 text-primary" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- SUBJECTS VIEW ---------------- */

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Practice Mode
          </Badge>
          <h1 className="text-4xl font-bold">
            Choose Your Learning Path
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subjects.map(subject => {
            const Icon = subjectIcons[subject.name] || Code;

            return (
              <Card key={subject.id} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 ${subjectColors[subject.name]} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{subject.name}</h3>
                </div>

                <Button
                  onClick={() => handleSelectSubject(subject)}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Practice
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Practice;

