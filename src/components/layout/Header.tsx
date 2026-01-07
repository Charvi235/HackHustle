import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap, LogOut, User, Info, Mail } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProfileDialog } from '@/components/profile/ProfileDialog';
import { DoubtsDialog } from '@/components/profile/DoubtsDialog';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { BookOpen } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadDoubtsCount, setUnreadDoubtsCount] = useState(3);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showDoubtsDialog, setShowDoubtsDialog] = useState(false);
  const { isAuthenticated, user, logout, isFaculty } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Sidebar trigger and Logo */}
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-2 font-bold text-xl">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                HackHustle
              </span>
            </Link>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
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
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
                    <p className="text-xs text-muted-foreground">{user?.emailId}</p>
                    {!isFaculty && <p className="text-xs text-muted-foreground">{user?.points} pts</p>}
                    {isFaculty && <p className="text-xs text-muted-foreground">Faculty - {user?.subject}</p>}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  {/* Only students can see their doubts */}
                  {!isFaculty && (
                    <DropdownMenuItem onClick={() => setShowDoubtsDialog(true)}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      My Doubts
                      {unreadDoubtsCount > 0 && (
                        <Badge variant="destructive" className="ml-auto">
                          {unreadDoubtsCount}
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {/* About Us - scroll to section */}
                <Button variant="ghost" onClick={handleAboutClick} className="hidden md:inline-flex">
                  <Info className="h-4 w-4 mr-2" />
                  About Us
                </Button>
                
                {/* Contact Us - hover tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className="hidden md:inline-flex cursor-default">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Us
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Need help? Reach us at contact@hackhustle.org</p>
                  </TooltipContent>
                </Tooltip>

                <Button variant="ghost" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button onClick={() => navigate('/auth')}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ProfileDialog 
        open={showProfileDialog} 
        onOpenChange={setShowProfileDialog}
      />
      {!isFaculty && (
        <DoubtsDialog 
          open={showDoubtsDialog} 
          onOpenChange={setShowDoubtsDialog}
          onMarkAsRead={(doubtId) => setUnreadDoubtsCount(prev => Math.max(0, prev - 1))}
          onRateTeacher={(doubtId, rating) => {
            console.log(`Rated doubt ${doubtId} with ${rating} stars`);
          }}
        />
      )}
    </header>
  );
};
