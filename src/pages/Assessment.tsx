import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Question } from '@/data/questions';

const Assessment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, assessmentName, subjectName, type } = location.state as {
    questions: Question[];
    assessmentName: string;
    subjectName: string;
    type: 'topic' | 'subject';
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isActive && timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleFinish();
    }
  }, [isActive, timeLeft, showResults]);

  const handleAnswer = (answerIndex: number) => {
    const questionId = questions[currentQuestion].id;
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    setIsActive(false);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const correctCount = Object.keys(selectedAnswers).filter(
      (qId) => selectedAnswers[parseInt(qId)] === questions.find(q => q.id === parseInt(qId))?.correctAnswer
    ).length;
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="outline" onClick={() => navigate('/practice')} className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>

          <Card className="p-8 bg-gradient-card text-center">
            <Badge variant="secondary" className="mb-4">Assessment Complete</Badge>
            <h1 className="text-4xl font-bold mb-6">{assessmentName}</h1>
            <div className="text-6xl font-bold mb-4">{percentage}%</div>
            <Progress value={percentage} className="h-3 mb-6" />
            <p className="text-xl mb-8">
              You scored {correctCount} out of {questions.length} questions
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-muted/50 rounded-lg">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{correctCount}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <XCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">{questions.length - correctCount}</div>
                <div className="text-sm text-muted-foreground">Wrong</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{formatTime(1800 - timeLeft)}</div>
                <div className="text-sm text-muted-foreground">Time Taken</div>
              </div>
            </div>
            <Button onClick={() => navigate('/practice')} size="lg">
              Back to Practice
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[question.id];

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Badge variant="secondary" className="mb-2">{subjectName}</Badge>
            <h1 className="text-2xl font-bold">{assessmentName}</h1>
          </div>
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
            </div>
          </Card>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Object.keys(selectedAnswers).length} answered</span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 bg-gradient-card mb-6">
          <div className="mb-6">
            <Badge variant="outline" className="mb-4 text-lg px-3 py-1">
              {currentQuestion + 1}
            </Badge>
            <h2 className="text-2xl font-semibold">{question.question}</h2>
          </div>

          <div className="space-y-3">
            {question.options.map((option, optionIndex) => {
              const isSelected = selectedAnswer === optionIndex;
              
              return (
                <Button
                  key={optionIndex}
                  variant="outline"
                  className={`justify-start text-left h-auto py-4 px-4 ${isSelected ? 'border-primary bg-primary/10' : ''}`}
                  onClick={() => handleAnswer(optionIndex)}
                >
                  <span className="font-semibold mr-3 text-lg">{String.fromCharCode(65 + optionIndex)}.</span>
                  <span className="text-base">{option}</span>
                </Button>
              );
            })}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleFinish}>
              Finish Assessment
            </Button>
            {currentQuestion < questions.length - 1 && (
              <Button onClick={handleNext}>
                Next Question
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
