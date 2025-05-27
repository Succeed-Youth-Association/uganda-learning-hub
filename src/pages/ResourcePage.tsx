
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Search, Eye, Download, FileText, BookOpen, Loader2 } from 'lucide-react';
import PaginationWithJump from '../components/PaginationWithJump';
import ScrollToTop from '../components/ScrollToTop';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';
import { extractFileName, getFileExtension } from '../utils/fileUtils';
import { loadResourceData, getSubjectsForClass, ResourceDocument } from '../utils/dataLoader';

const ResourcePage = () => {
  const { classId, resourceType } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [documents, setDocuments] = useState<ResourceDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;

  // Get available subjects for the class
  const availableSubjects = classId ? getSubjectsForClass(classId) : [];

  // Load documents when subject is selected
  useEffect(() => {
    const loadDocuments = async () => {
      if (!selectedSubject || !classId || !resourceType) return;
      
      setLoading(true);
      try {
        const data = await loadResourceData(classId, selectedSubject, resourceType);
        setDocuments(data);
        console.log(`Loaded ${data.length} documents for ${selectedSubject}`);
      } catch (error) {
        console.error('Error loading documents:', error);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [selectedSubject, classId, resourceType]);

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

  const handlePreview = (document: ResourceDocument) => {
    console.log('Previewing:', extractFileName(document.pdfUrl));
    window.open(document.pdfUrl, '_blank');
  };

  const handleDownload = (document: ResourceDocument) => {
    console.log('Downloading:', extractFileName(document.pdfUrl));
    const link = window.document.createElement('a');
    link.href = document.pdfUrl;
    link.download = `${extractFileName(document.pdfUrl)}.${getFileExtension(document.pdfUrl).toLowerCase()}`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
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
    setDocuments([]);
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
                    ? `${getClassTitle(classId || '')} - ${loading ? 'Loading...' : `${filteredDocuments.length} documents available`}`
                    : `${getClassTitle(classId || '')} - ${availableSubjects.length} subjects available`
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
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}
              </div>

              {!selectedSubject ? (
                // Show subjects
                <>
                  {availableSubjects.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-muted-foreground mb-2">No subjects available</h3>
                      <p className="text-muted-foreground">
                        No {getResourceTypeTitle(resourceType || '').toLowerCase()} are available for {getClassTitle(classId || '')} at this time.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                      {availableSubjects.map((subject) => (
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
                  )}
                </>
              ) : (
                // Show documents or loading state
                <>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                      <span className="ml-2 text-lg text-muted-foreground">Loading documents...</span>
                    </div>
                  ) : currentDocuments.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-muted-foreground mb-2">No documents found</h3>
                      <p className="text-muted-foreground">
                        {searchTerm 
                          ? `No documents match "${searchTerm}"`
                          : `No ${getResourceTypeTitle(resourceType || '').toLowerCase()} available for ${selectedSubject}`
                        }
                      </p>
                    </div>
                  ) : (
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
                  )}

                  {totalPages > 1 && !loading && (
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
