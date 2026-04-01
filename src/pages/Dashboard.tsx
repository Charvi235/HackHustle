
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, Trophy, MessageSquare, Star } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated, isFaculty } = useAuth();
  const navigate = useNavigate();
  const [battleStats, setBattleStats] = useState({ won: 0, totalPlayed: 0 });
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (user && !isFaculty) {   
      const studentId = user.student_id || 101;     
      fetch(`http://localhost:8080/api/quiz-battles/student/${studentId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {       
            const wonCount = data.filter((b: any) => b.quizScore >= 50).length;
            setBattleStats({
              won: wonCount,
              totalPlayed: data.length,
            });
          }
        })
        .catch((err) => console.error("Error loading battle stats:", err));
    }
  }, [isAuthenticated, navigate, user, isFaculty]);

  if (!isAuthenticated || !user) {
    return null;
  }
  const studentFeatures = [
    {
      title: 'Practice Questions',
      description: 'Sharpen your skills with curated OOP questions',
      icon: BookOpen,
      href: '/practice',
      color: 'bg-blue-500',
    },
    {
      title: 'Mock Interview',
      description: 'Prepare for real interviews with AI-powered mock sessions',
      icon: Brain,
      href: '/interview',
      color: 'bg-purple-500',
    },
    {
      title: 'Quiz Battle',
      description: 'Challenge other students in real-time quiz battles',
      icon: Trophy,
      href: '/battle',
      color: 'bg-orange-500',
    },
  ];
  const facultyFeatures: typeof studentFeatures = [];

  const features = isFaculty ? facultyFeatures : studentFeatures;

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.first_name}!
          </h1>
          <p className="text-muted-foreground">
            {isFaculty 
              ? 'Manage your students and respond to their doubts' 
              : 'Continue your learning journey'}
          </p>
        </div>

        {/* Stats Cards - Only for students */}
        {!isFaculty && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.points || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Battles Won</CardTitle>
                <Trophy className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
           
                <div className="text-2xl font-bold">{battleStats.won}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Questions Solved</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
              
                <div className="text-2xl font-bold">{battleStats.totalPlayed}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Faculty Stats */}
        {isFaculty && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Rating</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.rating || 0}/5</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subject</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.subject || 'N/A'}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doubts Solved</CardTitle>
                <MessageSquare className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats?.doubtsSolved || 0}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Grid - Only for students */}
        {!isFaculty && (
          <>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card 
                  key={feature.title} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(feature.href)}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Start
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;