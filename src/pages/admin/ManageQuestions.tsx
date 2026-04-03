// import { useState, useEffect } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Plus, Edit, Trash2, BookOpen, Layers, ArrowLeft, Loader2, Search, HelpCircle, CheckCircle2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // Interfaces
// interface Subject {
//   id?: number; subjectId?: number; subjectID?: number; name?: string; subjectName?: string;
// }
// interface Topic {
//   id?: number; topicId?: number; topicID?: number; subjectId?: number; subjectID?: number; name?: string; topicName?: string;
// }
// interface Question {
//   questionID?: number; id?: number;
//   topicId?: number; topicID?: number;
//   questionText: string;
//   option1: string; option2: string; option3: string; option4: string;
//   correctAnswer: string;
// }

// export const ManageQuestions = () => {
//   const navigate = useNavigate();
  
//   // Navigation & Data States
//   const [subjects, setSubjects] = useState<Subject[]>([]);
//   const [topics, setTopics] = useState<Topic[]>([]);
//   const [questions, setQuestions] = useState<Question[]>([]);
  
//   const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
//   const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  
//   // UI States
//   const [isLoading, setIsLoading] = useState(true);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Modal States
//   const [modalType, setModalType] = useState<'add' | 'update' | 'delete' | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({});

//   // 1. Fetch Subjects on Load
//   useEffect(() => {
//     const fetchSubjects = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch('http://localhost:8080/api/subjects');
//         const data = await response.json();
//         setSubjects(Array.isArray(data) ? data : []);
//       } catch (error) { console.error(error); } 
//       finally { setIsLoading(false); }
//     };
//     fetchSubjects();
//   }, []);

//   // 2. Fetch Topics by Subject
//   const handleSubjectClick = async (subject: Subject) => {
//     setSelectedSubject(subject);
//     setIsLoading(true);
//     try {
//       const subId = subject.id || subject.subjectId || subject.subjectID;
//       const response = await fetch(`http://localhost:8080/api/topics/subject/${subId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setTopics(Array.isArray(data) ? data : []);
//       } else setTopics([]);
//     } catch (error) { console.error(error); setTopics([]); } 
//     finally { setIsLoading(false); }
//   };

//   // 3. Fetch Questions by Topic (🚨 Replace with Fiza's API 🚨)
//   const handleTopicClick = async (topic: Topic) => {
//     setSelectedTopic(topic);
//     setIsLoading(true);
//     setSearchQuery('');
//     try {
//       const topId = topic.id || topic.topicId || topic.topicID;
//       // TODO: PENDING API FROM FIZA (Assuming standard pattern for now)
//       // const response = await fetch(`http://localhost:8080/api/questions/topic/${topId}`);
//       const response = await fetch(`http://localhost:8080/api/question/topic/id/${topId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setQuestions(Array.isArray(data) ? data : []);
//       } else setQuestions([]);
//     } catch (error) { console.error(error); setQuestions([]); } 
//     finally { setIsLoading(false); }
//   };

//   const refreshQuestions = async () => {
//     if (!selectedTopic) return;
//     const topId = selectedTopic.id || selectedTopic.topicId || selectedTopic.topicID;
//     try {
//       // const response = await fetch(`http://localhost:8080/api/questions/topic/${topId}`);
//       const response = await fetch(`http://localhost:8080/api/question/topic/id/${topId}`);
//       const data = await response.json();
//       setQuestions(Array.isArray(data) ? data : []);
//     } catch (error) { console.error(error); }
//   };

//   // Modal Handlers
//   const openModal = (type: 'add' | 'update' | 'delete', question?: Question) => {
//     setModalType(type);
//     if (question) setCurrentQuestion(question);
//     else setCurrentQuestion({ questionText: '', option1: '', option2: '', option3: '', option4: '', correctAnswer: '' });
//   };

//   const closeModal = () => {
//     setModalType(null);
//     setCurrentQuestion({});
//   };

//   // Action Submit (🚨 Replace URLs with Fiza's APIs 🚨)
//   const handleActionSubmit = async () => {
//     setIsProcessing(true);
//     const topId = selectedTopic?.id || selectedTopic?.topicId || selectedTopic?.topicID;
//     const qId = currentQuestion.id || currentQuestion.questionID;

