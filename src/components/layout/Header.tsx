import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap, Trophy, BookOpen, Brain, LogOut } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                <>
                  <span className="text-sm text-muted-foreground">
                    {user?.FirstName} ({user?.Points} pts)
                  </span>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
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
                      {user?.FirstName} {user?.LastName} ({user?.Points} pts)
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
    </header>
  );
};