import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

interface User {
  StudentID?: string;
  FacultyID?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Points?: number;
  Role: 'student' | 'faculty';
  Subject?: string;
  Rating?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'faculty') => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
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
      const response = await authService.login({ email, password, role });
      
      const loggedInUser: User = {
        ...(role === 'faculty' 
          ? { FacultyID: response.user.facultyID || response.user.id }
          : { StudentID: response.user.studentID || response.user.id }
        ),
        FirstName: response.user.firstName,
        LastName: response.user.lastName,
        Email: response.user.email,
        Role: role,
        ...(role === 'student' && { Points: response.user.points || 0 }),
        ...(role === 'faculty' && { 
          Subject: response.user.subject,
          Rating: response.user.rating 
        }),
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
    password: string
  ): Promise<boolean> => {
    try {
      const response = await authService.signup({ firstName, lastName, email, password });
      
      const newUser: User = {
        StudentID: response.user.studentID || response.user.id,
        FirstName: response.user.firstName,
        LastName: response.user.lastName,
        Email: response.user.email,
        Points: response.user.points || 0,
        Role: 'student', // Signup is always for students
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
        isFaculty: user?.Role === 'faculty',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
