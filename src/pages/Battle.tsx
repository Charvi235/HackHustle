

// import { useState, useEffect } from 'react';
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
// import { useRef } from 'react';
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
//   { id: 1, title: 'You vs Computer', description: 'Jump into a match with computer', icon: Zap, color: 'bg-yellow-500', maxPlayers: 5, duration: '5 minutes', questions: 10 },
//   { id: 2, title: 'Private Room', description: 'Create or join a room with friends', icon: Users, color: 'bg-blue-500', maxPlayers: 8, duration: '10 minutes', questions: 10 },
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
//   const [liveScores, setLiveScores] = useState<{ [key: number]: number }>({});
//   const [masterAnswers, setMasterAnswers] = useState<{ [key: number]: number }>({});
//   const { user } = useAuth(); 
//   const navigate = useNavigate();
//   const studentEmail = user?.emailId; 
//   const [playerNames, setPlayerNames] = useState<{ [key: string]: string }>({});
  
//   const studentId = Number(user?.student_id);
//   const [winnerId, setWinnerId] = useState<number | null>(null);
//   const currentQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;
//   const scoresRef = useRef<{ [key: number]: number }>({});
//   const [isComputerMode, setIsComputerMode] = useState(false);
//   const computerId = 999;
//   /* ---------------- API CALLS ---------------- */

//   const createBattleEntry = async (email: string, status: string = "COMPLETED", score: number = 0) => {
//     if (!roomCode) return;
//     try {
//       const numericQuizId = parseInt(roomCode.replace(/\D/g, "")) || 1; 
//       const pNumber = players.indexOf(studentId) + 1 || 1;

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
      
//       if (response.ok) console.log(`✅ Entry saved successfully!`);
//     } catch (error) {
//       console.error("❌ Final Submission Failed:", error);
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

// //  const startComputerBattle = () => {
// //     setIsComputerMode(true);
    
// //     // 🔥 FIX: Questions set karna zaroori hai
// //     // Agar DB se questions nahi aaye hain, toh local battleQuestions use karo
// //     const initialQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;
// //     setDbQuestions(initialQuestions); 

// //     setPlayers([studentId, computerId]);
// //     setPlayerNames({
// //         [studentId.toString()]: user?.first_name || "You",
// //         [computerId.toString()]: "🤖 AI Bot"
// //     });
// //     setLiveScores({ [studentId]: 0, [computerId]: 0 });
// //     scoresRef.current = { [studentId]: 0, [computerId]: 0 };
    
// //     setGameMode('game');
// //     setIsGameActive(true);
// //     setCurrentQuestion(0);
// //     setTimeLeft(300);
// //     setStartTime(Date.now());
// // };
// // const startComputerBattle = () => {
// //     setIsComputerMode(true);
// //     setDbQuestions(battleQuestions); // Questions load karo
// //     setPlayers([studentId, computerId]);
    
// //     // AI Bot ka naam setup karo
// //     setPlayerNames({
// //         [studentId.toString()]: user?.first_name || "You",
// //         [computerId.toString()]: "🤖 AI Bot"
// //     });

// //     const initialScores = { [studentId]: 0, [computerId]: 0 };
// //     setLiveScores(initialScores);
// //     scoresRef.current = initialScores;
    
// //     setGameMode('game');
// //     setIsGameActive(true);
// //     setCurrentQuestion(0);
// //     setSelectedAnswers({});
// //     setShowResults({});
// //     setTimeLeft(300);
// //     setStartTime(Date.now());
// // };

// // const startComputerBattle = () => {
// //     // 1. Reset everything first
// //     setIsComputerMode(true);
// //     setCurrentQuestion(0);
// //     setSelectedAnswers({});
// //     setShowResults({});
// //     setWinnerId(null);
    
// //     // 2. Load Questions manually
// //     setDbQuestions(battleQuestions); 
    
// //     // 3. Setup Players & Names
// //     setPlayers([studentId, computerId]);
// //     setPlayerNames({
// //         [studentId.toString()]: user?.first_name || user?.first_name || "You",
// //         [computerId.toString()]: "🤖 AI Bot"
// //     });

// //     // 4. Initialize Scores
// //     const initialScores = { [studentId]: 0, [computerId]: 0 };
// //     setLiveScores(initialScores);
// //     scoresRef.current = initialScores;
    
