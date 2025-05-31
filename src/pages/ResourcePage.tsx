
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Search, BookOpen, Loader2, FileText, Globe } from 'lucide-react';
import PaginationWithJump from '../components/PaginationWithJump';
import PageLayout from '../components/layout/PageLayout';
import ResourceCard from '../components/ui/resource-card';
import DocumentCard from '../components/ui/document-card';
import GitHubDocumentCard from '../components/ui/github-document-card';
import { extractFileName, getFileExtension } from '../utils/fileUtils';
import { 
  loadResourceData, 
  getSubjectsForClassAndResource, 
  ResourceDocument,
  getClassTitle,
  getResourceTypeTitle
} from '../utils/dataLoader';
import { loadGitHubData, hasGitHubRepo, GitHubDocument } from '../utils/githubLoader';

const ResourcePage = () => {
  const { classId, resourceType } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [documents, setDocuments] = useState<ResourceDocument[]>([]);
  const [githubDocuments, setGithubDocuments] = useState<GitHubDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;

  const subjects = getSubjectsForClassAndResource(classId || '', resourceType || '');
  const classTitle = getClassTitle(classId || '');
  const resourceTypeTitle = getResourceTypeTitle(resourceType || '');

  // Check if GitHub repo is available for "All Subjects"
  const showAllSubjects = hasGitHubRepo(classId || '', resourceType || '') && 
    (resourceType === 'lesson-notes' || resourceType === 'past-papers');

  // Load documents when subject is selected
  useEffect(() => {
    const loadDocuments = async () => {
      if (!selectedSubject || !classId || !resourceType) return;
      
      setLoading(true);
      try {
        if (selectedSubject === 'All Subjects') {
          // Load from GitHub
          const data = await loadGitHubData(classId, resourceType);
          setGithubDocuments(data);
          setDocuments([]);
          console.log(`Loaded ${data.length} documents from GitHub for All Subjects`);
        } else {
          // Load from local JSON
          const data = await loadResourceData(classId, selectedSubject, resourceType);
          setDocuments(data);
          setGithubDocuments([]);
          console.log(`Loaded ${data.length} documents for ${selectedSubject}`);
        }
      } catch (error) {
        console.error('Error loading documents:', error);
        setDocuments([]);
        setGithubDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [selectedSubject, classId, resourceType]);

  const filteredDocuments = useMemo(() => {
    if (!selectedSubject) return [];
    
    if (selectedSubject === 'All Subjects') {
      return githubDocuments.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return documents.filter(doc =>
      extractFileName(doc.pdfUrl).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [documents, githubDocuments, searchTerm, selectedSubject]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  const handlePreview = (document: ResourceDocument | GitHubDocument) => {
    const url = 'download_url' in document ? document.download_url : document.pdfUrl;
    const name = 'name' in document ? document.name : extractFileName(document.pdfUrl);
    console.log('Previewing:', name);
    window.open(url, '_blank');
  };

  const handleDownload = async (document: ResourceDocument | GitHubDocument) => {
    const url = 'download_url' in document ? document.download_url : document.pdfUrl;
    const name = 'name' in document ? document.name : extractFileName(document.pdfUrl);
    
    console.log('Downloading:', name);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = downloadUrl;
      link.download = name;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct link method
      const link = window.document.createElement('a');
      link.href = url;
      link.download = name;
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
    setGithubDocuments([]);
  };

  // Combine subjects with "All Subjects" if GitHub repo is available
  const allSubjects = showAllSubjects ? ['All Subjects', ...subjects] : subjects;

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
              : allSubjects.length === 0 
                ? `No subject(s) available for ${resourceTypeTitle.toLowerCase()} in ${classTitle}`
                : `${classTitle} - ${allSubjects.length} subject(s) available`
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
          allSubjects.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No subjects available</h3>
              <p className="text-muted-foreground">
                No subjects have been configured for {resourceTypeTitle.toLowerCase()} in {classTitle}.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
              {allSubjects.map((subject) => (
                <ResourceCard
                  key={subject}
                  title={subject}
                  description={
                    subject === 'All Subjects' 
                      ? `Browse all ${resourceTypeTitle.toLowerCase()}`
                      : `View all ${resourceTypeTitle.toLowerCase()} for ${subject}`
                  }
                  icon={subject === 'All Subjects' ? Globe : BookOpen}
                  iconColor={subject === 'All Subjects' ? 'text-blue-600' : 'text-orange-600'}
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
                  selectedSubject === 'All Subjects' ? (
                    <GitHubDocumentCard
                      key={`github-${(document as GitHubDocument).path}-${index}`}
                      document={document as GitHubDocument}
                      resourceType={resourceTypeTitle}
                      classTitle={classTitle}
                      onPreview={handlePreview}
                      onDownload={handleDownload}
                    />
                  ) : (
                    <DocumentCard
                      key={`local-${(document as ResourceDocument).pdfUrl}-${index}`}
                      document={document as ResourceDocument}
                      subject={selectedSubject}
                      resourceType={resourceTypeTitle}
                      classTitle={classTitle}
                      onPreview={handlePreview}
                      onDownload={handleDownload}
                    />
                  )
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
