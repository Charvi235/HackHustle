import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Users, 
  Zap, 
  Clock, 
  Target,
  Swords,
  Play,
  CheckCircle2,
  XCircle,
  Medal,
} from 'lucide-react';
import { battleQuestions, Question } from '@/data/questions';
import { BattleReport } from '@/components/reports/BattleReport';
import { BattleLobby, JoinBattleLobby } from './BattleLobby';

// Helper to get options as array
const getOptionsArray = (q: Question): string[] => {
  return [q.option1, q.option2, q.option3, q.option4];
};

const battleModes = [
  {
    id: 1,
    title: 'Quick Battle',
    description: 'Jump into a match with random players',
    icon: Zap,
    color: 'bg-yellow-500',
    maxPlayers: 5,
    duration: '5 minutes',
    questions: 20,
  },
  {
    id: 2,
    title: 'Private Room',
    description: 'Create or join a room with friends',
    icon: Users,
    color: 'bg-blue-500',
    maxPlayers: 8,
    duration: '10 minutes',
    questions: 30,
  },
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

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isGameActive) {
      handleFinishGame();
    }
  }, [isGameActive, timeLeft]);

  const handleStartGame = (modeId: number) => {
    setSelectedMode(modeId);
    if (modeId === 2) {
      // Private Room - show lobby with options to invite or join
      setGameMode('menu');
    } else {
      // Quick Battle - start immediately
      startBattle(modeId);
    }
  };

  const handleInvite = () => {
    const code = generateRoomCode();
    setRoomCode(code);
    setIsHost(true);
    setGameMode('lobby');
  };

  const handleJoinRequest = () => {
    setIsHost(false);
    setGameMode('join');
  };

  const handleJoinWithCode = (code: string) => {
    // TODO: Verify room exists in MySQL
    setRoomCode(code);
    setIsHost(false);
    setGameMode('lobby');
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

  const handleAnswer = (answerIndex: number) => {
    const questionId = battleQuestions[currentQuestion].questionID;
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
    setShowResults({ ...showResults, [questionId]: true });

    // Auto advance after 1 second
    setTimeout(() => {
      if (currentQuestion < battleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleFinishGame();
      }
    }, 1000);
  };

  const handleFinishGame = () => {
    setIsGameActive(false);
    setGameMode('report');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameMode === 'lobby') {
    return (
      <BattleLobby
        roomCode={roomCode}
        onStart={() => startBattle(selectedMode)}
        onCancel={() => setGameMode('menu')}
        isHost={isHost}
      />
    );
  }

  if (gameMode === 'join') {
    return (
      <JoinBattleLobby
        onJoin={handleJoinWithCode}
        onCancel={() => setGameMode('menu')}
      />
    );
  }

  if (gameMode === 'report') {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    return (
      <BattleReport
        questions={battleQuestions}
        selectedAnswers={selectedAnswers}
        timeTaken={timeTaken}
        totalQuestions={battleQuestions.length}
        onBack={() => setGameMode('menu')}
      />
    );
  }

  if (gameMode === 'game') {
    const question = battleQuestions[currentQuestion];
    const questionId = question.questionID;
    const options = getOptionsArray(question);
    const isAnswered = showResults[questionId];
    const selectedAnswer = selectedAnswers[questionId];
    // Check if selected option text matches correctAnswer
    const selectedOptionText = selectedAnswer !== undefined ? options[selectedAnswer] : null;
    const isCorrect = selectedOptionText === question.correctAnswer;

    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Battle Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <Badge variant="secondary" className="mb-2">
                <Swords className="w-4 h-4 mr-2" />
                Quiz Battle
              </Badge>
              <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {battleQuestions.length}</h2>
            </div>
            <Card className="p-4 bg-gradient-card">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
              </div>
            </Card>
          </div>

          {/* Progress */}
          <Progress value={((currentQuestion + 1) / battleQuestions.length) * 100} className="h-2 mb-8" />

          {/* Question Card */}
          <Card className="p-8 bg-gradient-card mb-6">
            <div className="flex items-start gap-4 mb-6">
              <Badge variant="outline" className="text-lg px-3 py-1">
                {currentQuestion + 1}
              </Badge>
              <h2 className="text-2xl font-semibold flex-1">{question.questionText}</h2>
              {isAnswered && (
                isCorrect ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500" />
                )
              )}
            </div>

            <div className="space-y-3">
              {options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrectOption = option === question.correctAnswer;
                
                let buttonClass = "justify-start text-left h-auto py-4 px-4 ";
                if (isAnswered) {
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
                    onClick={() => !isAnswered && handleAnswer(optionIndex)}
                    disabled={isAnswered}
                  >
                    <span className="font-semibold mr-3 text-lg">{String.fromCharCode(65 + optionIndex)}.</span>
                    <span className="text-base">{option}</span>
                  </Button>
                );
              })}
            </div>
          </Card>

          {/* Score Display */}
          <Card className="p-6 bg-gradient-card">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground">Your Score</div>
                <div className="text-2xl font-bold">
                  {Object.keys(showResults).filter((qId) => {
                    const q = battleQuestions.find(bq => bq.questionID === parseInt(qId));
                    if (!q) return false;
                    const opts = getOptionsArray(q);
                    const selOpt = opts[selectedAnswers[parseInt(qId)]];
                    return selOpt === q.correctAnswer;
                  }).length} / {Object.keys(showResults).length}
                </div>
              </div>
              <Button onClick={handleFinishGame} variant="outline">
                End Battle
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4">
        {gameMode === 'menu' && (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Swords className="w-4 h-4 mr-2" />
                Quiz Battle Arena
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Battle Mode{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Activated
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Test your knowledge against other players in real-time quiz battles. 
                First to answer correctly gets the points!
              </p>
            </div>

            {/* Player Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center bg-gradient-card">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">1,847</div>
                <div className="text-sm text-muted-foreground">Battle Points</div>
              </Card>
              <Card className="p-6 text-center bg-gradient-card">
                <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">Victories</div>
              </Card>
              <Card className="p-6 text-center bg-gradient-card">
                <Medal className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">87%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </Card>
            </div>

            {/* Battle Modes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {battleModes.map((mode) => (
                <Card 
                  key={mode.id} 
                  className="p-6 bg-gradient-card hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50 group"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
                      <mode.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{mode.title}</h3>
                    <p className="text-muted-foreground mb-4">{mode.description}</p>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-6">
                      <div className="flex justify-between">
                        <span>Players:</span>
                        <span>Up to {mode.maxPlayers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{mode.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Questions:</span>
                        <span>{mode.questions}</span>
                      </div>
                    </div>
                    
                    {mode.id === 2 ? (
                      <div className="space-y-2">
                        <Button 
                          onClick={handleInvite}
                          className="w-full"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Invite Friends
                        </Button>
                        <Button 
                          onClick={handleJoinRequest}
                          variant="outline"
                          className="w-full"
                        >
                          Join Room
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => handleStartGame(mode.id)}
                        className="w-full group-hover:bg-primary/90"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Battle
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default Battle;