// //     // 5. Start Game
// //     setGameMode('game');
// //     setIsGameActive(true);
// //     setTimeLeft(300);
// //     setStartTime(Date.now());
// // };
// const startComputerBattle = () => {
//     // 1. Pehle state reset karo taaki purana score/winner clear ho jaye
//     setIsComputerMode(true);
//     setWinnerId(null);
//     setCurrentQuestion(0);
//     setSelectedAnswers({});
//     setShowResults({});
//     setMasterAnswers({});
    
//     // 2. 🔥 IMPORTANT: Questions ko replace karo local questions se
//     setDbQuestions(battleQuestions); 

//     // 3. Player Names set karo
//     setPlayerNames({
//         [studentId.toString()]: user?.first_name || user?.first_name || "You",
//         [computerId.toString()]: "🤖 AI Bot"
//     });

//     // 4. 🔥 SCORE RESET: Purane match ka score 0 karo
//     const initialScores = { [studentId.toString()]: 0, [computerId.toString()]: 0 };
//     setLiveScores(initialScores);
//     scoresRef.current = initialScores; // Ref ko bhi 0 karo
    
//     // 5. Start game UI
//     setGameMode('game');
//     setIsGameActive(true);
//     setTimeLeft(300);
//     setStartTime(Date.now());
// };
//   /* ---------------- TIMER & HANDLERS ---------------- */

//   useEffect(() => {
//     if (isGameActive && timeLeft > 0) {
//       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//       return () => clearInterval(timer);
//     } else if (timeLeft === 0 && isGameActive) {
//       handleFinishGame();
//     }
//   }, [isGameActive, timeLeft]);
// useEffect(() => {
//     if (isComputerMode && isGameActive && !showResults[currentQuestions[currentQuestion]?.questionID]) {
//         const timer = setTimeout(() => {
//             // Computer 70% cases mein sahi answer dega
//             const isCorrect = Math.random() < 0.7; 
//             if (isCorrect) {
//                 const compScore = (scoresRef.current[computerId] || 0) + 10;
//                 scoresRef.current = { ...scoresRef.current, [computerId]: compScore };
//                 setLiveScores({ ...scoresRef.current });
//             }
//         }, 2000 + Math.random() * 2000); // 2-4 seconds delay

//         return () => clearTimeout(timer);
//     }
// }, [currentQuestion, isComputerMode, isGameActive]);
//   /* ---------------- SYNC LOGIC (FASTEST FINGER) ---------------- */
// useEffect(() => {
//     if (gameMode === 'lobby' && roomCode) {
//         connectBattleSocket(roomCode, (data) => {
//             if (data === 'START' || data.status === 'START') {
//                 startBattle(selectedMode);
//             } else if (data.battleCode) {
//                 // Room update logic
//                 setPlayers(data.players || []);
//                 if (data.questions) setDbQuestions(data.questions);
//                 if (data.playerNames) {
//                     setPlayerNames(data.playerNames);
//                 }
//                 // 🔥 LIVE SCORE FIX: Update scores state from server data
//                 if (data.scores) {
//                     console.log("🔥 Updated Scores from Server:", data.scores);
//                     console.log("Full Scores Map:", JSON.stringify(data.scores)); 
//                     setLiveScores(data.scores);
//                     scoresRef.current = data.scores;
//                 }

//                 if (typeof data.currentQuestionIndex === 'number') {
//                     if (data.currentQuestionIndex >= 10) {
//                         handleFinishGame();
//                     } else if(data.currentQuestionIndex !== currentQuestion){
//                         setCurrentQuestion(data.currentQuestionIndex);
//                         setShowResults({});
//                         setSelectedAnswers({});
//                     }
//                 }
//             }
//         });
//         sendJoinBattle(roomCode, studentEmail!);
//     }
//     return () => {
//         if (gameMode !== 'lobby' && gameMode !== 'game') {
//             disconnectBattleSocket();
//         }
//     };
// }, [gameMode, roomCode, currentQuestion]); // 🔥 added currentQuestion here to ensure index sync
//   const handleInvite = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/battle/create/${studentEmail}`, { method: 'POST' }); 
//       const code = await response.text();
//       setRoomCode(code);
//       setIsHost(true);
//       setGameMode('lobby');
//     } catch (error) { console.error("Invite Error:", error); }
//   };

