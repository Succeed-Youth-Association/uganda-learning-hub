
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, FileText, Book, GraduationCap, BookOpen, Package } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';

const ClassPage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();

  const getClassTitle = (id: string) => {
    const classMap: { [key: string]: string } = {
      'baby': 'Baby Class',
      'middle': 'Middle Class', 
      'top': 'Top Class',
      'p1': 'Primary One',
      'p2': 'Primary Two',
      'p3': 'Primary Three',
      'p4': 'Primary Four',
      'p5': 'Primary Five',
      'p6': 'Primary Six',
      'p7': 'Primary Seven',
      's1': 'Senior One',
      's2': 'Senior Two',
      's3': 'Senior Three',
      's4': 'Senior Four',
      's5': 'Senior Five',
      's6': 'Senior Six'
    };
    return classMap[id || ''] || 'Unknown Class';
  };

  const resourceTypes = [
    {
      title: 'Lesson Notes',
      description: 'Comprehensive lesson notes for all subjects',
      icon: FileText,
      route: 'lesson-notes',
      color: 'text-blue-600'
    },
    {
      title: 'Schemes of Work',
      description: 'Detailed schemes of work for curriculum planning',
      icon: Book,
      route: 'schemes-of-work',
      color: 'text-green-600'
    },
    {
      title: 'Past Papers',
      description: 'Previous examination papers and marking guides',
      icon: GraduationCap,
      route: 'past-papers',
      color: 'text-purple-600'
    },
    {
      title: 'Holiday Packages',
      description: 'Educational materials for holiday assignments',
      icon: Package,
      route: 'holiday-packages',
      color: 'text-yellow-600'
    },
    {
      title: 'Textbooks',
      description: 'Digital textbooks and reference materials',
      icon: BookOpen,
      route: 'textbooks',
      color: 'text-orange-600'
    }
  ];

  const handleResourceClick = (route: string) => {
    navigate(`/class/${classId}/resources/${route}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 w-full flex">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden min-w-0">
          <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b p-2 flex items-center justify-between">
            <SidebarTrigger />
            <ThemeToggle />
          </div>
          <div className="p-4 lg:p-8 min-w-0">
            <div className="max-w-7xl mx-auto min-w-0">
              <div className="mb-8">
                <Link to="/">
                  <Button variant="outline" className="mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Library
                  </Button>
                </Link>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {getClassTitle(classId || '')}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Select a resource type to explore available materials
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {resourceTypes.map((resource) => (
                  <Card 
                    key={resource.route} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 min-w-0"
                    onClick={() => handleResourceClick(resource.route)}
                  >
                    <CardHeader className="text-center pb-2">
                      <resource.icon className={`h-12 w-12 mx-auto mb-4 ${resource.color}`} />
                      <CardTitle className="text-xl font-bold break-words">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-sm break-words">
                        {resource.description}
                      </CardDescription>
                      <Button 
                        className="mt-4 w-full bg-orange-600 hover:bg-orange-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResourceClick(resource.route);
                        }}
                      >
                        Browse {resource.title}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </main>
        <ScrollToTop />
      </div>
    </SidebarProvider>
  );
};

export default ClassPage;
