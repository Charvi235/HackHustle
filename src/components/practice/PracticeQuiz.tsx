

import { useState , useEffect} from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { QuestionDto } from '@/services/questionsServices';

interface PracticeQuizProps {
  questions: QuestionDto[];
  topicName?: string;
  subjectName: string;
  onBack: () => void;
  totalQuestionsInTopic: number;
  onScoreCalculated?: (score: number) => void;
  isAssessment?: boolean;
  topicId?: number;
  subjectId?: number;
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
  onScoreCalculated
}: PracticeQuizProps) => {

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [answered, setAnswered] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState<Record<number, boolean>>({});

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const emailId: string = user.emailId;

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

  setCorrectQuestions(prev => ({ ...prev, [qid]: isCorrect }));

  // update score
  setScore(prev => {
    const newScore = isCorrect ? prev + 1 : prev;
    onScoreCalculated?.(newScore); 
    return newScore;
  });

  if (isCorrect) {
    await updateQuestionStatus(qid);
  }
};
useEffect(() => {
  if (!emailId || questions.length === 0) return;

  const fetchVisitedQuestions = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/questionstatus/visited?emailId=${emailId}`
      );

      const visitedQuestionIds: number[] = await res.json();

      const answeredMap: Record<number, boolean> = {};
      const correctMap: Record<number, boolean> = {};
      const selectedMap: Record<number, string> = {};

      let calculatedScore = 0;

      visitedQuestionIds.forEach(qid => {
        answeredMap[qid] = true;
        correctMap[qid] = true;

        const question = questions.find(q => q.questionID === qid);
        if (question) {
          selectedMap[qid] = question.correctAnswer;
          calculatedScore++;
        }
      });

      setAnswered(answeredMap);
      setCorrectQuestions(correctMap);
      setSelectedAnswers(selectedMap);
      setScore(calculatedScore);
      onScoreCalculated?.(calculatedScore);

    } catch (error) {
      console.error('Failed to fetch visited questions', error);
    }
  };

  fetchVisitedQuestions();
}, [emailId, questions]);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <h1 className="text-2xl font-bold">{topicName}</h1>
      <p className="text-muted-foreground mb-4">{subjectName}</p>
{/* 
      <Progress
        value={questions.length > 0
          ? (Object.keys(answered).length / totalQuestionsInTopic) * 100
          : 0
        }
      /> */}

      <div className="space-y-6 mt-6">
        {questions.map((q, index) => {
          const options = getOptionsArray(q);
          const isAnswered = answered[q.questionID];
          const selected = selectedAnswers[q.questionID];
          const isCorrectQuestion = correctQuestions[q.questionID];

          return (
            <Card key={q.questionID} className="p-6 relative">
              <p className="font-medium mb-4">{index + 1}. {q.questionText}</p>

              {isCorrectQuestion && (
                <CheckCircle2 className="w-6 h-6 text-green-500 absolute top-6 right-6" />
              )}

              {options.map((opt, i) => {
                const isCorrect = opt === q.correctAnswer;
                const isSelected = selected === opt;

                let className = 'w-full justify-start text-left';
                if (isAnswered) {
                  if (isCorrect) className += ' border-green-500';
                  else if (isSelected && !isCorrect) className += ' border-red-500';
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
