
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, Users, Zap, Clock, Target, Swords, Play, 
  CheckCircle2, XCircle, Medal 
} from 'lucide-react';
import { battleQuestions, Question } from '@/data/questions';
import { BattleReport } from '@/components/reports/BattleReport';
import { BattleLobby, JoinBattleLobby } from './BattleLobby';
import { useRef } from 'react';
import {
  connectBattleSocket,
  sendJoinBattle,
  sendAnswer,
  disconnectBattleSocket
} from '@/services/battleSocket';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { ComputerBattle } from './ComputerBattle';
const getOptionsArray = (q: Question): string[] => {
  return [q.option1, q.option2, q.option3, q.option4];
};

const battleModes = [
  { id: 1, title: 'Play with Computer', description: 'Jump into a match with random players', icon: Zap, color: 'bg-yellow-500', maxPlayers: 5, duration: '5 minutes', questions: 20 },
  { id: 2, title: 'Play with Friends', description: 'Create or join a room with friends', icon: Users, color: 'bg-blue-500', maxPlayers: 8, duration: '10 minutes', questions: 30 },
];

const Battle = () => {
  const [gameMode, setGameMode] = useState<'menu' | 'lobby' | 'join' | 'game' | 'report'>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [isGameActive, setIsGameActive] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [roomCode, setRoomCode] = useState<string>('');
  const [isHost, setIsHost] = useState(false);
  const [selectedMode, setSelectedMode] = useState<number>(1);
  const [players, setPlayers] = useState<number[]>([]); 
  const [dbQuestions, setDbQuestions] = useState<Question[]>([]);
  const [liveScores, setLiveScores] = useState<{ [key: number]: number }>({});
  const [masterAnswers, setMasterAnswers] = useState<{ [key: number]: number }>({});
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const studentEmail = user?.emailId; 
  const studentId = Number(user?.student_id);
  console.log("🔍 User Info:", { studentEmail, studentId, user });
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const currentQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;
  const [isComputerMode, setIsComputerMode] = useState(false);
  const scoresRef = useRef<{ [key: number]: number }>({});
  /* ---------------- API CALLS ---------------- */

  
  const createBattleEntry = async (email: string, status: string = "COMPLETED", score: number = 0) => {
    if (!roomCode) return;
    try {
      const numericQuizId = parseInt(roomCode.replace(/\D/g, "")) || 1; 
      const pNumber = players.indexOf(studentId) + 1 || 1;

      const battleData = {
        quizNumber: numericQuizId,
        playerNumber: pNumber,
        studentEmail: email,
        quizScore: score,
        status: status
      };

      const response = await fetch('http://localhost:8080/api/battle/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(battleData)
      });
      
      if (response.ok) console.log(`✅ Entry saved successfully!`);
    } catch (error) {
      console.error("❌ Final Submission Failed:", error);
    }
  };

  const startBattle = (modeId: number) => {
    setGameMode('game');
    setIsGameActive(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults({});
    setTimeLeft(modeId === 2 ? 600 : 300);
    setStartTime(Date.now());
  };


  /* ---------------- TIMER & HANDLERS ---------------- */

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isGameActive) {
      handleFinishGame();
    }
  }, [isGameActive, timeLeft]);

  /* ---------------- SYNC LOGIC (FASTEST FINGER) ---------------- */
