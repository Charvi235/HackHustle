// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import {
//   ChevronLeft,
//   CheckCircle2,
//   XCircle,
//   ChevronRight,
//   HelpCircle
// } from 'lucide-react';
// import { AskDoubtPanel } from '@/components/practice/AskDoubtPanel';
// import { useAuth } from '@/contexts/AuthContext';
// import { QuestionDto } from '@/services/questionsServices';


// //const options = getOptionsArray(question); // replace old manual array

// const QuestionDetail = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const {
//     question,
//     questionIndex,
//     topicName,
//     subjectName,
//     questions
//   } = location.state as {
//     question: QuestionDto;
//     questionIndex: number;
//     topicName: string;
//     subjectName: string;
//     questions: QuestionDto[];
//   };

//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
//   const [showResult, setShowResult] = useState(false);
//   const [showDoubtPanel, setShowDoubtPanel] = useState(false);

//   /* ✅ Convert option1–4 into iterable array */
//   const options = [
//     question.option1,
//     question.option2,
//     question.option3,
//     question.option4
//   ];

//   const handleAnswer = (option: string) => {
//     setSelectedAnswer(option);
//     setShowResult(true);
//   };

//   const handleNextQuestion = () => {
//     if (questionIndex < questions.length - 1) {
//       navigate('/question-detail', {
//         state: {
//           question: questions[questionIndex + 1],
//           questionIndex: questionIndex + 1,
//           topicName,
//           subjectName,
//           questions
//         }
//       });
//       setSelectedAnswer(null);
//       setShowResult(false);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (questionIndex > 0) {
//       navigate('/question-detail', {
//         state: {
//           question: questions[questionIndex - 1],
//           questionIndex: questionIndex - 1,
//           topicName,
//           subjectName,
//           questions
//         }
//       });
//       setSelectedAnswer(null);
//       setShowResult(false);
//     }
//   };

//   const isCorrect = selectedAnswer === question.correctAnswer;

//   return (
//     <div className="min-h-screen bg-background pt-20 pb-16">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
//           <ChevronLeft className="w-4 h-4 mr-2" />
//           Back to Questions
//         </Button>

//         {/* Header */}
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <Badge variant="secondary" className="mb-2">
//               {subjectName}
//             </Badge>
//             <Badge variant="outline" className="ml-2 mb-2">
//               {topicName}
//             </Badge>
//             <h1 className="text-2xl font-bold mt-2">
//               Question {questionIndex + 1}
//             </h1>
//           </div>

//           {user?.role?.toLowerCase() === 'student' && (
//             <Button onClick={() => setShowDoubtPanel(true)} variant="outline">
//               <HelpCircle className="w-4 h-4 mr-2" />
//               Ask Doubt
//             </Button>
//           )}
//         </div>

//         {/* Question Card */}
//         <Card className="p-8 bg-gradient-card">
//           <div className="flex items-start gap-4 mb-6">
//             <div className="flex-1">
//               <h2 className="text-2xl font-semibold mb-6">
//                 {question.questionText}
//               </h2>
//             </div>

//             {showResult &&
//               (isCorrect ? (
//                 <CheckCircle2 className="w-10 h-10 text-green-500" />
//               ) : (
//                 <XCircle className="w-10 h-10 text-red-500" />
//               ))}
//           </div>

//           {/* Options */}
//           <div className="space-y-4">
//             {options.map((option, index) => {
//               const isSelected = selectedAnswer === option;
//               const isCorrectOption = option === question.correctAnswer;

//               let buttonClass =
//                 'justify-start text-left h-auto py-5 px-6 text-base ';

//               if (showResult) {
//                 if (isCorrectOption) {
//                   buttonClass += 'border-green-500 bg-green-500/10';
//                 } else if (isSelected && !isCorrect) {
//                   buttonClass += 'border-red-500 bg-red-500/10';
//                 }
//               } else if (isSelected) {
//                 buttonClass += 'border-primary bg-primary/10';
//               }

//               return (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   className={buttonClass}
//                   onClick={() => !showResult && handleAnswer(option)}
//                   disabled={showResult}
//                 >
//                   <span className="font-bold mr-4 text-xl">
//                     {String.fromCharCode(65 + index)}.
//                   </span>
//                   <span>{option}</span>
//                 </Button>
//               );
//             })}
//           </div>

//           {/* Navigation */}
//           {showResult && (
//             <div className="mt-6 flex gap-4 justify-center">
//               <Button
//                 onClick={handlePreviousQuestion}
//                 disabled={questionIndex === 0}
//                 variant="outline"
//               >
//                 <ChevronLeft className="w-4 h-4 mr-2" />
//                 Previous
//               </Button>

//               <Button onClick={() => navigate(-1)} variant="outline">
//                 Back to Questions
//               </Button>

//               <Button
//                 onClick={handleNextQuestion}
//                 disabled={questionIndex === questions.length - 1}
//               >
//                 Next
//                 <ChevronRight className="w-4 h-4 ml-2" />
//               </Button>
//             </div>
//           )}
//         </Card>

//         {/* Ask Doubt Panel */}
//         <AskDoubtPanel
//           open={showDoubtPanel}
//           onOpenChange={setShowDoubtPanel}
//           question={question.questionText}
//           subject={subjectName}
//         />
//       </div>
//     </div>
//   );
// };

// export default QuestionDetail;








import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuestionDto } from '@/services/questionService';

const QuestionDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    questions,
    questionIndex,
    topicName,
    subjectName
  }: {
    questions: QuestionDto[];
    questionIndex: number;
    topicName: string;
    subjectName: string;
  } = location.state;

  const question = questions[questionIndex];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">
        {subjectName} → {topicName}
      </h2>

      <Card className="p-6 mb-6">
        <p className="font-semibold mb-4">
          Q{questionIndex + 1}. {question.questionText}
        </p>

        <div className="space-y-2">
          <p>A. {question.option1}</p>
          <p>B. {question.option2}</p>
          <p>C. {question.option3}</p>
          <p>D. {question.option4}</p>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          disabled={questionIndex === 0}
          onClick={() =>
            navigate('/question-detail', {
              state: {
                questions,
                questionIndex: questionIndex - 1,
                topicName,
                subjectName
              }
            })
          }
        >
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            navigate('/practice', {
              state: { topicName, subjectName }
            })
          }
        >
          Back to Topic
        </Button>

        <Button
          disabled={questionIndex === questions.length - 1}
          onClick={() =>
            navigate('/question-detail', {
              state: {
                questions,
                questionIndex: questionIndex + 1,
                topicName,
                subjectName
              }
            })
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default QuestionDetail;
