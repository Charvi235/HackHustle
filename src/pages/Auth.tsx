import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Zap } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [teacherSignupData, setTeacherSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    subjectAssociated: '',
    institute: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [signupRole, setSignupRole] = useState<'student' | 'teacher'>('student');

  const handleLogin = async (role: 'student' | 'faculty') => {
    setIsLoading(true);
    try {
      const success = await login(loginData.email, loginData.password, role);
      if (success) {
        toast({ title: 'Login successful!' });
        navigate(role === 'faculty' ? '/faculty-dashboard' : '/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentSignup = async () => {
    setIsLoading(true);
    try {
      const success = await signup(
        signupData.firstName,
        signupData.lastName,
        signupData.email,
        signupData.password,
        'student'
      );

      if (success) {
        toast({ title: 'Signup successful!' });
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTeacherSignup = async () => {
    setIsLoading(true);
    try {
      const success = await signup(
        teacherSignupData.firstName,
        teacherSignupData.lastName,
        teacherSignupData.email,
        teacherSignupData.password,
        'faculty',
        teacherSignupData.subjectAssociated,
        teacherSignupData.institute
      );

      if (success) {
        toast({ title: 'Signup successful!' });
        navigate('/faculty-dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
              HackHustle
            </span>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Login to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => handleLogin('student')}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login as Student'}
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="secondary" 
                      onClick={() => handleLogin('faculty')}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login as Faculty'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Sign up to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={signupRole} onValueChange={(v) => setSignupRole(v as 'student' | 'teacher')} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="student">Student</TabsTrigger>
                    <TabsTrigger value="teacher">Teacher</TabsTrigger>
                  </TabsList>

                  <TabsContent value="student" className="mt-0">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="student-firstName">First Name</Label>
                          <Input
                            id="student-firstName"
                            placeholder="John"
                            value={signupData.firstName}
                            onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-lastName">Last Name</Label>
                          <Input
                            id="student-lastName"
                            placeholder="Doe"
                            value={signupData.lastName}
                            onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-email">Email</Label>
                        <Input
                          id="student-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-password">Password</Label>
                        <Input
                          id="student-password"
                          type="password"
                          placeholder="••••••••"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          required
                        />
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={handleStudentSignup}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing up...' : 'Sign Up as Student'}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="teacher" className="mt-0">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="teacher-firstName">First Name</Label>
                          <Input
                            id="teacher-firstName"
                            placeholder="John"
                            value={teacherSignupData.firstName}
                            onChange={(e) => setTeacherSignupData({ ...teacherSignupData, firstName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teacher-lastName">Last Name</Label>
                          <Input
                            id="teacher-lastName"
                            placeholder="Doe"
                            value={teacherSignupData.lastName}
                            onChange={(e) => setTeacherSignupData({ ...teacherSignupData, lastName: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teacher-email">Email</Label>
                        <Input
                          id="teacher-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={teacherSignupData.email}
                          onChange={(e) => setTeacherSignupData({ ...teacherSignupData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teacher-password">Password</Label>
                        <Input
                          id="teacher-password"
                          type="password"
                          placeholder="••••••••"
                          value={teacherSignupData.password}
                          onChange={(e) => setTeacherSignupData({ ...teacherSignupData, password: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teacher-subject">Subject Associated</Label>
                        <Input
                          id="teacher-subject"
                          placeholder="e.g., Mathematics, Physics"
                          value={teacherSignupData.subjectAssociated}
                          onChange={(e) => setTeacherSignupData({ ...teacherSignupData, subjectAssociated: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teacher-institute">Institute</Label>
                        <Input
                          id="teacher-institute"
                          placeholder="e.g., ABC University"
                          value={teacherSignupData.institute}
                          onChange={(e) => setTeacherSignupData({ ...teacherSignupData, institute: e.target.value })}
                          required
                        />
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={handleTeacherSignup}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing up...' : 'Sign Up as Teacher'}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
