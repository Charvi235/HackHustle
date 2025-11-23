import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, CheckCircle2, XCircle, ChevronRight, HelpCircle } from 'lucide-react';
import { Question } from '@/data/questions';
import { AskDoubtPanel } from '@/components/practice/AskDoubtPanel';
import { useAuth } from '@/contexts/AuthContext';

const QuestionDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { question, questionIndex, topicName, subjectName, questions, setNumber } = location.state as {
    question: Question;
    questionIndex: number;
    topicName: string;
    subjectName: string;
    questions: Question[];
    setNumber: number;
  };

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showDoubtPanel, setShowDoubtPanel] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      navigate('/question-detail', {
        state: {
          question: questions[questionIndex + 1],
          questionIndex: questionIndex + 1,
          topicName,
          subjectName,
          questions,
          setNumber
        }
      });
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      navigate('/question-detail', {
        state: {
          question: questions[questionIndex - 1],
          questionIndex: questionIndex - 1,
          topicName,
          subjectName,
          questions,
          setNumber
        }
      });
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Questions
        </Button>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Badge variant="secondary" className="mb-2">{subjectName}</Badge>
            <Badge variant="outline" className="ml-2 mb-2">{topicName}</Badge>
            <h1 className="text-2xl font-bold mt-2">Question {questionIndex + 1}</h1>
          </div>
          {user?.role === 'student' && (
            <Button onClick={() => setShowDoubtPanel(true)} variant="outline">
              <HelpCircle className="w-4 h-4 mr-2" />
              Ask Doubt
            </Button>
          )}
        </div>

        {/* Question Card */}
        <Card className="p-8 bg-gradient-card">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-6">{question.question}</h2>
            </div>
            {showResult && (
              isCorrect ? (
                <CheckCircle2 className="w-10 h-10 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-10 h-10 text-red-500 flex-shrink-0" />
              )
            )}
          </div>

          <div className="space-y-4">
            {question.options.map((option, optionIndex) => {
              const isSelected = selectedAnswer === optionIndex;
              const isCorrectOption = optionIndex === question.correctAnswer;
              
              let buttonClass = "justify-start text-left h-auto py-5 px-6 text-base ";
              if (showResult) {
                if (isCorrectOption) {
                  buttonClass += "border-green-500 bg-green-500/10";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "border-red-500 bg-red-500/10";
                }
              } else if (isSelected) {
                buttonClass += "border-primary bg-primary/10";
              }

              return (
                <Button
                  key={optionIndex}
                  variant="outline"
                  className={buttonClass}
                  onClick={() => !showResult && handleAnswer(optionIndex)}
                  disabled={showResult}
                >
                  <span className="font-bold mr-4 text-xl">{String.fromCharCode(65 + optionIndex)}.</span>
                  <span>{option}</span>
                </Button>
              );
            })}
          </div>

          {showResult && question.explanation && (
            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-3 text-lg">Explanation</h3>
              <p className="text-muted-foreground">{question.explanation}</p>
            </div>
          )}

          {showResult && (
            <div className="mt-6 flex gap-4 justify-center">
              <Button 
                onClick={handlePreviousQuestion} 
                disabled={questionIndex === 0}
                variant="outline"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={() => navigate(-1)} variant="outline">
                Back to Questions
              </Button>
              <Button 
                onClick={handleNextQuestion}
                disabled={questionIndex === questions.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </Card>

        {/* Ask Doubt Panel */}
        <AskDoubtPanel
          open={showDoubtPanel}
          onOpenChange={setShowDoubtPanel}
          question={question.question}
          subject={subjectName}
        />
      </div>
    </div>
  );
};

export default QuestionDetail;