//     try {
//       if (modalType === 'add' || modalType === 'update') {
//         if (!currentQuestion.questionText || !currentQuestion.correctAnswer) {
//           alert("Question text and Correct Answer are required!");
//           setIsProcessing(false); return;
//         }

//         const payload = { ...currentQuestion, topicId: topId };
//         const method = modalType === 'add' ? 'POST' : 'PUT';
//         const url = modalType === 'add' 
//             ? 'http://localhost:8080/api/questions' 
//             : `http://localhost:8080/api/questions/${qId}`;

//         await fetch(url, {
//           method: method,
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload)
//         });
//       } else if (modalType === 'delete') {
//         await fetch(`http://localhost:8080/api/questions/${qId}`, { method: 'DELETE' });
//       }

//       closeModal();
//       await refreshQuestions();
//     } catch (error) {
//       console.error(error); alert("Action failed.");
//     } finally { setIsProcessing(false); }
//   };

//   // Filter questions based on search
//   const filteredQuestions = questions.filter(q => 
//     q.questionText?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-background p-8 pt-24 relative">
//       <div className="max-w-6xl mx-auto">
        
//         {/* Navigation Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <Button variant="ghost" size="icon" onClick={() => {
//               if (selectedTopic) setSelectedTopic(null);
//               else if (selectedSubject) setSelectedSubject(null);
//               else navigate('/admin-dashboard');
//             }}>
//             <ArrowLeft className="w-6 h-6 text-zinc-400 hover:text-white" />
//           </Button>
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">
//               {selectedTopic ? `Questions: ${selectedTopic.topicName || selectedTopic.name}` 
//                : selectedSubject ? `Topics: ${selectedSubject.subjectName || selectedSubject.name}` 
//                : 'Select Subject'}
//             </h1>
//             <p className="text-zinc-400">
//               {selectedTopic ? 'Manage questions for this topic' 
//                : selectedSubject ? 'Select a topic to view questions' 
//                : 'Select a subject to begin'}
//             </p>
//           </div>
//         </div>

//         {isLoading && <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-red-500 animate-spin" /></div>}

//         {/* STEP 1: SHOW SUBJECTS */}
//         {!isLoading && !selectedSubject && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {subjects.map((s, i) => (
//               <Card key={i} onClick={() => handleSubjectClick(s)} className="p-6 bg-zinc-950 border-zinc-800 hover:border-red-500/50 cursor-pointer group">
//                 <div className="flex gap-4 items-center">
//                   <div className="p-3 rounded-lg bg-red-500/10"><BookOpen className="text-red-500 w-6 h-6" /></div>
//                   <h3 className="text-xl font-semibold text-white group-hover:text-red-400">{s.subjectName || s.name}</h3>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}

//         {/* STEP 2: SHOW TOPICS */}
//         {!isLoading && selectedSubject && !selectedTopic && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {topics.length === 0 ? <p className="text-zinc-500">No topics found.</p> : topics.map((t, i) => (
//               <Card key={i} onClick={() => handleTopicClick(t)} className="p-6 bg-zinc-950 border-zinc-800 hover:border-red-500/50 cursor-pointer group">
//                 <div className="flex gap-4 items-center">
//                   <div className="p-3 rounded-lg bg-red-500/10"><Layers className="text-red-500 w-6 h-6" /></div>
//                   <h3 className="text-xl font-semibold text-white group-hover:text-red-400">{t.topicName || t.name}</h3>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}

//         {/* STEP 3: SHOW QUESTIONS */}
//         {!isLoading && selectedTopic && (
//           <>
//             {/* Top Bar: Search & Add */}
//             <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
//               <div className="relative w-full md:max-w-md">
//                 <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
//                 <input 
//                   type="text" placeholder="Search questions..." 
//                   value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:ring-1 focus:ring-red-500"
//                 />
//               </div>
//               <Button onClick={() => openModal('add')} className="bg-red-600 hover:bg-red-700 text-white py-3 h-auto">
//                 <Plus className="w-5 h-5 mr-2" /> Add Question
//               </Button>
//             </div>

