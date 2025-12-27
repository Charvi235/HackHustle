// // import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// // import { authService } from '@/services/authService';
// // import { toast } from '@/hooks/use-toast';

// // interface User {
// //   student_id?: string;
// //   faculty_id?: string;
// //   first_name: string;
// //   last_name: string;
// //   emailId: string;
// //   points?: number;
// //   role: string;
// //   subject?: string;
// //   rating?: number;
// // }

// // interface AuthContextType {
// //   user: User | null;
// //   login: (emailId: string, password: string, role: 'student' | 'faculty') => Promise<boolean>;
// //   signup: (firstName: string, lastName: string, emailIdId: string, password: string, role?: 'student' | 'faculty', subjectAssociated?: string, institute?: string) => Promise<boolean>;
// //   logout: () => void;
// //   isAuthenticated: boolean;
// //   isFaculty: boolean;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within AuthProvider');
// //   }
// //   return context;
// // };

// // export const AuthProvider = ({ children }: { children: ReactNode }) => {
// //   const [user, setUser] = useState<User | null>(null);

// //   useEffect(() => {
// //     // Load user from localStorage on mount
// //     const storedUser = localStorage.getItem('user');
// //     if (storedUser) {
// //       setUser(JSON.parse(storedUser));
// //     }
// //   }, []);

// //   const login = async (emailId: string, password: string, role: 'student' | 'faculty'): Promise<boolean> => {
// //     try {
// //       const roleUpper = role.toUpperCase() as "STUDENT" | "FACULTY";; // Convert to STUDENT or FACULTY
// //       const response = await authService.login({ emailId, password, role: roleUpper });
      
// //       const loggedInUser: User = {
// //         student_id: response.student_id,
// //         faculty_id: response.faculty_id,
// //         first_name: response.first_name,
// //         last_name: response.last_name,
// //         emailId: response.emailId,
// //         role: response.role,
// //         points: response.points || 0,
// //         subject: response.subject,
// //         rating: response.rating,
// //       };
      
// //       setUser(loggedInUser);
// //       localStorage.setItem('user', JSON.stringify(loggedInUser));
// //       return true;
// //     } catch (error: any) {
// //       toast({
// //         title: "Login Failed",
// //         description: error.message || "Invalid credentials. Please try again.",
// //         variant: "destructive",
// //       });
// //       return false;
// //     }
// //   };

// //   const signup = async (
// //     firstName: string,
// //     lastName: string,
// //     emailId: string,
// //     password: string,
// //     role: 'student' | 'faculty' = 'student',
// //     subjectAssociated?: string,
// //     institute?: string
// //   ): Promise<boolean> => {
// //     try {
// //       const roleUpper = role.toUpperCase()  as "STUDENT" | "FACULTY";; // Convert to STUDENT or FACULTY
// //       const response = await authService.signup({ 
// //         first_name: firstName, 
// //         last_name: lastName, 
// //         emailId, 
// //         password,
// //         role: roleUpper,
// //         subject_associated: subjectAssociated,
// //         institute: institute,
// //       });
      
// //       const newUser: User = {
// //         student_id: response.student_id,
// //         faculty_id: response.faculty_id,
// //         first_name: response.first_name,
// //         last_name: response.last_name,
// //         emailId: response.emailId,
// //         points: response.points || 0,
// //         role: response.role,
// //         subject: response.subject,
// //         rating: response.rating,
// //       };
      
// //       setUser(newUser);
// //       localStorage.setItem('user', JSON.stringify(newUser));
// //       return true;
// //     } catch (error: any) {
// //       toast({
// //         title: "Signup Failed",
// //         description: error.message || "Could not create account. Please try again.",
// //         variant: "destructive",
// //       });
// //       return false;
// //     }
// //   };

// //   const logout = async () => {
// //     await authService.logout();
// //     setUser(null);
// //     localStorage.removeItem('user');
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         login,
// //         signup,
// //         logout,
// //         isAuthenticated: !!user,
// //         isFaculty: user?.role?.toLowerCase() === 'faculty',
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };













// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { authService } from '@/services/authService';
// import { toast } from '@/hooks/use-toast';

// type RoleType = "STUDENT" | "FACULTY";

// interface User {
//   student_id?: string;
//   faculty_id?: string;
//   first_name: string;
//   last_name: string;
//   emailId: string;
//   points?: number;
//   role: RoleType;
//   subject?: string;
//   rating?: number;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (emailId: string, password: string, role: 'student' | 'faculty') => Promise<boolean>;
//   signup: (
//     firstName: string,
//     lastName: string,
//     emailId: string,
//     password: string,
//     role?: 'student' | 'faculty',
//     subjectAssociated?: string,
//     institute?: string
//   ) => Promise<boolean>;
//   logout: () => void;
//   isAuthenticated: boolean;
//   isFaculty: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// // Utility function to map lowercase role to uppercase literal type
// const mapRole = (role: 'student' | 'faculty'): RoleType => {
//   if (role === 'student') return 'STUDENT';
//   if (role === 'faculty') return 'FACULTY';
//   throw new Error('Invalid role'); // should never happen
// };

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const login = async (emailId: string, password: string, role: 'student' | 'faculty'): Promise<boolean> => {
//     try {
//       const roleUpper = mapRole(role); // now type-safe
//       const response = await authService.login({ emailId, password, role: roleUpper });

//       const loggedInUser: User = {
//         student_id: response.student_id,
//         faculty_id: response.faculty_id,
//         first_name: response.first_name,
//         last_name: response.last_name,
//         emailId: response.emailId,
//         role: response.role as RoleType,
//         points: response.points || 0,
//         subject: response.subject,
//         rating: response.rating,
//       };

//       setUser(loggedInUser);
//       localStorage.setItem('user', JSON.stringify(loggedInUser));
//       return true;
//     } catch (error: any) {
//       toast({
//         title: "Login Failed",
//         description: error.message || "Invalid credentials. Please try again.",
//         variant: "destructive",
//       });
//       return false;
//     }
//   };

//   const signup = async (
//     firstName: string,
//     lastName: string,
//     emailId: string,
//     password: string,
//     role: 'student' | 'faculty' = 'student',
//     subjectAssociated?: string,
//     institute?: string
//   ): Promise<boolean> => {
//     try {
//       const roleUpper = mapRole(role); // type-safe conversion
//       const response = await authService.signup({
//         first_name: firstName,
//         last_name: lastName,
//         emailId,
//         password,
//         role: roleUpper,
//         subject_associated: subjectAssociated,
//         institute: institute,
//       });

//       const newUser: User = {
//         student_id: response.student_id,
//         faculty_id: response.faculty_id,
//         first_name: response.first_name,
//         last_name: response.last_name,
//         emailId: response.emailId,
//         points: response.points || 0,
//         role: response.role as RoleType,
//         subject: response.subject,
//         rating: response.rating,
//       };

//       setUser(newUser);
//       localStorage.setItem('user', JSON.stringify(newUser));
//       return true;
//     } catch (error: any) {
//       toast({
//         title: "Signup Failed",
//         description: error.message || "Could not create account. Please try again.",
//         variant: "destructive",
//       });
//       return false;
//     }
//   };

//   const logout = async () => {
//     await authService.logout();
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         signup,
//         logout,
//         isAuthenticated: !!user,
//         isFaculty: user?.role === 'FACULTY',
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

type RoleType = 'STUDENT' | 'TEACHER';

interface User {
  student_id?: string;
  teacher_id?: string;
  first_name: string;
  last_name: string;
  emailId: string;
  points?: number;
  role: RoleType;
  subject?: string;
  rating?: number;
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
      const success = await authService.login({ emailId, password, role: roleUpper }); // <-- pass object
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
      const success = await authService.signup({
        first_name: firstName,
        last_name: lastName,
        emailId,
        password,
        role: roleUpper,
        subject_associated: subjectAssociated,
        institute,
      }); // <-- pass object

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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isTeacher: user?.role === 'TEACHER',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