//   const handleJoinWithCode = async (code: string) => {
//     try {
//       await fetch(`http://localhost:8080/api/battle/join/${code}/${studentEmail}`, { method: 'POST' });
//       setRoomCode(code);
//       setIsHost(false);
//       setGameMode('lobby');
//     } catch (error) { console.error("Join Error:", error); }
//   };
// // const handleAnswer = (answerIndex: number) => {
// //     const question = currentQuestions[currentQuestion];
// //     const questionId = question.questionID;
// //     const options = getOptionsArray(question);
// //     const selectedOptionText = options[answerIndex];
// //     // 1. Update states for UI
// //     setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
// //     setShowResults(prev => ({ ...prev, [questionId]: true }));
// //     setMasterAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
// //     sendAnswer(roomCode, studentEmail!, selectedOptionText);
// //   };
// // const handleAnswer = (answerIndex: number) => {
// //     const question = currentQuestions[currentQuestion];
// //     const options = getOptionsArray(question);
// //     const selectedOptionText = options[answerIndex];

// //     // 1. UI Updates
// //     setSelectedAnswers(prev => ({ ...prev, [question.questionID]: answerIndex }));
// //     setShowResults(prev => ({ ...prev, [question.questionID]: true }));
// //     setMasterAnswers(prev => ({ ...prev, [question.questionID]: answerIndex }));

// //     // 2. 🔥 LOCAL SCORE SYNC (For Single Player/Computer)
// //     const isCorrect = selectedOptionText === question.correctAnswer;
// //     if (isCorrect) {
// //         const newScore = (scoresRef.current[studentId] || 0) + 10;
// //         scoresRef.current = { ...scoresRef.current, [studentId]: newScore };
// //         setLiveScores({ ...scoresRef.current });
// //     }
// //     if (!isComputerMode) {
// //         sendAnswer(roomCode, studentEmail!, selectedOptionText);
// //     } else {
// //         // 🔥 AI Mode ke liye agla question apne aap aayega
// //         setTimeout(() => {
// //             if (currentQuestion < currentQuestions.length - 1) {
// //                 setCurrentQuestion(prev => prev + 1);
// //                 setShowResults({});
// //             } else {
// //                 handleFinishGame();
// //             }
// //         }, 1500);
// //     }
// //     sendAnswer(roomCode, studentEmail!, selectedOptionText);
// // };
// // const handleAnswer = (answerIndex: number) => {
// //     const question = currentQuestions[currentQuestion];
// //     if (!question) return;

// //     const options = getOptionsArray(question);
// //     const selectedOptionText = options[answerIndex];

// //     // 1. UI Updates
// //     setSelectedAnswers(prev => ({ ...prev, [question.questionID]: answerIndex }));
// //     setShowResults(prev => ({ ...prev, [question.questionID]: true }));
// //     setMasterAnswers(prev => ({ ...prev, [question.questionID]: answerIndex }));

// //     // 2. 🔥 LOCAL SCORE SYNC
// //     const isCorrect = selectedOptionText === question.correctAnswer;
// //     if (isCorrect) {
// //         const newScore = (scoresRef.current[studentId] || 0) + 10;
// //         scoresRef.current = { ...scoresRef.current, [studentId]: newScore };
// //         setLiveScores({ ...scoresRef.current });
// //     }

// //     // 3. 🔥 Mode based logic
// //     if (!isComputerMode) {
// //         // Multiplayer: Send to server
// //         sendAnswer(roomCode, studentEmail!, selectedOptionText);
// //     } else {
// //         // Computer Mode: Auto-advance questions
// //         setTimeout(() => {
// //             if (currentQuestion < currentQuestions.length - 1) {
// //                 setCurrentQuestion(prev => prev + 1);
// //                 setShowResults({});
// //             } else {
// //                 handleFinishGame();
// //             }
// //         }, 1500);
// //     }
// //     // ❌ Yahan se sendAnswer hata diya hai jo bahar tha
// // };
// // const handleAnswer = (answerIndex: number) => {
// //     const question = currentQuestions[currentQuestion];
// //     if (!question) return;

// //     const options = getOptionsArray(question);
// //     const selectedOptionText = options[answerIndex];

// //     // 1. UI Updates
// //     setSelectedAnswers(prev => ({ ...prev, [question.questionID]: answerIndex }));
// //     setShowResults(prev => ({ ...prev, [question.questionID]: true }));
// //     setMasterAnswers(prev => ({ ...prev, [question.questionID]: answerIndex }));

