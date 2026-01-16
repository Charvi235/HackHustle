
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowFaculty?: boolean;
  allowStudent?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  allowFaculty = true, 
  allowStudent = true,
  redirectTo = '/auth'
}: ProtectedRouteProps) => {
  const { isAuthenticated, isFaculty, isLoading } = useAuth(); 
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate(redirectTo);
      return;
    }

    if (isFaculty && !allowFaculty) {
      toast({
        title: "Access Denied",
        description: "This feature is only available for students.",
        variant: "destructive",
      });
      navigate('/faculty-dashboard');
      return;
    }

    if (!isFaculty && !allowStudent) {
      toast({
        title: "Access Denied",
        description: "This feature is only available for faculty.",
        variant: "destructive",
      });
      navigate('/dashboard');
      return;
    }
  }, [isLoading, isAuthenticated, isFaculty, allowFaculty, allowStudent, navigate, redirectTo, toast]); // <--- added isLoading

  if (isLoading) return null; // <--- minimal: don't render until loaded

  if (!isAuthenticated) return null;
  if (isFaculty && !allowFaculty) return null;
  if (!isFaculty && !allowStudent) return null;

  return <>{children}</>;
};
