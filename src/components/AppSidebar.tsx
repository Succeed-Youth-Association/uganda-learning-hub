
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarFooter,
} from './ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { BookOpen, Home, Book, FileText, GraduationCap, ChevronRight } from 'lucide-react';

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
  { title: "Lesson Notes", id: "lesson-notes", icon: FileText },
  { title: "Schemes of Work", id: "schemes-of-work", icon: Book },
  { title: "Past Papers", id: "past-papers", icon: GraduationCap },
  { title: "Holiday Packages", id: "holiday-packages", icon: BookOpen },
  { title: "Textbooks", id: "textbooks", icon: Book },
];

const allClassItems = [...nurseryItems, ...primaryItems, ...secondaryItems];

export function AppSidebar() {
  const navigate = useNavigate();

  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`);
  };

  const handleResourceClick = (classId: string, resourceType: string) => {
    navigate(`/class/${classId}/${resourceType}`);
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
              {resourceTypes.map((resourceType) => (
                <Collapsible key={resourceType.id} asChild>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="text-foreground hover:text-orange-600">
                        <resourceType.icon className="h-4 w-4" />
                        <span>{resourceType.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {allClassItems.map((classItem) => (
                          <SidebarMenuSubItem key={`${resourceType.id}-${classItem.id}`}>
                            <SidebarMenuSubButton 
                              onClick={() => handleResourceClick(classItem.id, resourceType.id)}
                              className="text-sm text-muted-foreground hover:text-orange-600"
                            >
                              <span>{classItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
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
