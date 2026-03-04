// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { Card } from '@/components/ui/card';
// // // // // // import { Button } from '@/components/ui/button';
// // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // import { Progress } from '@/components/ui/progress';
// // // // // // import { 
// // // // // //   Trophy, 
// // // // // //   Users, 
// // // // // //   Zap, 
// // // // // //   Clock, 
// // // // // //   Target,
// // // // // //   Swords,
// // // // // //   Play,
// // // // // //   CheckCircle2,
// // // // // //   XCircle,
// // // // // //   Medal,
// // // // // // } from 'lucide-react';
// // // // // // import { battleQuestions, Question } from '@/data/questions';
// // // // // // import { BattleReport } from '@/components/reports/BattleReport';
// // // // // // import { BattleLobby, JoinBattleLobby } from './BattleLobby';
// // // // // // import {
// // // // // //   connectBattleSocket,
// // // // // //   sendJoinBattle,
// // // // // //   sendAnswer,
// // // // // //   disconnectBattleSocket
// // // // // // } from '@/services/battleSocket';
// // // // // // // Helper to get options as array
// // // // // // const getOptionsArray = (q: Question): string[] => {
// // // // // //   return [q.option1, q.option2, q.option3, q.option4];
// // // // // // };

// // // // // // const battleModes = [
// // // // // //   {
// // // // // //     id: 1,
// // // // // //     title: 'Quick Battle',
// // // // // //     description: 'Jump into a match with random players',
// // // // // //     icon: Zap,
// // // // // //     color: 'bg-yellow-500',
// // // // // //     maxPlayers: 5,
// // // // // //     duration: '5 minutes',
// // // // // //     questions: 20,
// // // // // //   },
// // // // // //   {
// // // // // //     id: 2,
// // // // // //     title: 'Private Room',
// // // // // //     description: 'Create or join a room with friends',
// // // // // //     icon: Users,
// // // // // //     color: 'bg-blue-500',
// // // // // //     maxPlayers: 8,
// // // // // //     duration: '10 minutes',
// // // // // //     questions: 30,
// // // // // //   },
// // // // // // ];


// // // // // // const Battle = () => {
// // // // // //   const [gameMode, setGameMode] = useState<'menu' | 'lobby' | 'join' | 'game' | 'report'>('menu');
// // // // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // // // //   const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
// // // // // //   const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
// // // // // //   const [timeLeft, setTimeLeft] = useState(600);
// // // // // //   const [isGameActive, setIsGameActive] = useState(false);
// // // // // //   const [startTime, setStartTime] = useState<number>(0);
// // // // // //   const [roomCode, setRoomCode] = useState<string>('');
// // // // // //   const [isHost, setIsHost] = useState(false);
// // // // // //   const [selectedMode, setSelectedMode] = useState<number>(1);

