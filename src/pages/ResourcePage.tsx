import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Search, Eye, Download, FileText } from 'lucide-react';
import PaginationWithJump from '../components/PaginationWithJump';
import ScrollToTop from '../components/ScrollToTop';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';

const ResourcePage = () => {
  const { classId, resourceType } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Dummy data for resources
  const generateDummyResources = (type: string, count: number = 50) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${type}-${i + 1}`,
      title: `${type.replace('-', ' ')} ${i + 1} - Subject Topic`,
      subject: ['Mathematics', 'English', 'Science', 'Social Studies', 'Art'][i % 5],
      term: ['Term 1', 'Term 2', 'Term 3'][i % 3],
      year: 2024,
      fileSize: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)}MB`,
      downloadUrl: '#',
      previewUrl: '#'
    }));
  };

  const allResources = useMemo(() => {
    return generateDummyResources(resourceType || 'resource');
  }, [resourceType]);

  const filteredResources = useMemo(() => {
    return allResources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allResources, searchTerm]);

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResources = filteredResources.slice(startIndex, startIndex + itemsPerPage);

  const getResourceTypeTitle = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'lesson-notes': 'Lesson Notes',
      'schemes-of-work': 'Schemes of Work',
      'past-papers': 'Past Papers',
      'holiday-packages': 'Holiday Packages',
      'textbooks': 'Textbooks'
    };
    return typeMap[type] || 'Resources';
  };

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

  const handlePreview = (resource: any) => {
    console.log('Previewing:', resource.title);
    alert(`Previewing: ${resource.title}`);
  };

  const handleDownload = (resource: any) => {
    console.log('Downloading:', resource.title);
    alert(`Downloading: ${resource.title}`);
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
                <Link to={`/class/${classId}`}>
                  <Button variant="outline" className="mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to {getClassTitle(classId || '')}
                  </Button>
                </Link>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {getResourceTypeTitle(resourceType || '')}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {getClassTitle(classId || '')} - {filteredResources.length} resources available
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                  <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="   Search resources..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                {currentResources.map((resource) => (
                  <div key={resource.id} className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 lg:p-6 border min-w-0">
                    <div className="flex items-start justify-between mb-4">
                      <FileText className="h-8 w-8 text-orange-600 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{resource.fileSize}</span>
                    </div>
                    
                    <h3 className="text-base lg:text-lg font-semibold text-card-foreground mb-2 line-clamp-2 break-words">
                      {resource.title}
                    </h3>
                    
                    <div className="space-y-1 mb-4">
                      <p className="text-sm text-muted-foreground break-words">Subject: {resource.subject}</p>
                      <p className="text-sm text-muted-foreground">Term: {resource.term}</p>
                      <p className="text-sm text-muted-foreground">Year: {resource.year}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => handlePreview(resource)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        onClick={() => handleDownload(resource)}
                        size="sm"
                        className="w-full bg-orange-600 hover:bg-orange-700"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <PaginationWithJump
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mb-8"
                />
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

export default ResourcePage;