// //     // 2. Score Update
// //     const isCorrect = selectedOptionText === question.correctAnswer;
// //     if (isCorrect) {
// //         const currentScore = scoresRef.current[studentId] || 0;
// //         const newScore = currentScore + 10;
// //         scoresRef.current = { ...scoresRef.current, [studentId]: newScore };
// //         setLiveScores({ ...scoresRef.current });
// //     }

// //     // 3. Navigation Logic
// //     if (!isComputerMode) {
// //         sendAnswer(roomCode, studentEmail!, selectedOptionText);
// //     } else {
// //         // 🔥 AI Mode: Fix for Freeze
// //         setTimeout(() => {
// //             setCurrentQuestion((prevIndex) => {
// //                 const nextIndex = prevIndex + 1;
// //                 if (nextIndex < currentQuestions.length) {
// //                     setShowResults({}); // Reset result view for next question
// //                     return nextIndex;
// //                 } else {
// //                     handleFinishGame();
// //                     return prevIndex;
// //                 }
// //             });
// //         }, 1500);
// //     }
// // };
// const handleAnswer = (answerIndex: number) => {
//     const question = currentQuestions[currentQuestion];
//     if (!question) return;

//     const options = getOptionsArray(question);
//     const selectedOptionText = options[answerIndex];

//     setSelectedAnswers(prev => ({ ...prev, [question.questionID]: answerIndex }));
//     setShowResults(prev => ({ ...prev, [question.questionID]: true }));
//     setMasterAnswers(prev => ({ ...prev, [question.questionID]: answerIndex }));

//     const isCorrect = selectedOptionText === question.correctAnswer;
//     if (isCorrect) {
//         // Current score nikal kar 10 add karo
//         const currentScore = scoresRef.current[studentId] || 0;
//         const newScore = currentScore + 10;
        
//         scoresRef.current = { ...scoresRef.current, [studentId]: newScore };
//         setLiveScores({ ...scoresRef.current });
//     }

//     if (!isComputerMode) {
//         sendAnswer(roomCode, studentEmail!, selectedOptionText);
//     } else {
//         // 🔥 AI Mode: setTimeout ke andar prev use karo taaki freeze na ho
//         setTimeout(() => {
//             setCurrentQuestion((prev) => {
//                 if (prev < currentQuestions.length - 1) {
//                     setShowResults({});
//                     return prev + 1;
//                 } else {
//                     handleFinishGame();
//                     return prev;
//                 }
//             });
//         }, 1500);
//     }
// };
// const handleFinishGame = () => {
//     setIsGameActive(false);
//     setGameMode('report');
//     let highestScore = -1;
//     let currentWinner = null;
//     const currentScores = scoresRef.current;
//     const scoreEntries = Object.entries(currentScores);
    
//     console.log("🏆 Final Sync Scores:", currentScores);
//     console.log("Calculating Winner from Scores:", scoreEntries);
//     // Object.entries(liveScores).forEach(([pId, score]) => {
//     //   console.log(`Player ${pId} scored ${score} highest is ${highestScore}`);
//     //     if (score > highestScore) {
//     //         highestScore = score;
//     //         currentWinner = Number(pId);
//     //     }
//     // });
//     if (scoreEntries.length > 0) {
//         scoreEntries.forEach(([pId, score]) => {
//             const numericScore = Number(score);
//             const numericId = Number(pId);
            
//             if (numericScore > highestScore) {
//                 highestScore = numericScore;
//                 currentWinner = numericId;
//             }
//         });
//     }
//     console.log("🏁 Game Finished! Winner ID:", currentWinner, "with score:", highestScore);
//     setWinnerId(currentWinner);
//     setMasterAnswers(finalAnswers => {
//       const finalScore = currentQuestions.reduce((acc, q) => {
//         const selectedIdx = finalAnswers[q.questionID];
//         if (selectedIdx === undefined) return acc;
//         const options = getOptionsArray(q);
//         return options[selectedIdx] === q.correctAnswer ? acc + 10 : acc;
//       }, 0);

//       if (studentEmail) {
//         createBattleEntry(studentEmail, "COMPLETED", finalScore);
//       }
//       return finalAnswers; // Important to return state
//     });
//   };

//   const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

//   /* ---------------- RENDERING ---------------- */

