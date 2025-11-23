import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap, Trophy, BookOpen, Brain, LogOut, User } from 'lucide-react';
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

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadDoubtsCount, setUnreadDoubtsCount] = useState(3);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showDoubtsDialog, setShowDoubtsDialog] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const authenticatedNavItems = [
    { label: 'Practice', href: '/practice', icon: BookOpen },
    { label: 'Mock Interview', href: '/interview', icon: Brain },
    { label: 'Quiz Battle', href: '/battle', icon: Trophy },
  ];

  const publicNavItems = [
    { label: 'About Us', onClick: () => scrollToSection('features') },
    { label: 'Contact Us', onClick: () => scrollToSection('contact') },
  ];

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              HackHustle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated
              ? authenticatedNavItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))
              : publicNavItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                      {unreadDoubtsCount > 0 && (
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
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <p className="text-xs text-muted-foreground">{user?.points} pts</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowDoubtsDialog(true)}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      My Doubts
                      {unreadDoubtsCount > 0 && (
                        <Badge variant="destructive" className="ml-auto">
                          {unreadDoubtsCount}
                        </Badge>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate('/auth')}>
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/auth')}>Get Started</Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  {authenticatedNavItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors p-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                    <div className="px-2 text-sm text-muted-foreground">
                      {user?.first_name} {user?.last_name} ({user?.points} pts)
                    </div>
                    <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {publicNavItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={item.onClick}
                      className="text-muted-foreground hover:text-foreground transition-colors p-2 text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                    <Button variant="ghost" className="justify-start" onClick={() => navigate('/auth')}>
                      Sign In
                    </Button>
                    <Button className="justify-start" onClick={() => navigate('/auth')}>
                      Get Started
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <ProfileDialog 
        open={showProfileDialog} 
        onOpenChange={setShowProfileDialog}
      />
      <DoubtsDialog 
        open={showDoubtsDialog} 
        onOpenChange={setShowDoubtsDialog}
        onMarkAsRead={(doubtId) => setUnreadDoubtsCount(prev => Math.max(0, prev - 1))}
        onRateTeacher={(doubtId, rating) => {
          // TODO: Connect to backend
          console.log(`Rated doubt ${doubtId} with ${rating} stars`);
        }}
      />
    </header>
  );
};