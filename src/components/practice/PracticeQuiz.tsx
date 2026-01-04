

// import { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { ChevronLeft } from 'lucide-react';
// import { CheckCircle2, XCircle } from 'lucide-react';
// //import { Question } from '@/data/questions';

// interface PracticeQuizProps {
//   questions: Question[];
//   topicName: string;
//   subjectName: string;
//   onBack: () => void;
//   onAssessment: () => void;
// }

// // Helper to get options as array
// const getOptionsArray = (q: Question): string[] => {
//   return [q.option1, q.option2, q.option3, q.option4];
// };

// export const PracticeQuiz = ({ questions, topicName, subjectName, onBack, onAssessment }: PracticeQuizProps) => {
//   const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
//   const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});

//   const handleAnswer = (questionId: number, answerIndex: number) => {
//     setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
//     setShowResults({ ...showResults, [questionId]: true });
//   };

//   const correctCount = Object.keys(showResults).filter((qId) => {
//     const question = questions.find(q => q.questionID === parseInt(qId));
//     if (!question) return false;
//     const correctIndex = parseInt(question.correctAnswer) - 1; // correctAnswer is "1", "2", "3", or "4"
//     return selectedAnswers[parseInt(qId)] === correctIndex;
//   }).length;

//   return (
//     <div className="min-h-screen bg-background pt-20 pb-16">
//       <div className="container mx-auto px-4 max-w-4xl">
//         {/* Header */}
//         <div className="mb-8">
//           <Button variant="outline" onClick={onBack} className="mb-4">
//             <ChevronLeft className="w-4 h-4 mr-2" />
//             Back to Topics
//           </Button>
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <Badge variant="secondary" className="mb-2">{subjectName}</Badge>
//               <h1 className="text-3xl font-bold">{topicName}</h1>
//             </div>
//             <div className="text-right">
//               <div className="text-sm text-muted-foreground">Score</div>
//               <div className="text-2xl font-bold">{correctCount}/{Object.keys(showResults).length}</div>
//             </div>
//           </div>
//           <Progress value={(Object.keys(showResults).length / questions.length) * 100} className="h-2" />
//         </div>

//         {/* Questions */}
//         <div className="space-y-6">
//           {questions.map((question, index) => {
//             const isAnswered = showResults[question.questionID];
//             const selectedAnswer = selectedAnswers[question.questionID];
//             const correctIndex = parseInt(question.correctAnswer) - 1;
//             const isCorrect = selectedAnswer === correctIndex;
//             const options = getOptionsArray(question);

//             return (
//               <Card key={question.questionID} className="p-6 bg-gradient-card">
//                 <div className="flex items-start gap-4 mb-4">
//                   <Badge variant="outline" className="text-lg px-3 py-1">
//                     {index + 1}
//                   </Badge>
//                   <h3 className="text-lg font-medium flex-1">{question.questionText}</h3>
//                   {isAnswered && (
//                     isCorrect ? (
//                       <CheckCircle2 className="w-6 h-6 text-green-500" />
//                     ) : (
//                       <XCircle className="w-6 h-6 text-red-500" />
//                     )
//                   )}
//                 </div>

//                 <div className="space-y-3 ml-12">
//                   {options.map((option, optionIndex) => {
//                     const isSelected = selectedAnswer === optionIndex;
//                     const isCorrectOption = optionIndex === correctIndex;
                    
//                     let buttonClass = "justify-start text-left h-auto py-3 px-4 w-full ";
//                     if (isAnswered) {
//                       if (isCorrectOption) {
//                         buttonClass += "border-green-500 bg-green-500/10";
//                       } else if (isSelected && !isCorrect) {
//                         buttonClass += "border-red-500 bg-red-500/10";
//                       }
//                     } else if (isSelected) {
//                       buttonClass += "border-primary bg-primary/10";
//                     }

//                     return (
//                       <Button
//                         key={optionIndex}
//                         variant="outline"
//                         className={buttonClass}
//                         onClick={() => !isAnswered && handleAnswer(question.questionID, optionIndex)}
//                         disabled={isAnswered}
//                       >
//                         <span className="font-semibold mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
//                         {option}
//                       </Button>
//                     );
//                   })}
//                 </div>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Assessment CTA */}
//         <Card className="p-8 bg-gradient-card text-center mt-8">
//           <h3 className="text-2xl font-bold mb-4">Ready for the Assessment?</h3>
//           <p className="text-muted-foreground mb-6">
//             Test your complete understanding of {topicName}
//           </p>
//           <Button size="lg" onClick={onAssessment}>
//             Take {topicName} Assessment
//           </Button>
//         </Card>
//       </div>
//     </div>
//   );
// };