//   if (gameMode === 'lobby') {
//     return (
//       <BattleLobby 
//         roomCode={roomCode} 
//         onStart={() => fetch(`http://localhost:8080/api/battle/start/${roomCode}/${studentEmail}`, { method: 'POST' })} 
//         onCancel={() => setGameMode('menu')} 
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
//         selectedAnswers={masterAnswers}
//         timeTaken={Math.floor((Date.now() - startTime) / 1000)} 
//         totalQuestions={currentQuestions.length} 
//         winnerId={winnerId}
//         playerNames= {playerNames}
//         onBack={() => setGameMode('menu')} 
//         onPlayAgain={() => {
//           setGameMode('menu'); // Go back to menu to select mode
//           setCurrentQuestion(0);
//           setSelectedAnswers({});
//           setMasterAnswers({});
//           setShowResults({});
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
//     // 🔥 Safety Check: Agar questions load nahi hue toh Loading dikhao
//     if (!currentQuestions || currentQuestions.length === 0 || !currentQuestions[currentQuestion]) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <Zap className="w-12 h-12 text-primary animate-bounce mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold">Loading Battle Arena...</h2>
//                 </div>
//             </div>
//         );
//     }

//     // ... baaki ka render logic wahi rahega
//     return (
//       <div className="min-h-screen bg-background pt-20 pb-16">
//         <div className="container mx-auto px-4 max-w-4xl">
//           {/* Battle Header */}
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <Badge variant="secondary" className="mb-2"><Swords className="w-4 h-4 mr-2" />Quiz Battle</Badge>
//               <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {currentQuestions.length}</h2>
//             </div>
//             <Card className="p-4 bg-gradient-card">
//               <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{formatTime(timeLeft)}</span></div>
//             </Card>
//           </div>

              
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
//             {players.map((pId) => (
//               <Card key={pId} className={`p-2 border-2 transition-all duration-300 ${pId === studentId ? 'border-primary bg-primary/5 shadow-md scale-105' : 'border-transparent bg-muted/50'}`}>
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs font-bold truncate">
//                     {/* 🔥 Now using playerNames map */}
//                     {playerNames[pId.toString()] || playerNames[pId] || `Player ${pId.toString().slice(-3)}`}
//                   </span>
//                   <Badge variant="secondary" className="bg-primary/20 text-primary font-mono">
//                     {liveScores[pId.toString()] ?? liveScores[pId] ?? 0}
//               </Badge>
//             </div>
//         </Card>
//     ))}
// </div>

//           <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2 mb-8" />

//           <Card className="p-8 bg-gradient-card mb-6">
//             <div className="flex items-start gap-4 mb-6">
//               <Badge variant="outline" className="text-lg px-3 py-1">{currentQuestion + 1}</Badge>
//               <h2 className="text-2xl font-semibold flex-1">{question.questionText}</h2>
        
