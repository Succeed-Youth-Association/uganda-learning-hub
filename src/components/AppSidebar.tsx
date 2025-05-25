
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from './ui/sidebar';
import { BookOpen, Home, Book, FileText, GraduationCap } from 'lucide-react';

const nurseryItems = [
  { title: "Baby Class", id: "baby" },
  { title: "Middle Class", id: "middle" },
  { title: "Top Class", id: "top" },
];

const primaryItems = [
  { title: "Primary One", id: "p1" },
  { title: "Primary Two", id: "p2" },
  { title: "Primary Three", id: "p3" },
  { title: "Primary Four", id: "p4" },
  { title: "Primary Five", id: "p5" },
  { title: "Primary Six", id: "p6" },
  { title: "Primary Seven", id: "p7" },
];

const secondaryItems = [
  { title: "Senior One", id: "s1" },
  { title: "Senior Two", id: "s2" },
  { title: "Senior Three", id: "s3" },
  { title: "Senior Four", id: "s4" },
  { title: "Senior Five", id: "s5" },
  { title: "Senior Six", id: "s6" },
];

const resourceTypes = [
  { title: "Lesson Notes", icon: FileText },
  { title: "Schemes of Work", icon: Book },
  { title: "Past Papers", icon: GraduationCap },
  { title: "Holiday Packages", icon: BookOpen },
  { title: "Textbooks", icon: Book },
];

export function AppSidebar() {
  const navigate = useNavigate();

  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <Sidebar className="border-r bg-background">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-2">
          
          <span className="font-semibold text-foreground">Quick Navigation</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleHomeClick} className="text-foreground hover:text-orange-600">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-600 font-semibold">
            Nursery Section
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nurseryItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => handleClassClick(item.id)}
                    className="text-foreground hover:text-orange-600"
                  >
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-600 font-semibold">
            Primary Section
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => handleClassClick(item.id)}
                    className="text-foreground hover:text-orange-600"
                  >
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-600 font-semibold">
            Secondary Section
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => handleClassClick(item.id)}
                    className="text-foreground hover:text-orange-600"
                  >
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-600 font-semibold">
            Resource Types
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceTypes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="text-foreground hover:text-orange-600">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-muted-foreground text-center">
          <em>For Planned Teachers</em>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
