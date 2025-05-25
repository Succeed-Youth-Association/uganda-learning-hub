
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Search, Eye, Download, FileText } from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '../components/ui/pagination';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full flex">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <Link to={`/class/${classId}`}>
                <Button variant="outline" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to {getClassTitle(classId || '')}
                </Button>
              </Link>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {getResourceTypeTitle(resourceType || '')}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {getClassTitle(classId || '')} - {filteredResources.length} resources available
              </p>

              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search resources..."
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentResources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border">
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="h-8 w-8 text-orange-600" />
                    <span className="text-xs text-gray-500">{resource.fileSize}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <div className="space-y-1 mb-4">
                    <p className="text-sm text-gray-600">Subject: {resource.subject}</p>
                    <p className="text-sm text-gray-600">Term: {resource.term}</p>
                    <p className="text-sm text-gray-600">Year: {resource.year}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handlePreview(resource)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      onClick={() => handleDownload(resource)}
                      size="sm"
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mb-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ResourcePage;
