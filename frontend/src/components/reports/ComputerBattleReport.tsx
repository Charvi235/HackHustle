import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Timer, Target, ArrowLeft, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { Question } from '@/data/questions';

interface ComputerBattleReportProps {
  questions: Question[];
  selectedAnswers: { [key: number]: number };
  timeTaken: number;
  totalQuestions: number;
  winnerId: number | null;
  playerNames: { [key: string]: string };
  onBack: () => void;
  onPlayAgain: () => void;
}
export const ComputerBattleReport = ({ 
  questions, 
  selectedAnswers, 
  timeTaken, 
  totalQuestions, 
  winnerId, 
  playerNames,
  onBack, 
  onPlayAgain 
}: ComputerBattleReportProps) => {

  const userScore = questions.reduce((acc, q) => {
    const selectedIdx = selectedAnswers[q.questionID];
    const options = [q.option1, q.option2, q.option3, q.option4];
    return options[selectedIdx] === q.correctAnswer ? acc + 10 : acc;
  }, 0);
  const winnerName = (winnerId !== null && winnerId !== undefined) 
    ? (playerNames[String(winnerId)] || `Player ${winnerId}`) 
    : "It's a Tie! 🤝";

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="p-8 bg-gradient-to-b from-primary/10 to-background border-2 border-primary/20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500/20 rounded-full mb-4">
              <Trophy className={`w-10 h-10 ${winnerId !== null ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            </div>
            <h1 className="text-4xl font-bold mb-2">Battle Results</h1>
            <Badge 
              variant={winnerId !== null ? "default" : "outline"} 
              className={`text-lg px-4 py-1 ${winnerId !== null ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'border-primary/50 text-primary'}`}
            >
              Winner: {winnerName}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4 flex flex-col items-center bg-background/50">
              <Target className="w-6 h-6 text-blue-500 mb-2" />
              <span className="text-sm text-muted-foreground">Your Score</span>
              <span className="text-2xl font-bold">{userScore}</span>
            </Card>
            <Card className="p-4 flex flex-col items-center bg-background/50">
              <Timer className="w-6 h-6 text-orange-500 mb-2" />
              <span className="text-sm text-muted-foreground">Time Taken</span>
              <span className="text-2xl font-bold">{Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}</span>
            </Card>
            <Card className="p-4 flex flex-col items-center bg-background/50">
              <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
              <span className="text-sm text-muted-foreground">Accuracy</span>
              <span className="text-2xl font-bold">{Math.round((userScore / (totalQuestions * 10)) * 100)}%</span>
            </Card>
          </div>
          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-xl px-2">Question Review</h3>
            {questions.map((q, idx) => {
              const options = [q.option1, q.option2, q.option3, q.option4];
              const userAnsIdx = selectedAnswers[q.questionID];
              const isCorrect = options[userAnsIdx] === q.correctAnswer;
              return (
                <div key={idx} className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'bg-green-500/5 border-green-500' : 'bg-red-500/5 border-red-500'}`}>
                  <div className="flex justify-between items-start gap-4">
                    <p className="font-medium">{idx + 1}. {q.questionText}</p>
                    {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Your answer: </span>
                    <span className={isCorrect ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                      {userAnsIdx !== undefined ? options[userAnsIdx] : "Not Answered"}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="text-sm mt-1">
                      <span className="text-muted-foreground">Correct: </span>
                      <span className="text-green-600 font-semibold">{q.correctAnswer}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button onClick={onBack} variant="outline" className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Arena
            </Button>
            <Button onClick={onPlayAgain} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" /> Play Again
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};