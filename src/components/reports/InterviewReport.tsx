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
  Award,
  TrendingUp,
  ChevronLeft
} from 'lucide-react';

interface QuestionResult {
  question: string;
  userResponse: string;
  betterResponse: string;
  marks: number;
  maxMarks: number;
}

interface InterviewReportProps {
  results: QuestionResult[];
  totalTime: number;
  onBack: () => void;
}

export const InterviewReport = ({ results, totalTime, onBack }: InterviewReportProps) => {
  const totalMarks = results.reduce((sum, r) => sum + r.marks, 0);
  const maxTotalMarks = results.reduce((sum, r) => sum + r.maxMarks, 0);
  const percentage = Math.round((totalMarks / maxTotalMarks) * 100);

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-500' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-500' };
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-400' };
    if (percentage >= 50) return { grade: 'C', color: 'text-yellow-500' };
    return { grade: 'D', color: 'text-red-500' };
  };

  const { grade, color } = getGrade(percentage);

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="outline" onClick={onBack} className="mb-6">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Interview
        </Button>

        {/* Overall Score */}
        <Card className="p-8 bg-gradient-card mb-8">
          <div className="text-center mb-6">
            <Badge variant="secondary" className="mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Interview Complete
            </Badge>
            <div className={`text-6xl font-bold mb-2 ${color}`}>{grade}</div>
            <div className="text-3xl font-bold mb-4">{percentage}%</div>
            <Progress value={percentage} className="h-3 mb-4" />
            <p className="text-muted-foreground">
              You scored {totalMarks} out of {maxTotalMarks} marks
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Target className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{results.length}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{Math.floor(totalTime / 60)}m</div>
              <div className="text-sm text-muted-foreground">Time Taken</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Award className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{totalMarks}</div>
              <div className="text-sm text-muted-foreground">Total Marks</div>
            </div>
          </div>
        </Card>

        {/* Detailed Results */}
        <h2 className="text-2xl font-bold mb-4">Detailed Feedback</h2>
        <div className="space-y-6">
          {results.map((result, index) => (
            <Card key={index} className="p-6 bg-gradient-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">Question {index + 1}</Badge>
                  <h3 className="text-lg font-semibold mb-2">{result.question}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{result.marks}/{result.maxMarks}</div>
                  <div className="text-sm text-muted-foreground">Marks</div>
                </div>
              </div>

              {/* Your Response */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">Your Response</Badge>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm">{result.userResponse}</p>
                </div>
              </div>

              {/* Better Response */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Suggested Improvement
                  </Badge>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm">{result.betterResponse}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8">
          <Button onClick={onBack}>
            Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};
