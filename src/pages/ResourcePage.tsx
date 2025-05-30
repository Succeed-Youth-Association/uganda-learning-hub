
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Search, BookOpen, Loader2, FileText, Upload } from 'lucide-react';
import PaginationWithJump from '../components/PaginationWithJump';
import PageLayout from '../components/layout/PageLayout';
import ResourceCard from '../components/ui/resource-card';
import DocumentCard from '../components/ui/document-card';
import { extractFileName, getFileExtension } from '../utils/fileUtils';
import { hasGitHubRepo } from '../utils/githubRepoMapper';
import { 
  loadResourceData, 
  getSubjectsForClassAndResource, 
  ResourceDocument,
  getClassTitle,
  getResourceTypeTitle
} from '../utils/dataLoader';

const ResourcePage = () => {
  const { classId, resourceType } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [documents, setDocuments] = useState<ResourceDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [documentsWithSizes, setDocumentsWithSizes] = useState<Array<ResourceDocument & { fileSize?: string }>>([]);
  const itemsPerPage = 12;

  const subjects = getSubjectsForClassAndResource(classId || '', resourceType || '');
  const classTitle = getClassTitle(classId || '');
  const resourceTypeTitle = getResourceTypeTitle(resourceType || '');
  const hasNewUploads = hasGitHubRepo(classId || '', resourceType || '');

  // Function to get file size
  const getFileSize = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentLength = response.headers.get('content-length');
      if (contentLength) {
        const bytes = parseInt(contentLength);
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      }
      return 'Size unknown';
    } catch (error) {
      return 'Size unknown';
    }
  };

  // Load documents when subject is selected
  useEffect(() => {
    const loadDocuments = async () => {
      if (!selectedSubject || !classId || !resourceType) return;
      
      setLoading(true);
      try {
        const data = await loadResourceData(classId, selectedSubject, resourceType);
        setDocuments(data);
        console.log(`Loaded ${data.length} documents for ${selectedSubject}`);
        
        // Load file sizes for each document
        const documentsWithSizeInfo = await Promise.all(
          data.map(async (doc) => {
            const fileSize = await getFileSize(doc.pdfUrl);
            return { ...doc, fileSize };
          })
        );
        setDocumentsWithSizes(documentsWithSizeInfo);
      } catch (error) {
        console.error('Error loading documents:', error);
        setDocuments([]);
        setDocumentsWithSizes([]);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [selectedSubject, classId, resourceType]);

  const filteredDocuments = useMemo(() => {
    if (!selectedSubject) return [];
    return documentsWithSizes.filter(doc =>
      extractFileName(doc.pdfUrl).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [documentsWithSizes, searchTerm, selectedSubject]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  const handlePreview = (document: ResourceDocument) => {
    console.log('Previewing:', extractFileName(document.pdfUrl));
    window.open(document.pdfUrl, '_blank');
  };

  const handleDownload = async (document: ResourceDocument) => {
    console.log('Downloading:', extractFileName(document.pdfUrl));
    try {
      const response = await fetch(document.pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = `${extractFileName(document.pdfUrl)}.${getFileExtension(document.pdfUrl).toLowerCase()}`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct link method
      const link = window.document.createElement('a');
      link.href = document.pdfUrl;
      link.download = `${extractFileName(document.pdfUrl)}.${getFileExtension(document.pdfUrl).toLowerCase()}`;
      link.target = '_blank';
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    }
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
    setDocumentsWithSizes([]);
  };

  return (
    <PageLayout className="min-w-0">
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
                Back to {classTitle}
              </Button>
            </Link>
          )}
          
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            {selectedSubject ? selectedSubject : resourceTypeTitle}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {selectedSubject 
              ? `${classTitle} - ${loading ? 'Loading...' : `${filteredDocuments.length} document(s) available`}`
              : subjects.length === 0 
                ? `No subject(s) available for ${resourceTypeTitle.toLowerCase()} in ${classTitle}`
                : `${classTitle} - ${subjects.length} subject(s) available`
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

          {!selectedSubject && hasNewUploads && (resourceType === 'lesson-notes' || resourceType === 'past-papers') && (
            <div className="mb-6">
              <Link to={`/class/${classId}/resources/${resourceType}/new-uploads`}>
                <Card className="group hover:shadow-lg transition-all duration-200 border-2 border-green-500 bg-green-50 dark:bg-green-900/20 animate-pulse cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Upload className="h-8 w-8 text-green-600 animate-bounce" />
                        <CardTitle className="text-xl font-bold text-green-700 dark:text-green-400">
                          NEW UPLOADS
                        </CardTitle>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-600 dark:text-green-300 font-medium">
                      Fresh documents uploaded from GitHub repository - Click to explore!
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )}
        </div>

        {!selectedSubject ? (
          // Show subjects
          subjects.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No subjects available</h3>
              <p className="text-muted-foreground">
                No subjects have been configured for {resourceTypeTitle.toLowerCase()} in {classTitle}.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
              {subjects.map((subject) => (
                <ResourceCard
                  key={subject}
                  title={subject}
                  description={`View all ${resourceTypeTitle.toLowerCase()} for ${subject}`}
                  icon={BookOpen}
                  onClick={() => handleSubjectSelect(subject)}
                  buttonText="View Resources"
                />
              ))}
            </div>
          )
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
                    : `No ${resourceTypeTitle.toLowerCase()} available for ${selectedSubject}`
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                {currentDocuments.map((document, index) => (
                  <DocumentCard
                    key={`${document.pdfUrl}-${index}`}
                    document={document}
                    subject={selectedSubject}
                    resourceType={resourceTypeTitle}
                    classTitle={classTitle}
                    onPreview={handlePreview}
                    onDownload={handleDownload}
                    fileSize={document.fileSize}
                  />
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
    </PageLayout>
  );
};

export default ResourcePage;
