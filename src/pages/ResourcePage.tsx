
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import ResourcePageHeader from '../components/resource/ResourcePageHeader';
import ResourceSubjectSelector from '../components/resource/ResourceSubjectSelector';
import ResourceDocumentViewer from '../components/resource/ResourceDocumentViewer';
import PDFModal from '../components/PDFModal';
import { 
  loadResourceData, 
  getSubjectsForClassAndResource, 
  ResourceDocument,
  getClassTitle,
  getResourceTypeTitle
} from '../utils/dataLoader';
import { loadGitHubData, hasGitHubRepo, GitHubDocument } from '../utils/githubLoader';

const ResourcePage = () => {
  const { classId, resourceType, subject: urlSubject, page: urlPage } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [documents, setDocuments] = useState<ResourceDocument[]>([]);
  const [githubDocuments, setGithubDocuments] = useState<GitHubDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [usePDFViewer, setUsePDFViewer] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const subjects = getSubjectsForClassAndResource(classId || '', resourceType || '');
  const classTitle = getClassTitle(classId || '');
  const resourceTypeTitle = getResourceTypeTitle(resourceType || '');

  // Check if GitHub repo is available for "All Subjects"
  const showAllSubjects = hasGitHubRepo(classId || '', resourceType || '') && 
    (resourceType === 'lesson-notes' || resourceType === 'past-papers');

  // Initialize from URL parameters
  useEffect(() => {
    if (urlSubject) {
      // Decode the subject from URL (replace hyphens with spaces and handle special cases)
      const decodedSubject = urlSubject === 'all-subjects' ? 'All Subjects' : 
        decodeURIComponent(urlSubject.replace(/-/g, ' '));
      setSelectedSubject(decodedSubject);
    }
    
    if (urlPage) {
      const pageNum = parseInt(urlPage, 10);
      if (!isNaN(pageNum) && pageNum > 0) {
        setCurrentPage(pageNum);
      }
    }
  }, [urlSubject, urlPage]);

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

  // Update URL when subject or page changes
  const updateURL = (subject?: string, page?: number) => {
    if (!classId || !resourceType) return;

    let newPath = `/class/${classId}/resources/${resourceType}`;
    
    if (subject) {
      // Encode subject for URL (replace spaces with hyphens and handle special cases)
      const encodedSubject = subject === 'All Subjects' ? 'all-subjects' : 
        encodeURIComponent(subject.toLowerCase().replace(/\s+/g, '-'));
      newPath += `/${encodedSubject}`;
      
      if (page && page > 1) {
        newPath += `/${page}`;
      }
    }

    // Only navigate if the path has changed
    if (location.pathname !== newPath) {
      navigate(newPath, { replace: true });
    }
  };

  const handlePreview = (document: ResourceDocument | GitHubDocument) => {
    const url = 'download_url' in document ? document.download_url : document.pdfUrl;
    const name = 'name' in document ? document.name : document.pdfUrl.split('/').pop() || 'document';
    console.log('Previewing:', name);
    
    // Open in custom PDF modal instead of new tab
    setSelectedPdfUrl(url);
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
    setCurrentPage(1);
    updateURL(subject, 1);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setDocuments([]);
    setGithubDocuments([]);
    setUsePDFViewer(false);
    setSelectedPdfUrl(null);
    setCurrentPage(1);
    // Navigate back to resource type page
    navigate(`/class/${classId}/resources/${resourceType}`, { replace: true });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (selectedSubject) {
      updateURL(selectedSubject, page);
    }
  };

  const toggleViewMode = () => {
    setUsePDFViewer(!usePDFViewer);
    setSelectedPdfUrl(null);
  };

  const closePdfModal = () => {
    setSelectedPdfUrl(null);
  };

  // Combine subjects with "All Subjects" if GitHub repo is available
  const allSubjects = showAllSubjects ? ['All Subjects', ...subjects] : subjects;

  // Get current documents to display
  const currentDocuments = selectedSubject === 'All Subjects' ? githubDocuments : documents;
  const isGitHub = selectedSubject === 'All Subjects';

  return (
    <PageLayout className="min-w-0">
      <div className="max-w-7xl mx-auto min-w-0">
        <ResourcePageHeader
          selectedSubject={selectedSubject}
          classId={classId || ''}
          classTitle={classTitle}
          resourceTypeTitle={resourceTypeTitle}
          currentDocumentsLength={currentDocuments.length}
          loading={loading}
          usePDFViewer={usePDFViewer}
          onBackToSubjects={handleBackToSubjects}
          onToggleViewMode={toggleViewMode}
        />

        {!selectedSubject ? (
          <ResourceSubjectSelector
            allSubjects={allSubjects}
            resourceTypeTitle={resourceTypeTitle}
            classTitle={classTitle}
            onSubjectSelect={handleSubjectSelect}
          />
        ) : (
          <ResourceDocumentViewer
            usePDFViewer={usePDFViewer}
            currentDocuments={currentDocuments}
            selectedSubject={selectedSubject}
            resourceTypeTitle={resourceTypeTitle}
            classTitle={classTitle}
            loading={loading}
            isGitHub={isGitHub}
            currentPage={currentPage}
            onPreview={handlePreview}
            onDownload={handleDownload}
            onPageChange={handlePageChange}
          />
        )}

        {/* PDF Modal */}
        {selectedPdfUrl && (
          <PDFModal
            pdfUrl={selectedPdfUrl}
            onClose={closePdfModal}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default ResourcePage;
