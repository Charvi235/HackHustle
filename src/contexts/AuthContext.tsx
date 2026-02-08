
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

type RoleType = 'STUDENT' | 'TEACHER';

export interface User {
  student_id?: string;
  teacher_id?: string;
  first_name: string;
  last_name: string;
  emailId: string;
  points?: number;
  role: RoleType;
  subject?: string;
  rating?: number;
  institute?: string;
  designation?: string;
  department?: string;
  experience?: string;
  bio?: string;
  officeHours?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
  stats?: {
    studentsMentored?: number;
    doubtsSolved?: number;
    battleWins?: number;
    questionsSolved?: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (emailId: string, password: string, role: 'student' | 'teacher') => Promise<boolean>;
  signup: (
    firstName: string,
    lastName: string,
    emailId: string,
    password: string,
    role?: 'student' | 'teacher',
    subjectAssociated?: string,
    institute?: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isTeacher: boolean;
  isFaculty: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const mapRole = (role: 'student' | 'teacher'): RoleType => {
  if (role === 'student') return 'STUDENT';
  if (role === 'teacher') return 'TEACHER';
  throw new Error('Invalid role');
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false); 
  }, []);

  const login = async (
    emailId: string,
    password: string,
    role: 'student' | 'teacher'
  ): Promise<boolean> => {
    try {
      const roleUpper = mapRole(role);
      const result = await authService.login({ emailId, password, role: roleUpper });
      if (result.success) {
        const loggedInUser: User = result.user || {
          emailId,
          first_name: '',
          last_name: '',
          role: roleUpper,
        };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
      }
      return result.success;
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    emailId: string,
    password: string,
    role: 'student' | 'teacher' = 'student',
    subjectAssociated?: string,
    institute?: string
  ): Promise<boolean> => {
    try {
      const roleUpper = mapRole(role);
      const success = await authService.signup({
        first_name: firstName,
        last_name: lastName,
        emailId,
        password,
        role: roleUpper,
        subject_associated: subjectAssociated,
        institute,
      });

      if (success) {
        const newUser: User = {
          emailId,
          first_name: firstName,
          last_name: lastName,
          role: roleUpper,
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
      }
      return success;
    } catch (error: any) {
      toast({
        title: 'Signup Failed',
        description: error.message || 'Could not create account. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  const isTeacher = user?.role === 'TEACHER';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isTeacher,
        isFaculty: isTeacher,
        isLoading, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