useEffect(() => {
    if (gameMode === 'lobby' && roomCode) {
        connectBattleSocket(roomCode, (data) => {
            if (data === 'START' || data.status === 'START') {
                startBattle(selectedMode);
            } else if (data.battleCode) {
                // Room update logic
                setPlayers(data.players || []);
                if (data.questions) setDbQuestions(data.questions);

                // 🔥 LIVE SCORE FIX: Update scores state from server data
                if (data.scores) {
                    console.log("🔥 Updated Scores from Server:", data.scores);
                    console.log("Full Scores Map:", JSON.stringify(data.scores)); 
                    setLiveScores(data.scores);
                    scoresRef.current = data.scores;
                }

                if (typeof data.currentQuestionIndex === 'number') {
                    if (data.currentQuestionIndex >= 10) {
                        handleFinishGame();
                    } else if(data.currentQuestionIndex !== currentQuestion){
                        setCurrentQuestion(data.currentQuestionIndex);
                        setShowResults({});
                        setSelectedAnswers({});
                    }
                }
            }
        });
        sendJoinBattle(roomCode, studentEmail!);
    }
    return () => {
        if (gameMode !== 'lobby' && gameMode !== 'game') {
            disconnectBattleSocket();
        }
    };
}, [gameMode, roomCode, currentQuestion]); // 🔥 added currentQuestion here to ensure index sync
  const handleInvite = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/battle/create/${studentEmail}`, { method: 'POST' }); 
      const code = await response.text();
      setRoomCode(code);
      setIsHost(true);
      setGameMode('lobby');
    } catch (error) { console.error("Invite Error:", error); }
  };

  const handleJoinWithCode = async (code: string) => {
    try {
      await fetch(`http://localhost:8080/api/battle/join/${code}/${studentEmail}`, { method: 'POST' });
      setRoomCode(code);
      setIsHost(false);
      setGameMode('lobby');
    } catch (error) { console.error("Join Error:", error); }
  };
const handleAnswer = (answerIndex: number) => {
    const question = currentQuestions[currentQuestion];
    const questionId = question.questionID;
    const options = getOptionsArray(question);
    const selectedOptionText = options[answerIndex];
    // 1. Update states for UI
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setShowResults(prev => ({ ...prev, [questionId]: true }));
    setMasterAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    sendAnswer(roomCode, studentEmail!, selectedOptionText);
  };
const handleFinishGame = () => {
    setIsGameActive(false);
    setGameMode('report');
    let highestScore = -1;
    let currentWinner = null;
    const currentScores = scoresRef.current;
    const scoreEntries = Object.entries(currentScores);
    
    console.log("🏆 Final Sync Scores:", currentScores);
    console.log("Calculating Winner from Scores:", scoreEntries);
    // Object.entries(liveScores).forEach(([pId, score]) => {
    //   console.log(`Player ${pId} scored ${score} highest is ${highestScore}`);
    //     if (score > highestScore) {
    //         highestScore = score;
    //         currentWinner = Number(pId);
    //     }
    // });
    if (scoreEntries.length > 0) {
        scoreEntries.forEach(([pId, score]) => {
            const numericScore = Number(score);
            const numericId = Number(pId);
            
            if (numericScore > highestScore) {
                highestScore = numericScore;
                currentWinner = numericId;
            }
        });
    }
    console.log("🏁 Game Finished! Winner ID:", currentWinner, "with score:", highestScore);
    setWinnerId(currentWinner);
    setMasterAnswers(finalAnswers => {
      const finalScore = currentQuestions.reduce((acc, q) => {
        const selectedIdx = finalAnswers[q.questionID];
        if (selectedIdx === undefined) return acc;
        const options = getOptionsArray(q);
        return options[selectedIdx] === q.correctAnswer ? acc + 10 : acc;
      }, 0);

      if (studentEmail) {
        createBattleEntry(studentEmail, "COMPLETED", finalScore);
      }
      return finalAnswers; // Important to return state
    });
  };

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  /* ---------------- RENDERING ---------------- */

  if (gameMode === 'lobby') {
    return (
      <BattleLobby 
        roomCode={roomCode} 
        onStart={() => fetch(`http://localhost:8080/api/battle/start/${roomCode}/${studentEmail}`, { method: 'POST' })} 
        onCancel={() => setGameMode('menu')} 
        isHost={isHost} 
        players={players} 
      />
    );
  }

  if (gameMode === 'join') return <JoinBattleLobby onJoin={handleJoinWithCode} onCancel={() => setGameMode('menu')} />;
  
  if (gameMode === 'report') {
    return (
      <BattleReport 
        questions={currentQuestions} 
        selectedAnswers={masterAnswers}
        timeTaken={Math.floor((Date.now() - startTime) / 1000)} 
        totalQuestions={currentQuestions.length} 
        winnerId={winnerId}
        onBack={() => setGameMode('menu')} 
        onPlayAgain={() => {
          setGameMode('menu'); // Go back to menu to select mode
          setCurrentQuestion(0);
          setSelectedAnswers({});
          setMasterAnswers({});
          setShowResults({});
        }}
        players={players}
      />
    );
  }

