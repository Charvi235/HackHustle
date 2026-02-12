import { useState } from 'react';
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
  Home,
  ChevronDown,
  ChevronUp,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function AppSidebar() {
  const { isAuthenticated, isFaculty } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);

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

  // Student navigation items - NO Dashboard, NO About Us, NO Contact Us
  const studentItems = [
    { title: 'Practice', url: '/practice', icon: BookOpen },
    { title: 'Mock Interview', url: '/interview', icon: Brain },
    { title: 'Quiz Battle', url: '/battle', icon: Trophy },
    { title: 'Profile', url: '/profile', icon: User },
  ];

  // Faculty navigation items - Dashboard, Student Doubts, Profile only
  // const facultyItems = [
  //   { title: 'Dashboard', url: '/faculty-dashboard', icon: LayoutDashboard },
  //   { title: 'Student Doubts', url: '/faculty-doubts', icon: MessageSquare },
  //   { title: 'Profile', url: '/profile', icon: User },
  // ];
  // Faculty navigation items - Dashboard, Student Doubts, Profile only
  const facultyItems = [
    { title: 'Dashboard', url: '/faculty-dashboard', icon: LayoutDashboard },
    { title: 'Student Doubts', url: '/faculty-doubts', icon: MessageSquare },
    { title: 'Profile', url: '/teacher-profile', icon: User }, // ✅ Ab ye Teacher Profile kholega
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
              
              {/* Contact Us - Collapsible Dropdown (only for public pages) */}
              {!isAuthenticated && (
                <SidebarMenuItem>
                  <Collapsible open={contactOpen} onOpenChange={setContactOpen}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        className="transition-all duration-200 ease-in-out text-base py-3 hover:bg-muted/60 hover:text-foreground w-full justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5" />
                          {!collapsed && <span className="text-base">Contact Us</span>}
                        </div>
                        {!collapsed && (
                          contactOpen ? (
                            <ChevronUp className="h-4 w-4 transition-transform" />
                          ) : (
                            <ChevronDown className="h-4 w-4 transition-transform" />
                          )
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-8 pr-2 py-2">
                      <div className="bg-muted/50 rounded-md p-3 text-sm space-y-1">
                        <p className="text-muted-foreground">Support Email:</p>
                        <a 
                          href="mailto:support@hackhustle.com" 
                          className="text-primary hover:underline font-medium"
                        >
                          support@hackhustle.com
                        </a>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar trigger inside for collapsed state */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
}
