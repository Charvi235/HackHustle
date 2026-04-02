import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, BookOpen, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Subject {
  id?: number;
  subjectId?: number;
  subjectID?: number;
  name?: string; 
  subjectName?: string; 
}

export const ManageSubjects = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [modalType, setModalType] = useState<'add' | 'rename' | 'delete' | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [totalQuestions, setTotalQuestions] = useState<number | ''>(''); // Naya state Fiza ki API ke liye
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch API
  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/subjects');
      if (!response.ok) throw new Error('Failed to fetch subjects');
      const data = await response.json();
      setSubjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setSubjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Modal Handlers
  const openModal = (type: 'add' | 'rename' | 'delete') => {
    setModalType(type);
    setInputValue('');
    setTotalQuestions(''); // Reset karo open hone pe
    setSelectedSubjectId('');
  };

  const closeModal = () => {
    setModalType(null);
    setInputValue('');
    setTotalQuestions('');
    setSelectedSubjectId('');
  };

  // 🔥 MAIN ACTION HANDLER (FIZA KI NAYI APIS YAHAN HAIN) 🔥
  const handleActionSubmit = async () => {
    setIsProcessing(true);
    try {
      if (modalType === 'add') {
        if (!inputValue.trim() || totalQuestions === '') return alert("Please enter subject name and total questions.");
        
        // Fiza ki POST API: { "subjectName": "...", "totalQuestions": 150 }
        await fetch('http://localhost:8080/api/subjects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            subjectName: inputValue,
            totalQuestions: Number(totalQuestions) 
          }) 
        });

      } else if (modalType === 'rename') {
        if (!selectedSubjectId || !inputValue.trim()) return alert("Select a subject and enter a new name.");
        
        // Fiza ki PATCH API:
        await fetch(`http://localhost:8080/api/subjects/${selectedSubjectId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subjectName: inputValue })
        });

      } else if (modalType === 'delete') {
        if (!selectedSubjectId) return alert("Please select a subject to delete.");
        
        const isConfirmed = window.confirm("Are you sure you want to delete this entry? This action cannot be undone.");
        if (!isConfirmed) {
          setIsProcessing(false);
          return;
        }

        // Fiza ki DELETE API (Path me /delete/ laga hua hai):
        await fetch(`http://localhost:8080/api/subjects/delete/${selectedSubjectId}`, {
          method: 'DELETE'
        });
      }

      // Action successful hone pe modal band karo aur list update karo
      closeModal();
      await fetchSubjects();

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
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin-dashboard')}>
            <ArrowLeft className="w-6 h-6 text-zinc-400 hover:text-white" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Manage Subjects</h1>
            <p className="text-zinc-400">View, add, rename, and delete subjects securely.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <Card className="p-4 bg-zinc-950 border-2 border-zinc-800 mb-8 flex flex-wrap gap-4">
          <Button onClick={() => openModal('add')} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Subject
          </Button>
          <Button onClick={() => openModal('rename')} variant="outline" className="border-purple-500/50 hover:bg-purple-500/10 text-purple-400">
            <Edit className="w-4 h-4 mr-2" /> Rename Subject
          </Button>
          <Button onClick={() => openModal('delete')} variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400">
            <Trash2 className="w-4 h-4 mr-2" /> Delete Subject
          </Button>
        </Card>

        {/* Subjects List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
          </div>
        ) : subjects.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-xl">No subjects found. Add a new one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => {
              const displayId = subject.id || subject.subjectId || subject.subjectID;
              const displayName = subject.subjectName || subject.name;
              
              return (
                <Card key={displayId || index} className="p-6 bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {displayName || "Unnamed Subject"}
                      </h3>
                      <p className="text-zinc-500 text-sm mt-1">ID: {displayId || "N/A"}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* OVERLAY MODAL FOR ADD/RENAME/DELETE */}
      {modalType !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 bg-zinc-950 border-2 border-zinc-800 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {modalType === 'add' && 'Add New Subject'}
              {modalType === 'rename' && 'Rename Subject'}
              {modalType === 'delete' && <span className="text-red-500">Delete Subject</span>}
            </h2>

            <div className="space-y-4">
              {/* Dropdown to select subject for Rename/Delete */}
              {(modalType === 'rename' || modalType === 'delete') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Select Subject</label>
                  <select
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-1 focus:ring-purple-500"
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                  >
                    <option value="">-- Choose a subject --</option>
                    {subjects.map(s => {
                      const sId = s.id || s.subjectId || s.subjectID;
                      return (
                        <option key={sId} value={sId}>
                          {s.subjectName || s.name} (ID: {sId})
                        </option>
                      )
                    })}
                  </select>
                </div>
              )}

              {/* Input field for New Name (Add/Rename) */}
              {(modalType === 'add' || modalType === 'rename') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    {modalType === 'add' ? 'Subject Name' : 'New Subject Name'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Data C N"
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-1 focus:ring-purple-500"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              )}

              {/* EXTRA INPUT FOR TOTAL QUESTIONS (Only for Add Modal) */}
              {modalType === 'add' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Total Questions</label>
                  <input
                    type="number"
                    placeholder="e.g. 150"
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:ring-1 focus:ring-purple-500"
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(e.target.value ? Number(e.target.value) : '')}
                  />
                </div>
              )}
            </div>

            {/* Modal Buttons */}
            <div className="flex gap-3 mt-8">
              <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:text-white" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                className={`w-full ${modalType === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
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