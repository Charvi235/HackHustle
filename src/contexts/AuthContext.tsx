import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

type RoleType = 'STUDENT' | 'TEACHER';

// ─────────── TOGGLE MOCK AUTH ───────────
const USE_MOCK_AUTH = true;

interface User {
  student_id?: string;
  teacher_id?: string;
  first_name: string;
  last_name: string;
  emailId: string;
  points?: number;
  role: RoleType;
  subject?: string;
  institute?: string;
  rating?: number;
}

// ─────────── MOCK DATA ───────────
const MOCK_STUDENT: User = {
  student_id: 'mock-student-001',
  first_name: 'Charvi',
  last_name: 'Student',
  emailId: 'charvi@example.com',
  points: 1200,
  role: 'STUDENT',
  rating: 4.5,
};

const MOCK_TEACHER: User = {
  teacher_id: 'mock-teacher-001',
  first_name: 'Amit',
  last_name: 'Verma',
  emailId: 'teacher@gmail.com',
  role: 'TEACHER',
  subject: 'DSA',
  institute: 'IIT Delhi',
};

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Utility to convert lowercase role to uppercase literal
const mapRole = (role: 'student' | 'teacher'): RoleType => {
  if (role === 'student') return 'STUDENT';
  if (role === 'teacher') return 'TEACHER';
  throw new Error('Invalid role');
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (
    emailId: string,
    password: string,
    role: 'student' | 'teacher'
  ): Promise<boolean> => {
    try {
      const roleUpper = mapRole(role);

      // ─────────── MOCK LOGIN ───────────
      if (USE_MOCK_AUTH) {
        const mockUser = roleUpper === 'TEACHER' ? MOCK_TEACHER : MOCK_STUDENT;
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast({
          title: 'Mock Login Successful',
          description: `Welcome, ${mockUser.first_name}! (Mock Mode)`,
        });
        return true;
      }

      // ─────────── REAL LOGIN ───────────
      const success = await authService.login({ emailId, password, role: roleUpper });
      if (success) {
        const loggedInUser: User = {
          emailId,
          first_name: '',
          last_name: '',
          role: roleUpper,
        };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
      }
      return success;
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

      // ─────────── MOCK SIGNUP ───────────
      if (USE_MOCK_AUTH) {
        const mockUser: User = roleUpper === 'TEACHER' 
          ? { ...MOCK_TEACHER, first_name: firstName, last_name: lastName, emailId }
          : { ...MOCK_STUDENT, first_name: firstName, last_name: lastName, emailId };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast({
          title: 'Mock Signup Successful',
          description: `Account created for ${firstName}! (Mock Mode)`,
        });
        return true;
      }

      // ─────────── REAL SIGNUP ───────────
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
