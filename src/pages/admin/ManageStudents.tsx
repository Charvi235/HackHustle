import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowLeft, Loader2, Search, User, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Student Interface
interface Student {
  id?: number;
  studentId?: number;
  student_id?: number;
  first_name?: string;
  lastName?: string;
  name?: string;
  emailId?: string;
  email?: string;
  points?: number;
}

export const ManageStudents = () => {
  const navigate = useNavigate();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Delete Modal States
  const [isDeleting, setIsDeleting] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  // 1. Fetch Students (View Only)
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(Array.isArray(data) ? data : []);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 2. Delete Student Logic
  const confirmDelete = async () => {
    if (!studentToDelete) return;
    setIsDeleting(true);
    
    const sId = studentToDelete.id || studentToDelete.studentId || studentToDelete.student_id;

    try {
      await fetch(`http://localhost:8080/api/students/${sId}`, { 
        method: 'DELETE' 
      });
      
      setStudentToDelete(null); // Modal band karo
      await fetchStudents();    // List refresh karo
    } catch (error) {
      console.error(error); 
      alert("Failed to delete student.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter students based on search
  const filteredStudents = students.filter(s => {
    const name = (s.first_name || s.name || '').toLowerCase();
    const email = (s.emailId || s.email || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || email.includes(query);
  });

  return (
    <div className="min-h-screen bg-background p-8 pt-24 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin-dashboard')}>
            <ArrowLeft className="w-6 h-6 text-zinc-400 hover:text-white" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Manage Students</h1>
            <p className="text-zinc-400">View and remove student accounts from the system.</p>
          </div>
        </div>

        {/* Top Action Bar (Search Only) */}
        <div className="mb-8">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-500 animate-spin" /></div>
        ) : (
          /* Data Table */
          <Card className="bg-zinc-950 border border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="text-xs text-zinc-300 uppercase bg-zinc-900 border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Student Details</th>
                    <th className="px-6 py-4 font-semibold">Student ID</th>
                    <th className="px-6 py-4 font-semibold">XP / Points</th>
                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                        <User className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        No students found.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s, idx) => {
                      const sId = s.id || s.studentId || s.student_id;
                      const sName = s.first_name || s.name || "Unknown";
                      const sEmail = s.emailId || s.email || "No Email";
                      
                      return (
                        <tr key={idx} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                <span className="text-blue-500 font-bold">{sName.charAt(0).toUpperCase()}</span>
                              </div>
                              <div>
                                <div className="font-semibold text-white text-base">{sName}</div>
                                <div className="text-xs text-zinc-500">{sEmail}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-zinc-300">#{sId || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                              {s.points || 0} XP
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {/* ONLY DELETE BUTTON NOW */}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => setStudentToDelete(s)} 
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* DEDICATED DELETE CONFIRMATION MODAL */}
      {studentToDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 bg-zinc-950 border-2 border-zinc-800 shadow-2xl">
            <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">Delete Student</h2>

            <div className="text-center">
              <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-zinc-300">Are you sure you want to delete this student account? All their progress and data will be permanently lost.</p>
              
              <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                <p className="text-white font-semibold text-lg">{studentToDelete.first_name || studentToDelete.name}</p>
                <p className="text-zinc-500 text-sm">{studentToDelete.emailId || studentToDelete.email}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button 
                variant="outline" 
                className="w-full border-zinc-700 text-zinc-300 hover:text-white" 
                onClick={() => setStudentToDelete(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold" 
                onClick={confirmDelete} 
                disabled={isDeleting}
              >
                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Confirm Delete'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};