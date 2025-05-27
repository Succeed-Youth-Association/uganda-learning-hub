
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Button } from '../components/ui/button';
import { ArrowLeft, FileText, Book, GraduationCap, BookOpen, Loader2 } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { getAvailableSubjectsForClass } from '../utils/dataLoader';

const resourceTypes = [
  { title: "Lesson Notes", id: "lesson-notes", icon: FileText },
  { title: "Schemes of Work", id: "schemes-of-work", icon: Book },
  { title: "Past Papers", id: "past-papers", icon: GraduationCap },
  { title: "Holiday Packages", id: "holiday-packages", icon: BookOpen },
  { title: "Textbooks", id: "textbooks", icon: Book },
];

const ClassPage = () => {
  const { classId } = useParams();
  const [availableResourceTypes, setAvailableResourceTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAvailableResources = async () => {
      if (!classId) return;
      
      setLoading(true);
      const filteredResourceTypes = [];

      for (const resourceType of resourceTypes) {
        const subjects = await getAvailableSubjectsForClass(classId, resourceType.id);
        if (subjects.length > 0) {
          filteredResourceTypes.push({
            ...resourceType,
            subjectCount: subjects.length
          });
        }
      }

      setAvailableResourceTypes(filteredResourceTypes);
      setLoading(false);
    };

    checkAvailableResources();
  }, [classId]);

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
                  {loading ? 'Loading available resources...' : `${availableResourceTypes.length} resource types available`}
                </p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                  <span className="ml-2 text-lg text-muted-foreground">Loading resources...</span>
                </div>
              ) : availableResourceTypes.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">No resources available</h3>
                  <p className="text-muted-foreground">
                    No resources are available for {getClassTitle(classId || '')} at this time.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                  {availableResourceTypes.map((resourceType) => (
                    <Link key={resourceType.id} to={`/class/${classId}/${resourceType.id}`}>
                      <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-6 border min-w-0">
                        <div className="flex items-start justify-between mb-4">
                          <resourceType.icon className="h-8 w-8 text-orange-600 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{resourceType.subjectCount} subjects</span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-card-foreground mb-2 break-words">
                          {resourceType.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-4">
                          Browse {resourceType.title.toLowerCase()} for {getClassTitle(classId || '')}
                        </p>

                        <Button className="w-full bg-orange-600 hover:bg-orange-700">
                          View Resources
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
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
