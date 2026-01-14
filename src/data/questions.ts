export interface Question {
  questionID: number;
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
  topicName: string;
}


export interface Topic {
  id: number;
  name: string;
  questions: Question[][];
}

export interface Subject {
  id: number;
  name: string;
  topics: Topic[];
}

// Dummy questions for different subjects
const dummyQuestions: Question[] = [];

// Generate multiple sets of questions
// function generateQuestionSets(count: number): Question[][] {
//   const sets: Question[][] = [];
//   for (let i = 0; i < count; i++) {
//     sets.push(dummyQuestions.map((q, idx) => ({
//       ...q,
//       id: i * 10 + idx + 1
//     })));
//   }
//   return sets;
// }

// export const subjects: Subject[] = [
//   {
//     id: 1,
//     name: "Database Management System",
//     topics: [
//       { id: 1, name: "Introduction to DBMS", questions: generateQuestionSets(5) },
//       { id: 2, name: "Relational Model", questions: generateQuestionSets(5) },
//       { id: 3, name: "SQL Queries", questions: generateQuestionSets(5) },
//       { id: 4, name: "Normalization", questions: generateQuestionSets(5) },
//       { id: 5, name: "Transactions", questions: generateQuestionSets(5) },
//       { id: 6, name: "Indexing", questions: generateQuestionSets(5) },
//     ]
//   },
//   {
//     id: 2,
//     name: "Operating System",
//     topics: [
//       { id: 1, name: "Process Management", questions: generateQuestionSets(5) },
//       { id: 2, name: "CPU Scheduling", questions: generateQuestionSets(5) },
//       { id: 3, name: "Memory Management", questions: generateQuestionSets(5) },
//       { id: 4, name: "Deadlocks", questions: generateQuestionSets(5) },
//       { id: 5, name: "File Systems", questions: generateQuestionSets(5) },
//     ]
//   },
//   {
//     id: 3,
//     name: "Computer Network",
//     topics: [
//       { id: 1, name: "Network Fundamentals", questions: generateQuestionSets(5) },
//       { id: 2, name: "OSI Model", questions: generateQuestionSets(5) },
//       { id: 3, name: "TCP/IP Protocol", questions: generateQuestionSets(5) },
//       { id: 4, name: "Network Security", questions: generateQuestionSets(5) },
//       { id: 5, name: "Routing Algorithms", questions: generateQuestionSets(5) },
//     ]
//   },
//   {
//     id: 4,
//     name: "Object Oriented Programming",
//     topics: [
//       { id: 1, name: "OOP Concepts", questions: generateQuestionSets(5) },
//       { id: 2, name: "Inheritance", questions: generateQuestionSets(5) },
//       { id: 3, name: "Polymorphism", questions: generateQuestionSets(5) },
//       { id: 4, name: "Encapsulation", questions: generateQuestionSets(5) },
//       { id: 5, name: "Abstraction", questions: generateQuestionSets(5) },
//     ]
//   },
//   {
//     id: 5,
//     name: "Data Structure and Algorithms",
//     topics: [
//       { id: 1, name: "Arrays and Strings", questions: generateQuestionSets(5) },
//       { id: 2, name: "Linked Lists", questions: generateQuestionSets(5) },
//       { id: 3, name: "Stacks and Queues", questions: generateQuestionSets(5) },
//       { id: 4, name: "Trees", questions: generateQuestionSets(5) },
//       { id: 5, name: "Graphs", questions: generateQuestionSets(5) },
//       { id: 6, name: "Sorting Algorithms", questions: generateQuestionSets(5) },
//       { id: 7, name: "Searching Algorithms", questions: generateQuestionSets(5) },
//     ]
//   },
//   {
//     id: 6,
//     name: "Java Programming",
//     topics: [
//       { id: 1, name: "Java Basics", questions: generateQuestionSets(5) },
//       { id: 2, name: "Collections Framework", questions: generateQuestionSets(5) },
//       { id: 3, name: "Multithreading", questions: generateQuestionSets(5) },
//       { id: 4, name: "Exception Handling", questions: generateQuestionSets(5) },
//       { id: 5, name: "Java 8 Features", questions: generateQuestionSets(5) },
//     ]
//   }
// ];

export const interviewQuestions: Question[] = dummyQuestions;
export const battleQuestions: Question[] = dummyQuestions;






// // import { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { apiClient } from '@/config/api';
// // import { Card } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';

// // /* ======================
// //    Question DTO
// //    ====================== */
// // export interface Question {
// //   questionID: number;
// //   questionText: string;
// //   option1: string;
// //   option2: string;
// //   option3: string;
// //   option4: string;
// //   correctAnswer: string;
// //   topicName: string;
// // }

// // /* ======================
// //    Utility: Split into sets
// //    ====================== */
// // function createQuestionSets(
// //   questions: Question[],
// //   setSize: number = 10
// // ): Question[][] {
// //   const sets: Question[][] = [];
// //   for (let i = 0; i < questions.length; i += setSize) {
// //     sets.push(questions.slice(i, i + setSize));
// //   }
// //   return sets;
// // }

