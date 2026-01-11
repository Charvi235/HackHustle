import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Search, Trophy } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  points: number;
  doubtsAsked: number;
}

const FacultyStudents = () => {
  const { isFaculty } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for students
  const students: Student[] = [
    { id: '1', name: 'Charvi', email: 'charvi@gmail.com', points: 1500, doubtsAsked: 5 },
    { id: '2', name: 'Rahul Kumar', email: 'rahul@gmail.com', points: 1200, doubtsAsked: 8 },
    { id: '3', name: 'Priya Singh', email: 'priya@gmail.com', points: 1800, doubtsAsked: 3 },
    { id: '4', name: 'Amit Sharma', email: 'amit@gmail.com', points: 900, doubtsAsked: 12 },
    { id: '5', name: 'Sneha Gupta', email: 'sneha@gmail.com', points: 2100, doubtsAsked: 2 },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isFaculty) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Students</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Students List */}
        <div className="grid gap-4">
          {filteredStudents.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No students found.
              </CardContent>
            </Card>
          ) : (
            filteredStudents.map((student) => (
              <Card key={student.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-primary">
                        <Trophy className="h-4 w-4" />
                        <span className="font-bold">{student.points}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                    <Badge variant="outline">
                      {student.doubtsAsked} doubts
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyStudents;