if (isComputerMode && gameMode === 'game') {
  return (
    <ComputerBattle 
      questions={currentQuestions}
      studentId={studentId}
      studentEmail={studentEmail}
      firstName={user?.first_name}
      onBack={() => {
        setIsComputerMode(false);
        setGameMode('menu');
      }}
    />
  );
}
  if (gameMode === 'game') {
    const question = currentQuestions[currentQuestion];
    if (!question) return null;
    const options = getOptionsArray(question);
    const isAnswered = showResults[question.questionID];
    const isCorrect = options[selectedAnswers[question.questionID]] === question.correctAnswer;

    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Battle Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <Badge variant="secondary" className="mb-2"><Swords className="w-4 h-4 mr-2" />Quiz Battle</Badge>
              <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {currentQuestions.length}</h2>
            </div>
            <Card className="p-4 bg-gradient-card">
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{formatTime(timeLeft)}</span></div>
            </Card>
          </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                  {players.map((pId) => (
                      <Card key={pId} className={`p-2 border-2 ${pId === studentId ? 'border-primary' : 'border-transparent'}`}>
                          <div className="flex justify-between items-center">
                              <span className="text-xs font-bold truncate">Player {pId.toString().slice(-3)}</span>
                              <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {/* 🔥 Change: Key string mein ho sakti hai, isliye toString() use karo */}
                  {liveScores[pId.toString()] ?? liveScores[pId] ?? 0}
              </Badge>
            </div>
        </Card>
    ))}
</div>

          <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2 mb-8" />

          <Card className="p-8 bg-gradient-card mb-6">
            <div className="flex items-start gap-4 mb-6">
              <Badge variant="outline" className="text-lg px-3 py-1">{currentQuestion + 1}</Badge>
              <h2 className="text-2xl font-semibold flex-1">{question.questionText}</h2>
        
            </div>
            <div className="space-y-3">
              {options.map((option, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  onClick={() => !isAnswered && handleAnswer(idx)} 
                  disabled={isAnswered}
                >
                  <span className="font-semibold mr-3 text-lg">{String.fromCharCode(65 + idx)}.</span><span className="text-base">{option}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 text-center">
        {gameMode === 'menu' && (
          <div>
            <Badge variant="secondary" className="mb-4"><Swords className="w-4 h-4 mr-2" />Quiz Battle Arena</Badge>
            <h1 className="text-4xl font-bold mb-6">Battle Mode Activated</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {battleModes.map((mode) => (
                <Card key={mode.id} className="p-6 bg-gradient-card group hover:border-primary/50 transition-all">
                  <div className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4`}><mode.icon className="w-8 h-8 text-white" /></div>
                  <h3 className="text-xl font-semibold mb-4">{mode.title}</h3>
                  {mode.id === 2 ? (
                    <div className="space-y-2">
                      <Button onClick={handleInvite} className="w-full"><Users className="w-4 h-4 mr-2" />Invite Friends</Button>
                      <Button onClick={() => setGameMode('join')} variant="outline" className="w-full">Join Room</Button>
                    </div>
                  ) : (
                    //<Button onClick={() => startBattle(mode.id)} className="w-full">Start Battle</Button>
                    //<Button onClick={() => startBattle(mode.id)} className="w-full">Start Battle</Button>
                    // Isse replace karein
<Button 
  onClick={async () => {
    // Backend se questions fetch karo
    const res = await fetch(`http://localhost:8080/api/battle/create/${studentEmail}`, { method: 'POST' });
    const code = await res.text();
    const roomRes = await fetch(`http://localhost:8080/api/battle/join/${code}/${studentEmail}`, { method: 'POST' });
    const roomData = await roomRes.json();
    
    setDbQuestions(roomData.questions);
    setIsComputerMode(true);
    setGameMode('game'); // ya koi specific state
  }} 
  className="w-full"
>
  Start Battle
</Button>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Battle;