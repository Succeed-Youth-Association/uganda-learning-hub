
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Search, Eye, Download, FileText, BookOpen } from 'lucide-react';
import PaginationWithJump from '../components/PaginationWithJump';
import ScrollToTop from '../components/ScrollToTop';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';
import { extractFileName, getFileExtension } from '../utils/fileUtils';

const ResourcePage = () => {
  const { classId, resourceType } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const itemsPerPage = 12;

  // Available subjects for each class level
  const getSubjectsForClass = (classId: string) => {
    const nurserySubjects = ['English', 'Mathematics', 'Science', 'Social Studies', 'Art'];
    const primarySubjects = ['English', 'Mathematics', 'Science', 'Social Studies', 'Religious Education'];
    const secondarySubjects = ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Literature', 'Economics', 'Agriculture'];

    if (['baby', 'middle', 'top'].includes(classId || '')) {
      return nurserySubjects;
    } else if (['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'].includes(classId || '')) {
      return primarySubjects;
    } else {
      return secondarySubjects;
    }
  };

  // Dummy data for documents (simulating JSON file structure)
  const generateDummyDocuments = (subject: string, count: number = 15) => {
    const sampleUrls = [
      `https://fresh-teacher.github.io/resources/${subject.toLowerCase()}_examination.pdf`,
      `https://fresh-teacher.github.io/resources/${subject.toLowerCase()}_notes_term_1.pdf`,
      `https://fresh-teacher.github.io/resources/${subject.toLowerCase()}_textbook.pdf`,
      `https://fresh-teacher.github.io/resources/${subject.toLowerCase()}_past_paper_2023.pdf`,
      `https://fresh-teacher.github.io/resources/${subject.toLowerCase()}_revision_guide.pdf`
    ];

    return Array.from({ length: count }, (_, i) => ({
      title: extractFileName(sampleUrls[i % sampleUrls.length]),
      pdfUrl: sampleUrls[i % sampleUrls.length].replace('.pdf', `_${i + 1}.pdf`)
    }));
  };

  const subjects = getSubjectsForClass(classId || '');
  const documents = selectedSubject ? generateDummyDocuments(selectedSubject) : [];

  const filteredDocuments = useMemo(() => {
    if (!selectedSubject) return [];
    return documents.filter(doc =>
      extractFileName(doc.pdfUrl).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [documents, searchTerm, selectedSubject]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

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

  const handlePreview = (document: any) => {
    console.log('Previewing:', document.title);
    window.open(document.pdfUrl, '_blank');
  };

  const handleDownload = (document: any) => {
    console.log('Downloading:', document.title);
    const link = document.createElement('a');
    link.href = document.pdfUrl;
    link.download = `${extractFileName(document.pdfUrl)}.${getFileExtension(document.pdfUrl).toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setCurrentPage(1);
    setSearchTerm('');
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setCurrentPage(1);
    setSearchTerm('');
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
                {selectedSubject ? (
                  <Button variant="outline" className="mb-4" onClick={handleBackToSubjects}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Subjects
                  </Button>
                ) : (
                  <Link to={`/class/${classId}`}>
                    <Button variant="outline" className="mb-4">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to {getClassTitle(classId || '')}
                    </Button>
                  </Link>
                )}
                
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {selectedSubject ? selectedSubject : getResourceTypeTitle(resourceType || '')}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {selectedSubject 
                    ? `${getClassTitle(classId || '')} - ${filteredDocuments.length} documents available`
                    : `${getClassTitle(classId || '')} - Choose a subject to view resources`
                  }
                </p>

                {selectedSubject && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                    <div className="relative flex-1 max-w-md w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="search"
                        placeholder="   Search documents..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}
              </div>

              {!selectedSubject ? (
                // Show subjects
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                  {subjects.map((subject) => (
                    <div 
                      key={subject} 
                      className="bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-6 border cursor-pointer min-w-0"
                      onClick={() => handleSubjectSelect(subject)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <BookOpen className="h-8 w-8 text-orange-600 flex-shrink-0" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-card-foreground mb-2 break-words">
                        {subject}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        View all {getResourceTypeTitle(resourceType || '').toLowerCase()} for {subject}
                      </p>

                      <Button
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubjectSelect(subject);
                        }}
                      >
                        View Resources
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                // Show documents
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                    {currentDocuments.map((document, index) => (
                      <div key={`${document.pdfUrl}-${index}`} className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 lg:p-6 border min-w-0">
                        <div className="flex items-start justify-between mb-4">
                          <FileText className="h-8 w-8 text-orange-600 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{getFileExtension(document.pdfUrl)}</span>
                        </div>
                        
                        <h3 className="text-base lg:text-lg font-semibold text-card-foreground mb-2 line-clamp-2 break-words">
                          {extractFileName(document.pdfUrl)}
                        </h3>
                        
                        <div className="space-y-1 mb-4">
                          <p className="text-sm text-muted-foreground break-words">Subject: {selectedSubject}</p>
                          <p className="text-sm text-muted-foreground">Type: {getResourceTypeTitle(resourceType || '')}</p>
                          <p className="text-sm text-muted-foreground">Class: {getClassTitle(classId || '')}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => handlePreview(document)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button
                            onClick={() => handleDownload(document)}
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
                </>
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
