
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { QuestionDto } from '@/services/questionsServices';

interface PracticeQuizProps {
  questions: QuestionDto[];
  topicName: string;
  subjectName: string;
  onBack: () => void;
  totalQuestionsInTopic: number;
  visitedQuestionIds: number[];
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
  totalQuestionsInTopic,
  visitedQuestionIds
}: PracticeQuizProps) => {

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [answered, setAnswered] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);

  // ✅ ONLY REQUIRED ADDITION
  const [correctQuestions, setCorrectQuestions] = useState<Record<number, boolean>>({}); // track correct questions
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const emailId: string = user.emailId;

  // ✅ API CALL (fixed) - only called if correct
  const updateQuestionStatus = async (questionId: number) => {
    if (!emailId) return;
    try {
      await fetch('http://localhost:8080/api/questionstatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionID: questionId, emailId }),
      });
    } catch (error) {
      console.error('Failed to update question status', error);
    }
  };

  const handleAnswer = async (qid: number, selectedOption: string) => {
    if (answered[qid]) return;

    const question = questions.find(q => q.questionID === qid);
    if (!question) return;

    const isCorrect = selectedOption === question.correctAnswer;

    setSelectedAnswers(prev => ({ ...prev, [qid]: selectedOption }));
    setAnswered(prev => ({ ...prev, [qid]: true }));

    if (isCorrect) {
      setScore(prev => prev + 1);
      setCorrectQuestions(prev => ({ ...prev, [qid]: true })); // ✅ mark question correct
      await updateQuestionStatus(qid); // ✅ backend update only if correct
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <h1 className="text-2xl font-bold">{topicName}</h1>
      <p className="text-muted-foreground mb-4">{subjectName}</p>

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
          const isCorrectQuestion = correctQuestions[q.questionID]; // ✅ check if correct

          return (
            <Card key={q.questionID} className="p-6 relative">
              <p className="font-medium mb-4">
                {index + 1}. {q.questionText}
              </p>

              {/* ✅ Green tick on extreme right if correct */}
              {isCorrectQuestion && (
                <CheckCircle2 className="w-6 h-6 text-green-500 absolute top-6 right-6" />
              )}

              {options.map((opt, i) => {
                const isCorrect = opt === q.correctAnswer;
                const isSelected = selected === opt;

                let className = 'w-full justify-start text-left';
                if (isAnswered) {
                  if (isCorrect) className += ' bg-green-100';
                  else if (isSelected && !isCorrect) className += ' bg-red-100';
                }

                return (
                  <Button
                    key={i}
                    variant="outline"
                    className={className}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(q.questionID, opt)}
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
        Score: {score} / {questions.length}
      </div>
    </div>
  );
};

export default PracticeQuiz;
