import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Info, 
  Mail, 
  LayoutDashboard,
  MessageSquare,
  Users,
  Home
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const { isAuthenticated, isFaculty } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

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

  // Student navigation items
  const studentItems = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Practice', url: '/practice', icon: BookOpen },
    { title: 'Mock Interview', url: '/interview', icon: Brain },
    { title: 'Quiz Battle', url: '/battle', icon: Trophy },
  ];

  // Faculty navigation items - only 2 items: Dashboard, Student Doubts
  const facultyItems = [
    { title: 'Dashboard', url: '/faculty-dashboard', icon: LayoutDashboard },
    { title: 'Student Doubts', url: '/faculty-doubts', icon: MessageSquare },
  ];

  // Public navigation items (Home only - About/Contact handled specially)
  const publicItems = [
    { title: 'Home', url: '/', icon: Home },
  ];

  const navItems = isAuthenticated 
    ? (isFaculty ? facultyItems : studentItems) 
    : publicItems;

  return (
    <Sidebar 
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground mb-2">
            {isAuthenticated 
              ? (isFaculty ? 'Faculty Menu' : 'Student Menu') 
              : 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={active}
                      className={cn(
                        "transition-all duration-200 ease-in-out text-base py-3",
                        active 
                          ? "bg-primary/20 text-primary font-bold border-l-4 border-primary" 
                          : "hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className={cn("h-5 w-5", active && "text-primary")} />
                        {!collapsed && <span className="text-base">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              
              {/* About Us - smooth scroll (only for public) */}
              {!isAuthenticated && (
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleAboutClick}
                    className="transition-all duration-200 ease-in-out text-base py-3 hover:bg-muted/60 hover:text-foreground"
                  >
                    <Info className="h-5 w-5" />
                    {!collapsed && <span className="text-base">About Us</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              
              {/* Contact Us - tooltip (only for public) */}
              {!isAuthenticated && (
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton className="cursor-default transition-all duration-200 ease-in-out text-base py-3 hover:bg-muted/60">
                        <Mail className="h-5 w-5" />
                        {!collapsed && <span className="text-base">Contact Us</span>}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Need help? Reach us at contact@hackhustle.org</p>
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Info section removed for authenticated faculty users */}
      </SidebarContent>

      {/* Sidebar trigger inside for collapsed state */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
}