// // /* ======================
// //    MAIN COMPONENT
// //    ====================== */
// // interface PracticeQuestionsProps {
// //   topicName: string;
// //   subjectName: string;
// // }

// // const PracticeQuestions = ({ topicName, subjectName }: PracticeQuestionsProps) => {
// //   const navigate = useNavigate();

// //   const [questionSets, setQuestionSets] = useState<Question[][]>([]);
// //   const [selectedSet, setSelectedSet] = useState(0);
// //   const [loading, setLoading] = useState(true);

// //   /* ======================
// //      FETCH + PROCESS DATA
// //      ====================== */
// //   useEffect(() => {
// //     const fetchQuestions = async () => {
// //       try {
// //         const response = await apiClient.get<Question[]>(
// //           `/api/question/topic/${encodeURIComponent(topicName)}`
// //         );

// //         // axios (or apiClient) returns data inside response.data
// //         const questions: Question[] = response.data;

// //         // Split into sets of 10
// //         const sets = createQuestionSets(questions, 10);
// //         setQuestionSets(sets);
// //       } catch (error) {
// //         console.error('Failed to fetch questions', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchQuestions();
// //   }, [topicName]);

// //   if (loading) {
// //     return <p className="p-6">Loading questions...</p>;
// //   }

// //   const currentQuestions = questionSets[selectedSet] || [];

// //   /* ======================
// //      UI
// //      ====================== */
// //   return (
// //     <div className="container mx-auto p-6">
// //       <h1 className="text-2xl font-bold mb-4">{topicName}</h1>

// //       {/* SET SELECTOR */}
// //       <div className="flex gap-2 mb-6">
// //         {questionSets.map((_, index) => (
// //           <Button
// //             key={index}
// //             variant={index === selectedSet ? 'default' : 'outline'}
// //             onClick={() => setSelectedSet(index)}
// //           >
// //             {`Set ${index + 1}`}
// //           </Button>
// //         ))}
// //       </div>

// //       {/* QUESTIONS LIST */}
// //       <div className="space-y-4">
// //         {currentQuestions.map((q, index) => (
// //           <Card
// //             key={q.questionID}
// //             className="p-4 cursor-pointer hover:shadow-md"
// //             onClick={() =>
// //               navigate('/question-detail', {
// //                 state: {
// //                   question: q,
// //                   questionIndex: index,
// //                   questions: currentQuestions,
// //                   topicName,
// //                   subjectName,
// //                   setNumber: selectedSet + 1
// //                 }
// //               })
// //             }
// //           >
// //             <p className="font-medium">
// //               {index + 1}. {q.questionText}
// //             </p>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PracticeQuestions;




// import { useEffect, useState } from 'react';
// import { QuestionDto, getOptionsArray } from './questionsServices';
// import { apiClient } from '@/config/api';

// const [questionSets, setQuestionSets] = useState<Question[][]>([]);
// const [loading, setLoading] = useState(true);



// /* ======================
//    Question DTO
//    ====================== */
// export interface Question {
//   questionID: number;
//   questionText: string;
//   option1: string;
//   option2: string;
//   option3: string;
//   option4: string;
//   correctAnswer: string;
//   topicName: string;
// }

// /* ======================
//    Helper: Convert options to array
//    ====================== */
// export function getOptionsArray(q: Question): string[] {
//   return [q.option1, q.option2, q.option3, q.option4];
// }

// /* ======================
//    Helper: Split into sets of questions
//    ====================== */
// export function splitIntoSets(
//   questions: Question[],
//   setSize: number = 10
// ): Question[][] {
//   const sets: Question[][] = [];
//   for (let i = 0; i < questions.length; i += setSize) {
//     sets.push(questions.slice(i, i + setSize));
//   }
//   return sets;
// }
// useEffect(() => {
//   const fetchQuestions = async () => {
//     try {
//       const response = await apiClient.get<Question[]>('/api/question/topic/DBMS');

//       // Convert backend list into sets of 10
//       const sets = splitIntoSets(response.data, 10);
//       setQuestionSets(sets);
//     } catch (err) {
//       console.error('Failed to fetch questions', err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchQuestions();
// }, []);































/* ======================
   Question DTO & Helpers
   ====================== */

// export interface Question {
//   questionID: number;
//   questionText: string;
//   option1: string;
//   option2: string;
//   option3: string;
//   option4: string;
//   correctAnswer: string;
//   topicName: string;
// }

// /* Convert options 1–4 into array for easy iteration */
// export function getOptionsArray(q: Question): string[] {
//   return [q.option1, q.option2, q.option3, q.option4];
// }

// /* Split flat list into sets of `setSize` (default 10) */
// export function splitIntoSets(
//   questions: Question[],
//   setSize: number = 10
// ): Question[][] {
//   const sets: Question[][] = [];
//   for (let i = 0; i < questions.length; i += setSize) {
//     sets.push(questions.slice(i, i + setSize));
//   }
//   return sets;
// }
