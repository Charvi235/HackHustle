import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, BookOpen, Layers, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Subject {
  id?: number;
  subjectId?: number;
  subjectID?: number;
  name?: string; 
  subjectName?: string; 
}

interface Topic {
  id?: number;
  topicId?: number;
  topicID?: number;
  subjectId?: number; 
  name?: string;
  topicName?: string;
}

export const ManageTopics = () => {
  const navigate = useNavigate();
  
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [modalType, setModalType] = useState<'add' | 'rename' | 'delete' | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');

 
  useEffect(() => {
    const fetchSubjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/subjects');
        if (!response.ok) throw new Error('Failed to fetch subjects');
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  
  const handleSubjectClick = async (subject: Subject) => {
    setSelectedSubject(subject);
    setIsLoading(true);
    try {
      
      const subId = subject.id || subject.subjectId || subject.subjectID;
      
      const response = await fetch(`http://localhost:8080/api/topics/subject/${subId}`);
      if (!response.ok) {
        setTopics([]); 
        return;
      }
      
      const data = await response.json();
      
     
      setTopics(Array.isArray(data) ? data : []); 
      
    } catch (error) {
      console.error("Error fetching topics:", error);
      setTopics([]); 
    } finally {
      setIsLoading(false);
    }
  };

 
  const refreshTopics = async () => {
    if (!selectedSubject) return;
    try {
      const subId = selectedSubject.id || selectedSubject.subjectId || selectedSubject.subjectID;
      const response = await fetch(`http://localhost:8080/api/topics/subject/${subId}`);
      
      if (response.ok) {
        const data = await response.json();
       
        setTopics(Array.isArray(data) ? data : []);
      } else {
        setTopics([]);
      }
    } catch (error) {
      console.error("Error refreshing topics:", error);
      setTopics([]);
    }
  };
  const openModal = (type: 'add' | 'rename' | 'delete') => {
    setModalType(type);
    setInputValue('');
    setSelectedTopicId('');
  };

  const closeModal = () => {
    setModalType(null);
    setInputValue('');
    setSelectedTopicId('');
  };

  const handleActionSubmit = async () => {
    setIsProcessing(true);
    const subId = selectedSubject?.id || selectedSubject?.subjectId;

    try {
      if (modalType === 'add') {
        if (!inputValue.trim()) return alert("Please enter a topic name.");
        
        await fetch('http://localhost:8080/api/topics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topicName: inputValue, subjectId: subId }) 
        });

      } else if (modalType === 'rename') {
        if (!selectedTopicId || !inputValue.trim()) return alert("Select a topic and enter a new name.");
        
        await fetch(`http://localhost:8080/api/topics/${selectedTopicId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topicName: inputValue, subjectId: subId })
        });

      } else if (modalType === 'delete') {
        if (!selectedTopicId) return alert("Please select a topic to delete.");
        
        const isConfirmed = window.confirm("Are you sure you want to delete this topic? This action cannot be undone.");
        if (!isConfirmed) {
          setIsProcessing(false);
          return;
        }

        await fetch(`http://localhost:8080/api/topics/${selectedTopicId}`, {
          method: 'DELETE'
        });
      }

      closeModal();
      await refreshTopics(); 

    } catch (error) {
      console.error("Action failed:", error);
      alert("Something went wrong. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 pt-24 relative">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              if (selectedSubject) setSelectedSubject(null);
              else navigate('/admin-dashboard');
            }}
          >
            <ArrowLeft className="w-6 h-6 text-zinc-400 hover:text-white" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {selectedSubject 
                ? `Topics for: ${selectedSubject.subjectName || selectedSubject.name}` 
                : 'Manage Topics'}
            </h1>
            <p className="text-zinc-400">
              {selectedSubject 
                ? 'Manage all topics inside this subject.' 
                : 'Select a subject to view and manage its topics.'}
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-yellow-500 animate-spin" />
          </div>
        )}

        {/* VIEW 1: SELECT A SUBJECT */}
        {!isLoading && !selectedSubject && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => {
              const displayId = subject.id || subject.subjectId;
              const displayName = subject.subjectName || subject.name;
              
              return (
                <Card 
                  key={displayId || index} 
                  onClick={() => handleSubjectClick(subject)}
                  className="p-6 bg-zinc-950 border border-zinc-800 hover:border-yellow-500/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                        {displayName || "Unnamed Subject"}
                      </h3>
                      <p className="text-zinc-500 text-sm mt-1">ID: {displayId || "N/A"}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
            {subjects.length === 0 && (
              <div className="col-span-full text-center py-20 text-zinc-500">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-xl">No subjects found. Create subjects first!</p>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: MANAGE TOPICS */}
        {!isLoading && selectedSubject && (
          <>
            <Card className="p-4 bg-zinc-950 border-2 border-zinc-800 mb-8 flex flex-wrap gap-4">
              <Button onClick={() => openModal('add')} className="bg-yellow-600 hover:bg-yellow-700 text-zinc-950 font-semibold">
                <Plus className="w-4 h-4 mr-2" /> Add Topic
              </Button>
              <Button onClick={() => openModal('rename')} variant="outline" className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400">
                <Edit className="w-4 h-4 mr-2" /> Rename Topic
              </Button>
              <Button onClick={() => openModal('delete')} variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400">
                <Trash2 className="w-4 h-4 mr-2" /> Delete Topic
              </Button>
            </Card>

            {topics.length === 0 ? (
              <div className="text-center py-20 text-zinc-500">
                <Layers className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-xl">No topics found for this subject. Add a new one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic, index) => {
                  const displayId = topic.id || topic.topicId;
                  const displayName = topic.topicName || topic.name;
                  
                  return (
                    <Card key={displayId || index} className="p-6 bg-zinc-900 border border-zinc-800 hover:border-yellow-500/50 transition-colors group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                          <Layers className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                            {displayName || "Unnamed Topic"}
                          </h3>
                          <p className="text-zinc-500 text-sm mt-1">Topic ID: {displayId || "N/A"}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {modalType !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 bg-zinc-950 border-2 border-zinc-800 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {modalType === 'add' && 'Add New Topic'}
              {modalType === 'rename' && 'Rename Topic'}
              {modalType === 'delete' && <span className="text-red-500">Delete Topic</span>}
            </h2>

            <div className="space-y-4">
              {(modalType === 'rename' || modalType === 'delete') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Select Topic</label>
                  <select
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-1 focus:ring-yellow-500"
                    value={selectedTopicId}
                    onChange={(e) => setSelectedTopicId(e.target.value)}
                  >
                    <option value="">-- Choose a topic --</option>
                    {topics.map(t => {
                      const tId = t.id || t.topicId;
                      return (
                        <option key={tId} value={tId}>
                          {t.topicName || t.name} (ID: {tId})
                        </option>
                      )
                    })}
                  </select>
                </div>
              )}

              {(modalType === 'add' || modalType === 'rename') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    {modalType === 'add' ? 'Topic Name' : 'New Topic Name'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Binary Search Trees"
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-1 focus:ring-yellow-500"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:text-white" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                className={`w-full ${modalType === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-600 hover:bg-yellow-700 text-zinc-950'} font-semibold`}
                onClick={handleActionSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Confirm'}
              </Button>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
};