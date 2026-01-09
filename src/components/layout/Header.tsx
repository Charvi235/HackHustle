import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Zap, Info, Mail } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const Header = () => {
  const { isAuthenticated, user, isFaculty } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const unreadDoubtsCount = 3; // Mock count

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && <SidebarTrigger />}
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-2 font-bold text-xl">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                HackHustle
              </span>
            </Link>
          </div>

          {/* Center - About Us & Contact Us (always visible) */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" onClick={handleAboutClick}>
              <Info className="h-4 w-4 mr-2" />
              About Us
            </Button>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="cursor-default">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Need help? Reach us at contact@hackhustle.org</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Right Side - User Profile or Auth buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => navigate('/profile')}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                {!isFaculty && unreadDoubtsCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadDoubtsCount}
                  </Badge>
                )}
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button onClick={() => navigate('/auth')}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
