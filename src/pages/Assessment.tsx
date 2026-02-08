import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Question } from '@/data/questions';

// Helper to get options as array
const getOptionsArray = (q: Question): string[] => {
  return [q.option1, q.option2, q.option3, q.option4];
};

const TOTAL_TIME = 1800; // 30 minutes

const Assessment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions, assessmentName, subjectName } = location.state as {
    questions: Question[];
    assessmentName: string;
    subjectName: string;
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isActive, setIsActive] = useState(true);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!isActive || showResults) return;

    if (timeLeft === 0) {
      finishAssessment();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, showResults]);

  /* ---------------- HANDLERS ---------------- */
  const handleAnswer = (optionIndex: number) => {
    const qid = questions[currentQuestion].questionID;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qid]: optionIndex,
    }));
  };

  const finishAssessment = () => {
    setIsActive(false);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /* ===========================
     RESULT SCREEN (ONLY AFTER SUBMIT)
     =========================== */
  if (showResults) {
    const correctCount = Object.keys(selectedAnswers).filter((qId) => {
      const question = questions.find(q => q.questionID === Number(qId));
      if (!question) return false;
      const options = getOptionsArray(question);
      return options[selectedAnswers[Number(qId)]] === question.correctAnswer;
    }).length;

    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="outline"
            onClick={() => navigate('/practice')}
            className="mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>

          <Card className="p-8 text-center">
            <Badge className="mb-4">Assessment Complete</Badge>

            <h1 className="text-4xl font-bold mb-6">{assessmentName}</h1>

            <div className="text-6xl font-bold mb-4">
              {percentage}%
            </div>

            <Progress value={percentage} className="h-3 mb-6" />

            <p className="text-xl mb-8">
              You scored <b>{correctCount}</b> out of <b>{questions.length}</b>
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-muted/50">
                <CheckCircle2 className="mx-auto text-green-500 mb-2" />
                <div className="text-2xl font-bold">{correctCount}</div>
                <div className="text-sm">Correct</div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <XCircle className="mx-auto text-red-500 mb-2" />
                <div className="text-2xl font-bold">
                  {questions.length - correctCount}
                </div>
                <div className="text-sm">Wrong</div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <Clock className="mx-auto text-blue-500 mb-2" />
                <div className="text-2xl font-bold">
                  {formatTime(TOTAL_TIME - timeLeft)}
                </div>
                <div className="text-sm">Time Taken</div>
              </div>
            </div>

            <Button size="lg" onClick={() => navigate('/practice')}>
              Back to Practice
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  /* ===========================
     TEST SCREEN (NO SCORE ANYWHERE)
     =========================== */
  const question = questions[currentQuestion];
  const options = getOptionsArray(question);
  const selectedAnswer = selectedAnswers[question.questionID];

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Badge className="mb-2">{subjectName}</Badge>
            <h1 className="text-2xl font-bold">{assessmentName}</h1>
          </div>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-2xl font-bold">
                {formatTime(timeLeft)}
              </span>
            </div>
          </Card>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>
              {Object.keys(selectedAnswers).length} answered
            </span>
          </div>
          <Progress
            value={((currentQuestion + 1) / questions.length) * 100}
            className="h-2"
          />
        </div>

        {/* Question */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6">
            {question.questionText}
          </h2>

          <div className="space-y-3">
            {options.map((option, index) => {
              const isSelected = selectedAnswer === index;

              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswer(index)}
                  className={`w-full justify-start text-left py-4 ${
                    isSelected ? 'border-primary bg-primary/10' : ''
                  }`}
                >
                  <span className="mr-3 font-semibold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              );
            })}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion((p) => p - 1)}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={finishAssessment}>
              Submit Assessment
            </Button>

            {currentQuestion < questions.length - 1 && (
              <Button onClick={() => setCurrentQuestion((p) => p + 1)}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
