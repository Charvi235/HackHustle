import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Zap } from 'lucide-react';

type RoleType = 'STUDENT' | 'TEACHER';

//-----------------
const isValidGmail = (email: string) => {
  return email.endsWith('@gmail.com');
};

const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8}$/;
  return passwordRegex.test(password);
};

const isEmptyField = (data: Record<string, string>) => {
  return Object.values(data).some((value) => value.trim() === '');
};

//------------------
const Auth = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({ emailId: '', password: '' });
  const [signupData, setSignupData] = useState({ firstName: '', lastName: '', emailId: '', password: '' });
  const [teacherSignupData, setTeacherSignupData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    subjectAssociated: '',
    institute: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [signupRole, setSignupRole] = useState<RoleType>('STUDENT');


  //--------------------------------
  const handleLogin = async (role: RoleType) => {
  // Mandatory check
  if (isEmptyField(loginData)) {
    toast({
      title: 'Validation Error',
      description: 'All fields are mandatory',
      variant: 'destructive',
    });
    return;
  }

  // Email validation
  if (!isValidGmail(loginData.emailId)) {
    toast({
      title: 'Invalid Email',
      description: 'Email must end with @gmail.com',
      variant: 'destructive',
    });
    return;
  }

  // Password validation
  if (!isValidPassword(loginData.password)) {
    toast({
      title: 'Invalid Password',
      description:
        'Password must be exactly 8 characters, include 1 uppercase letter and 1 special character',
      variant: 'destructive',
    });
    return;
  }

  setIsLoading(true);
  try {
    const success = await login(
      loginData.emailId,
      loginData.password,
      role.toLowerCase() as 'student' | 'teacher'
    );

    if (success) {
      toast({ title: 'Login successful!' });
      navigate(role === 'TEACHER' ? '/faculty-dashboard' : '/practice');
    }
  } catch (err: any) {
    toast({
      title: 'Login failed',
      description: err.message || 'Something went wrong',
      variant: 'destructive',
    });
  } finally {
    setIsLoading(false);
  }
};

  // ===== LOGIN =====
  // const handleLogin = async (role: RoleType) => {
  //   setIsLoading(true);
  //   try {
  //     const success = await login(loginData.emailId, loginData.password, role.toLowerCase() as 'student' | 'teacher');
  //     if (success) {
  //       toast({ title: 'Login successful!' });
  //       navigate(role === 'TEACHER' ? '/faculty-dashboard' : '/practice');
  //     }
  //   } catch (err: any) {
  //     toast({ title: 'Login failed', description: err.message || 'Something went wrong' });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
//------------------------------------------------------------------------------
const handleStudentSignup = async () => {
  if (isEmptyField(signupData)) {
    toast({
      title: 'Validation Error',
      description: 'All fields are mandatory',
      variant: 'destructive',
    });
    return;
  }

  if (!isValidGmail(signupData.emailId)) {
    toast({
      title: 'Invalid Email',
      description: 'Email must end with @gmail.com',
      variant: 'destructive',
    });
    return;
  }

  if (!isValidPassword(signupData.password)) {
    toast({
      title: 'Invalid Password',
      description:
        'Password must be exactly 8 characters, include 1 uppercase letter and 1 special character',
      variant: 'destructive',
    });
    return;
  }

  setIsLoading(true);
  try {
    const success = await signup(
      signupData.firstName,
      signupData.lastName,
      signupData.emailId,
      signupData.password,
      'student'
    );

    if (success) {
      toast({ title: 'Signup successful!' });
      navigate('/practice');
    }
  } catch (err: any) {
    toast({
      title: 'Signup failed',
      description: err.message || 'Something went wrong',
      variant: 'destructive',
    });
  } finally {
    setIsLoading(false);
  }
};

//-----------------------------------------------------------------------------
  // ===== STUDENT SIGNUP =====
  // const handleStudentSignup = async () => {
  //   setIsLoading(true);
  //   try {
  //     const success = await signup(
  //       signupData.firstName,
  //       signupData.lastName,
  //       signupData.emailId,
  //       signupData.password,
  //       'student'
  //     );
  //     if (success) {
  //       toast({ title: 'Signup successful!' });
  //       navigate('/practice');
  //     }
  //   } catch (err: any) {
  //     toast({ title: 'Signup failed', description: err.message || 'Something went wrong' });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  //---------------------------------------------------------
const handleTeacherSignup = async () => {
  if (isEmptyField(teacherSignupData)) {
    toast({
      title: 'Validation Error',
      description: 'All fields are mandatory',
      variant: 'destructive',
    });
    return;
  }

  if (!isValidGmail(teacherSignupData.emailId)) {
    toast({
      title: 'Invalid Email',
      description: 'Email must end with @gmail.com',
      variant: 'destructive',
    });
    return;
  }

  if (!isValidPassword(teacherSignupData.password)) {
    toast({
      title: 'Invalid Password',
      description:
        'Password must be exactly 8 characters, include 1 uppercase letter and 1 special character',
      variant: 'destructive',
    });
    return;
  }

  setIsLoading(true);
  try {
    const success = await signup(
      teacherSignupData.firstName,
      teacherSignupData.lastName,
      teacherSignupData.emailId,
      teacherSignupData.password,
      'teacher',
      teacherSignupData.subjectAssociated,
      teacherSignupData.institute
    );

    if (success) {
      toast({ title: 'Signup successful!' });
      navigate('/faculty-dashboard');
    }
  } catch (err: any) {
    toast({
      title: 'Signup failed',
      description: err.message || 'Something went wrong',
      variant: 'destructive',
    });
  } finally {
    setIsLoading(false);
  }
};

  //-----------------------------------------------------------
  // ===== TEACHER SIGNUP =====
  // const handleTeacherSignup = async () => {
  //   setIsLoading(true);
  //   try {
  //     const success = await signup(
  //       teacherSignupData.firstName,
  //       teacherSignupData.lastName,
  //       teacherSignupData.emailId,
  //       teacherSignupData.password,
  //       'teacher',
  //       teacherSignupData.subjectAssociated,
  //       teacherSignupData.institute
  //     );
  //     if (success) {
  //       toast({ title: 'Signup successful!' });
  //       navigate('/faculty-dashboard');
  //     }
  //   } catch (err: any) {
  //     toast({ title: 'Signup failed', description: err.message || 'Something went wrong' });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
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

        {/* Tabs */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* ===== LOGIN TAB ===== */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Login to access your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Email"
                  value={loginData.emailId}
                  onChange={(e) => setLoginData({ ...loginData, emailId: e.target.value })}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />

                <Button className="w-full" onClick={() => handleLogin('STUDENT')} disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login as Student'}
                </Button>
                <Button className="w-full" variant="secondary" onClick={() => handleLogin('TEACHER')} disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login as Teacher'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== SIGNUP TAB ===== */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Sign up to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={signupRole} onValueChange={(v) => setSignupRole(v as RoleType)}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="STUDENT">Student</TabsTrigger>
                    <TabsTrigger value="TEACHER">Teacher</TabsTrigger>
                  </TabsList>

                  {/* STUDENT SIGNUP */}
                  <TabsContent value="STUDENT" className="space-y-4">
                    <Input
                      placeholder="First Name"
                      value={signupData.firstName}
                      onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                    />
                    <Input
                      placeholder="Last Name"
                      value={signupData.lastName}
                      onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                    />
                    <Input
                      placeholder="Email"
                      value={signupData.emailId}
                      onChange={(e) => setSignupData({ ...signupData, emailId: e.target.value })}
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    />
                    <Button className="w-full" onClick={handleStudentSignup} disabled={isLoading}>
                      {isLoading ? 'Signing up...' : 'Sign Up as Student'}
                    </Button>
                  </TabsContent>

                  {/* TEACHER SIGNUP */}
                  <TabsContent value="TEACHER" className="space-y-4">
                    <Input
                      placeholder="First Name"
                      value={teacherSignupData.firstName}
                      onChange={(e) => setTeacherSignupData({ ...teacherSignupData, firstName: e.target.value })}
                    />
                    <Input
                      placeholder="Last Name"
                      value={teacherSignupData.lastName}
                      onChange={(e) => setTeacherSignupData({ ...teacherSignupData, lastName: e.target.value })}
                    />
                    <Input
                      placeholder="Email"
                      value={teacherSignupData.emailId}
                      onChange={(e) => setTeacherSignupData({ ...teacherSignupData, emailId: e.target.value })}
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={teacherSignupData.password}
                      onChange={(e) => setTeacherSignupData({ ...teacherSignupData, password: e.target.value })}
                    />
                    <Input
                      placeholder="Subject Associated"
                      value={teacherSignupData.subjectAssociated}
                      onChange={(e) => setTeacherSignupData({ ...teacherSignupData, subjectAssociated: e.target.value })}
                    />
                    <Input
                      placeholder="Institute"
                      value={teacherSignupData.institute}
                      onChange={(e) => setTeacherSignupData({ ...teacherSignupData, institute: e.target.value })}
                    />
                    <Button className="w-full" onClick={handleTeacherSignup} disabled={isLoading}>
                      {isLoading ? 'Signing up...' : 'Sign Up as Teacher'}
                    </Button>
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
