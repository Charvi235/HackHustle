import { Link, useLocation } from 'react-router-dom';
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

export function AppSidebar() {
  const { isAuthenticated, isFaculty } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Student navigation items
  const studentItems = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Practice', url: '/practice', icon: BookOpen },
    { title: 'Mock Interview', url: '/interview', icon: Brain },
    { title: 'Quiz Battle', url: '/battle', icon: Trophy },
  ];

  // Faculty navigation items - no interview, battle, practice
  const facultyItems = [
    { title: 'Dashboard', url: '/faculty-dashboard', icon: LayoutDashboard },
    { title: 'Student Doubts', url: '/faculty-dashboard', icon: MessageSquare },
    { title: 'Manage Questions', url: '/faculty-dashboard', icon: BookOpen },
    { title: 'Students', url: '/faculty-dashboard', icon: Users },
  ];

  // Public navigation items
  const publicItems = [
    { title: 'Home', url: '/', icon: Home },
    { title: 'About Us', url: '/#features', icon: Info },
    { title: 'Contact Us', url: '/#contact', icon: Mail },
  ];

  const navItems = isAuthenticated 
    ? (isFaculty ? facultyItems : studentItems) 
    : publicItems;

  return (
    <Sidebar 
      className={collapsed ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupLabel>
            {isAuthenticated 
              ? (isFaculty ? 'Faculty Menu' : 'Student Menu') 
              : 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.url)}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* About/Contact for authenticated users */}
        {isAuthenticated && (
          <SidebarGroup>
            <SidebarGroupLabel>Info</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/#features">
                      <Info className="h-4 w-4" />
                      {!collapsed && <span>About Us</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/#contact">
                      <Mail className="h-4 w-4" />
                      {!collapsed && <span>Contact Us</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Sidebar trigger inside for collapsed state */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
}
