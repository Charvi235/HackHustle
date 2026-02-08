import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Zap, Info, Mail, User, Pencil, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const { isAuthenticated, user, isFaculty, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const unreadDoubtsCount = 3; // Mock count
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // const handleAboutClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if (location.pathname !== '/') {
  //     navigate('/');
  //     setTimeout(() => {
  //       document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  //     }, 100);
  //   } else {
  //     document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };
  const handleAboutClick = () => {
    // 1. Agar hum Home Page ('/') par nahi hain, toh pehle Home par jao
    if (location.pathname !== '/') {
      navigate('/');
      
      // Page load hone ka thoda wait karo, phir scroll karo
      setTimeout(() => {
        // 'about' wahi ID hai jo aapne abhi div par lagayi thi
        const element = document.getElementById('about');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } 
    // 2. Agar hum pehle se Home Page par hain, toh seedha scroll karo
    else {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
          {/* <div className="flex items-center space-x-4">
            {isAuthenticated && <SidebarTrigger />}
            <div className="flex items-center space-x-2 font-bold text-xl">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                HackHustle
              </span>
            </div>
          </div> */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Trigger waisa ka waisa hi rahega */}
            {isAuthenticated && <SidebarTrigger />}
            
            {/* Logo Section ko Link bana diya */}
            <Link to="/" className="flex items-center space-x-2 font-bold text-xl cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                HackHustle
              </span>
            </Link>
          </div>

          {/* Center - About Us & Contact Us (always visible) */}
          <div className="hidden md:flex items-center space-x-6 relative">
            <Button variant="ghost" onClick={handleAboutClick}>
              <Info className="h-4 w-4 mr-2" />
              About Us
            </Button>
            
            <div className="relative">
              <Button 
                variant="ghost" 
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="flex items-center"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
                {isContactOpen ? (
                  <ChevronUp className="h-4 w-4 ml-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </Button>
              
              {/* Contact Dropdown */}
              <div 
                className={`absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-4 min-w-[280px] z-50 transition-all duration-200 ease-in-out ${
                  isContactOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <p className="text-sm text-muted-foreground">
                  Need help? Contact us at{' '}
                  <a 
                    href="mailto:contact@hackhustle.com" 
                    className="text-primary hover:underline font-medium"
                  >
                    hackhustle062@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - User Profile or Auth buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative"
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
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border border-border">
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile?edit=true')} className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
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
        </div>
      </div>
    </header>
  );
};
