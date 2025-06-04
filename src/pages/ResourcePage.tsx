import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, BookOpen, Loader2, Globe } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import ResourceCard from '../components/ui/resource-card';
import EnhancedDocumentList from '../components/ui/enhanced-document-list';
import PDFViewer from '../components/PDFViewer';
import PDFModal from '../components/PDFModal';
import DocumentPreviewModal from '../components/DocumentPreviewModal';
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
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [documents, setDocuments] = useState<ResourceDocument[]>([]);
  const [githubDocuments, setGithubDocuments] = useState<GitHubDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [usePDFViewer, setUsePDFViewer] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState<string | null>(null);
  const [selectedDocumentTitle, setSelectedDocumentTitle] = useState<string>('');

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

  const getFileType = (url: string) => {
    const extension = url.toLowerCase().split('.').pop();
    if (extension === 'docx') return 'docx';
    if (['xlsx', 'xls'].includes(extension || '')) return 'excel';
    if (['pptx', 'ppt'].includes(extension || '')) return 'powerpoint';
    if (extension === 'pdf') return 'pdf';
    return 'unknown';
  };

  const handlePreview = (document: ResourceDocument | GitHubDocument) => {
    const url = 'download_url' in document ? document.download_url : document.pdfUrl;
    const name = 'name' in document ? document.name : document.pdfUrl.split('/').pop() || 'document';
    const fileType = getFileType(url);
    
    console.log('Previewing:', name, 'Type:', fileType);
    
    if (fileType === 'pdf') {
      // Use existing PDF modal for PDF files
      setSelectedPdfUrl(url);
    } else if (fileType === 'docx' || fileType === 'excel') {
      // Use new document preview modal for DOCX and Excel files
      setSelectedDocumentUrl(url);
      setSelectedDocumentTitle(name);
    } else {
      // Fallback to opening in new tab for other file types
      window.open(url, '_blank');
    }
  };

  const handleDownload = async (document: ResourceDocument | GitHubDocument) => {
    const url = 'download_url' in document ? document.download_url : document.pdfUrl;
    const name = 'name' in document ? document.name : document.pdfUrl.split('/').pop() || 'document';
    
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
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setDocuments([]);
    setGithubDocuments([]);
    setUsePDFViewer(false);
    setSelectedPdfUrl(null);
  };

  const toggleViewMode = () => {
    setUsePDFViewer(!usePDFViewer);
    setSelectedPdfUrl(null);
  };

  const closePdfModal = () => {
    setSelectedPdfUrl(null);
  };

  const closeDocumentModal = () => {
    setSelectedDocumentUrl(null);
    setSelectedDocumentTitle('');
  };

  // Combine subjects with "All Subjects" if GitHub repo is available
  const allSubjects = showAllSubjects ? ['All Subjects', ...subjects] : subjects;

  // Get current documents to display
  const currentDocuments = selectedSubject === 'All Subjects' ? githubDocuments : documents;
  const isGitHub = selectedSubject === 'All Subjects';

  // Convert documents to PDFViewer format
  const pdfDocuments = currentDocuments.map(doc => ({
    pdfUrl: 'download_url' in doc ? doc.download_url : doc.pdfUrl,
    title: 'name' in doc ? doc.name : doc.pdfUrl.split('/').pop()?.replace('.pdf', '')
  }));

  return (
    <PageLayout className="min-w-0">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="mb-8">
          {selectedSubject ? (
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={handleBackToSubjects}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Subjects
              </Button>
              
              {/* View Mode Toggle */}
              <Button
                onClick={toggleViewMode}
                variant="outline"
                className="ml-auto"
              >
                {usePDFViewer ? 'Switch to List View' : 'Switch to Grid View'}
              </Button>
            </div>
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
              ? `${classTitle} - ${loading ? 'Loading...' : `${currentDocuments.length} document(s) available`}`
              : allSubjects.length === 0 
                ? `No subject(s) available for ${resourceTypeTitle.toLowerCase()} in ${classTitle}`
                : `${classTitle} - ${allSubjects.length} subject(s) available`
            }
          </p>
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
          // Show documents in selected view mode
          usePDFViewer ? (
            <PDFViewer
              documents={pdfDocuments}
              title={`${selectedSubject} - ${resourceTypeTitle}`}
            />
          ) : (
            <EnhancedDocumentList
              documents={currentDocuments}
              loading={loading}
              onPreview={handlePreview}
              onDownload={handleDownload}
              isGitHub={isGitHub}
              resourceType={resourceTypeTitle}
              classTitle={classTitle}
              selectedSubject={selectedSubject}
            />
          )
        )}

        {/* PDF Modal */}
        {selectedPdfUrl && (
          <PDFModal
            pdfUrl={selectedPdfUrl}
            onClose={closePdfModal}
          />
        )}

        {/* Document Preview Modal for DOCX and Excel */}
        {selectedDocumentUrl && (
          <DocumentPreviewModal
            documentUrl={selectedDocumentUrl}
            documentTitle={selectedDocumentTitle}
            onClose={closeDocumentModal}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default ResourcePage;
