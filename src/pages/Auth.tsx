import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Zap, Eye, EyeOff } from 'lucide-react';

type RoleType = 'STUDENT' | 'TEACHER';

const isValidGmail = (email: string) => {
  return email.endsWith('@gmail.com');
};

const isValidPassword = (password: string) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password);
};

const isValidName = (name: string) => {
  const regex = /^[A-Za-z]+( [A-Za-z]+)*$/;
  return regex.test(name.trim());
};

const isEmptyField = (data: Record<string, string>) => {
  return Object.values(data).some((value) => value.trim() === '');
};

const getInputClass = (isError: boolean) => 
  `transition-all ${isError ? 'border-red-500 focus-visible:ring-red-500 ring-2 ring-red-500/20' : ''}`;

const renderError = (isError: boolean, message = "This field is mandatory") => 
  isError && <p className="text-[10px] text-red-500 font-medium mt-1 ml-1">{message}</p>;

const Auth = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({ emailId: '', password: '' });

  const [loginTouched, setLoginTouched] = useState({ emailId: false, password: false });
  
  const [signupTouched, setSignupTouched] = useState({ 
    firstName: false, lastName: false, emailId: false, password: false, confirmPassword: false 
  });
  
  const [teacherTouched, setTeacherTouched] = useState({
    firstName: false, lastName: false, emailId: false, password: false, confirmPassword: false, subjectAssociated: false, institute: false
  });

  const [signupData, setSignupData] = useState({ 
    firstName: '', 
    lastName: '', 
    emailId: '', 
    password: '',
    confirmPassword: '' 
  });

  const [teacherSignupData, setTeacherSignupData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    subjectAssociated: '',
    institute: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [signupRole, setSignupRole] = useState<RoleType>('STUDENT');

  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showStudentSignupPassword, setShowStudentSignupPassword] = useState(false);
  const [showStudentConfirmPassword, setShowStudentConfirmPassword] = useState(false);
  const [showTeacherSignupPassword, setShowTeacherSignupPassword] = useState(false);
  const [showTeacherConfirmPassword, setShowTeacherConfirmPassword] = useState(false);

  const handleForgotPassword = () => {
    toast({
      title: 'Coming Soon',
      description: 'Password reset feature is under development.',
    });
  };

  const handleLogin = async (role: RoleType) => {
    if (isEmptyField(loginData)) {
      toast({
        title: 'Validation Error',
        description: 'All fields are mandatory',
        variant: 'destructive',
      });
      return;
    }

    if (!isValidGmail(loginData.emailId)) {
      toast({
        title: 'Invalid Email',
        description: 'Email must end with @gmail.com',
        variant: 'destructive',
      });
      return;
    }

    if (!isValidPassword(loginData.password)) {
      toast({
        title: 'Invalid Password',
        description:
          'Password must be of 8 characters or more, include atleast one uppercase letter and one special character',
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
        localStorage.setItem('emailId', loginData.emailId);
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

  const handleStudentSignup = async () => {
    if (isEmptyField(signupData)) {
      toast({
        title: 'Validation Error',
        description: 'All fields are mandatory',
        variant: 'destructive',
      });
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
        toast({
          title: 'Password Mismatch',
          description: 'Passwords do not match',
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
          'Password must be of 8 characters or more, include atleast one uppercase letter and one special character',
        variant: 'destructive',
      });
      return;
    }

    if(!isValidName(signupData.firstName)) {
      toast({
        title: 'Invalid first name',
        description: 'First Name must start with character',
        variant: 'destructive',
        });
      return;
    }

    if(!isValidName(signupData.lastName)) {
    toast({
      title: 'Invalid last name',
      description: 'Last Name must start with character',
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
        localStorage.setItem('emailId', signupData.emailId);
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

  const handleTeacherSignup = async () => {
    if (isEmptyField(teacherSignupData)) {
      toast({
        title: 'Validation Error',
        description: 'All fields are mandatory',
        variant: 'destructive',
      });
      return;
    }

    if (teacherSignupData.password !== teacherSignupData.confirmPassword) {
        toast({
          title: 'Password Mismatch',
          description: 'Passwords do not match',
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
          'Password must be of 8 characters or more, include atleast one uppercase letter and one special character',
        variant: 'destructive',
      });
      return;
    }

    if(!isValidName(teacherSignupData.firstName)) {
    toast({
      title: 'Invalid first name',
      description: 'First Name must start with character',
      variant: 'destructive',
    });
    return;
  }

  if(!isValidName(teacherSignupData.lastName)) {
    toast({
      title: 'Invalid last name',
      description: 'Last Name must start with character',
      variant: 'destructive',
    });
    return;
  }

  if(!isValidName(teacherSignupData.subjectAssociated)) {
    toast({
      title: 'Invalid subject name',
      description: 'Subject Name must start with character',
      variant: 'destructive',
    });
    return;
  }

  if(!isValidName(teacherSignupData.institute)) {
    toast({
      title: 'Invalid institute name',
      description: 'Institute Name must start with character',
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
        localStorage.setItem('emailId', teacherSignupData.emailId);
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
                <div className="space-y-1">
                  <Input
                    placeholder="Email"
                    value={loginData.emailId}
                    onBlur={() => setLoginTouched({ ...loginTouched, emailId: true })}
                    onChange={(e) => setLoginData({ ...loginData, emailId: e.target.value })}
                    
                    className={getInputClass(loginTouched.emailId && (loginData.emailId === '' || !isValidGmail(loginData.emailId)))}
                  />
                  
                  {renderError(loginTouched.emailId && loginData.emailId === '', "This field is mandatory")}
                  {renderError(loginTouched.emailId && loginData.emailId !== '' && !isValidGmail(loginData.emailId), "Invalid Email (Must end with @gmail.com)")}
                </div>
                <div className="space-y-1">
                  <div className="relative">
                    <Input
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={loginData.password}
                      onBlur={() => setLoginTouched({ ...loginTouched, password: true })}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={`pr-10 ${getInputClass(loginTouched.password && (loginData.password === '' || !isValidPassword(loginData.password)))}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {renderError(loginTouched.password && loginData.password === '', "This field is mandatory")}
                  {renderError(loginTouched.password && loginData.password !== '' && !isValidPassword(loginData.password), "Password must be atleast 8 chars and it should have 1 uppercase and  1 special char")}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
            </div>
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
                    <div>
                      <Input
                        placeholder="First Name"
                        value={signupData.firstName}
                        onBlur={() => setSignupTouched({...signupTouched, firstName: true})}
                        onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        
                        className={getInputClass(signupTouched.firstName && (signupData.firstName === '' || !isValidName(signupData.firstName)))}
                      />
                      
                      {renderError(signupTouched.firstName && signupData.firstName === '', "This field is mandatory")}
                      {renderError(signupTouched.firstName && signupData.firstName !== '' && !isValidName(signupData.firstName), "Invalid first name (Only letters allowed)")}
                    </div>
                   <div>
                      <Input
                        placeholder="Last Name"
                        value={signupData.lastName}
                        onBlur={() => setSignupTouched({...signupTouched, lastName: true})}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        className={getInputClass(signupTouched.lastName && (signupData.lastName === '' || !isValidName(signupData.lastName)))}
                      />
                      {renderError(signupTouched.lastName && signupData.lastName === '', "This field is mandatory")}
                      {renderError(signupTouched.lastName && signupData.lastName !== '' && !isValidName(signupData.lastName), "Invalid last name (Only letters allowed)")}
                    </div>
                    <div>
                      <Input
                        placeholder="Email"
                        value={signupData.emailId}
                        onBlur={() => setSignupTouched({...signupTouched, emailId: true})}
                        onChange={(e) => setSignupData({ ...signupData, emailId: e.target.value })}
                        className={getInputClass(signupTouched.emailId && (signupData.emailId === '' || !isValidGmail(signupData.emailId)))}
                      />
                      {renderError(signupTouched.emailId && signupData.emailId === '', "This field is mandatory")}
                      {renderError(signupTouched.emailId && signupData.emailId !== '' && !isValidGmail(signupData.emailId), "Invalid Email (Must end with @gmail.com)")}
                    </div>
                    <div className="relative">
                      <Input
                        type={showStudentSignupPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={signupData.password}
                        onBlur={() => setSignupTouched({...signupTouched, password: true})}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}

                        className={`pr-10 ${getInputClass(signupTouched.password && (signupData.password === '' || !isValidPassword(signupData.password)))}`}
                      />
                      <button type="button" onClick={() => setShowStudentSignupPassword(!showStudentSignupPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showStudentSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      
                      {renderError(signupTouched.password && signupData.password === '', "This field is mandatory")}

                      {renderError(signupTouched.password && signupData.password !== '' && !isValidPassword(signupData.password), "Password must be atleast 8 chars and It should have 1 uppercase and  1 special char")}
                    </div>
                    

                    {/* Student Confirm Password */}
                    <div className="relative mt-2">
                        <Input
                          type={showStudentConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm Password"
                          value={signupData.confirmPassword}
                          onBlur={() => setSignupTouched({...signupTouched, confirmPassword: true})}
                          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}

                          className={`pr-10 ${getInputClass(signupTouched.confirmPassword && (signupData.confirmPassword === '' || signupData.password !== signupData.confirmPassword))}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowStudentConfirmPassword(!showStudentConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showStudentConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>

                        {renderError(signupTouched.confirmPassword && signupData.confirmPassword === '', "This field is mandatory")}

                        {renderError(signupData.confirmPassword !== '' && signupData.password !== signupData.confirmPassword, "Passwords don't match")}
                    </div>
                    <Button className="w-full" onClick={handleStudentSignup} disabled={isLoading}>
                      {isLoading ? 'Signing up...' : 'Sign Up as Student'}
                    </Button>
                  </TabsContent>

                  {/* TEACHER SIGNUP */}
                  <TabsContent value="TEACHER" className="space-y-4">
                    <div>
                      <Input
                        placeholder="First Name"
                        value={teacherSignupData.firstName}
                        onBlur={() => setTeacherTouched({...teacherTouched, firstName: true})}
                        onChange={(e) => setTeacherSignupData({ ...teacherSignupData, firstName: e.target.value })}
                        className={getInputClass(teacherTouched.firstName && (teacherSignupData.firstName === '' || !isValidName(teacherSignupData.firstName)))}
                      />
                      {renderError(teacherTouched.firstName && teacherSignupData.firstName === '', "This field is mandatory")}
                      {renderError(teacherTouched.firstName && teacherSignupData.firstName !== '' && !isValidName(teacherSignupData.firstName), "Invalid first name (Only letters allowed)")}
                    </div>
                    <div>
                      <Input
                        placeholder="Last Name"
                        value={teacherSignupData.lastName}
                        onBlur={() => setTeacherTouched({...teacherTouched, lastName: true})}
                        onChange={(e) => setTeacherSignupData({ ...teacherSignupData, lastName: e.target.value })}
                        
                        className={getInputClass(teacherTouched.lastName && (teacherSignupData.lastName === '' || !isValidName(teacherSignupData.lastName)))}
                      />
                      {renderError(teacherTouched.lastName && teacherSignupData.lastName === '', "This field is mandatory")}
                      {renderError(teacherTouched.lastName && teacherSignupData.lastName !== '' && !isValidName(teacherSignupData.lastName), "Invalid last name (Only letters allowed)")}
                    </div>
                    <div>
                        <Input
                          placeholder="Email"
                          value={teacherSignupData.emailId}
                          onBlur={() => setTeacherTouched({...teacherTouched, emailId: true})}
                          onChange={(e) => setTeacherSignupData({ ...teacherSignupData, emailId: e.target.value })}
                          className={getInputClass(teacherTouched.emailId && (teacherSignupData.emailId === '' || !isValidGmail(teacherSignupData.emailId)))}
                        />
                        {renderError(teacherTouched.emailId && teacherSignupData.emailId === '', "This field is mandatory")}
                        {renderError(teacherTouched.emailId && teacherSignupData.emailId !== '' && !isValidGmail(teacherSignupData.emailId), "Invalid Email (Must end with @gmail.com)")}
                    </div>
                   {/* Teacher Password */}
                    <div className="relative">
                      <Input
                        type={showTeacherSignupPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={teacherSignupData.password}
                        onBlur={() => setTeacherTouched({...teacherTouched, password: true})}
                        onChange={(e) => setTeacherSignupData({ ...teacherSignupData, password: e.target.value })}
                        className={`pr-10 ${getInputClass(teacherTouched.password && (teacherSignupData.password === '' || !isValidPassword(teacherSignupData.password)))}`}
                      />
                      <button type="button" onClick={() => setShowTeacherSignupPassword(!showTeacherSignupPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showTeacherSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      {renderError(teacherTouched.password && teacherSignupData.password === '', "This field is mandatory")}
                      {renderError(teacherTouched.password && teacherSignupData.password !== '' && !isValidPassword(teacherSignupData.password), "Password must be atleast 8 chars and it should have 1 uppercase and 1 special char")}
                    </div>
                    {/* Teacher Confirm Password */}
                    <div className="relative mt-2">
                      <Input
                        type={showTeacherConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={teacherSignupData.confirmPassword}
                        onBlur={() => setTeacherTouched({...teacherTouched, confirmPassword: true})}
                        onChange={(e) => setTeacherSignupData({ ...teacherSignupData, confirmPassword: e.target.value })}
                        className={`pr-10 ${getInputClass(teacherTouched.confirmPassword && (teacherSignupData.confirmPassword === '' || teacherSignupData.password !== teacherSignupData.confirmPassword))}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowTeacherConfirmPassword(!showTeacherConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showTeacherConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      {renderError(teacherTouched.confirmPassword && teacherSignupData.confirmPassword === '', "This field is mandatory")}
                      {renderError(teacherSignupData.confirmPassword !== '' && teacherSignupData.password !== teacherSignupData.confirmPassword, "Passwords don't match")}
                    </div>
                    <div>
                      <Input
                        placeholder="Subject Associated"
                        value={teacherSignupData.subjectAssociated}
                        onBlur={() => setTeacherTouched({...teacherTouched, subjectAssociated: true})}
                        onChange={(e) => setTeacherSignupData({ ...teacherSignupData, subjectAssociated: e.target.value.replace(/\s+/g, ' ')})}
                        
                        className={getInputClass(teacherTouched.subjectAssociated && (teacherSignupData.subjectAssociated === '' || !isValidName(teacherSignupData.subjectAssociated)))}
                      />

                      {renderError(teacherTouched.subjectAssociated && teacherSignupData.subjectAssociated === '', "This field is mandatory")}

                      {renderError(teacherTouched.subjectAssociated && teacherSignupData.subjectAssociated !== '' && !isValidName(teacherSignupData.subjectAssociated), "Invalid subject name (Only letters allowed)")}
                    </div>
                    <div>
                      <Input
                        placeholder="Institute"
                        value={teacherSignupData.institute}
                        onBlur={() => setTeacherTouched({...teacherTouched, institute: true})}
                        onChange={(e) => setTeacherSignupData({ ...teacherSignupData, institute: e.target.value.replace(/\s+/g, ' ') })}
                        className={getInputClass(teacherTouched.institute && (teacherSignupData.institute === '' || !isValidName(teacherSignupData.institute)))}
                      />
                      {renderError(teacherTouched.institute && teacherSignupData.institute === '', "This field is mandatory")}
                      {renderError(teacherTouched.institute && teacherSignupData.institute !== '' && !isValidName(teacherSignupData.institute), "Invalid institute name (Only letters allowed)")}
                    </div>
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
