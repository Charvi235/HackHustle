import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Target,
  Medal,
  TrendingUp,
  ChevronLeft,
  Zap
} from 'lucide-react';
import { Question } from '@/data/questions';

interface BattleReportProps {
  questions: Question[];
  selectedAnswers: { [key: number]: number };
  timeTaken: number;
  totalQuestions: number;
  onBack: () => void;
}

export const BattleReport = ({ 
  questions, 
  selectedAnswers, 
  timeTaken, 
  totalQuestions,
  onBack 
}: BattleReportProps) => {
  const correctCount = Object.keys(selectedAnswers).filter(
    (qId) => selectedAnswers[parseInt(qId)] === questions.find(q => q.id === parseInt(qId))?.correctAnswer
  ).length;
  
  const answeredCount = Object.keys(selectedAnswers).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getPerformance = (percentage: number) => {
    if (percentage >= 90) return { text: 'Outstanding!', color: 'text-green-600', icon: Trophy };
    if (percentage >= 70) return { text: 'Great Job!', color: 'text-blue-600', icon: Medal };
    if (percentage >= 50) return { text: 'Good Effort!', color: 'text-yellow-600', icon: Target };
    return { text: 'Keep Practicing!', color: 'text-red-600', icon: Zap };
  };

  const performance = getPerformance(percentage);

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="outline" onClick={onBack} className="mb-6">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Battle Menu
        </Button>

        {/* Overall Score */}
        <Card className="p-8 bg-gradient-card mb-8">
          <div className="text-center mb-6">
            <Badge variant="secondary" className="mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Battle Complete
            </Badge>
            <performance.icon className={`w-16 h-16 mx-auto mb-4 ${performance.color}`} />
            <div className={`text-4xl font-bold mb-2 ${performance.color}`}>
              {performance.text}
            </div>
            <div className="text-3xl font-bold mb-4">{percentage}%</div>
            <Progress value={percentage} className="h-3 mb-4" />
            <p className="text-muted-foreground">
              You got {correctCount} out of {totalQuestions} questions correct
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{correctCount}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <XCircle className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{answeredCount - correctCount}</div>
              <div className="text-sm text-muted-foreground">Wrong</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{Math.floor(timeTaken / 60)}m</div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Target className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{Math.round((correctCount / answeredCount) * 100)}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </Card>

        {/* Question Review */}
        <h2 className="text-2xl font-bold mb-4">Question Review</h2>
        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            const wasAnswered = userAnswer !== undefined;

            return (
              <Card key={question.id} className="p-6 bg-gradient-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Badge variant="outline" className="mt-1">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium mb-3">{question.question}</p>
                      {wasAnswered && (
                        <div className="space-y-2">
                          <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                            <div className="text-sm font-medium mb-1">Your Answer:</div>
                            <div className="text-sm">{question.options[userAnswer]}</div>
                          </div>
                          {!isCorrect && (
                            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                              <div className="text-sm font-medium mb-1">Correct Answer:</div>
                              <div className="text-sm">{question.options[question.correctAnswer]}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {wasAnswered && (
                    isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    )
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button variant="outline" className="flex-1" onClick={onBack}>
            Back to Menu
          </Button>
          <Button className="flex-1">
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};
