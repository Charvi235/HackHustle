

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Code,
  Database,
  Play,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

import PracticeQuiz from '../components/practice/PracticeQuiz';
import { questionService, QuestionDto } from '@/services/questionsServices';

/* ---------------- SUBJECT & TOPIC CONFIG ---------------- */

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

/* ---------------- HELPERS ---------------- */

const splitIntoSets = (questions: QuestionDto[], size = 10) => {
  const sets: QuestionDto[][] = [];
  for (let i = 0; i < questions.length; i += size) {
    sets.push(questions.slice(i, i + size));
  }
  return sets;
};

/* ---------------- COMPONENT ---------------- */

const Practice = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectConfig | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicConfig | null>(null);

  const [questionSets, setQuestionSets] = useState<QuestionDto[][]>([]);
  const [selectedSet, setSelectedSet] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- HANDLERS ---------------- */

  const handleSelectSubject = (subject: SubjectConfig) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
    setQuestionSets([]);
    setStartQuiz(false);
  };
  
const handleTopicAssessment = async () => {
  if (!selectedTopic) return;

  setLoading(true);
  try {
    const data = await questionService.getQuestionsByTopic(
      selectedTopic.name
    );

    setQuestionSets([data]); // full topic, no sets
    setSelectedSet(0);
    setStartQuiz(true);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
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
const handleSubjectAssessment = async () => {
    if (!selectedSubject) return;

    setLoading(true);
    try {
      const data = await questionService.getQuestionsBySubject(
        selectedSubject.id
      );

      setQuestionSets([data]); // single full assessment
      setSelectedSet(0);
      setStartQuiz(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  /* ---------------- QUIZ VIEW ---------------- */

  if (startQuiz && selectedSubject ) {
    return (
      <PracticeQuiz
        questions={questionSets[selectedSet]}
        topicName={selectedTopic?.name}
        subjectName={selectedSubject.name}
        onBack={() => setStartQuiz(false)}
        totalQuestionsInTopic={questionSets.flat().length}
      />
    );
  }

  /* ---------------- SET SELECTION VIEW ---------------- */

  if (selectedSubject && selectedTopic) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="outline" onClick={handleBackToTopics} className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Topics
          </Button>

          <Badge variant="secondary">{selectedSubject.name}</Badge>
          <h1 className="text-3xl font-bold mt-2 mb-6">{selectedTopic.name}</h1>

          {loading && <p>Loading questions...</p>}

          {/* {!loading && (
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
          )} */}
          {!loading && questionSets.length > 0 && (
          <>
            {/* Set selector buttons */}
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

  <Button
    variant="secondary"
    onClick={handleTopicAssessment}
  >
    Take Topic-wise Assessment
  </Button>
</div>


            {/* Auto-load quiz */}
            <PracticeQuiz
              questions={questionSets[selectedSet]}
              topicName={selectedTopic.name}
              subjectName={selectedSubject.name}
              onBack={handleBackToTopics}
              totalQuestionsInTopic={questionSets.flat().length}
            />
          </>
          )}
          {/* {!loading && questionSets.length > 0 && (
            <Button
              className="mt-6"
              onClick={() => setStartQuiz(true)}
            >
              Start Set {selectedSet + 1}
            </Button>
          )} */}
        </div>
      </div>
    );
  }

  /* ---------------- TOPICS VIEW ---------------- */

  if (selectedSubject) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="outline" onClick={handleBackToSubjects} className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Subjects
          </Button>

          <h1 className="text-4xl font-bold mb-6">{selectedSubject.name}</h1>

          <div className="space-y-4">
            {selectedSubject.topics.map(topic => (
              <Card
                key={topic.id}
                className="p-6 cursor-pointer hover:shadow-md"
                onClick={() => handleSelectTopic(topic)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{topic.name}</h3>
                  <ChevronRight />
                </div>
              </Card>
            ))}
          </div>
          <Button
            className="w-full mt-14"
            variant="secondary"
            onClick={handleSubjectAssessment}
          >
            Start {selectedSubject.name}'s Assessment
          </Button>

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
          <h1 className="text-4xl font-bold">Choose Your Subject</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subjects.map(subject => (
            <Card key={subject.id} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  {subject.name === 'DBMS' ? (
                    <Database className="text-white" />
                  ) : (
                    <Code className="text-white" />
                  )}
                </div>
                <h3 className="text-xl font-semibold">{subject.name}</h3>
              </div>

              <Button
                className="w-full"
                onClick={() => handleSelectSubject(subject)}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Practice
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Practice;






// import { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import {
//   BookOpen,
//   Code,
//   Database,
//   Play,
//   ChevronRight,
//   ChevronLeft
// } from 'lucide-react';

// import PracticeQuiz from '../components/practice/PracticeQuiz';
// import { questionService, QuestionDto } from '@/services/questionsServices';
// const emailId = localStorage.getItem('emailId') || '';
// /* ---------------- SUBJECT & TOPIC CONFIG ---------------- */

// interface TopicConfig {
//   id: number;
//   name: string;
// }

// interface SubjectConfig {
//   id: number;
//   name: string;
//   topics: TopicConfig[];
// }

// const subjects: SubjectConfig[] = [
//   {
//     id: 1001,
//     name: 'DBMS',
//     topics: [
//       { id: 1001, name: 'Normalization' },
//       { id: 1002, name: 'Concurrency Control' },
//       { id: 1003, name: 'Deadlock' },
//       { id: 1004, name: 'Keys in DBMS' }
//     ]
//   },
//   {
//     id: 1002,
//     name: 'OOPS',
//     topics: [
//       { id: 1005, name: 'Concepts of OOPS' },
//       { id: 1006, name: 'Inheritance' },
//       { id: 1007, name: 'Abstraction' },
//       { id: 1008, name: 'Polymorphism' }
//     ]
//   }
// ];

// /* ---------------- HELPERS ---------------- */

// const splitIntoSets = (questions: QuestionDto[], size = 10) => {
//   const sets: QuestionDto[][] = [];
//   for (let i = 0; i < questions.length; i += size) {
//     sets.push(questions.slice(i, i + size));
//   }
//   return sets;
// };

// /* ---------------- COMPONENT ---------------- */

// const Practice = () => {
//   const [selectedSubject, setSelectedSubject] = useState<SubjectConfig | null>(null);
//   const [selectedTopic, setSelectedTopic] = useState<TopicConfig | null>(null);

//   const [questionSets, setQuestionSets] = useState<QuestionDto[][]>([]);
//   const [selectedSet, setSelectedSet] = useState(0);
//   const [startQuiz, setStartQuiz] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ✅ NEW: visited question IDs from backend
//   const [visitedQuestionIds, setVisitedQuestionIds] = useState<number[]>([]);

//   /* ---------------- HANDLERS ---------------- */

//   const handleSelectSubject = (subject: SubjectConfig) => {
//     setSelectedSubject(subject);
//     setSelectedTopic(null);
//     setQuestionSets([]);
//     setStartQuiz(false);
//   };

//   const handleSelectTopic = async (topic: TopicConfig) => {
//     setSelectedTopic(topic);
//     setLoading(true);

//     try {
//       const data = await questionService.getQuestionsByTopic(topic.name);
//       setQuestionSets(splitIntoSets(data, 10));
//       setSelectedSet(0);
//     } catch (err) {
//       console.error(err);
//       setQuestionSets([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTopicAssessment = async () => {
//     if (!selectedTopic) return;

//     setLoading(true);
//     try {
//       const [questions, visited] = await Promise.all([
//         questionService.getQuestionsByTopic(selectedTopic.name),
//         questionService.getVisitedQuestions(emailId)
//       ]);

//       setQuestionSets([questions]);
//       setVisitedQuestionIds(visited);
//       setSelectedSet(0);
//       setStartQuiz(true);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubjectAssessment = async () => {
//     if (!selectedSubject) return;

//     setLoading(true);
//     try {
//       const [questions, visited] = await Promise.all([
//         questionService.getQuestionsBySubject(selectedSubject.id),
//         questionService.getVisitedQuestions(emailId)
//       ]);

//       setQuestionSets([questions]);
//       setVisitedQuestionIds(visited);
//       setSelectedSet(0);
//       setStartQuiz(true);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToSubjects = () => {
//     setSelectedSubject(null);
//     setSelectedTopic(null);
//     setQuestionSets([]);
//     setStartQuiz(false);
//   };

//   const handleBackToTopics = () => {
//     setSelectedTopic(null);
//     setQuestionSets([]);
//     setStartQuiz(false);
//   };

//   /* ---------------- QUIZ VIEW ---------------- */

//   if (startQuiz && selectedSubject) {
//     return (
//       <PracticeQuiz
//         questions={questionSets[selectedSet]}
//         subjectName={selectedSubject.name}
//         visitedQuestionIds={visitedQuestionIds}
//         onBack={() => setStartQuiz(false)}
//         totalQuestionsInTopic={questionSets.flat().length}
//       />
//     );
//   }

//   /* ---------------- SET SELECTION VIEW ---------------- */

//   if (selectedSubject && selectedTopic) {
//     return (
//       <div className="min-h-screen bg-background pt-20 pb-16">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <Button variant="outline" onClick={handleBackToTopics} className="mb-6">
//             <ChevronLeft className="w-4 h-4 mr-2" />
//             Back to Topics
//           </Button>

//           <Badge variant="secondary">{selectedSubject.name}</Badge>
//           <h1 className="text-3xl font-bold mt-2 mb-6">{selectedTopic.name}</h1>

//           {loading && <p>Loading questions...</p>}

//           {!loading && questionSets.length > 0 && (
//             <>
//               <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
//                 <div className="flex gap-3 flex-wrap">
//                   {questionSets.map((_, index) => (
//                     <Button
//                       key={index}
//                       variant={index === selectedSet ? 'default' : 'outline'}
//                       onClick={() => setSelectedSet(index)}
//                     >
//                       Set {index + 1}
//                     </Button>
//                   ))}
//                 </div>

//                 <Button variant="secondary" onClick={handleTopicAssessment}>
//                   Take Topic-wise Assessment
//                 </Button>
//               </div>

//               <PracticeQuiz
//                 questions={questionSets[selectedSet]}
//                 topicName={selectedTopic.name}
//                 subjectName={selectedSubject.name}
//                 visitedQuestionIds={visitedQuestionIds}
//                 onBack={handleBackToTopics}
//                 totalQuestionsInTopic={questionSets.flat().length}
//               />
//             </>
//           )}
//         </div>
//       </div>
//     );
//   }

//   /* ---------------- TOPICS VIEW ---------------- */

//   if (selectedSubject) {
//     return (
//       <div className="min-h-screen bg-background pt-20 pb-16">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <Button variant="outline" onClick={handleBackToSubjects} className="mb-6">
//             <ChevronLeft className="w-4 h-4 mr-2" />
//             Back to Subjects
//           </Button>

//           <h1 className="text-4xl font-bold mb-6">{selectedSubject.name}</h1>

//           <div className="space-y-4">
//             {selectedSubject.topics.map(topic => (
//               <Card
//                 key={topic.id}
//                 className="p-6 cursor-pointer hover:shadow-md"
//                 onClick={() => handleSelectTopic(topic)}
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-semibold">{topic.name}</h3>
//                   <ChevronRight />
//                 </div>
//               </Card>
//             ))}
//           </div>

//           <Button
//             className="w-full mt-14"
//             variant="secondary"
//             onClick={handleSubjectAssessment}
//           >
//             Start {selectedSubject.name}'s Assessment
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   /* ---------------- SUBJECTS VIEW ---------------- */

//   return (
//     <div className="min-h-screen bg-background pt-20 pb-16">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <Badge variant="secondary" className="mb-4">
//             <BookOpen className="w-4 h-4 mr-2" />
//             Practice Mode
//           </Badge>
//           <h1 className="text-4xl font-bold">Choose Your Subject</h1>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {subjects.map(subject => (
//             <Card key={subject.id} className="p-6">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
//                   {subject.name === 'DBMS' ? (
//                     <Database className="text-white" />
//                   ) : (
//                     <Code className="text-white" />
//                   )}
//                 </div>
//                 <h3 className="text-xl font-semibold">{subject.name}</h3>
//               </div>

//               <Button
//                 className="w-full"
//                 onClick={() => handleSelectSubject(subject)}
//               >
//                 <Play className="w-4 h-4 mr-2" />
//                 Start Practice
//               </Button>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Practice;









// // import { useState, useEffect } from 'react';
// // import { Card } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Badge } from '@/components/ui/badge';
// // import {
// //   BookOpen,
// //   Code,
// //   Database,
// //   Play,
// //   ChevronRight,
// //   ChevronLeft
// // } from 'lucide-react';

// // import PracticeQuiz from '../components/practice/PracticeQuiz';
// // import { questionService, QuestionDto } from '@/services/questionsServices';
// // const emailId = localStorage.getItem('emailId') || '';

// // /* ---------------- SUBJECT & TOPIC CONFIG ---------------- */

// // interface TopicConfig {
// //   id: number;
// //   name: string;
// // }

// // interface SubjectConfig {
// //   id: number;
// //   name: string;
// //   topics: TopicConfig[];
// // }

// // const subjects: SubjectConfig[] = [
// //   {
// //     id: 1001,
// //     name: 'DBMS',
// //     topics: [
// //       { id: 1001, name: 'Normalization' },
// //       { id: 1002, name: 'Concurrency Control' },
// //       { id: 1003, name: 'Deadlock' },
// //       { id: 1004, name: 'Keys in DBMS' }
// //     ]
// //   },
// //   {
// //     id: 1002,
// //     name: 'OOPS',
// //     topics: [
// //       { id: 1005, name: 'Concepts of OOPS' },
// //       { id: 1006, name: 'Inheritance' },
// //       { id: 1007, name: 'Abstraction' },
// //       { id: 1008, name: 'Polymorphism' }
// //     ]
// //   }
// // ];

// // /* ---------------- HELPERS ---------------- */

// // const splitIntoSets = (questions: QuestionDto[], size = 10) => {
// //   const sets: QuestionDto[][] = [];
// //   for (let i = 0; i < questions.length; i += size) {
// //     sets.push(questions.slice(i, i + size));
// //   }
// //   return sets;
// // };

// // /* ---------------- COMPONENT ---------------- */

// // const Practice = () => {
// //   const [selectedSubject, setSelectedSubject] =
// //     useState<SubjectConfig | null>(null);
// //   const [selectedTopic, setSelectedTopic] =
// //     useState<TopicConfig | null>(null);

// //   const [questionSets, setQuestionSets] = useState<QuestionDto[][]>([]);
// //   const [selectedSet, setSelectedSet] = useState(0);
// //   const [startQuiz, setStartQuiz] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   // ✅ visited questions
// //   const [visitedQuestionIds, setVisitedQuestionIds] = useState<number[]>([]);

// //   // ✅ logged-in user email
// //   const emailId = localStorage.getItem('email') || '';

// //   /* ---------------- HANDLERS ---------------- */

// //   const handleSelectSubject = (subject: SubjectConfig) => {
// //     setSelectedSubject(subject);
// //     setSelectedTopic(null);
// //     setQuestionSets([]);
// //     setStartQuiz(false);
// //   };

// //   const handleSelectTopic = async (topic: TopicConfig) => {
// //     setSelectedTopic(topic);
// //     setLoading(true);

// //     try {
// //       const data = await questionService.getQuestionsByTopic(topic.name);
// //       setQuestionSets(splitIntoSets(data, 10));
// //       setSelectedSet(0);
// //     } catch (err) {
// //       console.error(err);
// //       setQuestionSets([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleTopicAssessment = async () => {
// //     if (!selectedTopic || !emailId) return;

// //     setLoading(true);
// //     try {
// //       const [questions, visited] = await Promise.all([
// //         questionService.getQuestionsByTopic(selectedTopic.name),
// //         questionService.getVisitedQuestions(emailId)
// //       ]);

// //       setQuestionSets([questions]);
// //       setVisitedQuestionIds(visited);
// //       setSelectedSet(0);
// //       setStartQuiz(true);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubjectAssessment = async () => {
// //     if (!selectedSubject || !emailId) return;

// //     setLoading(true);
// //     try {
// //       const [questions, visited] = await Promise.all([
// //         questionService.getQuestionsBySubject(selectedSubject.id),
// //         questionService.getVisitedQuestions(emailId)
// //       ]);

// //       setQuestionSets([questions]);
// //       setVisitedQuestionIds(visited);
// //       setSelectedSet(0);
// //       setStartQuiz(true);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleBackToSubjects = () => {
// //     setSelectedSubject(null);
// //     setSelectedTopic(null);
// //     setQuestionSets([]);
// //     setStartQuiz(false);
// //   };

// //   const handleBackToTopics = () => {
// //     setSelectedTopic(null);
// //     setQuestionSets([]);
// //     setStartQuiz(false);
// //   };

// //   /* ---------------- QUIZ VIEW ---------------- */

// //   if (startQuiz && selectedSubject) {
// //     return (
// //       <PracticeQuiz
// //         questions={questionSets[selectedSet]}
// //         subjectName={selectedSubject.name}
// //         visitedQuestionIds={visitedQuestionIds}
// //         onBack={() => setStartQuiz(false)}
// //         totalQuestionsInTopic={questionSets.flat().length}
// //       />
// //     );
// //   }
// // useEffect(() => {
// //   if (!emailId) return;

// //   const fetchVisitedQuestions = async () => {
// //     try {
// //       const visited = await questionService.getVisitedQuestions(emailId);
// //       setVisitedQuestionIds(visited);
// //     } catch (err) {
// //       console.error('Failed to fetch visited questions', err);
// //     }
// //   };

// //   fetchVisitedQuestions();
// // }, [emailId]);

// //   /* ---------------- SET SELECTION VIEW ---------------- */

// //   if (selectedSubject && selectedTopic) {
// //     return (
// //       <div className="min-h-screen bg-background pt-20 pb-16">
// //         <div className="container mx-auto px-4 max-w-4xl">
// //           <Button variant="outline" onClick={handleBackToTopics} className="mb-6">
// //             <ChevronLeft className="w-4 h-4 mr-2" />
// //             Back to Topics
// //           </Button>

// //           <Badge variant="secondary">{selectedSubject.name}</Badge>
// //           <h1 className="text-3xl font-bold mt-2 mb-6">{selectedTopic.name}</h1>

// //           {loading && <p>Loading questions...</p>}

// //           {!loading && questionSets.length > 0 && (
// //             <>
// //               <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
// //                 <div className="flex gap-3 flex-wrap">
// //                   {questionSets.map((_, index) => (
// //                     <Button
// //                       key={index}
// //                       variant={index === selectedSet ? 'default' : 'outline'}
// //                       onClick={() => setSelectedSet(index)}
// //                     >
// //                       Set {index + 1}
// //                     </Button>
// //                   ))}
// //                 </div>

// //                 <Button variant="secondary" onClick={handleTopicAssessment}>
// //                   Take Topic-wise Assessment
// //                 </Button>
// //               </div>

// //               <PracticeQuiz
// //                 questions={questionSets[selectedSet]}
// //                 topicName={selectedTopic.name}
// //                 subjectName={selectedSubject.name}
// //                 visitedQuestionIds={visitedQuestionIds}
// //                 onBack={handleBackToTopics}
// //                 totalQuestionsInTopic={questionSets.flat().length}
// //               />
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   }

// //   /* ---------------- TOPICS VIEW ---------------- */

// //   if (selectedSubject) {
// //     return (
// //       <div className="min-h-screen bg-background pt-20 pb-16">
// //         <div className="container mx-auto px-4 max-w-4xl">
// //           <Button variant="outline" onClick={handleBackToSubjects} className="mb-6">
// //             <ChevronLeft className="w-4 h-4 mr-2" />
// //             Back to Subjects
// //           </Button>

// //           <h1 className="text-4xl font-bold mb-6">{selectedSubject.name}</h1>

// //           <div className="space-y-4">
// //             {selectedSubject.topics.map(topic => (
// //               <Card
// //                 key={topic.id}
// //                 className="p-6 cursor-pointer hover:shadow-md"
// //                 onClick={() => handleSelectTopic(topic)}
// //               >
// //                 <div className="flex justify-between items-center">
// //                   <h3 className="text-xl font-semibold">{topic.name}</h3>
// //                   <ChevronRight />
// //                 </div>
// //               </Card>
// //             ))}
// //           </div>

// //           <Button
// //             className="w-full mt-14"
// //             variant="secondary"
// //             onClick={handleSubjectAssessment}
// //           >
// //             Start {selectedSubject.name}'s Assessment
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   /* ---------------- SUBJECTS VIEW ---------------- */

// //   return (
// //     <div className="min-h-screen bg-background pt-20 pb-16">
// //       <div className="container mx-auto px-4">
// //         <div className="text-center mb-12">
// //           <Badge variant="secondary" className="mb-4">
// //             <BookOpen className="w-4 h-4 mr-2" />
// //             Practice Mode
// //           </Badge>
// //           <h1 className="text-4xl font-bold">Choose Your Subject</h1>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           {subjects.map(subject => (
// //             <Card key={subject.id} className="p-6">
// //               <div className="flex items-center gap-4 mb-4">
// //                 <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
// //                   {subject.name === 'DBMS' ? (
// //                     <Database className="text-white" />
// //                   ) : (
// //                     <Code className="text-white" />
// //                   )}
// //                 </div>
// //                 <h3 className="text-xl font-semibold">{subject.name}</h3>
// //               </div>

// //               <Button
// //                 className="w-full"
// //                 onClick={() => handleSelectSubject(subject)}
// //               >
// //                 <Play className="w-4 h-4 mr-2" />
// //                 Start Practice
// //               </Button>
// //             </Card>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Practice;