// // // // // //   const generateRoomCode = () => {
// // // // // //     return Math.random().toString(36).substring(2, 8).toUpperCase();
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     if (isGameActive && timeLeft > 0) {
// // // // // //       const timer = setInterval(() => {
// // // // // //         setTimeLeft((prev) => prev - 1);
// // // // // //       }, 1000);
// // // // // //       return () => clearInterval(timer);
// // // // // //     } else if (timeLeft === 0 && isGameActive) {
// // // // // //       handleFinishGame();
// // // // // //     }
// // // // // //   }, [isGameActive, timeLeft]);

// // // // // //   const handleStartGame = (modeId: number) => {
// // // // // //     setSelectedMode(modeId);
// // // // // //     if (modeId === 2) {
// // // // // //       // Private Room
// // // // // //       setGameMode('menu');
// // // // // //     } else {
// // // // // //       // Quick Battle
// // // // // //       startBattle(modeId);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleInvite = () => {
// // // // // //     const code = generateRoomCode();
// // // // // //     setRoomCode(code);
// // // // // //     setIsHost(true);
// // // // // //     setGameMode('lobby');
// // // // // //   };

// // // // // //   const handleJoinRequest = () => {
// // // // // //     setIsHost(false);
// // // // // //     setGameMode('join');
// // // // // //   };

// // // // // //   const handleJoinWithCode = (code: string) => {
// // // // // //     // TODO: Verify room exists in MySQL
// // // // // //     setRoomCode(code);
// // // // // //     setIsHost(false);
// // // // // //     setGameMode('lobby');
// // // // // //   };

// // // // // //   const startBattle = (modeId: number) => {
// // // // // //     setGameMode('game');
// // // // // //     setIsGameActive(true);
// // // // // //     setCurrentQuestion(0);
// // // // // //     setSelectedAnswers({});
// // // // // //     setShowResults({});
// // // // // //     setTimeLeft(modeId === 2 ? 600 : 300);
// // // // // //     setStartTime(Date.now());
// // // // // //   };

// // // // // //   const handleAnswer = (answerIndex: number) => {
// // // // // //     const questionId = battleQuestions[currentQuestion].questionID;
// // // // // //     setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
// // // // // //     setShowResults({ ...showResults, [questionId]: true });

// // // // // //     // Auto advance after 1 second
// // // // // //     setTimeout(() => {
// // // // // //       if (currentQuestion < battleQuestions.length - 1) {
// // // // // //         setCurrentQuestion(currentQuestion + 1);
// // // // // //       } else {
// // // // // //         handleFinishGame();
// // // // // //       }
// // // // // //     }, 1000);
// // // // // //   };

// // // // // //   const handleFinishGame = () => {
// // // // // //     setIsGameActive(false);
// // // // // //     setGameMode('report');
// // // // // //   };

// // // // // //   const formatTime = (seconds: number) => {
// // // // // //     const mins = Math.floor(seconds / 60);
// // // // // //     const secs = seconds % 60;
// // // // // //     return `${mins}:${secs.toString().padStart(2, '0')}`;
// // // // // //   };

// // // // // //   if (gameMode === 'lobby') {
// // // // // //     return (
// // // // // //       <BattleLobby
// // // // // //         roomCode={roomCode}
// // // // // //         onStart={() => startBattle(selectedMode)}
// // // // // //         onCancel={() => setGameMode('menu')}
// // // // // //         isHost={isHost}
// // // // // //       />
// // // // // //     );
// // // // // //   }

// // // // // //   if (gameMode === 'join') {
// // // // // //     return (
// // // // // //       <JoinBattleLobby
// // // // // //         onJoin={handleJoinWithCode}
// // // // // //         onCancel={() => setGameMode('menu')}
// // // // // //       />
// // // // // //     );
// // // // // //   }

// // // // // //   if (gameMode === 'report') {
// // // // // //     const timeTaken = Math.floor((Date.now() - startTime) / 1000);
// // // // // //     return (
// // // // // //       <BattleReport
// // // // // //         questions={battleQuestions}
// // // // // //         selectedAnswers={selectedAnswers}
// // // // // //         timeTaken={timeTaken}
// // // // // //         totalQuestions={battleQuestions.length}
// // // // // //         onBack={() => setGameMode('menu')}
// // // // // //       />
// // // // // //     );
// // // // // //   }

// // // // // //   if (gameMode === 'game') {
// // // // // //     // Guard against empty questions array
// // // // // //     if (!battleQuestions || battleQuestions.length === 0) {
// // // // // //       return (
// // // // // //         <div className="min-h-screen bg-background pt-20 pb-16">
// // // // // //           <div className="container mx-auto px-4 text-center">
// // // // // //             <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
// // // // // //             <p className="text-muted-foreground mb-6">Battle questions are not loaded yet.</p>
// // // // // //             <Button onClick={() => setGameMode('menu')}>Back to Menu</Button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       );
// // // // // //     }

// // // // // //     const question = battleQuestions[currentQuestion];
// // // // // //     if (!question) {
// // // // // //       handleFinishGame();
// // // // // //       return null;
// // // // // //     }
    
// // // // // //     const questionId = question.questionID;
// // // // // //     const options = getOptionsArray(question);
// // // // // //     const isAnswered = showResults[questionId];
// // // // // //     const selectedAnswer = selectedAnswers[questionId];
// // // // // //     // Check if selected option text matches correctAnswer
// // // // // //     const selectedOptionText = selectedAnswer !== undefined ? options[selectedAnswer] : null;
// // // // // //     const isCorrect = selectedOptionText === question.correctAnswer;

// // // // // //     return (
// // // // // //       <div className="min-h-screen bg-background pt-20 pb-16">
// // // // // //         <div className="container mx-auto px-4 max-w-4xl">
// // // // // //           {/* Battle Header */}
// // // // // //           <div className="flex justify-between items-center mb-8">
// // // // // //             <div>
// // // // // //               <Badge variant="secondary" className="mb-2">
// // // // // //                 <Swords className="w-4 h-4 mr-2" />
// // // // // //                 Quiz Battle
// // // // // //               </Badge>
// // // // // //               <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {battleQuestions.length}</h2>
// // // // // //             </div>
// // // // // //             <Card className="p-4 bg-gradient-card">
// // // // // //               <div className="flex items-center gap-2">
// // // // // //                 <Clock className="w-5 h-5 text-primary" />
// // // // // //                 <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
// // // // // //               </div>
// // // // // //             </Card>
// // // // // //           </div>

// // // // // //           {/* Progress */}
// // // // // //           <Progress value={((currentQuestion + 1) / battleQuestions.length) * 100} className="h-2 mb-8" />

// // // // // //           {/* Question Card */}
// // // // // //           <Card className="p-8 bg-gradient-card mb-6">
// // // // // //             <div className="flex items-start gap-4 mb-6">
// // // // // //               <Badge variant="outline" className="text-lg px-3 py-1">
// // // // // //                 {currentQuestion + 1}
// // // // // //               </Badge>
// // // // // //               <h2 className="text-2xl font-semibold flex-1">{question.questionText}</h2>
// // // // // //               {isAnswered && (
// // // // // //                 isCorrect ? (
// // // // // //                   <CheckCircle2 className="w-8 h-8 text-green-500" />
// // // // // //                 ) : (
// // // // // //                   <XCircle className="w-8 h-8 text-red-500" />
// // // // // //                 )
// // // // // //               )}
// // // // // //             </div>

// // // // // //             <div className="space-y-3">
// // // // // //               {options.map((option, optionIndex) => {
// // // // // //                 const isSelected = selectedAnswer === optionIndex;
// // // // // //                 const isCorrectOption = option === question.correctAnswer;
                
// // // // // //                 let buttonClass = "justify-start text-left h-auto py-4 px-4 ";
// // // // // //                 if (isAnswered) {
// // // // // //                   if (isCorrectOption) {
// // // // // //                     buttonClass += "border-green-500 bg-green-500/10";
// // // // // //                   } else if (isSelected && !isCorrect) {
// // // // // //                     buttonClass += "border-red-500 bg-red-500/10";
// // // // // //                   }
// // // // // //                 } else if (isSelected) {
// // // // // //                   buttonClass += "border-primary bg-primary/10";
// // // // // //                 }

// // // // // //                 return (
// // // // // //                   <Button
// // // // // //                     key={optionIndex}
// // // // // //                     variant="outline"
// // // // // //                     className={buttonClass}
// // // // // //                     onClick={() => !isAnswered && handleAnswer(optionIndex)}
// // // // // //                     disabled={isAnswered}
// // // // // //                   >
// // // // // //                     <span className="font-semibold mr-3 text-lg">{String.fromCharCode(65 + optionIndex)}.</span>
// // // // // //                     <span className="text-base">{option}</span>
// // // // // //                   </Button>
// // // // // //                 );
// // // // // //               })}
// // // // // //             </div>
// // // // // //           </Card>

// // // // // //           {/* Score Display */}
// // // // // //           <Card className="p-6 bg-gradient-card">
// // // // // //             <div className="flex justify-between items-center">
// // // // // //               <div>
// // // // // //                 <div className="text-sm text-muted-foreground">Your Score</div>
// // // // // //                 <div className="text-2xl font-bold">
// // // // // //                   {Object.keys(showResults).filter((qId) => {
// // // // // //                     const q = battleQuestions.find(bq => bq.questionID === parseInt(qId));
// // // // // //                     if (!q) return false;
// // // // // //                     const opts = getOptionsArray(q);
// // // // // //                     const selOpt = opts[selectedAnswers[parseInt(qId)]];
// // // // // //                     return selOpt === q.correctAnswer;
// // // // // //                   }).length} / {Object.keys(showResults).length}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <Button onClick={handleFinishGame} variant="outline">
// // // // // //                 End Battle
// // // // // //               </Button>
// // // // // //             </div>
// // // // // //           </Card>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-background pt-20 pb-16">
// // // // // //       <div className="container mx-auto px-4">
// // // // // //         {gameMode === 'menu' && (
// // // // // //           <>
// // // // // //             {/* Header */}
// // // // // //             <div className="text-center mb-12">
// // // // // //               <Badge variant="secondary" className="mb-4">
// // // // // //                 <Swords className="w-4 h-4 mr-2" />
// // // // // //                 Quiz Battle Arena
// // // // // //               </Badge>
// // // // // //               <h1 className="text-4xl md:text-5xl font-bold mb-6">
// // // // // //                 Battle Mode{' '}
// // // // // //                 <span className="bg-gradient-primary bg-clip-text text-transparent">
// // // // // //                   Activated
// // // // // //                 </span>
// // // // // //               </h1>
// // // // // //               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
// // // // // //                 Test your knowledge against other players in real-time quiz battles. 
// // // // // //                 First to answer correctly gets the points!
// // // // // //               </p>
// // // // // //             </div>

// // // // // //             {/* Player Stats */}
// // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// // // // // //               <Card className="p-6 text-center bg-gradient-card">
// // // // // //                 <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
// // // // // //                 <div className="text-2xl font-bold">1,847</div>
// // // // // //                 <div className="text-sm text-muted-foreground">Battle Points</div>
// // // // // //               </Card>
// // // // // //               <Card className="p-6 text-center bg-gradient-card">
// // // // // //                 <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
// // // // // //                 <div className="text-2xl font-bold">23</div>
// // // // // //                 <div className="text-sm text-muted-foreground">Victories</div>
// // // // // //               </Card>
// // // // // //               <Card className="p-6 text-center bg-gradient-card">
// // // // // //                 <Medal className="w-8 h-8 text-blue-500 mx-auto mb-2" />
// // // // // //                 <div className="text-2xl font-bold">87%</div>
// // // // // //                 <div className="text-sm text-muted-foreground">Win Rate</div>
// // // // // //               </Card>
// // // // // //             </div>

// // // // // //             {/* Battle Modes */}
// // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
// // // // // //               {battleModes.map((mode) => (
// // // // // //                 <Card 
// // // // // //                   key={mode.id} 
// // // // // //                   className="p-6 bg-gradient-card hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50 group"
// // // // // //                 >
// // // // // //                   <div className="text-center">
// // // // // //                     <div className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
// // // // // //                       <mode.icon className="w-8 h-8 text-white" />
// // // // // //                     </div>
                    
// // // // // //                     <h3 className="text-xl font-semibold mb-2">{mode.title}</h3>
// // // // // //                     <p className="text-muted-foreground mb-4">{mode.description}</p>
                    
// // // // // //                     <div className="space-y-2 text-sm text-muted-foreground mb-6">
// // // // // //                       <div className="flex justify-between">
// // // // // //                         <span>Players:</span>
// // // // // //                         <span>Up to {mode.maxPlayers}</span>
// // // // // //                       </div>
// // // // // //                       <div className="flex justify-between">
// // // // // //                         <span>Duration:</span>
// // // // // //                         <span>{mode.duration}</span>
// // // // // //                       </div>
// // // // // //                       <div className="flex justify-between">
// // // // // //                         <span>Questions:</span>
// // // // // //                         <span>{mode.questions}</span>
// // // // // //                       </div>
// // // // // //                     </div>
                    
// // // // // //                     {mode.id === 2 ? (
// // // // // //                       <div className="space-y-2">
// // // // // //                         <Button 
// // // // // //                           onClick={handleInvite}
// // // // // //                           className="w-full"
// // // // // //                         >
// // // // // //                           <Users className="w-4 h-4 mr-2" />
// // // // // //                           Invite Friends
// // // // // //                         </Button>
// // // // // //                         <Button 
// // // // // //                           onClick={handleJoinRequest}
// // // // // //                           variant="outline"
// // // // // //                           className="w-full"
// // // // // //                         >
// // // // // //                           Join Room
// // // // // //                         </Button>
// // // // // //                       </div>
// // // // // //                     ) : (
// // // // // //                       <Button 
// // // // // //                         onClick={() => handleStartGame(mode.id)}
// // // // // //                         className="w-full group-hover:bg-primary/90"
// // // // // //                       >
// // // // // //                         <Play className="w-4 h-4 mr-2" />
// // // // // //                         Start Battle
// // // // // //                       </Button>
// // // // // //                     )}
// // // // // //                   </div>
// // // // // //                 </Card>
// // // // // //               ))}
// // // // // //             </div>

// // // // // //           </>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Battle;









// // // // // import { useState, useEffect } from 'react';
// // // // // import { Card } from '@/components/ui/card';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { Badge } from '@/components/ui/badge';
// // // // // import { Progress } from '@/components/ui/progress';
// // // // // import { 
// // // // //   Trophy, 
// // // // //   Users, 
// // // // //   Zap, 
// // // // //   Clock, 
// // // // //   Target,
// // // // //   Swords,
// // // // //   Play,
// // // // //   CheckCircle2,
// // // // //   XCircle,
// // // // //   Medal,
// // // // // } from 'lucide-react';
// // // // // import { battleQuestions, Question } from '@/data/questions';
// // // // // import { BattleReport } from '@/components/reports/BattleReport';
// // // // // import { BattleLobby, JoinBattleLobby } from './BattleLobby';

// // // // // import {
// // // // //   connectBattleSocket,
// // // // //   sendJoinBattle,
// // // // //   sendAnswer,
// // // // //   disconnectBattleSocket
// // // // // } from '@/services/battleSocket';

// // // // // // // Helper to get options as array
// // // // // // const getOptionsArray = (q: Question): string[] => {
// // // // // //   return [q.option1, q.option2, q.option3, q.option4];
// // // // // // };

// // // // // // const battleModes = [
// // // // // //   {
// // // // // //     id: 1,
// // // // // //     title: 'Quick Battle',
// // // // // //     description: 'Jump into a match with random players',
// // // // // //     icon: Zap,
// // // // // //     color: 'bg-yellow-500',
// // // // // //     maxPlayers: 5,
// // // // // //     duration: '5 minutes',
// // // // // //     questions: 20,
// // // // // //   },
// // // // // //   {
// // // // // //     id: 2,
// // // // // //     title: 'Private Room',
// // // // // //     description: 'Create or join a room with friends',
// // // // // //     icon: Users,
// // // // // //     color: 'bg-blue-500',
// // // // // //     maxPlayers: 8,
// // // // // //     duration: '10 minutes',
// // // // // //     questions: 30,
// // // // // //   },
// // // // // // ];

// // // // // // const Battle = () => {
// // // // // //   const [gameMode, setGameMode] =
// // // // // //     useState<'menu' | 'lobby' | 'join' | 'game' | 'report'>('menu');

// // // // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // // // //   const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
// // // // // //   const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
// // // // // //   const [timeLeft, setTimeLeft] = useState(600);
// // // // // //   const [isGameActive, setIsGameActive] = useState(false);
// // // // // //   const [startTime, setStartTime] = useState<number>(0);
// // // // // //   const [roomCode, setRoomCode] = useState<string>('');
// // // // // //   const [isHost, setIsHost] = useState(false);
// // // // // //   const [selectedMode, setSelectedMode] = useState<number>(1);

// // // // // //   // 🔥 TEMP student id (later auth se aayega)
// // // // // //   const studentId = 101;

// // // // // //   const generateRoomCode = () => {
// // // // // //     return Math.random().toString(36).substring(2, 8).toUpperCase();
// // // // // //   };

// // // // // //   /* ---------------- TIMER ---------------- */
// // // // // //   useEffect(() => {
// // // // // //     if (isGameActive && timeLeft > 0) {
// // // // // //       const timer = setInterval(() => {
// // // // // //         setTimeLeft((prev) => prev - 1);
// // // // // //       }, 1000);
// // // // // //       return () => clearInterval(timer);
// // // // // //     } else if (timeLeft === 0 && isGameActive) {
// // // // // //       handleFinishGame();
// // // // // //     }
// // // // // //   }, [isGameActive, timeLeft]);

// // // // // //   /* ---------------- SOCKET CONNECT ---------------- */
// // // // // //   useEffect(() => {
// // // // // //     if (gameMode === 'lobby' && roomCode) {
// // // // // //       connectBattleSocket(roomCode, (data) => {
// // // // // //         console.log('📩 Battle WS update:', data);
// // // // // //         // future: player list, scores, start signal
// // // // // //       });

// // // // // //       sendJoinBattle(roomCode, studentId);
// // // // // //     }

// // // // // //     return () => {
// // // // // //       disconnectBattleSocket();
// // // // // //     };
// // // // // //   }, [gameMode, roomCode]);

// // // // // //   /* ---------------- HANDLERS ---------------- */
// // // // // //   const handleStartGame = (modeId: number) => {
// // // // // //     setSelectedMode(modeId);
// // // // // //     if (modeId === 2) {
// // // // // //       setGameMode('menu');
// // // // // //     } else {
// // // // // //       startBattle(modeId);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleInvite = () => {
// // // // // //     const code = generateRoomCode();
// // // // // //     setRoomCode(code);
// // // // // //     setIsHost(true);
// // // // // //     setGameMode('lobby');
// // // // // //   };

// // // // // //   const handleJoinRequest = () => {
// // // // // //     setIsHost(false);
// // // // // //     setGameMode('join');
// // // // // //   };

// // // // // //   const handleJoinWithCode = (code: string) => {
// // // // // //     setRoomCode(code);
// // // // // //     setIsHost(false);
// // // // // //     setGameMode('lobby');
// // // // // //   };

// // // // // //   const startBattle = (modeId: number) => {
// // // // // //     setGameMode('game');
// // // // // //     setIsGameActive(true);
// // // // // //     setCurrentQuestion(0);
// // // // // //     setSelectedAnswers({});
// // // // // //     setShowResults({});
// // // // // //     setTimeLeft(modeId === 2 ? 600 : 300);
// // // // // //     setStartTime(Date.now());
// // // // // //   };

// // // // // //   const handleAnswer = (answerIndex: number) => {
// // // // // //     const questionId = battleQuestions[currentQuestion].questionID;

// // // // // //     setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
// // // // // //     setShowResults({ ...showResults, [questionId]: true });

// // // // // //     // 🔥 SEND ANSWER TO BACKEND
// // // // // //     const answerChar = String.fromCharCode(65 + answerIndex);
// // // // // //     sendAnswer(roomCode, studentId, answerChar);

// // // // // //     setTimeout(() => {
// // // // // //       if (currentQuestion < battleQuestions.length - 1) {
// // // // // //         setCurrentQuestion(currentQuestion + 1);
// // // // // //       } else {
// // // // // //         handleFinishGame();
// // // // // //       }
// // // // // //     }, 1000);
// // // // // //   };

// // // // // //   const handleFinishGame = () => {
// // // // // //     setIsGameActive(false);
// // // // // //     setGameMode('report');
// // // // // //   };

// // // // // //   const formatTime = (seconds: number) => {
// // // // // //     const mins = Math.floor(seconds / 60);
// // // // // //     const secs = seconds % 60;
// // // // // //     return `${mins}:${secs.toString().padStart(2, '0')}`;
// // // // // //   };

// // // // // //   /* ---------------- LOBBY ---------------- */
// // // // // //   if (gameMode === 'lobby') {
// // // // // //     return (
// // // // // //       <BattleLobby
// // // // // //         roomCode={roomCode}
// // // // // //         onStart={() => startBattle(selectedMode)}
// // // // // //         onCancel={() => setGameMode('menu')}
// // // // // //         isHost={isHost}
// // // // // //       />
// // // // // //     );
// // // // // //   }
  
// // // // // //   if (gameMode === 'join') {
// // // // // //     return (
// // // // // //       <JoinBattleLobby
// // // // // //         onJoin={handleJoinWithCode}
// // // // // //         onCancel={() => setGameMode('menu')}
// // // // // //       />
// // // // // //     );
// // // // // //   }

// // // // // //   /* ---------------- REPORT ---------------- */
// // // // // //   if (gameMode === 'report') {
// // // // // //     const timeTaken = Math.floor((Date.now() - startTime) / 1000);
// // // // // //     return (
// // // // // //       <BattleReport
// // // // // //         questions={battleQuestions}
// // // // // //         selectedAnswers={selectedAnswers}
// // // // // //         timeTaken={timeTaken}
// // // // // //         totalQuestions={battleQuestions.length}
// // // // // //         onBack={() => setGameMode('menu')}
// // // // // //       />
// // // // // //     );
// // // // // //   }

// // // // // //   /* ---------------- GAME ---------------- */
// // // // // // if (gameMode === 'game') {
// // // // // //     // Guard against empty questions array
// // // // // //     if (!battleQuestions || battleQuestions.length === 0) {
// // // // // //       return (
// // // // // //         <div className="min-h-screen bg-background pt-20 pb-16">
// // // // // //           <div className="container mx-auto px-4 text-center">
// // // // // //             <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
// // // // // //             <p className="text-muted-foreground mb-6">Battle questions are not loaded yet.</p>
// // // // // //             <Button onClick={() => setGameMode('menu')}>Back to Menu</Button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       );
// // // // // //     }
// // // // // // ... existing imports
// // // // // const Battle = () => {
// // // // //   const [gameMode, setGameMode] =
// // // // //     useState<'menu' | 'lobby' | 'join' | 'game' | 'report'>('menu');

// // // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // // //   const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
// // // // //   const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
// // // // //   const [timeLeft, setTimeLeft] = useState(600);
// // // // //   const [isGameActive, setIsGameActive] = useState(false);
// // // // //   const [startTime, setStartTime] = useState<number>(0);
// // // // //   const [roomCode, setRoomCode] = useState<string>('');
// // // // //   const [isHost, setIsHost] = useState(false);
// // // // //   const [selectedMode, setSelectedMode] = useState<number>(1);
  
// // // // //   // 🔥 MINIMAL CHANGES: Added states for syncing
// // // // //   const [players, setPlayers] = useState<number[]>([]); 
// // // // //   const [dbQuestions, setDbQuestions] = useState<Question[]>([]);

// // // // //   const studentId = 101;

// // // // //   // ... generateRoomCode and Timer useEffect remain exactly the same

// // // // //   /* ---------------- SOCKET CONNECT ---------------- */
// // // // //   useEffect(() => {
// // // // //     if (gameMode === 'lobby' && roomCode) {
// // // // //       connectBattleSocket(roomCode, (data) => {
// // // // //         console.log('📩 Battle WS update:', data);
        
// // // // //         // 🔥 MINIMAL CHANGES: Handle sync data
// // // // //         if (data === 'START') {
// // // // //           startBattle(selectedMode);
// // // // //         } else if (data.battleCode) {
// // // // //           // Sync players and questions from the room object
// // // // //           setPlayers(data.players || []);
// // // // //           if (data.questions) setDbQuestions(data.questions);
// // // // //         }
// // // // //       });

// // // // //       sendJoinBattle(roomCode, studentId);
// // // // //     }

// // // // //     return () => {
// // // // //       disconnectBattleSocket();
// // // // //     };
// // // // //   }, [gameMode, roomCode]);

// // // // //   /* ---------------- HANDLERS ---------------- */
// // // // //   // 🔥 MINIMAL CHANGES: Fetch room from DB for private rooms
// // // // //   const handleStartGame = async (modeId: number) => {
// // // // //     setSelectedMode(modeId);
// // // // //     if (modeId === 2) {
// // // // //       setGameMode('menu'); // Private Room flow
// // // // //     } else {
// // // // //       startBattle(modeId);
// // // // //     }
// // // // //   };

// // // // //   const handleInvite = async () => {
// // // // //     // 🔥 MINIMAL CHANGES: Create room in DB first
// // // // //     try {
// // // // //       const response = await fetch(`http://localhost:8080/api/battle/create/${studentId}`, { method: 'POST' });
// // // // //       const code = await response.text();
// // // // //       setRoomCode(code);
// // // // //       setIsHost(true);
// // // // //       setGameMode('lobby');
// // // // //     } catch (error) {
// // // // //       console.error("Failed to create battle", error);
// // // // //     }
// // // // //   };

// // // // //   // handleJoinRequest and handleJoinWithCode remain the same

// // // // //   const startBattle = (modeId: number) => {
// // // // //     setGameMode('game');
// // // // //     setIsGameActive(true);
// // // // //     setCurrentQuestion(0);
// // // // //     setSelectedAnswers({});
// // // // //     setShowResults({});
// // // // //     setTimeLeft(modeId === 2 ? 600 : 300);
// // // // //     setStartTime(Date.now());
// // // // //   };

// // // // //   // 🔥 MINIMAL CHANGES: Use dbQuestions if available, else fallback
// // // // //   const currentQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;

// // // // //   const handleAnswer = (answerIndex: number) => {
// // // // //     const questionId = currentQuestions[currentQuestion].questionID; // Changed to currentQuestions

// // // // //     setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
// // // // //     setShowResults({ ...showResults, [questionId]: true });

// // // // //     const answerChar = String.fromCharCode(65 + answerIndex);
// // // // //     sendAnswer(roomCode, studentId, answerChar);

// // // // //     setTimeout(() => {
// // // // //       if (currentQuestion < currentQuestions.length - 1) {
// // // // //         setCurrentQuestion(currentQuestion + 1);
// // // // //       } else {
// // // // //         handleFinishGame();
// // // // //       }
// // // // //     }, 1000);
// // // // //   };

// // // // //   // ... handleFinishGame and formatTime remain the same

// // // // //   /* ---------------- LOBBY ---------------- */
// // // // //   if (gameMode === 'lobby') {
// // // // //     return (
// // // // //       <BattleLobby
// // // // //         roomCode={roomCode}
// // // // //         // 🔥 MINIMAL CHANGES: Call backend start so everyone syncs
// // // // //         onStart={() => {
// // // // //           fetch(`http://localhost:8080/api/battle/start/${roomCode}/${studentId}`, { method: 'POST' });
// // // // //         }}
// // // // //         onCancel={() => setGameMode('menu')}
// // // // //         isHost={isHost}
// // // // //         players={players} // Pass live players
// // // // //       />
// // // // //     );
// // // // //   }

// // // // //   // ... join and report modes remain the same (just ensure currentQuestions is used in Report)

// // // // //   /* ---------------- GAME ---------------- */

// // // // //   if (gameMode === 'game') {
// // // // //     if (!currentQuestions || currentQuestions.length === 0) {
// // // // //       return (
// // // // //         <div className="min-h-screen bg-background pt-20 pb-16">
// // // // //           <div className="container mx-auto px-4 text-center">
// // // // //             <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
// // // // //             <Button onClick={() => setGameMode('menu')}>Back to Menu</Button>
// // // // //           </div>
// // // // //         </div>
// // // // //       );
// // // // //     }

// // // // //     const question = currentQuestions[currentQuestion]; // ✅ Changed from battleQuestions
// // // // //     if (!question) {
// // // // //       handleFinishGame();
// // // // //       return null;
// // // // //     }
    
// // // // //     const questionId = question.questionID;
// // // // //     const options = getOptionsArray(question);
// // // // //     const isAnswered = showResults[questionId];
// // // // //     const selectedAnswer = selectedAnswers[questionId];
// // // // //     const selectedOptionText = selectedAnswer !== undefined ? options[selectedAnswer] : null;
// // // // //     const isCorrect = selectedOptionText === question.correctAnswer;

// // // // //     return (
// // // // //       <div className="min-h-screen bg-background pt-20 pb-16">
// // // // //         <div className="container mx-auto px-4 max-w-4xl">
// // // // //           <div className="flex justify-between items-center mb-8">
// // // // //             <div>
// // // // //               <Badge variant="secondary" className="mb-2">
// // // // //                 <Swords className="w-4 h-4 mr-2" />
// // // // //                 Quiz Battle
// // // // //               </Badge>
// // // // //               {/* ✅ Changed to currentQuestions.length */}
// // // // //               <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {currentQuestions.length}</h2>
// // // // //             </div>
// // // // //             <Card className="p-4 bg-gradient-card">
// // // // //               <div className="flex items-center gap-2">
// // // // //                 <Clock className="w-5 h-5 text-primary" />
// // // // //                 <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
// // // // //               </div>
// // // // //             </Card>
// // // // //           </div>

// // // // //           {/* ✅ Changed to currentQuestions.length */}
// // // // //           <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2 mb-8" />

// // // // //           {/* Question Card part remains same, just ensure it uses 'question' variable from above */}
          
// // // // //           {/* ... score display card ... */}
// // // // //           <Card className="p-6 bg-gradient-card">
// // // // //             <div className="flex justify-between items-center">
// // // // //               <div>
// // // // //                 <div className="text-sm text-muted-foreground">Your Score</div>
// // // // //                 <div className="text-2xl font-bold">
// // // // //                   {Object.keys(showResults).filter((qId) => {
// // // // //                     // ✅ Changed to search in currentQuestions
// // // // //                     const q = currentQuestions.find(bq => bq.questionID === parseInt(qId));
// // // // //                     if (!q) return false;
// // // // //                     const opts = getOptionsArray(q);
// // // // //                     const selOpt = opts[selectedAnswers[parseInt(qId)]];
// // // // //                     return selOpt === q.correctAnswer;
// // // // //                   }).length} / {Object.keys(showResults).length}
// // // // //                 </div>
// // // // //               </div>
// // // // //               <Button onClick={handleFinishGame} variant="outline">
// // // // //                 End Battle
// // // // //               </Button>
// // // // //             </div>
// // // // //           </Card>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }
// // // // //   // if (gameMode === 'game') {
// // // // //   //   if (!currentQuestions || currentQuestions.length === 0) {
// // // // //   //     return (
// // // // //   //       <div className="min-h-screen bg-background pt-20 pb-16">
// // // // //   //         <div className="container mx-auto px-4 text-center">
// // // // //   //           <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
// // // // //   //           <Button onClick={() => setGameMode('menu')}>Back to Menu</Button>
// // // // //   //         </div>
// // // // //   //       </div>
// // // // //   //     );
// // // // //   //   }
// // // // //   //   // ... Rest of the game UI logic remains exactly as you wrote it
// // // // //   //   const question = battleQuestions[currentQuestion];
// // // // //   //   if (!question) {
// // // // //   //     handleFinishGame();
// // // // //   //     return null;
// // // // //   //   }
    
// // // // //   //   const questionId = question.questionID;
// // // // //   //   const options = getOptionsArray(question);
// // // // //   //   const isAnswered = showResults[questionId];
// // // // //   //   const selectedAnswer = selectedAnswers[questionId];
// // // // //   //   // Check if selected option text matches correctAnswer
// // // // //   //   const selectedOptionText = selectedAnswer !== undefined ? options[selectedAnswer] : null;
// // // // //   //   const isCorrect = selectedOptionText === question.correctAnswer;

// // // // //   //   return (
// // // // //   //     <div className="min-h-screen bg-background pt-20 pb-16">
// // // // //   //       <div className="container mx-auto px-4 max-w-4xl">
// // // // //   //         {/* Battle Header */}
// // // // //   //         <div className="flex justify-between items-center mb-8">
// // // // //   //           <div>
// // // // //   //             <Badge variant="secondary" className="mb-2">
// // // // //   //               <Swords className="w-4 h-4 mr-2" />
// // // // //   //               Quiz Battle
// // // // //   //             </Badge>
// // // // //   //             <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {battleQuestions.length}</h2>
// // // // //   //           </div>
// // // // //   //           <Card className="p-4 bg-gradient-card">
// // // // //   //             <div className="flex items-center gap-2">
// // // // //   //               <Clock className="w-5 h-5 text-primary" />
// // // // //   //               <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
// // // // //   //             </div>
// // // // //   //           </Card>
// // // // //   //         </div>

// // // // //   //         {/* Progress */}
// // // // //   //         <Progress value={((currentQuestion + 1) / battleQuestions.length) * 100} className="h-2 mb-8" />

// // // // //   //         {/* Question Card */}
// // // // //   //         <Card className="p-8 bg-gradient-card mb-6">
// // // // //   //           <div className="flex items-start gap-4 mb-6">
// // // // //   //             <Badge variant="outline" className="text-lg px-3 py-1">
// // // // //   //               {currentQuestion + 1}
// // // // //   //             </Badge>
// // // // //   //             <h2 className="text-2xl font-semibold flex-1">{question.questionText}</h2>
// // // // //   //             {isAnswered && (
// // // // //   //               isCorrect ? (
// // // // //   //                 <CheckCircle2 className="w-8 h-8 text-green-500" />
// // // // //   //               ) : (
// // // // //   //                 <XCircle className="w-8 h-8 text-red-500" />
// // // // //   //               )
// // // // //   //             )}
// // // // //   //           </div>

// // // // //   //           <div className="space-y-3">
// // // // //   //             {options.map((option, optionIndex) => {
// // // // //   //               const isSelected = selectedAnswer === optionIndex;
// // // // //   //               const isCorrectOption = option === question.correctAnswer;
                
// // // // //   //               let buttonClass = "justify-start text-left h-auto py-4 px-4 ";
// // // // //   //               if (isAnswered) {
// // // // //   //                 if (isCorrectOption) {
// // // // //   //                   buttonClass += "border-green-500 bg-green-500/10";
// // // // //   //                 } else if (isSelected && !isCorrect) {
// // // // //   //                   buttonClass += "border-red-500 bg-red-500/10";
// // // // //   //                 }
// // // // //   //               } else if (isSelected) {
// // // // //   //                 buttonClass += "border-primary bg-primary/10";
// // // // //   //               }

// // // // //   //               return (
// // // // //   //                 <Button
// // // // //   //                   key={optionIndex}
// // // // //   //                   variant="outline"
// // // // //   //                   className={buttonClass}
// // // // //   //                   onClick={() => !isAnswered && handleAnswer(optionIndex)}
// // // // //   //                   disabled={isAnswered}
// // // // //   //                 >
// // // // //   //                   <span className="font-semibold mr-3 text-lg">{String.fromCharCode(65 + optionIndex)}.</span>
// // // // //   //                   <span className="text-base">{option}</span>
// // // // //   //                 </Button>
// // // // //   //               );
// // // // //   //             })}
// // // // //   //           </div>
// // // // //   //         </Card>

// // // // //   //         {/* Score Display */}
// // // // //   //         <Card className="p-6 bg-gradient-card">
// // // // //   //           <div className="flex justify-between items-center">
// // // // //   //             <div>
// // // // //   //               <div className="text-sm text-muted-foreground">Your Score</div>
// // // // //   //               <div className="text-2xl font-bold">
// // // // //   //                 {Object.keys(showResults).filter((qId) => {
// // // // //   //                   const q = battleQuestions.find(bq => bq.questionID === parseInt(qId));
// // // // //   //                   if (!q) return false;
// // // // //   //                   const opts = getOptionsArray(q);
// // // // //   //                   const selOpt = opts[selectedAnswers[parseInt(qId)]];
// // // // //   //                   return selOpt === q.correctAnswer;
// // // // //   //                 }).length} / {Object.keys(showResults).length}
// // // // //   //               </div>
// // // // //   //             </div>
// // // // //   //             <Button onClick={handleFinishGame} variant="outline">
// // // // //   //               End Battle
// // // // //   //             </Button>
// // // // //   //           </div>
// // // // //   //         </Card>
// // // // //   //       </div>
// // // // //   //     </div>
// // // // //   //   );
// // // // //   // }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-background pt-20 pb-16">
// // // // //       <div className="container mx-auto px-4">
// // // // //         {gameMode === 'menu' && (
// // // // //           <>
// // // // //             {/* Header */}
// // // // //             <div className="text-center mb-12">
// // // // //               <Badge variant="secondary" className="mb-4">
// // // // //                 <Swords className="w-4 h-4 mr-2" />
// // // // //                 Quiz Battle Arena
// // // // //               </Badge>
// // // // //               <h1 className="text-4xl md:text-5xl font-bold mb-6">
// // // // //                 Battle Mode{' '}
// // // // //                 <span className="bg-gradient-primary bg-clip-text text-transparent">
// // // // //                   Activated
// // // // //                 </span>
// // // // //               </h1>
// // // // //               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
// // // // //                 Test your knowledge against other players in real-time quiz battles. 
// // // // //                 First to answer correctly gets the points!
// // // // //               </p>
// // // // //             </div>

// // // // //             {/* Player Stats */}
// // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// // // // //               <Card className="p-6 text-center bg-gradient-card">
// // // // //                 <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
// // // // //                 <div className="text-2xl font-bold">1,847</div>
// // // // //                 <div className="text-sm text-muted-foreground">Battle Points</div>
// // // // //               </Card>
// // // // //               <Card className="p-6 text-center bg-gradient-card">
// // // // //                 <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
// // // // //                 <div className="text-2xl font-bold">23</div>
// // // // //                 <div className="text-sm text-muted-foreground">Victories</div>
// // // // //               </Card>
// // // // //               <Card className="p-6 text-center bg-gradient-card">
// // // // //                 <Medal className="w-8 h-8 text-blue-500 mx-auto mb-2" />
// // // // //                 <div className="text-2xl font-bold">87%</div>
// // // // //                 <div className="text-sm text-muted-foreground">Win Rate</div>
// // // // //               </Card>
// // // // //             </div>

// // // // //             {/* Battle Modes */}
// // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
// // // // //               {battleModes.map((mode) => (
// // // // //                 <Card 
// // // // //                   key={mode.id} 
// // // // //                   className="p-6 bg-gradient-card hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50 group"
// // // // //                 >
// // // // //                   <div className="text-center">
// // // // //                     <div className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
// // // // //                       <mode.icon className="w-8 h-8 text-white" />
// // // // //                     </div>
                    
// // // // //                     <h3 className="text-xl font-semibold mb-2">{mode.title}</h3>
// // // // //                     <p className="text-muted-foreground mb-4">{mode.description}</p>
                    
// // // // //                     <div className="space-y-2 text-sm text-muted-foreground mb-6">
// // // // //                       <div className="flex justify-between">
// // // // //                         <span>Players:</span>
// // // // //                         <span>Up to {mode.maxPlayers}</span>
// // // // //                       </div>
// // // // //                       <div className="flex justify-between">
// // // // //                         <span>Duration:</span>
// // // // //                         <span>{mode.duration}</span>
// // // // //                       </div>
// // // // //                       <div className="flex justify-between">
// // // // //                         <span>Questions:</span>
// // // // //                         <span>{mode.questions}</span>
// // // // //                       </div>
// // // // //                     </div>
                    
// // // // //                     {mode.id === 2 ? (
// // // // //                       <div className="space-y-2">
// // // // //                         <Button 
// // // // //                           onClick={handleInvite}
// // // // //                           className="w-full"
// // // // //                         >
// // // // //                           <Users className="w-4 h-4 mr-2" />
// // // // //                           Invite Friends
// // // // //                         </Button>
// // // // //                         <Button 
// // // // //                           onClick={handleJoinRequest}
// // // // //                           variant="outline"
// // // // //                           className="w-full"
// // // // //                         >
// // // // //                           Join Room
// // // // //                         </Button>
// // // // //                       </div>
// // // // //                     ) : (
// // // // //                       <Button 
// // // // //                         onClick={() => handleStartGame(mode.id)}
// // // // //                         className="w-full group-hover:bg-primary/90"
// // // // //                       >
// // // // //                         <Play className="w-4 h-4 mr-2" />
// // // // //                         Start Battle
// // // // //                       </Button>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </Card>
// // // // //               ))}
// // // // //             </div>

// // // // //           </>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Battle;























// // // // import { useState, useEffect } from 'react';
// // // // import { Card } from '@/components/ui/card';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Badge } from '@/components/ui/badge';
// // // // import { Progress } from '@/components/ui/progress';
// // // // import { 
// // // //   Trophy, Users, Zap, Clock, Target, Swords, Play, 
// // // //   CheckCircle2, XCircle, Medal 
// // // // } from 'lucide-react';
// // // // import { battleQuestions, Question } from '@/data/questions';
// // // // import { BattleReport } from '@/components/reports/BattleReport';
// // // // import { BattleLobby, JoinBattleLobby } from './BattleLobby';

// // // // import {
// // // //   connectBattleSocket,
// // // //   sendJoinBattle,
// // // //   sendAnswer,
// // // //   disconnectBattleSocket
// // // // } from '@/services/battleSocket';

// // // // const getOptionsArray = (q: Question): string[] => {
// // // //   return [q.option1, q.option2, q.option3, q.option4];
// // // // };

// // // // const battleModes = [
// // // //   { id: 1, title: 'Quick Battle', description: 'Jump into a match with random players', icon: Zap, color: 'bg-yellow-500', maxPlayers: 5, duration: '5 minutes', questions: 20 },
// // // //   { id: 2, title: 'Private Room', description: 'Create or join a room with friends', icon: Users, color: 'bg-blue-500', maxPlayers: 8, duration: '10 minutes', questions: 30 },
// // // // ];

// // // // const Battle = () => {
// // // //   const [gameMode, setGameMode] = useState<'menu' | 'lobby' | 'join' | 'game' | 'report'>('menu');
// // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // //   const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
// // // //   const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
// // // //   const [timeLeft, setTimeLeft] = useState(600);
// // // //   const [isGameActive, setIsGameActive] = useState(false);
// // // //   const [startTime, setStartTime] = useState<number>(0);
// // // //   const [roomCode, setRoomCode] = useState<string>('');
// // // //   const [isHost, setIsHost] = useState(false);
// // // //   const [selectedMode, setSelectedMode] = useState<number>(1);
// // // //   const [players, setPlayers] = useState<number[]>([]); 
// // // //   const [dbQuestions, setDbQuestions] = useState<Question[]>([]);

// // // //   const studentId = 101;

// // // //   useEffect(() => {
// // // //     if (isGameActive && timeLeft > 0) {
// // // //       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
// // // //       return () => clearInterval(timer);
// // // //     } else if (timeLeft === 0 && isGameActive) {
// // // //       handleFinishGame();
// // // //     }
// // // //   }, [isGameActive, timeLeft]);

// // // //   useEffect(() => {
// // // //     if (gameMode === 'lobby' && roomCode) {
// // // //       connectBattleSocket(roomCode, (data) => {
// // // //         if (data === 'START') {
// // // //           startBattle(selectedMode);
// // // //         } else if (data.battleCode) {
// // // //           setPlayers(data.players || []);
// // // //           if (data.questions) setDbQuestions(data.questions);
// // // //         }
// // // //       });
// // // //       sendJoinBattle(roomCode, studentId);
// // // //     }
// // // //     return () => disconnectBattleSocket();
// // // //   }, [gameMode, roomCode]);

// // // //   const handleInvite = async () => {
// // // //     try {
// // // //       const response = await fetch(`http://localhost:8080/api/battle/create`, { method: 'POST' });
// // // //       const code = await response.text();
// // // //       setRoomCode(code);
// // // //       setIsHost(true);
// // // //       setGameMode('lobby');
// // // //     } catch (error) { console.error(error); }
// // // //   };

// // // //   const handleJoinWithCode = (code: string) => {
// // // //     setRoomCode(code);
// // // //     setIsHost(false);
// // // //     setGameMode('lobby');
// // // //   };

// // // //   const startBattle = (modeId: number) => {
// // // //     setGameMode('game');
// // // //     setIsGameActive(true);
// // // //     setCurrentQuestion(0);
// // // //     setSelectedAnswers({});
// // // //     setShowResults({});
// // // //     setTimeLeft(modeId === 2 ? 600 : 300);
// // // //     setStartTime(Date.now());
// // // //   };

// // // //   const currentQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;

// // // //   const handleAnswer = (answerIndex: number) => {
// // // //     const questionId = currentQuestions[currentQuestion].questionID;
// // // //     setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
// // // //     setShowResults({ ...showResults, [questionId]: true });
// // // //     sendAnswer(roomCode, studentId, String.fromCharCode(65 + answerIndex));

// // // //     setTimeout(() => {
// // // //       if (currentQuestion < currentQuestions.length - 1) {
// // // //         setCurrentQuestion(currentQuestion + 1);
// // // //       } else {
// // // //         handleFinishGame();
// // // //       }
// // // //     }, 1000);
// // // //   };
// // // //   /* --- Battle.tsx ke andar handleInvite ya onStart ke paas --- */

// // // // const createBattleEntry = async (playerId: number) => {
// // // //   try {
// // // //     const battleData = {
// // // //       quizNumber: 1, // Aapka room logic
// // // //       playerNumber: playerId, 
// // // //       studentId: playerId,
// // // //       quizScore: 0,
// // // //       status: "LIVE"
// // // //     };

// // // //     const response = await fetch('http://localhost:8080/api/quiz-battles', {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify(battleData)
// // // //     });
    
// // // //     if (response.ok) console.log(`✅ Entry created for player ${playerId}`);
// // // //   } catch (error) {
// // // //     console.error("❌ DB Entry Failed:", error);
// // // //   }
// // // // };
// // // //   //const handleFinishGame = () => { setIsGameActive(false); setGameMode('report'); };
// // // //   /* --- Battle.tsx handleFinishGame ke andar --- */

// // // // const handleFinishGame = async () => {
// // // //   setIsGameActive(false);
// // // //   setGameMode('report');

// // // //   // 🔥 Final Score calculation
// // // //   const finalScore = Object.keys(showResults).filter((qId) => {
// // // //       const q = currentQuestions.find(bq => bq.questionID === parseInt(qId));
// // // //       return q && getOptionsArray(q)[selectedAnswers[parseInt(qId)]] === q.correctAnswer;
// // // //   }).length * 10; // 10 points per question

// // // //   // Match end hone par final record save karein
// // // //   const finalData = {
// // // //       quizNumber: 1, 
// // // //       playerNumber: studentId,
// // // //       studentId: studentId,
// // // //       quizScore: finalScore,
// // // //       status: "COMPLETED"
// // // //   };

// // // //   await fetch('http://localhost:8080/api/quiz-battles', {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify(finalData)
// // // //   });
// // // // };
// // // //   const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

// // // //   if (gameMode === 'lobby') return <BattleLobby roomCode={roomCode} onStart={() => fetch(`http://localhost:8080/api/battle/start/${roomCode}/${studentId}`, { method: 'POST' })} onCancel={() => setGameMode('menu')} isHost={isHost} players={players} />;
// // // //   if (gameMode === 'join') return <JoinBattleLobby onJoin={handleJoinWithCode} onCancel={() => setGameMode('menu')} />;
// // // //   if (gameMode === 'report') return <BattleReport questions={currentQuestions} selectedAnswers={selectedAnswers} timeTaken={Math.floor((Date.now() - startTime) / 1000)} totalQuestions={currentQuestions.length} onBack={() => setGameMode('menu')} />;

// // // //   if (gameMode === 'game') {
// // // //     const question = currentQuestions[currentQuestion];
// // // //     if (!question) return null;
// // // //     const options = getOptionsArray(question);
// // // //     const isAnswered = showResults[question.questionID];
// // // //     const isCorrect = options[selectedAnswers[question.questionID]] === question.correctAnswer;

// // // //     return (
// // // //       <div className="min-h-screen bg-background pt-20 pb-16">
// // // //         <div className="container mx-auto px-4 max-w-4xl">
// // // //           <div className="flex justify-between items-center mb-8">
// // // //             <div>
// // // //               <Badge variant="secondary" className="mb-2"><Swords className="w-4 h-4 mr-2" />Quiz Battle</Badge>
// // // //               <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {currentQuestions.length}</h2>
// // // //             </div>
// // // //             <Card className="p-4 bg-gradient-card">
// // // //               <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{formatTime(timeLeft)}</span></div>
// // // //             </Card>
// // // //           </div>
// // // //           <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2 mb-8" />
// // // //           <Card className="p-8 bg-gradient-card mb-6">
// // // //             <div className="flex items-start gap-4 mb-6">
// // // //               <Badge variant="outline" className="text-lg px-3 py-1">{currentQuestion + 1}</Badge>
// // // //               <h2 className="text-2xl font-semibold flex-1">{question.questionText}</h2>
// // // //               {isAnswered && (isCorrect ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <XCircle className="w-8 h-8 text-red-500" />)}
// // // //             </div>
// // // //             <div className="space-y-3">
// // // //               {options.map((option, idx) => (
// // // //                 <Button key={idx} variant="outline" className={`justify-start text-left h-auto py-4 px-4 ${isAnswered ? (option === question.correctAnswer ? "border-green-500 bg-green-500/10" : (selectedAnswers[question.questionID] === idx ? "border-red-500 bg-red-500/10" : "")) : ""}`} onClick={() => !isAnswered && handleAnswer(idx)} disabled={isAnswered}>
// // // //                   <span className="font-semibold mr-3 text-lg">{String.fromCharCode(65 + idx)}.</span><span className="text-base">{option}</span>
// // // //                 </Button>
// // // //               ))}
// // // //             </div>
// // // //           </Card>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-background pt-20 pb-16">
// // // //       <div className="container mx-auto px-4">
// // // //         {gameMode === 'menu' && (
// // // //           <div className="text-center">
// // // //             <Badge variant="secondary" className="mb-4"><Swords className="w-4 h-4 mr-2" />Quiz Battle Arena</Badge>
// // // //             <h1 className="text-4xl font-bold mb-6">Battle Mode <span className="bg-gradient-primary bg-clip-text text-transparent">Activated</span></h1>
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
// // // //               {battleModes.map((mode) => (
// // // //                 <Card key={mode.id} className="p-6 bg-gradient-card group hover:border-primary/50 transition-all">
// // // //                   <div className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4`}><mode.icon className="w-8 h-8 text-white" /></div>
// // // //                   <h3 className="text-xl font-semibold mb-4">{mode.title}</h3>
// // // //                   {mode.id === 2 ? (
// // // //                     <div className="space-y-2">
// // // //                       <Button onClick={handleInvite} className="w-full"><Users className="w-4 h-4 mr-2" />Invite Friends</Button>
// // // //                       <Button onClick={() => setGameMode('join')} variant="outline" className="w-full">Join Room</Button>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <Button onClick={() => startBattle(mode.id)} className="w-full">Start Battle</Button>
// // // //                   )}
// // // //                 </Card>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Battle;


// // // import { useState, useEffect } from 'react';
// // // import { Card } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Badge } from '@/components/ui/badge';
// // // import { Progress } from '@/components/ui/progress';
// // // import { 
// // //   Trophy, Users, Zap, Clock, Target, Swords, Play, 
// // //   CheckCircle2, XCircle, Medal 
// // // } from 'lucide-react';
// // // import { battleQuestions, Question } from '@/data/questions';
// // // import { BattleReport } from '@/components/reports/BattleReport';
// // // import { BattleLobby, JoinBattleLobby } from './BattleLobby';

// // // import {
// // //   connectBattleSocket,
// // //   sendJoinBattle,
// // //   sendAnswer,
// // //   disconnectBattleSocket
// // // } from '@/services/battleSocket';

// // // const getOptionsArray = (q: Question): string[] => {
// // //   return [q.option1, q.option2, q.option3, q.option4];
// // // };

// // // const battleModes = [
// // //   { id: 1, title: 'Quick Battle', description: 'Jump into a match with random players', icon: Zap, color: 'bg-yellow-500', maxPlayers: 5, duration: '5 minutes', questions: 20 },
// // //   { id: 2, title: 'Private Room', description: 'Create or join a room with friends', icon: Users, color: 'bg-blue-500', maxPlayers: 8, duration: '10 minutes', questions: 30 },
// // // ];
// // // const Battle = () => {
// // //   // ... existing states
// // //    const [gameMode, setGameMode] = useState<'menu' | 'lobby' | 'join' | 'game' | 'report'>('menu');
// // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // //   const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
// // //   const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
// // //   const [timeLeft, setTimeLeft] = useState(600);
// // //   const [isGameActive, setIsGameActive] = useState(false);
// // //   const [startTime, setStartTime] = useState<number>(0);
// // //   const [roomCode, setRoomCode] = useState<string>('');
// // //   const [isHost, setIsHost] = useState(false);
// // //   const [selectedMode, setSelectedMode] = useState<number>(1);
// // //   const [players, setPlayers] = useState<number[]>([]); 
// // //   const [dbQuestions, setDbQuestions] = useState<Question[]>([]);

// // //   const studentId = 101; 
// // //   const currentQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;
// // //   /* ---------------- API CALLS (SYNCED WITH CONTROLLER) ---------------- */

// // //   const createBattleEntry = async (playerId: number, status: string = "LIVE", score: number = 0) => {
// // //     try {
// // //       const battleData = {
// // //         quizNumber: 1, 
// // //         playerNumber: playerId, 
// // //         studentId: playerId, // Backend DTO expects this to map to Student entity
// // //         quizScore: score,
// // //         status: status
// // //       };

// // //       // ✅ URL changed to match @RequestMapping("/api/battle") + @PostMapping("/create")
// // //       const response = await fetch('http://localhost:8080/api/battle/create', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(battleData)
// // //       });
      
// // //       if (response.ok) {
// // //           console.log(`✅ DB Entry (${status}) saved for player ${playerId}`);
// // //       } else {
// // //           console.error("❌ Backend rejected the entry. Check DTO/Entity mapping.");
// // //       }
// // //     } catch (error) {
// // //       console.error("❌ DB Connection Failed:", error);
// // //     }
// // //   };

// // //   const handleFinishGame = async () => {
// // //     setIsGameActive(false);
// // //     setGameMode('report');

// // //     const finalScore = Object.keys(showResults).filter((qId) => {
// // //         const q = currentQuestions.find(bq => bq.questionID === parseInt(qId));
// // //         return q && getOptionsArray(q)[selectedAnswers[parseInt(qId)]] === q.correctAnswer;
// // //     }).length * 10;

// // //     // ✅ Save final result to DB on game finish
// // //     await createBattleEntry(studentId, "COMPLETED", finalScore);
// // //   };

// // //   /* ---------------- HANDLERS (SYNCED WITH ROOM LOGIC) ---------------- */

// // //   const handleInvite = async () => {
// // //     try {
// // //       // Step 1: Create room in RAM (assuming BattleController is also under /api/battle)
// // //       // Note: If your BattleManager room create is also /api/battle/create, 
// // //       // ensure it returns a String code and not a DTO, otherwise use a different path.
// // //       const response = await fetch(`http://localhost:8080/api/battle/create/${studentId}`, { method: 'POST' }); 
// // //       const code = await response.text();
      
// // //       setRoomCode(code);
// // //       setIsHost(true);
// // //       setGameMode('lobby');
      
// // //       // Step 2: Create initial DB record for Host
// // //       await createBattleEntry(studentId); 
// // //     } catch (error) { console.error("Invite Error:", error); }
// // //   };

// // //   const handleJoinWithCode = async (code: string) => {
// // //     try {
// // //         // Step 1: Join Room in RAM
// // //         await fetch(`http://localhost:8080/api/battle/join/${code}/${studentId}`, { method: 'POST' });
        
// // //         setRoomCode(code);
// // //         setIsHost(false);
// // //         setGameMode('lobby');
        
// // //         // Step 2: Create initial DB record for Joiner
// // //         await createBattleEntry(studentId);
// // //     } catch (error) {
// // //         console.error("Join Error:", error);
// // //     }
// // //   };

// // //   // ... (startBattle, currentQuestions, handleAnswer functions remain the same)

// // //   /* ---------------- RENDERING ---------------- */

// // //   if (gameMode === 'lobby') {
// // //     return (
// // //       <BattleLobby 
// // //         roomCode={roomCode} 
// // //         onStart={() => fetch(`http://localhost:8080/api/battle/start/${roomCode}/${studentId}`, { method: 'POST' })} 
// // //         onCancel={() => setGameMode('menu')} 
// // //         isHost={isHost} 
// // //         players={players} 
// // //       />
// // //     );
// // //   }
// // // // const Battle = () => {
// // //   // const [gameMode, setGameMode] = useState<'menu' | 'lobby' | 'join' | 'game' | 'report'>('menu');
// // //   // const [currentQuestion, setCurrentQuestion] = useState(0);
// // //   // const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
// // //   // const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
// // //   // const [timeLeft, setTimeLeft] = useState(600);
// // //   // const [isGameActive, setIsGameActive] = useState(false);
// // //   // const [startTime, setStartTime] = useState<number>(0);
// // //   // const [roomCode, setRoomCode] = useState<string>('');
// // //   // const [isHost, setIsHost] = useState(false);
// // //   // const [selectedMode, setSelectedMode] = useState<number>(1);
// // //   // const [players, setPlayers] = useState<number[]>([]); 
// // //   // const [dbQuestions, setDbQuestions] = useState<Question[]>([]);

// // //   // const studentId = 101; // 🔥 Isko Dynamic rakhna auth se

// // // //   // --- API CALLS SYNCED WITH BACKEND ---

// // // //   const createBattleEntry = async (playerId: number, status: string = "LIVE", score: number = 0) => {
// // // //     try {
// // // //       const battleData = {
// // // //         quizNumber: 1, 
// // // //         playerNumber: playerId, 
// // // //         studentId: playerId,
// // // //         quizScore: score,
// // // //         status: status
// // // //       };

// // // //       // Path synced with @RequestMapping("/api/battle") and @PostMapping("/create")
// // // //       const response = await fetch('http://localhost:8080/api/battle/create', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify(battleData)
// // // //       });
      
// // // //       if (response.ok) console.log(`✅ DB Entry (${status}) for player ${playerId}`);
// // // //     } catch (error) {
// // // //       console.error("❌ DB Entry Failed:", error);
// // // //     }
// // // //   };

// // // //   const handleFinishGame = async () => {
// // // //     setIsGameActive(false);
// // // //     setGameMode('report');

// // // //     const finalScore = Object.keys(showResults).filter((qId) => {
// // // //         const q = currentQuestions.find(bq => bq.questionID === parseInt(qId));
// // // //         return q && getOptionsArray(q)[selectedAnswers[parseInt(qId)]] === q.correctAnswer;
// // // //     }).length * 10;

// // // //     // Save final result to DB
// // // //     await createBattleEntry(studentId, "COMPLETED", finalScore);
// // // //   };

// // // //   // --- SOCKETS & HANDLERS ---

// // // //   useEffect(() => {
// // // //     if (isGameActive && timeLeft > 0) {
// // // //       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
// // // //       return () => clearInterval(timer);
// // // //     } else if (timeLeft === 0 && isGameActive) {
// // // //       handleFinishGame();
// // // //     }
// // // //   }, [isGameActive, timeLeft]);

// // // //   useEffect(() => {
// // // //     if (gameMode === 'lobby' && roomCode) {
// // // //       connectBattleSocket(roomCode, (data) => {
// // // //         if (data === 'START') {
// // // //           startBattle(selectedMode);
// // // //         } else if (data.battleCode) {
// // // //           setPlayers(data.players || []);
// // // //           if (data.questions) setDbQuestions(data.questions);
// // // //         }
// // // //       });
// // // //       sendJoinBattle(roomCode, studentId);
// // // //     }
// // // //     return () => disconnectBattleSocket();
// // // //   }, [gameMode, roomCode]);

// // // //   const handleInvite = async () => {
// // // //     try {
// // // //       // Create actual room in backend first (Update this URL if needed)
// // // //       const response = await fetch(`http://localhost:8080/api/battle/create`, { method: 'POST' }); 
// // // //       const code = await response.text();
// // // //       setRoomCode(code);
// // // //       setIsHost(true);
// // // //       setGameMode('lobby');
      
// // // //       // Create initial DB record for Host
// // // //       await createBattleEntry(studentId); 
// // // //     } catch (error) { console.error(error); }
// // // //   };

// // // //   const handleJoinWithCode = async (code: string) => {
// // // //     setRoomCode(code);
// // // //     setIsHost(false);
// // // //     setGameMode('lobby');
    
// // // //     // Create initial DB record for joining player
// // // //     await createBattleEntry(studentId);
// // // //   };

// // // //   const startBattle = (modeId: number) => {
// // // //     setGameMode('game');
// // // //     setIsGameActive(true);
// // // //     setCurrentQuestion(0);
// // // //     setSelectedAnswers({});
// // // //     setShowResults({});
// // // //     setTimeLeft(modeId === 2 ? 600 : 300);
// // // //     setStartTime(Date.now());
// // // //   };

// // //   // const currentQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;

// // // //   const handleAnswer = (answerIndex: number) => {
// // // //     const questionId = currentQuestions[currentQuestion].questionID;
// // // //     setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
// // // //     setShowResults({ ...showResults, [questionId]: true });
// // // //     sendAnswer(roomCode, studentId, String.fromCharCode(65 + answerIndex));

// // // //     setTimeout(() => {
// // // //       if (currentQuestion < currentQuestions.length - 1) {
// // // //         setCurrentQuestion(currentQuestion + 1);
// // // //       } else {
// // // //         handleFinishGame();
// // // //       }
// // // //     }, 1000);
// // // //   };

// // // //   const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

// // //   // --- RENDERING ---

// // //   //if (gameMode === 'lobby') return <BattleLobby roomCode={roomCode} onStart={() => fetch(`http://localhost:8080/api/battle/start/${roomCode}/${studentId}`, { method: 'POST' })} onCancel={() => setGameMode('menu')} isHost={isHost} players={players} />;
// // //   if (gameMode === 'join') return <JoinBattleLobby onJoin={handleJoinWithCode} onCancel={() => setGameMode('menu')} />;
// // //   if (gameMode === 'report') return <BattleReport questions={currentQuestions} selectedAnswers={selectedAnswers} timeTaken={Math.floor((Date.now() - startTime) / 1000)} totalQuestions={currentQuestions.length} onBack={() => setGameMode('menu')} />;

// // //   if (gameMode === 'game') {
// // //     const question = currentQuestions[currentQuestion];
// // //     if (!question) return null;
// // //     const options = getOptionsArray(question);
// // //     const isAnswered = showResults[question.questionID];
// // //     const isCorrect = options[selectedAnswers[question.questionID]] === question.correctAnswer;

// // //     return (
// // //       <div className="min-h-screen bg-background pt-20 pb-16">
// // //         <div className="container mx-auto px-4 max-w-4xl">
// // //           <div className="flex justify-between items-center mb-8">
// // //             <div>
// // //               <Badge variant="secondary" className="mb-2"><Swords className="w-4 h-4 mr-2" />Quiz Battle</Badge>
// // //               <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {currentQuestions.length}</h2>
// // //             </div>
// // //             <Card className="p-4 bg-gradient-card">
// // //               <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{formatTime(timeLeft)}</span></div>
// // //             </Card>
// // //           </div>
// // //           <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2 mb-8" />
// // //           <Card className="p-8 bg-gradient-card mb-6">
// // //             <div className="flex items-start gap-4 mb-6">
// // //               <Badge variant="outline" className="text-lg px-3 py-1">{currentQuestion + 1}</Badge>
// // //               <h2 className="text-2xl font-semibold flex-1">{question.questionText}</h2>
// // //               {isAnswered && (isCorrect ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <XCircle className="w-8 h-8 text-red-500" />)}
// // //             </div>
// // //             <div className="space-y-3">
// // //               {options.map((option, idx) => (
// // //                 <Button key={idx} variant="outline" className={`justify-start text-left h-auto py-4 px-4 ${isAnswered ? (option === question.correctAnswer ? "border-green-500 bg-green-500/10" : (selectedAnswers[question.questionID] === idx ? "border-red-500 bg-red-500/10" : "")) : ""}`} onClick={() => !isAnswered && handleAnswer(idx)} disabled={isAnswered}>
// // //                   <span className="font-semibold mr-3 text-lg">{String.fromCharCode(65 + idx)}.</span><span className="text-base">{option}</span>
// // //                 </Button>
// // //               ))}
// // //             </div>
// // //           </Card>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-background pt-20 pb-16">
// // //       <div className="container mx-auto px-4 text-center">
// // //         {gameMode === 'menu' && (
// // //           <div>
// // //             <Badge variant="secondary" className="mb-4"><Swords className="w-4 h-4 mr-2" />Quiz Battle Arena</Badge>
// // //             <h1 className="text-4xl font-bold mb-6">Battle Mode <span className="bg-gradient-primary bg-clip-text text-transparent">Activated</span></h1>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
// // //               {battleModes.map((mode) => (
// // //                 <Card key={mode.id} className="p-6 bg-gradient-card group hover:border-primary/50 transition-all">
// // //                   <div className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4`}><mode.icon className="w-8 h-8 text-white" /></div>
// // //                   <h3 className="text-xl font-semibold mb-4">{mode.title}</h3>
// // //                   {mode.id === 2 ? (
// // //                     <div className="space-y-2">
// // //                       <Button onClick={handleInvite} className="w-full"><Users className="w-4 h-4 mr-2" />Invite Friends</Button>
// // //                       <Button onClick={() => setGameMode('join')} variant="outline" className="w-full">Join Room</Button>
// // //                     </div>
// // //                   ) : (
// // //                     <Button onClick={() => startBattle(mode.id)} className="w-full">Start Battle</Button>
// // //                   )}
// // //                 </Card>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Battle;





// // import { useState, useEffect } from 'react';
// // import { Card } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Badge } from '@/components/ui/badge';
// // import { Progress } from '@/components/ui/progress';
// // import { 
// //   Trophy, Users, Zap, Clock, Target, Swords, Play, 
// //   CheckCircle2, XCircle, Medal 
// // } from 'lucide-react';
// // import { battleQuestions, Question } from '@/data/questions';
// // import { BattleReport } from '@/components/reports/BattleReport';
// // import { BattleLobby, JoinBattleLobby } from './BattleLobby';

// // import {
// //   connectBattleSocket,
// //   sendJoinBattle,
// //   sendAnswer,
// //   disconnectBattleSocket
// // } from '@/services/battleSocket';

// // const getOptionsArray = (q: Question): string[] => {
// //   return [q.option1, q.option2, q.option3, q.option4];
// // };

// // const battleModes = [
// //   { id: 1, title: 'Quick Battle', description: 'Jump into a match with random players', icon: Zap, color: 'bg-yellow-500', maxPlayers: 5, duration: '5 minutes', questions: 20 },
// //   { id: 2, title: 'Private Room', description: 'Create or join a room with friends', icon: Users, color: 'bg-blue-500', maxPlayers: 8, duration: '10 minutes', questions: 30 },
// // ];
// // const Battle = () => {
// //   // ... existing states
// //    const [gameMode, setGameMode] = useState<'menu' | 'lobby' | 'join' | 'game' | 'report'>('menu');
// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// //   const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
// //   const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
// //   const [timeLeft, setTimeLeft] = useState(600);
// //   const [isGameActive, setIsGameActive] = useState(false);
// //   const [startTime, setStartTime] = useState<number>(0);
// //   const [roomCode, setRoomCode] = useState<string>('');
// //   const [isHost, setIsHost] = useState(false);
// //   const [selectedMode, setSelectedMode] = useState<number>(1);
// //   const [players, setPlayers] = useState<number[]>([]); 
// //   const [dbQuestions, setDbQuestions] = useState<Question[]>([]);

// //   const studentId = 101; 
// //   const currentQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;
// //   /* ---------------- API CALLS (SYNCED WITH CONTROLLER) ---------------- */

// //   const createBattleEntry = async (playerId: number, status: string = "LIVE", score: number = 0) => {
// //     try {
// //       const battleData = {
// //         quizNumber: 1, 
// //         playerNumber: playerId, 
// //         studentId: playerId, // Backend DTO expects this to map to Student entity
// //         quizScore: score,
// //         status: status
// //       };

// //       // ✅ URL changed to match @RequestMapping("/api/battle") + @PostMapping("/create")
// //       const response = await fetch('http://localhost:8080/api/battle/create', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(battleData)
// //       });
      
// //       if (response.ok) {
// //           console.log(`✅ DB Entry (${status}) saved for player ${playerId}`);
// //       } else {
// //           console.error("❌ Backend rejected the entry. Check DTO/Entity mapping.");
// //       }
// //     } catch (error) {
// //       console.error("❌ DB Connection Failed:", error);
// //     }
// //   };

// //   const handleFinishGame = async () => {
// //     setIsGameActive(false);
// //     setGameMode('report');

// //     const finalScore = Object.keys(showResults).filter((qId) => {
// //         const q = currentQuestions.find(bq => bq.questionID === parseInt(qId));
// //         return q && getOptionsArray(q)[selectedAnswers[parseInt(qId)]] === q.correctAnswer;
// //     }).length * 10;

// //     // ✅ Save final result to DB on game finish
// //     await createBattleEntry(studentId, "COMPLETED", finalScore);
// //   };

// //   /* ---------------- HANDLERS (SYNCED WITH ROOM LOGIC) ---------------- */

// //   const handleInvite = async () => {
// //     try {
// //       // Step 1: Create room in RAM (assuming BattleController is also under /api/battle)
// //       // Note: If your BattleManager room create is also /api/battle/create, 
// //       // ensure it returns a String code and not a DTO, otherwise use a different path.
// //       const response = await fetch(`http://localhost:8080/api/battle/create/${studentId}`, { method: 'POST' }); 
// //       const code = await response.text();
      
// //       setRoomCode(code);
// //       setIsHost(true);
// //       setGameMode('lobby');
      
// //       // Step 2: Create initial DB record for Host
// //       await createBattleEntry(studentId); 
// //     } catch (error) { console.error("Invite Error:", error); }
// //   };

// //   const handleJoinWithCode = async (code: string) => {
// //     try {
// //         // Step 1: Join Room in RAM
// //         await fetch(`http://localhost:8080/api/battle/join/${code}/${studentId}`, { method: 'POST' });
        
// //         setRoomCode(code);
// //         setIsHost(false);
// //         setGameMode('lobby');
        
// //         // Step 2: Create initial DB record for Joiner
// //         await createBattleEntry(studentId);
// //     } catch (error) {
// //         console.error("Join Error:", error);
// //     }
// //   };

// //   // ... (startBattle, currentQuestions, handleAnswer functions remain the same)

// //   /* ---------------- RENDERING ---------------- */

// //   if (gameMode === 'lobby') {
// //     return (
// //       <BattleLobby 
// //         roomCode={roomCode} 
// //         onStart={() => fetch(`http://localhost:8080/api/battle/start/${roomCode}/${studentId}`, { method: 'POST' })} 
// //         onCancel={() => setGameMode('menu')} 
// //         isHost={isHost} 
// //         players={players} 
// //       />
// //     );
// //   }
// // // const Battle = () => {
// //   // const [gameMode, setGameMode] = useState<'menu' | 'lobby' | 'join' | 'game' | 'report'>('menu');
// //   // const [currentQuestion, setCurrentQuestion] = useState(0);
// //   // const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
// //   // const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
// //   // const [timeLeft, setTimeLeft] = useState(600);
// //   // const [isGameActive, setIsGameActive] = useState(false);
// //   // const [startTime, setStartTime] = useState<number>(0);
// //   // const [roomCode, setRoomCode] = useState<string>('');
// //   // const [isHost, setIsHost] = useState(false);
// //   // const [selectedMode, setSelectedMode] = useState<number>(1);
// //   // const [players, setPlayers] = useState<number[]>([]); 
// //   // const [dbQuestions, setDbQuestions] = useState<Question[]>([]);

// //   // const studentId = 101; // 🔥 Isko Dynamic rakhna auth se

// // //   // --- API CALLS SYNCED WITH BACKEND ---

// // //   const createBattleEntry = async (playerId: number, status: string = "LIVE", score: number = 0) => {
// // //     try {
// // //       const battleData = {
// // //         quizNumber: 1, 
// // //         playerNumber: playerId, 
// // //         studentId: playerId,
// // //         quizScore: score,
// // //         status: status
// // //       };

// // //       // Path synced with @RequestMapping("/api/battle") and @PostMapping("/create")
// // //       const response = await fetch('http://localhost:8080/api/battle/create', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(battleData)
// // //       });
      
// // //       if (response.ok) console.log(`✅ DB Entry (${status}) for player ${playerId}`);
// // //     } catch (error) {
// // //       console.error("❌ DB Entry Failed:", error);
// // //     }
// // //   };

// // //   const handleFinishGame = async () => {
// // //     setIsGameActive(false);
// // //     setGameMode('report');

// // //     const finalScore = Object.keys(showResults).filter((qId) => {
// // //         const q = currentQuestions.find(bq => bq.questionID === parseInt(qId));
// // //         return q && getOptionsArray(q)[selectedAnswers[parseInt(qId)]] === q.correctAnswer;
// // //     }).length * 10;

// // //     // Save final result to DB
// // //     await createBattleEntry(studentId, "COMPLETED", finalScore);
// // //   };

// // //   // --- SOCKETS & HANDLERS ---

// // //   useEffect(() => {
// // //     if (isGameActive && timeLeft > 0) {
// // //       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
// // //       return () => clearInterval(timer);
// // //     } else if (timeLeft === 0 && isGameActive) {
// // //       handleFinishGame();
// // //     }
// // //   }, [isGameActive, timeLeft]);

// // //   useEffect(() => {
// // //     if (gameMode === 'lobby' && roomCode) {
// // //       connectBattleSocket(roomCode, (data) => {
// // //         if (data === 'START') {
// // //           startBattle(selectedMode);
// // //         } else if (data.battleCode) {
// // //           setPlayers(data.players || []);
// // //           if (data.questions) setDbQuestions(data.questions);
// // //         }
// // //       });
// // //       sendJoinBattle(roomCode, studentId);
// // //     }
// // //     return () => disconnectBattleSocket();
// // //   }, [gameMode, roomCode]);

// // //   const handleInvite = async () => {
// // //     try {
// // //       // Create actual room in backend first (Update this URL if needed)
// // //       const response = await fetch(`http://localhost:8080/api/battle/create`, { method: 'POST' }); 
// // //       const code = await response.text();
// // //       setRoomCode(code);
// // //       setIsHost(true);
// // //       setGameMode('lobby');
      
// // //       // Create initial DB record for Host
// // //       await createBattleEntry(studentId); 
// // //     } catch (error) { console.error(error); }
// // //   };

// // //   const handleJoinWithCode = async (code: string) => {
// // //     setRoomCode(code);
// // //     setIsHost(false);
// // //     setGameMode('lobby');
    
// // //     // Create initial DB record for joining player
// // //     await createBattleEntry(studentId);
// // //   };

// // //   const startBattle = (modeId: number) => {
// // //     setGameMode('game');
// // //     setIsGameActive(true);
// // //     setCurrentQuestion(0);
// // //     setSelectedAnswers({});
// // //     setShowResults({});
// // //     setTimeLeft(modeId === 2 ? 600 : 300);
// // //     setStartTime(Date.now());
// // //   };

// //   // const currentQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;

// // //   const handleAnswer = (answerIndex: number) => {
// // //     const questionId = currentQuestions[currentQuestion].questionID;
// // //     setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
// // //     setShowResults({ ...showResults, [questionId]: true });
// // //     sendAnswer(roomCode, studentId, String.fromCharCode(65 + answerIndex));

// // //     setTimeout(() => {
// // //       if (currentQuestion < currentQuestions.length - 1) {
// // //         setCurrentQuestion(currentQuestion + 1);
// // //       } else {
// // //         handleFinishGame();
// // //       }
// // //     }, 1000);
// // //   };

// // //   const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

// //   // --- RENDERING ---

// //   //if (gameMode === 'lobby') return <BattleLobby roomCode={roomCode} onStart={() => fetch(`http://localhost:8080/api/battle/start/${roomCode}/${studentId}`, { method: 'POST' })} onCancel={() => setGameMode('menu')} isHost={isHost} players={players} />;
// //   if (gameMode === 'join') return <JoinBattleLobby onJoin={handleJoinWithCode} onCancel={() => setGameMode('menu')} />;
// //   if (gameMode === 'report') return <BattleReport questions={currentQuestions} selectedAnswers={selectedAnswers} timeTaken={Math.floor((Date.now() - startTime) / 1000)} totalQuestions={currentQuestions.length} onBack={() => setGameMode('menu')} />;

// //   if (gameMode === 'game') {
// //     const question = currentQuestions[currentQuestion];
// //     if (!question) return null;
// //     const options = getOptionsArray(question);
// //     const isAnswered = showResults[question.questionID];
// //     const isCorrect = options[selectedAnswers[question.questionID]] === question.correctAnswer;

// //     return (
// //       <div className="min-h-screen bg-background pt-20 pb-16">
// //         <div className="container mx-auto px-4 max-w-4xl">
// //           <div className="flex justify-between items-center mb-8">
// //             <div>
// //               <Badge variant="secondary" className="mb-2"><Swords className="w-4 h-4 mr-2" />Quiz Battle</Badge>
// //               <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {currentQuestions.length}</h2>
// //             </div>
// //             <Card className="p-4 bg-gradient-card">
// //               <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{formatTime(timeLeft)}</span></div>
// //             </Card>
// //           </div>
// //           <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2 mb-8" />
// //           <Card className="p-8 bg-gradient-card mb-6">
// //             <div className="flex items-start gap-4 mb-6">
// //               <Badge variant="outline" className="text-lg px-3 py-1">{currentQuestion + 1}</Badge>
// //               <h2 className="text-2xl font-semibold flex-1">{question.questionText}</h2>
// //               {isAnswered && (isCorrect ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <XCircle className="w-8 h-8 text-red-500" />)}
// //             </div>
// //             <div className="space-y-3">
// //               {options.map((option, idx) => (
// //                 <Button key={idx} variant="outline" className={`justify-start text-left h-auto py-4 px-4 ${isAnswered ? (option === question.correctAnswer ? "border-green-500 bg-green-500/10" : (selectedAnswers[question.questionID] === idx ? "border-red-500 bg-red-500/10" : "")) : ""}`} onClick={() => !isAnswered && handleAnswer(idx)} disabled={isAnswered}>
// //                   <span className="font-semibold mr-3 text-lg">{String.fromCharCode(65 + idx)}.</span><span className="text-base">{option}</span>
// //                 </Button>
// //               ))}
// //             </div>
// //           </Card>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background pt-20 pb-16">
// //       <div className="container mx-auto px-4 text-center">
// //         {gameMode === 'menu' && (
// //           <div>
// //             <Badge variant="secondary" className="mb-4"><Swords className="w-4 h-4 mr-2" />Quiz Battle Arena</Badge>
// //             <h1 className="text-4xl font-bold mb-6">Battle Mode <span className="bg-gradient-primary bg-clip-text text-transparent">Activated</span></h1>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
// //               {battleModes.map((mode) => (
// //                 <Card key={mode.id} className="p-6 bg-gradient-card group hover:border-primary/50 transition-all">
// //                   <div className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4`}><mode.icon className="w-8 h-8 text-white" /></div>
// //                   <h3 className="text-xl font-semibold mb-4">{mode.title}</h3>
// //                   {mode.id === 2 ? (
// //                     <div className="space-y-2">
// //                       <Button onClick={handleInvite} className="w-full"><Users className="w-4 h-4 mr-2" />Invite Friends</Button>
// //                       <Button onClick={() => setGameMode('join')} variant="outline" className="w-full">Join Room</Button>
// //                     </div>
// //                   ) : (
// //                     <Button onClick={() => startBattle(mode.id)} className="w-full">Start Battle</Button>
// //                   )}
// //                 </Card>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Battle;

// // import { useState, useEffect } from 'react';
// // import { Card } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Badge } from '@/components/ui/badge';
// // import { Progress } from '@/components/ui/progress';
// // import { 
// //   Trophy, Users, Zap, Clock, Target, Swords, Play, 
// //   CheckCircle2, XCircle, Medal 
// // } from 'lucide-react';
// // import { battleQuestions, Question } from '@/data/questions';
// // import { BattleReport } from '@/components/reports/BattleReport';
// // import { BattleLobby, JoinBattleLobby } from './BattleLobby';

// // import {
// //   connectBattleSocket,
// //   sendJoinBattle,
// //   sendAnswer,
// //   disconnectBattleSocket
// // } from '@/services/battleSocket';
// // import { useAuth } from '@/contexts/AuthContext';
// // import { useNavigate } from 'react-router-dom';
// // const getOptionsArray = (q: Question): string[] => {
// //   return [q.option1, q.option2, q.option3, q.option4];
// // };

// // const battleModes = [
// //   { id: 1, title: 'Quick Battle', description: 'Jump into a match with random players', icon: Zap, color: 'bg-yellow-500', maxPlayers: 5, duration: '5 minutes', questions: 20 },
// //   { id: 2, title: 'Private Room', description: 'Create or join a room with friends', icon: Users, color: 'bg-blue-500', maxPlayers: 8, duration: '10 minutes', questions: 30 },
// // ];

// // const Battle = () => {
// //   const [gameMode, setGameMode] = useState<'menu' | 'lobby' | 'join' | 'game' | 'report'>('menu');
// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// //   const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
// //   const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
// //   const [timeLeft, setTimeLeft] = useState(600);
// //   const [isGameActive, setIsGameActive] = useState(false);
// //   const [startTime, setStartTime] = useState<number>(0);
// //   const [roomCode, setRoomCode] = useState<string>('');
// //   const [isHost, setIsHost] = useState(false);
// //   const [selectedMode, setSelectedMode] = useState<number>(1);
// //   const [players, setPlayers] = useState<number[]>([]); 
// //   const [dbQuestions, setDbQuestions] = useState<Question[]>([]);
// //   const { user } = useAuth(); // 🔥 Step 2: Get real logged-in user
// //   const navigate = useNavigate();
// //    const studentEmail=user?.emailId; 
// //   //console.log("fbkdrhg",user.student_id,typeof user.student_id);
// //   const studentId = Number(user?.student_id);
// //   // const studentId = user?.student_id ? Number(user.student_id) : null;
// //   const currentQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;

// //   /* ---------------- API CALLS ---------------- */

// //   // const createBattleEntry = async (playerId: number, status: string = "LIVE", score: number = 0) => {
// //   //   try {
// //   //     const battleData = {
// //   //       quizNumber: 1, 
// //   //       playerNumber: playerId, 
// //   //       studentId: playerId,
// //   //       quizScore: score,
// //   //       status: status
// //   //     };

// //   //     await fetch('http://localhost:8080/api/battle/create', {
// //   //       method: 'POST',
// //   //       headers: { 'Content-Type': 'application/json' },
// //   //       body: JSON.stringify(battleData)
// //   //     });
// //   //   } catch (error) {
// //   //     console.error("❌ DB Entry Failed:", error);
// //   //   }
// //   // };
// //   const createBattleEntry = async (studentEmail: string, status: string = "LIVE", score: number = 0) => {
// //   try {
// //     // 🔥 REAL DATA MAPPING:
// //     // 1. RoomCode (e.g. "AB1234") se sirf numbers nikaal kar quizNumber banayenge
// //     const numericQuizId = parseInt(roomCode.replace(/\D/g, "")) || 1; 
    
// //     // 2. Player number ke liye hum current players ki length ya ID ka logic use kar sakte hain
// //     const pNumber = players.indexOf(studentId) + 1 || 1;
// //     console.log(studentEmail, roomCode, numericQuizId,pNumber, players);
// //     const battleData = {
// //       quizNumber: numericQuizId,   // Real numeric part of room code
// //       playerNumber: pNumber,       // Sequence of player in lobby
// //       studentEmail: studentEmail,         // Real student ID from Auth/State
// //       quizScore: score,            // Actual score calculated
// //       status: status               // "LIVE" or "COMPLETED"
// //     };

// //     console.log("📡 Sending Real Data to DB:", battleData);

// //     const response = await fetch('http://localhost:8080/api/battle/create', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(battleData)
// //     });
    
// //     if (!response.ok) {
// //         const errorText = await response.text();
// //         console.error("❌ Server Error:", errorText);
// //     } else {
// //         console.log(`✅ DB Entry (${status}) saved successfully!`);
// //     }
// //   } catch (error) {
// //     console.error("❌ Network Error:", error);
// //   }
// // };
// //   const startBattle = (modeId: number) => {
// //     setGameMode('game');
// //     setIsGameActive(true);
// //     setCurrentQuestion(0);
// //     setSelectedAnswers({});
// //     setShowResults({});
// //     setTimeLeft(modeId === 2 ? 600 : 300);
// //     setStartTime(Date.now());
// //   };

// //   const handleFinishGame = async () => {
// //     setIsGameActive(false);
// //     setGameMode('report');

// //     const finalScore = Object.keys(showResults).filter((qId) => {
// //         const q = currentQuestions.find(bq => bq.questionID === parseInt(qId));
// //         return q && getOptionsArray(q)[selectedAnswers[parseInt(qId)]] === q.correctAnswer;
// //     }).length * 10;

// //     await createBattleEntry(studentEmail, "COMPLETED", finalScore);
// //   };

// //   /* ---------------- HANDLERS ---------------- */

// //   useEffect(() => {
// //     if (isGameActive && timeLeft > 0) {
// //       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
// //       return () => clearInterval(timer);
// //     } else if (timeLeft === 0 && isGameActive) {
// //       handleFinishGame();
// //     }
// //   }, [isGameActive, timeLeft]);

// //   useEffect(() => {
// //     if (gameMode === 'lobby' && roomCode) {
// //       connectBattleSocket(roomCode, (data) => {
// //         // Handle Map object with status: 'START'
// //         if (data === 'START' || data.status === 'START') {
// //           startBattle(selectedMode);
// //         } else if (data.battleCode) {
// //           setPlayers(data.players || []);
// //           if (data.questions) setDbQuestions(data.questions);
// //         }
// //       });
// //       sendJoinBattle(roomCode, studentEmail);
// //     }
// //     return () => disconnectBattleSocket();
// //   }, [gameMode, roomCode, selectedMode]);

// //   // const handleInvite = async () => {
// //   //   try {
// //   //     const response = await fetch(`http://localhost:8080/api/battle/create/${studentId}`, { method: 'POST' }); 
// //   //     const code = await response.text();
// //   //     setRoomCode(code);
// //   //     setIsHost(true);
// //   //     setGameMode('lobby');
// //   //     await createBattleEntry(studentId); 
// //   //   } catch (error) { console.error(error); }
// //   // };

// //   // const handleJoinWithCode = async (code: string) => {
// //   //   try {
// //   //     await fetch(`http://localhost:8080/api/battle/join/${code}/${studentId}`, { method: 'POST' });
// //   //     setRoomCode(code);
// //   //     setIsHost(false);
// //   //     setGameMode('lobby');
// //   //     await createBattleEntry(studentId);
// //   //   } catch (error) { console.error(error); }
// //   // };
// //   const handleInvite = async () => {
// //   try {
// //     // RAM Room Creation
// //     const response = await fetch(`http://localhost:8080/api/battle/create/${studentEmail}`, { method: 'POST' }); 
// //     const code = await response.text();
    
// //     // 🔥 Important: Set Room Code first so createBattleEntry can use it
// //     setRoomCode(code);
// //     setIsHost(true);
// //     setGameMode('lobby');

// //     // DB Entry for Host (Status: LIVE)
// //     // Note: Use a small timeout or useEffect to ensure roomCode state is updated
// //     setTimeout(() => createBattleEntry(studentEmail, "LIVE"), 500);
    
// //   } catch (error) { console.error("Invite Error:", error); }
// // };

// // const handleJoinWithCode = async (code: string) => {
// //   try {
// //       await fetch(`http://localhost:8080/api/battle/join/${code}/${studentEmail}`, { method: 'POST' });
      
// //       setRoomCode(code);
// //       setIsHost(false);
// //       setGameMode('lobby');

// //       // DB Entry for Joiner
// //       setTimeout(() => createBattleEntry(studentEmail, "LIVE"), 500);
// //   } catch (error) { console.error("Join Error:", error); }
// // };
// //   const handleAnswer = (answerIndex: number) => {
// //     const questionId = currentQuestions[currentQuestion].questionID;
// //     setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
// //     setShowResults({ ...showResults, [questionId]: true });
// //     sendAnswer(roomCode, studentEmail, String.fromCharCode(65 + answerIndex));

// //     setTimeout(() => {
// //       if (currentQuestion < currentQuestions.length - 1) {
// //         setCurrentQuestion(currentQuestion + 1);
// //       } else {
// //         handleFinishGame();
// //       }
// //     }, 1000);
// //   };

// //   const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

// //   /* ---------------- RENDERING ---------------- */

// //   if (gameMode === 'lobby') {
// //     return (
// //       <BattleLobby 
// //         roomCode={roomCode} 
// //         onStart={() => fetch(`http://localhost:8080/api/battle/start/${roomCode}/${studentEmail}`, { method: 'POST' })} 
// //         onCancel={() => setGameMode('menu')} 
// //         isHost={isHost} 
// //         players={players} 
// //       />
// //     );
// //   }

// //   if (gameMode === 'join') return <JoinBattleLobby onJoin={handleJoinWithCode} onCancel={() => setGameMode('menu')} />;
  
// //   if (gameMode === 'report') {
// //     return (
// //       <BattleReport 
// //         questions={currentQuestions} 
// //         selectedAnswers={selectedAnswers} 
// //         timeTaken={Math.floor((Date.now() - startTime) / 1000)} 
// //         totalQuestions={currentQuestions.length} 
// //         onBack={() => setGameMode('menu')} 
// //       />
// //     );
// //   }

// //   if (gameMode === 'game') {
// //     const question = currentQuestions[currentQuestion];
// //     if (!question) return null;
// //     const options = getOptionsArray(question);
// //     const isAnswered = showResults[question.questionID];
// //     const isCorrect = options[selectedAnswers[question.questionID]] === question.correctAnswer;

// //     return (
// //       <div className="min-h-screen bg-background pt-20 pb-16">
// //         <div className="container mx-auto px-4 max-w-4xl">
// //           <div className="flex justify-between items-center mb-8">
// //             <div>
// //               <Badge variant="secondary" className="mb-2"><Swords className="w-4 h-4 mr-2" />Quiz Battle</Badge>
// //               <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {currentQuestions.length}</h2>
// //             </div>
// //             <Card className="p-4 bg-gradient-card">
// //               <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{formatTime(timeLeft)}</span></div>
// //             </Card>
// //           </div>
// //           <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2 mb-8" />
// //           <Card className="p-8 bg-gradient-card mb-6">
// //             <div className="flex items-start gap-4 mb-6">
// //               <Badge variant="outline" className="text-lg px-3 py-1">{currentQuestion + 1}</Badge>
// //               <h2 className="text-2xl font-semibold flex-1">{question.questionText}</h2>
// //               {isAnswered && (isCorrect ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <XCircle className="w-8 h-8 text-red-500" />)}
// //             </div>
// //             <div className="space-y-3">
// //               {options.map((option, idx) => (
// //                 <Button key={idx} variant="outline" className={`justify-start text-left h-auto py-4 px-4 ${isAnswered ? (option === question.correctAnswer ? "border-green-500 bg-green-500/10" : (selectedAnswers[question.questionID] === idx ? "border-red-500 bg-red-500/10" : "")) : ""}`} onClick={() => !isAnswered && handleAnswer(idx)} disabled={isAnswered}>
// //                   <span className="font-semibold mr-3 text-lg">{String.fromCharCode(65 + idx)}.</span><span className="text-base">{option}</span>
// //                 </Button>
// //               ))}
// //             </div>
// //           </Card>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background pt-20 pb-16">
// //       <div className="container mx-auto px-4 text-center">
// //         {gameMode === 'menu' && (
// //           <div>
// //             <Badge variant="secondary" className="mb-4"><Swords className="w-4 h-4 mr-2" />Quiz Battle Arena</Badge>
// //             <h1 className="text-4xl font-bold mb-6">Battle Mode <span className="bg-gradient-primary bg-clip-text text-transparent">Activated</span></h1>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
// //               {battleModes.map((mode) => (
// //                 <Card key={mode.id} className="p-6 bg-gradient-card group hover:border-primary/50 transition-all">
// //                   <div className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4`}><mode.icon className="w-8 h-8 text-white" /></div>
// //                   <h3 className="text-xl font-semibold mb-4">{mode.title}</h3>
// //                   {mode.id === 2 ? (
// //                     <div className="space-y-2">
// //                       <Button onClick={handleInvite} className="w-full"><Users className="w-4 h-4 mr-2" />Invite Friends</Button>
// //                       <Button onClick={() => setGameMode('join')} variant="outline" className="w-full">Join Room</Button>
// //                     </div>
// //                   ) : (
// //                     <Button onClick={() => startBattle(mode.id)} className="w-full">Start Battle</Button>
// //                   )}
// //                 </Card>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Battle;



// import { useState, useEffect, useRef } from 'react'; // 🔥 Added useRef
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { 
//   Trophy, Users, Zap, Clock, Target, Swords, Play, 
//   CheckCircle2, XCircle, Medal 
// } from 'lucide-react';
// import { battleQuestions, Question } from '@/data/questions';
// import { BattleReport } from '@/components/reports/BattleReport';
// import { BattleLobby, JoinBattleLobby } from './BattleLobby';

// import {
//   connectBattleSocket,
//   sendJoinBattle,
//   sendAnswer,
//   disconnectBattleSocket
// } from '@/services/battleSocket';
// import { useAuth } from '@/contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const getOptionsArray = (q: Question): string[] => {
//   return [q.option1, q.option2, q.option3, q.option4];
// };

// const battleModes = [
//   { id: 1, title: 'Quick Battle', description: 'Jump into a match with random players', icon: Zap, color: 'bg-yellow-500', maxPlayers: 5, duration: '5 minutes', questions: 20 },
//   { id: 2, title: 'Private Room', description: 'Create or join a room with friends', icon: Users, color: 'bg-blue-500', maxPlayers: 8, duration: '10 minutes', questions: 30 },
// ];

// const Battle = () => {
//   const [gameMode, setGameMode] = useState<'menu' | 'lobby' | 'join' | 'game' | 'report'>('menu');
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
//   const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
//   const [timeLeft, setTimeLeft] = useState(600);
//   const [isGameActive, setIsGameActive] = useState(false);
//   const [startTime, setStartTime] = useState<number>(0);
//   const [roomCode, setRoomCode] = useState<string>('');
//   const [isHost, setIsHost] = useState(false);
//   const [selectedMode, setSelectedMode] = useState<number>(1);
//   const [players, setPlayers] = useState<number[]>([]); 
//   const [dbQuestions, setDbQuestions] = useState<Question[]>([]);
  
//   const { user } = useAuth(); 
//   const navigate = useNavigate();
//   const studentEmail = user?.emailId; 
//   const studentId = Number(user?.student_id);
  
//   // 🔥 Guard to prevent duplicate DB entries
//   const hasInitializedEntry = useRef<string | null>(null);

//   const currentQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;

//   /* ---------------- API CALLS ---------------- */

//   const createBattleEntry = async (email: string, status: string = "LIVE", score: number = 0) => {
//     if (!roomCode) return;
//     try {
//       const numericQuizId = parseInt(roomCode.replace(/\D/g, "")) || 1; 
      
//       // Calculate player number based on current count
//       const pNumber = players.length > 0 ? (players.indexOf(studentId) + 1 || players.length) : 1;

//       const battleData = {
//         quizNumber: numericQuizId,
//         playerNumber: pNumber,
//         studentEmail: email,
//         quizScore: score,
//         status: status
//       };

//       const response = await fetch('http://localhost:8080/api/battle/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(battleData)
//       });
      
//       if (response.ok) {
//         console.log(`✅ DB Entry (${status}) saved successfully!`);
//       }
//     } catch (error) {
//       console.error("❌ DB Entry Failed:", error);
//     }
//   };

//   const startBattle = (modeId: number) => {
//     setGameMode('game');
//     setIsGameActive(true);
//     setCurrentQuestion(0);
//     setSelectedAnswers({});
//     setShowResults({});
//     setTimeLeft(modeId === 2 ? 600 : 300);
//     setStartTime(Date.now());
//   };

//   const handleFinishGame = async () => {
//     setIsGameActive(false);
//     setGameMode('report');

//     const finalScore = Object.keys(showResults).filter((qId) => {
//         const q = currentQuestions.find(bq => bq.questionID === parseInt(qId));
//         return q && getOptionsArray(q)[selectedAnswers[parseInt(qId)]] === q.correctAnswer;
//     }).length * 10;

//     // Reset guard for final score entry
//     await createBattleEntry(studentEmail!, "COMPLETED", finalScore);
//     hasInitializedEntry.current = null; 
//   };

//   /* ---------------- HANDLERS ---------------- */

//   useEffect(() => {
//     if (isGameActive && timeLeft > 0) {
//       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//       return () => clearInterval(timer);
//     } else if (timeLeft === 0 && isGameActive) {
//       handleFinishGame();
//     }
//   }, [isGameActive, timeLeft]);

//   useEffect(() => {
//     if (gameMode === 'lobby' && roomCode) {
//       connectBattleSocket(roomCode, (data) => {
//         if (data === 'START' || data.status === 'START') {
//           startBattle(selectedMode);
//         } else if (data.battleCode) {
//           setPlayers(data.players || []);
//           if (data.questions) setDbQuestions(data.questions);
//         }
//       });
//       sendJoinBattle(roomCode, studentEmail!);

//       // 🔥 FIX: Only initialize entry once per roomCode
//       if (hasInitializedEntry.current !== roomCode) {
//         createBattleEntry(studentEmail!, "LIVE");
//         hasInitializedEntry.current = roomCode;
//       }
//     }
//     return () => {
//       if (gameMode !== 'lobby' && gameMode !== 'game') {
//         disconnectBattleSocket();
//       }
//     };
//   }, [gameMode, roomCode, selectedMode]);

//   const handleInvite = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/battle/create/${studentEmail}`, { method: 'POST' }); 
//       const code = await response.text();
//       setRoomCode(code);
//       setIsHost(true);
//       setGameMode('lobby');
//       // createBattleEntry is now handled by the useEffect guard
//     } catch (error) { console.error("Invite Error:", error); }
//   };

//   const handleJoinWithCode = async (code: string) => {
//     try {
//       await fetch(`http://localhost:8080/api/battle/join/${code}/${studentEmail}`, { method: 'POST' });
//       setRoomCode(code);
//       setIsHost(false);
//       setGameMode('lobby');
//       // createBattleEntry is now handled by the useEffect guard
//     } catch (error) { console.error("Join Error:", error); }
//   };

//   const handleAnswer = (answerIndex: number) => {
//     const questionId = currentQuestions[currentQuestion].questionID;
//     setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
//     setShowResults({ ...showResults, [questionId]: true });
//     sendAnswer(roomCode, studentEmail!, String.fromCharCode(65 + answerIndex));

//     setTimeout(() => {
//       if (currentQuestion < currentQuestions.length - 1) {
//         setCurrentQuestion(currentQuestion + 1);
//       } else {
//         handleFinishGame();
//       }
//     }, 1000);
//   };

//   const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

//   /* ---------------- RENDERING ---------------- */

//   if (gameMode === 'lobby') {
//     return (
//       <BattleLobby 
//         roomCode={roomCode} 
//         onStart={() => fetch(`http://localhost:8080/api/battle/start/${roomCode}/${studentEmail}`, { method: 'POST' })} 
//         onCancel={() => {
//           setGameMode('menu');
//           hasInitializedEntry.current = null;
//         }} 
//         isHost={isHost} 
//         players={players} 
//       />
//     );
//   }

//   if (gameMode === 'join') return <JoinBattleLobby onJoin={handleJoinWithCode} onCancel={() => setGameMode('menu')} />;
  
//   if (gameMode === 'report') {
//     return (
//       <BattleReport 
//         questions={currentQuestions} 
//         selectedAnswers={selectedAnswers} 
//         timeTaken={Math.floor((Date.now() - startTime) / 1000)} 
//         totalQuestions={currentQuestions.length} 
//         onBack={() => {
//           setGameMode('menu');
//           hasInitializedEntry.current = null;
//         }} 
//       />
//     );
//   }

//   if (gameMode === 'game') {
//     const question = currentQuestions[currentQuestion];
//     if (!question) return null;
//     const options = getOptionsArray(question);
//     const isAnswered = showResults[question.questionID];
//     const isCorrect = options[selectedAnswers[question.questionID]] === question.correctAnswer;

//     return (
//       <div className="min-h-screen bg-background pt-20 pb-16">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <Badge variant="secondary" className="mb-2"><Swords className="w-4 h-4 mr-2" />Quiz Battle</Badge>
//               <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {currentQuestions.length}</h2>
//             </div>
//             <Card className="p-4 bg-gradient-card">
//               <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{formatTime(timeLeft)}</span></div>
//             </Card>
//           </div>
//           <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2 mb-8" />
//           <Card className="p-8 bg-gradient-card mb-6">
//             <div className="flex items-start gap-4 mb-6">
//               <Badge variant="outline" className="text-lg px-3 py-1">{currentQuestion + 1}</Badge>
//               <h2 className="text-2xl font-semibold flex-1">{question.questionText}</h2>
//               {isAnswered && (isCorrect ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <XCircle className="w-8 h-8 text-red-500" />)}
//             </div>
//             <div className="space-y-3">
//               {options.map((option, idx) => (
//                 <Button key={idx} variant="outline" className={`justify-start text-left h-auto py-4 px-4 ${isAnswered ? (option === question.correctAnswer ? "border-green-500 bg-green-500/10" : (selectedAnswers[question.questionID] === idx ? "border-red-500 bg-red-500/10" : "")) : ""}`} onClick={() => !isAnswered && handleAnswer(idx)} disabled={isAnswered}>
//                   <span className="font-semibold mr-3 text-lg">{String.fromCharCode(65 + idx)}.</span><span className="text-base">{option}</span>
//                 </Button>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background pt-20 pb-16">
//       <div className="container mx-auto px-4 text-center">
//         {gameMode === 'menu' && (
//           <div>
//             <Badge variant="secondary" className="mb-4"><Swords className="w-4 h-4 mr-2" />Quiz Battle Arena</Badge>
//             <h1 className="text-4xl font-bold mb-6">Battle Mode <span className="bg-gradient-primary bg-clip-text text-transparent">Activated</span></h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
//               {battleModes.map((mode) => (
//                 <Card key={mode.id} className="p-6 bg-gradient-card group hover:border-primary/50 transition-all">
//                   <div className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4`}><mode.icon className="w-8 h-8 text-white" /></div>
//                   <h3 className="text-xl font-semibold mb-4">{mode.title}</h3>
//                   {mode.id === 2 ? (
//                     <div className="space-y-2">
//                       <Button onClick={handleInvite} className="w-full"><Users className="w-4 h-4 mr-2" />Invite Friends</Button>
//                       <Button onClick={() => setGameMode('join')} variant="outline" className="w-full">Join Room</Button>
//                     </div>
//                   ) : (
//                     <Button onClick={() => startBattle(mode.id)} className="w-full">Start Battle</Button>
//                   )}
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Battle;


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

import {
  connectBattleSocket,
  sendJoinBattle,
  sendAnswer,
  disconnectBattleSocket
} from '@/services/battleSocket';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const getOptionsArray = (q: Question): string[] => {
  return [q.option1, q.option2, q.option3, q.option4];
};

const battleModes = [
  { id: 1, title: 'Quick Battle', description: 'Jump into a match with random players', icon: Zap, color: 'bg-yellow-500', maxPlayers: 5, duration: '5 minutes', questions: 20 },
  { id: 2, title: 'Private Room', description: 'Create or join a room with friends', icon: Users, color: 'bg-blue-500', maxPlayers: 8, duration: '10 minutes', questions: 30 },
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
  
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const studentEmail = user?.emailId; 
  const studentId = Number(user?.student_id);

  const currentQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;

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

      console.log("📡 Submitting Final Results to DB:", battleData);

      const response = await fetch('http://localhost:8080/api/battle/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(battleData)
      });
      
      if (response.ok) {
        console.log(`✅ Final Entry saved successfully!`);
      }
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

  // const handleFinishGame = async () => {
  //   setIsGameActive(false);
  //   setGameMode('report');

  //   // Calculate final score
  //   const finalScore = Object.keys(showResults).filter((qId) => {
  //       const q = currentQuestions.find(bq => bq.questionID === parseInt(qId));
  //       return q && getOptionsArray(q)[selectedAnswers[parseInt(qId)]] === q.correctAnswer;
  //   }).length * 10;

  //   // 🔥 Trigger DB entry ONLY on completion
  //   if (studentEmail) {
  //     await createBattleEntry(studentEmail, "COMPLETED", finalScore);
  //   }
  // };

  /* ---------------- HANDLERS ---------------- */

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isGameActive) {
      handleFinishGame();
    }
  }, [isGameActive, timeLeft]);

  useEffect(() => {
    if (gameMode === 'lobby' && roomCode) {
      connectBattleSocket(roomCode, (data) => {
        if (data === 'START' || data.status === 'START') {
          startBattle(selectedMode);
        } else if (data.battleCode) {
          setPlayers(data.players || []);
          if (data.questions) setDbQuestions(data.questions);
        }
      });
      sendJoinBattle(roomCode, studentEmail!);
    }
    return () => {
      if (gameMode !== 'lobby' && gameMode !== 'game') {
        disconnectBattleSocket();
      }
    };
  }, [gameMode, roomCode, selectedMode]);

  const handleInvite = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/battle/create/${studentEmail}`, { method: 'POST' }); 
      const code = await response.text();
      setRoomCode(code);
      setIsHost(true);
      setGameMode('lobby');
      // No DB entry here anymore
    } catch (error) { console.error("Invite Error:", error); }
  };

  const handleJoinWithCode = async (code: string) => {
    try {
      await fetch(`http://localhost:8080/api/battle/join/${code}/${studentEmail}`, { method: 'POST' });
      setRoomCode(code);
      setIsHost(false);
      setGameMode('lobby');
      // No DB entry here anymore
    } catch (error) { console.error("Join Error:", error); }
  };