//             {/* Questions List */}
//             {filteredQuestions.length === 0 ? (
//               <div className="text-center py-20 text-zinc-500">
//                 <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
//                 <p className="text-xl">No questions found. Add a new one!</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredQuestions.map((q, i) => (
//                   <Card key={i} className="p-6 bg-zinc-900 border border-zinc-800 group hover:border-zinc-700 transition-colors">
//                     <div className="flex justify-between items-start gap-4 mb-4">
//                       <h3 className="text-lg font-semibold text-white flex-1">{i + 1}. {q.questionText}</h3>
//                       <div className="flex gap-2 shrink-0">
//                         <Button variant="ghost" size="icon" onClick={() => openModal('update', q)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
//                           <Edit className="w-4 h-4" />
//                         </Button>
//                         <Button variant="ghost" size="icon" onClick={() => openModal('delete', q)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </div>
                    
//                     {/* Options Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                       {[q.option1, q.option2, q.option3, q.option4].map((opt, idx) => (
//                         <div key={idx} className={`p-3 rounded-md border ${q.correctAnswer === opt ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-zinc-950 border-zinc-800 text-zinc-400'}`}>
//                           <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
//                           {q.correctAnswer === opt && <CheckCircle2 className="w-4 h-4 inline ml-2" />}
//                         </div>
//                       ))}
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* MODAL FOR ADD/UPDATE/DELETE */}
//       {modalType !== null && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
//           <Card className="w-full max-w-2xl p-6 bg-zinc-950 border-2 border-zinc-800 shadow-2xl my-8">
//             <h2 className="text-2xl font-bold text-white mb-6">
//               {modalType === 'add' ? 'Add New Question' : modalType === 'update' ? 'Update Question' : <span className="text-red-500">Delete Question</span>}
//             </h2>

//             {modalType === 'delete' ? (
//               <p className="text-zinc-300">Are you sure you want to delete this question? <br/><br/><strong className="text-white">{currentQuestion.questionText}</strong></p>
//             ) : (
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-zinc-400">Question Text</label>
//                   <textarea 
//                     rows={3}
//                     className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-1 focus:ring-red-500"
//                     value={currentQuestion.questionText || ''}
//                     onChange={(e) => setCurrentQuestion({...currentQuestion, questionText: e.target.value})}
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {['option1', 'option2', 'option3', 'option4'].map((opt, idx) => (
//                     <div key={opt} className="space-y-2">
//                       <label className="text-sm font-medium text-zinc-400">Option {idx + 1}</label>
//                       <input 
//                         type="text"
//                         className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-1 focus:ring-red-500"
//                         value={currentQuestion[opt as keyof Question] as string || ''}
//                         onChange={(e) => setCurrentQuestion({...currentQuestion, [opt]: e.target.value})}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="space-y-2 mt-4">
//                   <label className="text-sm font-medium text-zinc-400">Correct Answer (Must match one option exactly)</label>
//                   <select 
//                     className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-1 focus:ring-red-500"
//                     value={currentQuestion.correctAnswer || ''}
//                     onChange={(e) => setCurrentQuestion({...currentQuestion, correctAnswer: e.target.value})}
//                   >
//                     <option value="">-- Select Correct Option --</option>
//                     {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((o, i) => (
//                       o ? <option key={i} value={o}>{o}</option> : null
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}

//             <div className="flex gap-3 mt-8">
//               <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:text-white" onClick={closeModal}>Cancel</Button>
//               <Button className={`w-full ${modalType === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700 text-white'} font-semibold`} onClick={handleActionSubmit} disabled={isProcessing}>
//                 {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : modalType === 'delete' ? 'Confirm Delete' : 'Save Question'}
//               </Button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, BookOpen, Layers, ArrowLeft, Loader2, Search, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 🔥 Interfaces strictly matched with Fiza's JSON
interface Subject {
  id?: number; subjectId?: number; subjectID?: number; name?: string; subjectName?: string;
}
interface Topic {
  id?: number; topicId?: number; topicID?: number; name?: string; topicName?: string;
}
interface Question {
  questionID?: number; 
  questionText: string;
  option1: string; option2: string; option3: string; option4: string;
  correctAnswer: string;
  topicName?: string;
}

export const ManageQuestions = () => {
  const navigate = useNavigate();
  
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [modalType, setModalType] = useState<'add' | 'update' | 'delete' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({});

  // 1. Fetch Subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/subjects');
        const data = await response.json();
        setSubjects(Array.isArray(data) ? data : []);
      } catch (error) { console.error(error); } 
      finally { setIsLoading(false); }
    };
    fetchSubjects();
  }, []);

  // 2. Fetch Topics
  // const handleSubjectClick = async (subject: Subject) => {
  //   setSelectedSubject(subject);
  //   setIsLoading(true);
  //   try {
  //     const subId = subject.id || subject.subjectId || subject.subjectID;
  //     const response = await fetch(`http://localhost:8080/api/topics/subject/${subId}`);
  //     const data = await response.json();
  //     setTopics(Array.isArray(data) ? data : []);
  //   } catch (error) { console.error(error); setTopics([]); } 
  //   finally { setIsLoading(false); }
  // };