// import { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';
// import { QuestionDto } from '@/services/questionsServices';

// interface PracticeQuizProps {
//   questions: QuestionDto[];
//   topicName: string;
//   subjectName: string;
//   onBack: () => void;
// }

// const getOptionsArray = (q: QuestionDto): string[] => [
//   q.option1,
//   q.option2,
//   q.option3,
//   q.option4
// ];

// const PracticeQuiz = ({
//   questions,
//   topicName,
//   subjectName,
//   onBack
// }: PracticeQuizProps) => {
//   const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
//   const [answered, setAnswered] = useState<Record<number, boolean>>({});

//   const handleAnswer = (qid: number, index: number) => {
//     setSelectedAnswers(prev => ({ ...prev, [qid]: index }));
//     setAnswered(prev => ({ ...prev, [qid]: true }));
//   };

//   const correctCount = questions.filter(q => {
//     const correctIndex = Number(q.correctAnswer) - 1;
//     return selectedAnswers[q.questionID] === correctIndex;
//   }).length;

//   return (
//     <div className="container mx-auto p-6 max-w-4xl">
//       <Button variant="outline" onClick={onBack} className="mb-4">
//         <ChevronLeft className="w-4 h-4 mr-2" />
//         Back
//       </Button>

//       <h1 className="text-2xl font-bold">{topicName}</h1>
//       <p className="text-muted-foreground mb-4">{subjectName}</p>

//       <Progress value={(Object.keys(answered).length / questions.length) * 100} />

//       <div className="space-y-6 mt-6">
//         {questions.map((q, index) => {
//           const options = getOptionsArray(q);
//           const correctIndex = Number(q.correctAnswer) - 1;
//           const isAnswered = answered[q.questionID];

//           return (
//             <Card key={q.questionID} className="p-6">
//               <p className="font-medium mb-4">
//                 {index + 1}. {q.questionText}
//               </p>

//               {options.map((opt, i) => {
//                 const isCorrect = i === correctIndex;
//                 const isSelected = selectedAnswers[q.questionID] === i;

//                 let className = 'w-full justify-start text-left';
//                 if (isAnswered) {
//                   if (isCorrect) className += ' bg-green-100';
//                   else if (isSelected) className += ' bg-red-100';
//                 }

//                 return (
//                   <Button
//                     key={i}
//                     variant="outline"
//                     className={className}
//                     disabled={isAnswered}
//                     onClick={() => handleAnswer(q.questionID, i)}
//                   >
//                     {String.fromCharCode(65 + i)}. {opt}
//                   </Button>
//                 );
//               })}
//             </Card>
//           );
//         })}
//       </div>

//       <div className="mt-6 font-bold">
//         Score: {correctCount} / {questions.length}
//       </div>
//     </div>
//   );
// };

// export default PracticeQuiz;





// import { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';
// import { QuestionDto } from '@/services/questionsServices';

// interface PracticeQuizProps {
//   questions: QuestionDto[];
//   topicName: string;
//   subjectName: string;
//   onBack: () => void;
// }

// const getOptionsArray = (q: QuestionDto): string[] => [
//   q.option1,
//   q.option2,
//   q.option3,
//   q.option4
// ];

// const PracticeQuiz = ({
//   questions,
//   topicName,
//   subjectName,
//   onBack
// }: PracticeQuizProps) => {
//   // ------------------- CHANGE HERE -------------------
//   // store selected answer as string instead of index
//   const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
//   const [answered, setAnswered] = useState<Record<number, boolean>>({});

//   const handleAnswer = (qid: number, selectedOption: string) => {
//     setSelectedAnswers(prev => ({ ...prev, [qid]: selectedOption }));
//     setAnswered(prev => ({ ...prev, [qid]: true }));
//   };

//   // ------------------- CHANGE HERE -------------------
//   // compare selected string with correctAnswer string
//   const correctCount = questions.filter(q => {
//     const selected = selectedAnswers[q.questionID];
//     return selected === q.correctAnswer;
//   }).length;

