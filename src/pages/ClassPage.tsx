
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Button } from '../components/ui/button';
import { ArrowLeft, FileText, Book, GraduationCap, BookOpen, Package } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';

const ClassPage = () => {
  const { classId } = useParams();
  
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
      id: 'lesson-notes', 
      title: 'Lesson Notes', 
      icon: FileText, 
      description: 'Comprehensive lesson plans and teaching notes',
      color: 'bg-blue-500'
    },
    { 
      id: 'schemes-of-work', 
      title: 'Schemes of Work', 
      icon: Book, 
      description: 'Detailed curriculum planning documents',
      color: 'bg-green-500'
    },
    { 
      id: 'past-papers', 
      title: 'Past Papers', 
      icon: GraduationCap, 
      description: 'Previous examination papers and solutions',
      color: 'bg-purple-500'
    },
    { 
      id: 'holiday-packages', 
      title: 'Holiday Packages', 
      icon: Package, 
      description: 'Holiday assignments and revision materials',
      color: 'bg-orange-500'
    },
    { 
      id: 'textbooks', 
      title: 'Textbooks', 
      icon: BookOpen, 
      description: 'Course textbooks and reading materials',
      color: 'bg-red-500'
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 w-full flex">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden">
          <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b p-2">
            <SidebarTrigger />
          </div>
          <div className="p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
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
                <p className="text-lg text-muted-foreground">
                  Select a resource type to access learning materials
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {resourceTypes.map((resource) => (
                  <Link 
                    key={resource.id} 
                    to={`/class/${classId}/resources/${resource.id}`}
                    className="block"
                  >
                    <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border hover:border-orange-300">
                      <div className={`${resource.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                        <resource.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {resource.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
        <ScrollToTop />
      </div>
    </SidebarProvider>
  );
};

export default ClassPage;