const handleSubjectClick = async (subject: Subject) => {
  const subId = subject.id || subject.subjectId || subject.subjectID;
  if (!subId) return; // ID missing safety

  setSelectedSubject(subject);
  setIsLoading(true);
  try {
    const response = await fetch(`http://localhost:8080/api/topics/subject/${subId}`);
    const data = await response.json();
    
    // 🔥 Sabse important check: crash se bachne ke liye
    setTopics(Array.isArray(data) ? data : []); 
  } catch (error) {
    console.error("Topics fetch failed:", error);
    setTopics([]);
  } finally {
    setIsLoading(false);
  }
};
  // 3. Fetch Questions (Fiza's Singular "question" API)
  const handleTopicClick = async (topic: Topic) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    setSearchQuery('');
    try {
      const topId = topic.id || topic.topicId || topic.topicID;
      const response = await fetch(`http://localhost:8080/api/question/topic/id/${topId}`);
      const data = await response.json();
      setQuestions(Array.isArray(data) ? data : []);
    } catch (error) { console.error(error); setQuestions([]); } 
    finally { setIsLoading(false); }
  };

  const refreshQuestions = async () => {
    if (!selectedTopic) return;
    const topId = selectedTopic.id || selectedTopic.topicId || selectedTopic.topicID;
    const response = await fetch(`http://localhost:8080/api/question/topic/id/${topId}`);
    const data = await response.json();
    setQuestions(Array.isArray(data) ? data : []);
  };

  const openModal = (type: 'add' | 'update' | 'delete', question?: Question) => {
    setModalType(type);
    if (question) setCurrentQuestion(question);
    else setCurrentQuestion({ questionText: '', option1: '', option2: '', option3: '', option4: '', correctAnswer: '' });
  };

  const closeModal = () => {
    setModalType(null);
    setCurrentQuestion({});
  };

  // 🔥 Fiza's ADD, UPDATE & DELETE APIs INTEGRATED 🔥
  const handleActionSubmit = async () => {
    setIsProcessing(true);
    const topId = selectedTopic?.id || selectedTopic?.topicId || selectedTopic?.topicID;
    const qId = currentQuestion.questionID;

    try {
      if (modalType === 'add') {
        // POST /api/question
        await fetch('http://localhost:8080/api/question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...currentQuestion, topicId: topId })
        });
      } else if (modalType === 'update') {
        // PUT /api/question/update/{id}
        await fetch(`http://localhost:8080/api/question/update/${qId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentQuestion)
        });
      } else if (modalType === 'delete') {
        // DELETE /api/question/delete/{id}
        await fetch(`http://localhost:8080/api/question/delete/${qId}`, { method: 'DELETE' });
      }

      closeModal();
      await refreshQuestions();
    } catch (error) {
      console.error(error); alert("Action failed.");
    } finally { setIsProcessing(false); }
  };

  const filteredQuestions = questions.filter(q => 
    q.questionText?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-8 pt-24 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => {
              if (selectedTopic) setSelectedTopic(null);
              else if (selectedSubject) setSelectedSubject(null);
              else navigate('/admin-dashboard');
            }}>
            <ArrowLeft className="w-6 h-6 text-zinc-400 hover:text-white" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {selectedTopic ? `Questions: ${selectedTopic.topicName || selectedTopic.name}` 
               : selectedSubject ? `Topics: ${selectedSubject.subjectName || selectedSubject.name}` 
               : 'Select Subject'}
            </h1>
            <p className="text-zinc-400">
              {selectedTopic ? 'Manage questions for this topic' 
               : selectedSubject ? 'Select a topic to view questions' 
               : 'Select a subject to begin'}
            </p>
          </div>
        </div>

        {isLoading && <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-yellow-500 animate-spin" /></div>}

        {!isLoading && !selectedSubject && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((s, i) => (
              <Card key={i} onClick={() => handleSubjectClick(s)} className="p-6 bg-zinc-950 border-zinc-800 hover:border-yellow-500/50 cursor-pointer group">
                <div className="flex gap-4 items-center">
                  <div className="p-3 rounded-lg bg-yellow-500/10"><BookOpen className="text-yellow-500 w-6 h-6" /></div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400">{s.subjectName || s.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && selectedSubject && !selectedTopic && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topics.length === 0 ? <p className="text-zinc-500">No topics found.</p> : topics.map((t, i) => (
              <Card key={i} onClick={() => handleTopicClick(t)} className="p-6 bg-zinc-950 border-zinc-800 hover:border-yellow-500/50 cursor-pointer group">
                <div className="flex gap-4 items-center">
                  <div className="p-3 rounded-lg bg-yellow-500/10"><Layers className="text-yellow-500 w-6 h-6" /></div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400">{t.topicName || t.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && selectedTopic && (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                <input 
                  type="text" placeholder="Search questions..." 
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:ring-1 focus:ring-yellow-500"
                />
              </div>
              <Button onClick={() => openModal('add')} className="bg-yellow-600 hover:bg-yellow-700 text-zinc-950 font-bold py-3 h-auto">
                <Plus className="w-5 h-5 mr-2" /> Add Question
              </Button>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="text-center py-20 text-zinc-500">
                <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-xl">No questions found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((q, i) => (
                  <Card key={i} className="p-6 bg-zinc-900 border border-zinc-800 group hover:border-zinc-700 transition-colors">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h3 className="text-lg font-semibold text-white flex-1">{i + 1}. {q.questionText}</h3>
                      <div className="flex gap-2 shrink-0">
                        <Button variant="ghost" size="icon" onClick={() => openModal('update', q)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openModal('delete', q)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      {[q.option1, q.option2, q.option3, q.option4].map((opt, idx) => (
                        <div key={idx} className={`p-3 rounded-md border ${q.correctAnswer === opt ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-zinc-950 border-zinc-800 text-zinc-400'}`}>
                          <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                          {q.correctAnswer === opt && <CheckCircle2 className="w-4 h-4 inline ml-2" />}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {modalType !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <Card className="w-full max-w-2xl p-6 bg-zinc-950 border-2 border-zinc-800 shadow-2xl my-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {modalType === 'add' ? 'Add New Question' : modalType === 'update' ? 'Update Question' : <span className="text-red-500">Delete Question</span>}
            </h2>

            {modalType === 'delete' ? (
              <p className="text-zinc-300">Are you sure you want to delete this question? <br/><br/><strong className="text-white">{currentQuestion.questionText}</strong></p>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Question Text</label>
                  <textarea rows={3} className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-1 focus:ring-yellow-500" value={currentQuestion.questionText || ''} onChange={(e) => setCurrentQuestion({...currentQuestion, questionText: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['option1', 'option2', 'option3', 'option4'].map((opt, idx) => (
                    <div key={opt} className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Option {idx + 1}</label>
                      <input type="text" className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-1 focus:ring-yellow-500" value={currentQuestion[opt as keyof Question] as string || ''} onChange={(e) => setCurrentQuestion({...currentQuestion, [opt]: e.target.value})} />
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mt-4">
                  <label className="text-sm font-medium text-zinc-400">Correct Answer</label>
                  <select className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-1 focus:ring-yellow-500" value={currentQuestion.correctAnswer || ''} onChange={(e) => setCurrentQuestion({...currentQuestion, correctAnswer: e.target.value})}>
                    <option value="">-- Select Correct Option --</option>
                    {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((o, i) => (
                      o ? <option key={i} value={o}>{o}</option> : null
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:text-white" onClick={closeModal}>Cancel</Button>
              <Button className={`w-full ${modalType === 'delete' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-zinc-950'} font-semibold`} onClick={handleActionSubmit} disabled={isProcessing}>
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : modalType === 'delete' ? 'Confirm Delete' : 'Save Question'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};