//   return (
//     <div className="container mx-auto p-6 max-w-4xl">
//       <Button variant="outline" onClick={onBack} className="mb-4">
//         <ChevronLeft className="w-4 h-4 mr-2" />
//         Back
//       </Button>

//       <h1 className="text-2xl font-bold">{topicName}</h1>
//       <p className="text-muted-foreground mb-4">{subjectName}</p>

//       <Progress value={ questions.length > 0
//       ? (Object.keys(answered).length / questions.length) * 100
//       : 0} />
      

//       <div className="space-y-6 mt-6">
//         {questions.map((q, index) => {
//           const options = getOptionsArray(q);
//           const isAnswered = answered[q.questionID];
//           const selected = selectedAnswers[q.questionID];

//           return (
//             <Card key={q.questionID} className="p-6">
//               <p className="font-medium mb-4">
//                 {index + 1}. {q.questionText}
//               </p>

//               {options.map((opt, i) => {
//                 // ------------------- CHANGE HERE -------------------
//                 const isCorrect = opt === q.correctAnswer;
//                 const isSelected = selected === opt;

//                 let className = 'w-full justify-start text-left';
//                 if (isAnswered) {
//                   if (isCorrect) className += ' bg-green-100';
//                   else if (isSelected) className += ' bg-red-100';
//                 }

//                 return (
//                   <Button
//                     key={i}
//                     variant="outline"
//                     className={className}
//                     disabled={isAnswered}
//                     onClick={() => handleAnswer(q.questionID, opt)} // pass string instead of index
//                   >
//                     {String.fromCharCode(65 + i)}. {opt}
//                   </Button>
//                 );
//               })}
//             </Card>
//           );
//         })}
//       </div>

//       <div className="mt-6 font-bold">
//         Score: {correctCount} / {questions.length}
//       </div>
//     </div>
//   );
// };

// export default PracticeQuiz;





import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft } from 'lucide-react';
import { QuestionDto } from '@/services/questionsServices';

interface PracticeQuizProps {
  questions: QuestionDto[];  // ✅ now pass ALL questions of topic
  topicName: string;
  subjectName: string;
  onBack: () => void;
  totalQuestionsInTopic: number;
}

const getOptionsArray = (q: QuestionDto): string[] => [
  q.option1,
  q.option2,
  q.option3,
  q.option4
];

const PracticeQuiz = ({
  questions,
  topicName,
  subjectName,
  onBack,
  totalQuestionsInTopic
}: PracticeQuizProps) => {
  // ------------------- store selected answer as string -------------------
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [answered, setAnswered] = useState<Record<number, boolean>>({});

  const handleAnswer = (qid: number, selectedOption: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qid]: selectedOption }));
    setAnswered(prev => ({ ...prev, [qid]: true }));
  };

  // ------------------- compare selected string with correctAnswer -------------------
  const correctCount = questions.filter(q => selectedAnswers[q.questionID] === q.correctAnswer).length;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <h1 className="text-2xl font-bold">{topicName}</h1>
      <p className="text-muted-foreground mb-4">{subjectName}</p>

      {/* ------------------- Progress bar relative to TOTAL topic questions ------------------- */}
      <Progress
        value={
          questions.length > 0
            ? (Object.keys(answered).length / totalQuestionsInTopic) * 100
            : 0
        }
      />

      <div className="space-y-6 mt-6">
        {questions.map((q, index) => {
          const options = getOptionsArray(q);
          const isAnswered = answered[q.questionID];
          const selected = selectedAnswers[q.questionID];

          return (
            <Card key={q.questionID} className="p-6">
              <p className="font-medium mb-4">
                {index + 1}. {q.questionText}
              </p>

              {options.map((opt, i) => {
                const isCorrect = opt === q.correctAnswer;
                const isSelected = selected === opt;

                let className = 'w-full justify-start text-left';
                if (isAnswered) {
                  if (isCorrect) className += ' bg-green-100';
                  else if (isSelected) className += ' bg-red-100';
                }

                return (
                  <Button
                    key={i}
                    variant="outline"
                    className={className}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(q.questionID, opt)} // pass string
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </Button>
                );
              })}
            </Card>
          );
        })}
      </div>

      <div className="mt-6 font-bold">
        Score: {correctCount} / {questions.length}
      </div>
    </div>
  );
};

export default PracticeQuiz;
