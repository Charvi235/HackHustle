import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

interface User {
  student_id?: string;
  faculty_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  points?: number;
  role: string;
  subject?: string;
  rating?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'faculty') => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string, password: string, role?: 'student' | 'faculty', subjectAssociated?: string, institute?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isFaculty: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'faculty'): Promise<boolean> => {
    try {
      const roleUpper = role.toUpperCase(); // Convert to STUDENT or FACULTY
      const response = await authService.login({ email, password, role: roleUpper });
      
      const loggedInUser: User = {
        student_id: response.student_id,
        faculty_id: response.faculty_id,
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        role: response.role,
        points: response.points || 0,
        subject: response.subject,
        rating: response.rating,
      };
      
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      return true;
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: 'student' | 'faculty' = 'student',
    subjectAssociated?: string,
    institute?: string
  ): Promise<boolean> => {
    try {
      const roleUpper = role.toUpperCase(); // Convert to STUDENT or FACULTY
      const response = await authService.signup({ 
        first_name: firstName, 
        last_name: lastName, 
        email, 
        password,
        role: roleUpper,
        subject_associated: subjectAssociated,
        institute: institute,
      });
      
      const newUser: User = {
        student_id: response.student_id,
        faculty_id: response.faculty_id,
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        points: response.points || 0,
        role: response.role,
        subject: response.subject,
        rating: response.rating,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || "Could not create account. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isFaculty: user?.role?.toLowerCase() === 'faculty',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