const handleAnswer = (answerIndex: number) => {
    const question = currentQuestions[currentQuestion];
    const questionId = question.questionID;
    
    // 1. Update states for UI
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setShowResults(prev => ({ ...prev, [questionId]: true }));
    
    sendAnswer(roomCode, studentEmail!, String.fromCharCode(65 + answerIndex));

    setTimeout(() => {
      if (currentQuestion < currentQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // 🔥 FIX: Yahan hum latest answer ko calculate karke bhejenge
        const finalSelectedAnswers = { ...selectedAnswers, [questionId]: answerIndex };
        handleFinishGame(finalSelectedAnswers);
      }
    }, 1000);
  };

  const handleFinishGame = async (finalAnswers = selectedAnswers) => {
    setIsGameActive(false);
    setGameMode('report');

    // 🔥 FIX: 'finalAnswers' ka use karke score calculate kar rahe hain
    const finalScore = currentQuestions.filter((q) => {
        const selectedIdx = finalAnswers[q.questionID];
        if (selectedIdx === undefined) return false;
        
        const options = getOptionsArray(q);
        return options[selectedIdx] === q.correctAnswer;
    }).length * 10;

    console.log("🎯 Final Calculated Score:", finalScore);

    if (studentEmail) {
      await createBattleEntry(studentEmail, "COMPLETED", finalScore);
    }
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
        selectedAnswers={selectedAnswers} 
        timeTaken={Math.floor((Date.now() - startTime) / 1000)} 
        totalQuestions={currentQuestions.length} 
        onBack={() => setGameMode('menu')} 
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <Badge variant="secondary" className="mb-2"><Swords className="w-4 h-4 mr-2" />Quiz Battle</Badge>
              <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {currentQuestions.length}</h2>
            </div>
            <Card className="p-4 bg-gradient-card">
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{formatTime(timeLeft)}</span></div>
            </Card>
          </div>
          <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2 mb-8" />
          <Card className="p-8 bg-gradient-card mb-6">
            <div className="flex items-start gap-4 mb-6">
              <Badge variant="outline" className="text-lg px-3 py-1">{currentQuestion + 1}</Badge>
              <h2 className="text-2xl font-semibold flex-1">{question.questionText}</h2>
              {isAnswered && (isCorrect ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <XCircle className="w-8 h-8 text-red-500" />)}
            </div>
            <div className="space-y-3">
              {options.map((option, idx) => (
                <Button key={idx} variant="outline" className={`justify-start text-left h-auto py-4 px-4 ${isAnswered ? (option === question.correctAnswer ? "border-green-500 bg-green-500/10" : (selectedAnswers[question.questionID] === idx ? "border-red-500 bg-red-500/10" : "")) : ""}`} onClick={() => !isAnswered && handleAnswer(idx)} disabled={isAnswered}>
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
            <h1 className="text-4xl font-bold mb-6">Battle Mode <span className="bg-gradient-primary bg-clip-text text-transparent">Activated</span></h1>
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
                    <Button onClick={() => startBattle(mode.id)} className="w-full">Start Battle</Button>
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