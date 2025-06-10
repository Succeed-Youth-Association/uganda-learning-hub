
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  loadResourceData, 
  getSubjectsForClassAndResource, 
  ResourceDocument,
  getClassTitle,
  getResourceTypeTitle
} from '../utils/dataLoader';
import { loadGitHubData, hasGitHubRepo, GitHubDocument } from '../utils/githubLoader';

export const useResourcePageLogic = () => {
  const { classId, resourceType, subject: urlSubject } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [documents, setDocuments] = useState<ResourceDocument[]>([]);
  const [githubDocuments, setGithubDocuments] = useState<GitHubDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);

  const subjects = getSubjectsForClassAndResource(classId || '', resourceType || '');
  const classTitle = getClassTitle(classId || '');
  const resourceTypeTitle = getResourceTypeTitle(resourceType || '');

  // Check if GitHub repo is available for "All Subjects"
  const showAllSubjects = hasGitHubRepo(classId || '', resourceType || '') && 
    (resourceType === 'lesson-notes' || resourceType === 'past-papers');

  // Get current page from URL search params
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Initialize from URL parameters
  useEffect(() => {
    if (urlSubject) {
      // Decode the subject from URL (replace hyphens with spaces and handle special cases)
      const decodedSubject = urlSubject === 'all-subjects' ? 'All Subjects' : 
        decodeURIComponent(urlSubject.replace(/-/g, ' '));
      setSelectedSubject(decodedSubject);
    }
  }, [urlSubject]);

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
    
    // Navigate to subject page and reset page to 1
    const encodedSubject = subject === 'All Subjects' ? 'all-subjects' : 
      encodeURIComponent(subject.toLowerCase().replace(/\s+/g, '-'));
    navigate(`/class/${classId}/resources/${resourceType}/${encodedSubject}`);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setDocuments([]);
    setGithubDocuments([]);
    setSelectedPdfUrl(null);
    // Navigate back to resource type page
    navigate(`/class/${classId}/resources/${resourceType}`);
  };

  const handlePageChange = (page: number) => {
    // Update URL search params
    const newSearchParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newSearchParams.delete('page');
    } else {
      newSearchParams.set('page', page.toString());
    }
    setSearchParams(newSearchParams);
  };

  const closePdfModal = () => {
    setSelectedPdfUrl(null);
  };

  // Combine subjects with "All Subjects" if GitHub repo is available
  const allSubjects = showAllSubjects ? ['All Subjects', ...subjects] : subjects;

  // Get current documents to display
  const currentDocuments = selectedSubject === 'All Subjects' ? githubDocuments : documents;
  const isGitHub = selectedSubject === 'All Subjects';

  return {
    // State
    selectedSubject,
    documents,
    githubDocuments,
    loading,
    selectedPdfUrl,
    currentPage,
    
    // Computed values
    classId: classId || '',
    resourceType: resourceType || '',
    classTitle,
    resourceTypeTitle,
    allSubjects,
    currentDocuments,
    isGitHub,
    
    // Handlers
    handlePreview,
    handleDownload,
    handleSubjectSelect,
    handleBackToSubjects,
    handlePageChange,
    closePdfModal
  };
};