//             </div>
//             <div className="space-y-3">
//               {options.map((option, idx) => (
//                 <Button 
//                   key={idx} 
//                   variant="outline" 
//                   onClick={() => !isAnswered && handleAnswer(idx)} 
//                   disabled={isAnswered}
//                 >
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
//             <h1 className="text-4xl font-bold mb-6">Battle Mode Activated</h1>

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
//                     <Button onClick={startComputerBattle} className="w-full font-bold">
//           Start Playing
//         </Button>
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
import { useState, useEffect, useRef } from 'react';
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
  { id: 1, title: 'You vs Computer', description: 'Jump into a match with computer', icon: Zap, color: 'bg-yellow-500', maxPlayers: 5, duration: '5 minutes', questions: 10 },
  { id: 2, title: 'Private Room', description: 'Create or join a room with friends', icon: Users, color: 'bg-blue-500', maxPlayers: 8, duration: '10 minutes', questions: 10 },
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
  const [playerNames, setPlayerNames] = useState<{ [key: string]: string }>({});
  
  const studentId = Number(user?.student_id);
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const [isComputerMode, setIsComputerMode] = useState(false);
  const computerId = 999;
  // const currentQuestions = dbQuestions.length > 0 ? dbQuestions : (isComputerMode ? battleQuestions : []);
  const currentQuestions = isComputerMode ? battleQuestions : dbQuestions;
  const scoresRef = useRef<{ [key: number]: number }>({});

  /* ---------------- HANDLERS ---------------- */

  const startBattle = (modeId: number) => {
    setIsComputerMode(false);
    setGameMode('game');
    setIsGameActive(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults({});
    setTimeLeft(modeId === 2 ? 600 : 300);
    setStartTime(Date.now());
  };

  // const startComputerBattle = () => {
  //   // 🔥 Force Reset for New Match
  //   setIsComputerMode(true);
  //   setWinnerId(null);
  //   setCurrentQuestion(0);
  //   setSelectedAnswers({});
  //   setShowResults({});
  //   setMasterAnswers({});
    
  //   // Set Local Questions
  //   setDbQuestions(battleQuestions); 

  //   setPlayers([studentId, computerId]);
  //   setPlayerNames({
  //       [studentId.toString()]: user?.first_name || "You",
  //       [computerId.toString()]: "🤖 AI Bot"
  //   });

  //   const initialScores = { [studentId]: 0, [computerId]: 0 };
  //   setLiveScores(initialScores);
  //   scoresRef.current = initialScores;
    
  //   setGameMode('game');
  //   setIsGameActive(true);
  //   setTimeLeft(300);
  //   setStartTime(Date.now());
  // };
// const startComputerBattle = () => {
//     // 1. Sabse pehle questions ko state mein bharo
//     setDbQuestions(battleQuestions); 
//     setIsComputerMode(true);
    
//     // 2. Scores aur players reset karo
//     const initialScores = { [studentId.toString()]: 0, [computerId.toString()]: 0 };
//     setLiveScores(initialScores);
//     scoresRef.current = initialScores;
//     setPlayers([studentId, computerId]);
//     setWinnerId(null);
    
//     // 3. User aur AI ka naam setup karo
//     setPlayerNames({
//         [studentId.toString()]: user?.first_name || "You",
//         [computerId.toString()]: "🤖 AI Bot"
//     });

//     // 4. Sab clear karke 10ms baad game start karo
//     setCurrentQuestion(0);
//     setSelectedAnswers({});
//     setShowResults({});
//     setMasterAnswers({});
//     setTimeLeft(300);
//     setStartTime(Date.now());

//     // 🔥 Chhota sa delay taaki questions array ready ho jaye render ke liye
//     setTimeout(() => {
//         setGameMode('game');
//         setIsGameActive(true);
//     }, 50); 
// };
// const startComputerBattle = () => {
//     console.log("🚀 Starting Computer Battle...");
    
//     // 1. Force Load Questions
//     setDbQuestions(battleQuestions); 
//     setIsComputerMode(true);
    
//     // 2. Setup Players
//     setPlayers([studentId, computerId]);
//     console.log("Current Student ID:", studentId);

//     // 3. Setup Names
//     const namesMap = {
//         [studentId.toString()]: user?.first_name || "You",
//         [computerId.toString()]: "🤖 AI Bot"
//     };
//     setPlayerNames(namesMap);
//     console.log("Player Names Map:", namesMap);

//     // 4. Initialize Scores
//     const initialScores = { [studentId.toString()]: 0, [computerId.toString()]: 0 };
//     setLiveScores(initialScores);
//     scoresRef.current = initialScores;
    
//     // 5. Reset Indexes
//     setWinnerId(null);
//     setCurrentQuestion(0);
//     setSelectedAnswers({});
//     setShowResults({});
//     setMasterAnswers({});
//     setTimeLeft(300);
//     setStartTime(Date.now());

//     // 🔥 100ms ka delay taaki state update ho jaye
//     setTimeout(() => {
//         console.log("Question Array Length check:", battleQuestions.length);
//         setGameMode('game');
//         setIsGameActive(true);
//     }, 100); 
// };
// const startComputerBattle = () => {
//     console.log("🚀 Starting Computer Battle...");
    
//     // 🔥 FIX 1: NaN check. Agar studentId NaN hai toh use 101 ya koi default do
//     const validStudentId = isNaN(studentId) ? 9 : studentId;
    
//     // 🔥 FIX 2: Data Check. Agar battleQuestions empty hai toh dummy use karo
//     const questionsToUse = battleQuestions ;
    
//     setDbQuestions(questionsToUse); 
//     setIsComputerMode(true);
//     setPlayers([validStudentId, computerId]);

//     setPlayerNames({
//         [validStudentId.toString()]: user?.first_name || "You",
//         [computerId.toString()]: "🤖 AI Bot"
//     });

//     const initialScores = { [validStudentId.toString()]: 0, [computerId.toString()]: 0 };
//     setLiveScores(initialScores);
//     scoresRef.current = initialScores;
    
//     setWinnerId(null);
//     setCurrentQuestion(0);
//     setSelectedAnswers({});
//     setShowResults({});
//     setMasterAnswers({});
//     setTimeLeft(300);
//     setStartTime(Date.now());

//     setTimeout(() => {
//         setGameMode('game');
//         setIsGameActive(true);
//     }, 100); 
// };
const startComputerBattle = async () => {
    console.log("📡 Fetching questions from DB for AI Battle...");
    
    try {
        // 🔥 Aapke backend ki API jo 10 random sawal deti hai
        const response = await fetch('http://localhost:8080/api/questions/quiz'); 
        const questionsFromDB = await response.json();

        if (questionsFromDB && questionsFromDB.length > 0) {
            setDbQuestions(questionsFromDB);
            setIsComputerMode(true);
            
            // Dummy ID fix agar NaN hai
            const safeId = isNaN(studentId) || !studentId ? 101 : studentId;
            setPlayers([safeId, computerId]);
            
            setPlayerNames({
                [safeId.toString()]: user?.first_name || "You",
                [computerId.toString()]: "🤖 AI Bot"
            });

            // Reset States
            setLiveScores({ [safeId.toString()]: 0, [computerId.toString()]: 0 });
            scoresRef.current = { [safeId.toString()]: 0, [computerId.toString()]: 0 };
            setCurrentQuestion(0);
            setSelectedAnswers({});
            setShowResults({});
            setWinnerId(null);

            // Start Game
            setGameMode('game');
            setIsGameActive(true);
            setTimeLeft(300);
            setStartTime(Date.now());
            
            console.log("✅ DB Questions loaded successfully!");
        } else {
            alert("Database mein questions nahi mile!");
        }
    } catch (error) {
        console.error("❌ DB Fetch Error:", error);
        alert("Backend se questions nahi mil rahe. Check if server is running!");
    }
};
  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isGameActive) {
      handleFinishGame();
    }
  }, [isGameActive, timeLeft]);

  // AI Logic
  useEffect(() => {
    if (isComputerMode && isGameActive && !showResults[currentQuestions[currentQuestion]?.questionID]) {
        const timer = setTimeout(() => {
            const isCorrect = Math.random() < 0.7; 
            if (isCorrect) {
                const compScore = (scoresRef.current[computerId] || 0) + 10;
                scoresRef.current = { ...scoresRef.current, [computerId]: compScore };
                setLiveScores({ ...scoresRef.current });
            }
        }, 2000 + Math.random() * 2000); 
        return () => clearTimeout(timer);
    }
  }, [currentQuestion, isComputerMode, isGameActive]);

  /* ---------------- SYNC LOGIC ---------------- */
  useEffect(() => {
    if (gameMode === 'lobby' && roomCode) {
        connectBattleSocket(roomCode, (data) => {
            if (data === 'START' || data.status === 'START') {
                startBattle(2);
            } else if (data.battleCode) {
                setPlayers(data.players || []);
                if (data.questions) setDbQuestions(data.questions);
                if (data.playerNames) setPlayerNames(data.playerNames);
                if (data.scores) {
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
        if (gameMode !== 'lobby' && gameMode !== 'game') disconnectBattleSocket();
    };
  }, [gameMode, roomCode, currentQuestion]);

  const handleAnswer = (answerIndex: number) => {
    const question = currentQuestions[currentQuestion];
    if (!question) return;

    const options = getOptionsArray(question);
    const selectedOptionText = options[answerIndex];

    setSelectedAnswers(prev => ({ ...prev, [question.questionID]: answerIndex }));
    setShowResults(prev => ({ ...prev, [question.questionID]: true }));
    setMasterAnswers(prev => ({ ...prev, [question.questionID]: answerIndex }));

    const isCorrect = selectedOptionText === question.correctAnswer;
    if (isCorrect) {
        const currentScore = scoresRef.current[studentId] || 0;
        const newScore = currentScore + 10;
        scoresRef.current = { ...scoresRef.current, [studentId]: newScore };
        setLiveScores({ ...scoresRef.current });
    }

    if (!isComputerMode) {
        sendAnswer(roomCode, studentEmail!, selectedOptionText);
    } else {
        // 🔥 Fix for Next Question Freeze using functional update
        setTimeout(() => {
            setCurrentQuestion((prev) => {
                if (prev < currentQuestions.length - 1) {
                    setShowResults({});
                    return prev + 1;
                } else {
                    handleFinishGame();
                    return prev;
                }
            });
        }, 1500);
    }
  };

  const handleFinishGame = () => {
    setIsGameActive(false);
    setGameMode('report');
    let highestScore = -1;
    let currentWinner = null;
    const scoreEntries = Object.entries(scoresRef.current);
    
    if (scoreEntries.length > 0) {
        scoreEntries.forEach(([pId, score]) => {
            if (score > highestScore) {
                highestScore = score;
                currentWinner = Number(pId);
            }
        });
    }
    setWinnerId(currentWinner);
  };

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  /* ---------------- RENDERING ---------------- */

  if (gameMode === 'lobby') return <BattleLobby roomCode={roomCode} onStart={() => fetch(`http://localhost:8080/api/battle/start/${roomCode}/${studentEmail}`, { method: 'POST' })} onCancel={() => setGameMode('menu')} isHost={isHost} players={players} />;
  if (gameMode === 'join') return <JoinBattleLobby onJoin={(code) => { setRoomCode(code); setIsHost(false); setGameMode('lobby'); }} onCancel={() => setGameMode('menu')} />;
  if (gameMode === 'report') return <BattleReport questions={currentQuestions} selectedAnswers={masterAnswers} timeTaken={Math.floor((Date.now() - startTime) / 1000)} totalQuestions={currentQuestions.length} winnerId={winnerId} playerNames={playerNames} onBack={() => setGameMode('menu')} onPlayAgain={() => setGameMode('menu')} />;


  if (gameMode === 'game') {
    // 🔥 Direct access logic
    const activeQuestions = dbQuestions.length > 0 ? dbQuestions : battleQuestions;
    const question = activeQuestions[currentQuestion];

    if (!question) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold">No Questions Found!</h2>
                <p>Check if battleQuestions array is exported correctly.</p>
                <Button onClick={() => setGameMode('menu')} className="mt-4">Go Back</Button>
            </div>
        );
    }
    // ... UI same rahega
    // ... baaki ka UI (Options display etc.) same rahega
    if (!currentQuestions || currentQuestions.length === 0 || !currentQuestions[currentQuestion]) {
        return <div className="min-h-screen flex items-center justify-center font-bold">Initializing Battle...</div>;
    }
    //const question = currentQuestions[currentQuestion];
    const isAnswered = showResults[question.questionID];

    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
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
              <Card key={pId} className={`p-2 border-2 ${pId === studentId ? 'border-primary bg-primary/5 shadow-md' : 'border-transparent bg-muted/50'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold truncate">
                    {playerNames[pId.toString()] || playerNames[pId] || `Player ${pId.toString().slice(-3)}`}
                  </span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-mono">
                    {liveScores[pId.toString()] ?? liveScores[pId] ?? 0}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2 mb-8" />

          <Card className="p-8 bg-gradient-card mb-6">
            <h2 className="text-2xl font-semibold mb-6">{question.questionText}</h2>
            <div className="space-y-3">
              {getOptionsArray(question).map((option, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  className={`justify-start text-left h-auto py-4 px-6 text-lg w-full ${selectedAnswers[question.questionID] === idx ? 'border-primary bg-primary/5' : ''}`} 
                  onClick={() => !isAnswered && handleAnswer(idx)} 
                  disabled={isAnswered}
                >
                  <span className="font-bold mr-4 text-primary">{String.fromCharCode(65 + idx)}.</span>{option}
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
            <Badge variant="secondary" className="mb-4"><Swords className="w-4 h-4 mr-2" />Battle Arena</Badge>
            <h1 className="text-4xl font-bold mb-6 text-primary">Ready for a Duel?</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
              {battleModes.map((mode) => (
                <Card key={mode.id} className="p-8 bg-gradient-card group hover:border-primary/50 transition-all shadow-lg border-2">
                  <div className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <mode.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{mode.title}</h3>
                  {mode.id === 2 ? (
                    <div className="space-y-2">
                      <Button onClick={() => {
                        const hostId = studentEmail;
                        fetch(`http://localhost:8080/api/battle/create/${hostId}`, { method: 'POST' })
                          .then(res => res.text())
                          .then(code => { setRoomCode(code); setIsHost(true); setGameMode('lobby'); });
                      }} className="w-full font-bold">Host Room</Button>
                      <Button onClick={() => setGameMode('join')} variant="outline" className="w-full font-bold">Join Room</Button>
                    </div>
                  ) : (
                    <Button onClick={startComputerBattle} className="w-full font-bold shadow-md shadow-yellow-500/20">
                      Start Playing
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