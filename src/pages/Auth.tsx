import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Zap, Eye, EyeOff } from 'lucide-react';

type RoleType = 'STUDENT' | 'TEACHER';

const isValidGmail = (email: string) => email.endsWith('@gmail.com');

const isValidPassword = (password: string) =>
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

const isValidName = (name: string) =>
  /^[A-Za-z]+( [A-Za-z]+)*$/.test(name.trim());

const isEmptyField = (data: Record<string, string>) =>
  Object.values(data).some((value) => value.trim() === '');

const getInputClass = (isError: boolean) =>
  `transition-all ${isError ? 'border-red-500 focus-visible:ring-red-500 ring-2 ring-red-500/20' : ''}`;

const renderError = (isError: boolean, message = 'This field is mandatory') =>
  isError && <p className="text-[10px] text-red-500 font-medium mt-1 ml-1">{message}</p>;

const Auth = () => {
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();
  const { toast } = useToast();

  /* ✅ AUTO REDIRECT ON REFRESH */
  useEffect(() => {
    if (user) {
      navigate(
        user.role === 'TEACHER' ? '/faculty-dashboard' : '/practice',
        { replace: true }
      );
    }
  }, [user, navigate]);

  const [loginData, setLoginData] = useState({ emailId: '', password: '' });
  const [loginTouched, setLoginTouched] = useState({ emailId: false, password: false });

  const [signupTouched, setSignupTouched] = useState({
    firstName: false,
    lastName: false,
    emailId: false,
    password: false,
    confirmPassword: false,
  });

  const [teacherTouched, setTeacherTouched] = useState({
    firstName: false,
    lastName: false,
    emailId: false,
    password: false,
    confirmPassword: false,
    subjectAssociated: false,
    institute: false,
  });

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    confirmPassword: '',
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

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showStudentSignupPassword, setShowStudentSignupPassword] = useState(false);
  const [showStudentConfirmPassword, setShowStudentConfirmPassword] = useState(false);
  const [showTeacherSignupPassword, setShowTeacherSignupPassword] = useState(false);
  const [showTeacherConfirmPassword, setShowTeacherConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* FULL JSX SAME AS YOUR FILE */}
    </div>
  );
};

export default Auth;



