import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Swords } from 'lucide-react';
import { Question } from '@/data/questions';
import { ComputerBattleReport } from '@/components/reports/ComputerBattleReport';


interface ComputerBattleProps {
  questions: Question[];
  studentId: number;
  studentEmail: string | undefined;
  firstName: string | undefined;
  onBack: () => void;
}

export const ComputerBattle = ({ questions, studentId, studentEmail, firstName, onBack }: ComputerBattleProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [isGameActive, setIsGameActive] = useState(true);
  const [startTime] = useState(Date.now());
  const [liveScores, setLiveScores] = useState<{ [key: string]: number }>({ [studentId]: 0, "999": 0 });
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const [showReport, setShowReport] = useState(false);
  const scoresRef = useRef<{ [key: string]: number }>({ [studentId]: 0, "999": 0 });

  const computerId = "999";
  useEffect(() => {
    let aiTimer: NodeJS.Timeout;
    if (isGameActive && !showResults[questions[currentQuestion]?.questionID]) {
      const delay = Math.floor(Math.random() * 4000) + 3000;
      aiTimer = setTimeout(() => {
        const isCorrect = Math.random() < 0.7; // 70% accuracy
        if (isCorrect) {
          scoresRef.current[computerId] += 10;
          setLiveScores({ ...scoresRef.current });
        }
        handleNextAuto();
      }, delay);
    }
    return () => clearTimeout(aiTimer);
  }, [currentQuestion, isGameActive]);

  // Timer logic
  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) finishGame();
  }, [isGameActive, timeLeft]);

  const handleAnswer = (idx: number) => {
    const q = questions[currentQuestion];
    if (showResults[q.questionID]) return;

    const options = [q.option1, q.option2, q.option3, q.option4];
    setSelectedAnswers(prev => ({ ...prev, [q.questionID]: idx }));
    setShowResults(prev => ({ ...prev, [q.questionID]: true }));

    if (options[idx] === q.correctAnswer) {
      scoresRef.current[studentId] += 10;
      setLiveScores({ ...scoresRef.current });
    }
    
    handleNextAuto();
  };

  const handleNextAuto = () => {
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        finishGame();
      }
    }, 1500);
  };
  const finishGame = async () => {
      setIsGameActive(false);
      const s1 = scoresRef.current[studentId] || 0;
      const s2 = scoresRef.current[computerId] || 0;
      console.log("Final Scores:", { s1, s2 });
      console.log(s1>s2 ? "User Wins" : s2>s1 ? "Computer Wins" : "It's a Tie");
      let finalWinner = null;
      if (s1 > s2) finalWinner = studentId;
      else if (s2 > s1) finalWinner = 999;
      setWinnerId(finalWinner);
    if (studentEmail) 
      {
        try {
            await fetch('http://localhost:8080/api/battle/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quizNumber: 1,
                    playerNumber: 1,
                    studentEmail: studentEmail,
                    quizScore: s1,
                    status: "COMPLETED"
                })
            });
        } catch (e) {
            console.error("Score saving failed", e);
        }
      }
      setShowReport(true);
  };
  if (showReport) {
      return (
        <ComputerBattleReport 
          questions={questions}
          selectedAnswers={selectedAnswers} 
          timeTaken={Math.floor((Date.now() - startTime) / 1000)}
          totalQuestions={questions.length}
          winnerId={winnerId}
          playerNames={{
              [String(studentId)]: firstName || "You",
              "999": "🤖 AI Bot"
          }}
          onBack={onBack}
          onPlayAgain={onBack}
        />
      );
  }
  const currentQ = questions[currentQuestion];
  if (!currentQ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Finishing Battle...</h2>
          <Progress value={100} className="w-64 h-2" />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-4">     
          <h2 className="text-2xl font-bold">Question {currentQuestion + 1}/{questions.length}</h2>
          <Card className="p-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-2xl font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </Card>
        </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[studentId, 999].map(id => (
          <Card key={id} className={`p-3 border-2 ${id === studentId ? 'border-primary' : 'border-transparent'}`}>
            <div className="flex justify-between items-center">
              <span className="font-bold">{id === 999 ? "🤖 AI Bot" : "You"}</span>
              <Badge>{liveScores[id]}</Badge>
            </div>
          </Card>
        ))}
      </div>
      <Progress value={((currentQuestion + 1) / questions.length) * 100} className="mb-8" />
      <Card className="p-8 bg-gradient-card">
        <h2 className="text-2xl font-semibold mb-6">{currentQ.questionText}</h2>
        <div className="grid grid-cols-1 gap-3">
          {[currentQ.option1, currentQ.option2, currentQ.option3, currentQ.option4].map((opt, i) => (
            <Button 
              key={i} 
              onClick={() => handleAnswer(i)}
              className={`w-full justify-start h-auto py-4 px-6 text-left border ${showResults[currentQ.questionID] ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {opt}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  </div>
)}