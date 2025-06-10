
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ResourceDocument, loadResourceData, getClassTitle, getResourceTypeTitle, getSubjectsForClassAndResource } from '../utils/dataLoader';
import { GitHubDocument, loadGitHubData, hasGitHubRepo } from '../utils/githubLoader';

export const useResourcePage = () => {
  const { classId, resourceType, subject } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [documents, setDocuments] = useState<(ResourceDocument | GitHubDocument)[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<(ResourceDocument | GitHubDocument)[]>([]);
  const [allSubjects, setAllSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(subject || null);
  const [loading, setLoading] = useState(true);
  const [previewDocument, setPreviewDocument] = useState<ResourceDocument | GitHubDocument | null>(null);
  const [isGitHub, setIsGitHub] = useState(false);

  // Get current page from URL params
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const classTitle = getClassTitle(classId || '');
  const resourceTypeTitle = getResourceTypeTitle(resourceType || '');

  useEffect(() => {
    const loadData = async () => {
      if (!classId || !resourceType) return;

      setLoading(true);
      console.log('Loading data for:', { classId, resourceType, selectedSubject });

      try {
        // Check if GitHub repo exists for this class and resource type
        const hasGitHub = hasGitHubRepo(classId, resourceType);
        setIsGitHub(hasGitHub);

        let allDocuments: (ResourceDocument | GitHubDocument)[] = [];

        if (hasGitHub) {
          // Load from GitHub
          console.log('Loading from GitHub repository');
          allDocuments = await loadGitHubData(classId, resourceType);
          
          // For GitHub data, extract subjects from file names
          const subjects = Array.from(new Set(
            allDocuments.map((doc) => {
              const fileName = (doc as GitHubDocument).name.toLowerCase();
              // Extract subject from filename - simplified approach
              return fileName.split('.')[0];
            })
          ));
          setAllSubjects(['All Subjects', ...subjects]);
        } else {
          // Load from JSON files - get available subjects from configuration
          console.log('Loading from JSON files');
          const availableSubjects = getSubjectsForClassAndResource(classId, resourceType);
          setAllSubjects(['All Subjects', ...availableSubjects]);
          
          // If a specific subject is selected, load its data
          if (selectedSubject && selectedSubject !== 'All Subjects') {
            const resourceData = await loadResourceData(classId, selectedSubject, resourceType);
            allDocuments = resourceData;
          } else {
            // Load all subjects data
            const allSubjectsData: ResourceDocument[] = [];
            for (const subject of availableSubjects) {
              const subjectData = await loadResourceData(classId, subject, resourceType);
              allSubjectsData.push(...subjectData);
            }
            allDocuments = allSubjectsData;
          }
        }

        setDocuments(allDocuments);

        // Filter documents by subject if selected
        if (selectedSubject && selectedSubject !== 'All Subjects') {
          const filtered = allDocuments.filter((doc) => {
            if (hasGitHub) {
              const fileName = (doc as GitHubDocument).name.toLowerCase();
              return fileName.includes(selectedSubject.toLowerCase().replace(/\s+/g, ''));
            } else {
              const url = (doc as ResourceDocument).pdfUrl.toLowerCase();
              return url.includes(selectedSubject.toLowerCase().replace(/\s+/g, ''));
            }
          });
          setFilteredDocuments(filtered);
        } else {
          setFilteredDocuments(allDocuments);
        }
      } catch (error) {
        console.error('Error loading resource data:', error);
        setDocuments([]);
        setFilteredDocuments([]);
        
        // Still try to get subjects from configuration even if data loading fails
        if (!hasGitHubRepo(classId, resourceType)) {
          const availableSubjects = getSubjectsForClassAndResource(classId, resourceType);
          setAllSubjects(['All Subjects', ...availableSubjects]);
        } else {
          setAllSubjects([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [classId, resourceType, selectedSubject]);

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    
    // Update URL to include the subject
    if (subject === 'All Subjects') {
      navigate(`/class/${classId}/resources/${resourceType}`, { replace: true });
    } else {
      navigate(`/class/${classId}/resources/${resourceType}/${encodeURIComponent(subject)}`, { replace: true });
    }
    
    // Reset to page 1 when changing subjects
    setSearchParams(params => {
      params.delete('page');
      return params;
    });
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    navigate(`/class/${classId}/resources/${resourceType}`, { replace: true });
    
    // Reset to page 1 when going back to subjects
    setSearchParams(params => {
      params.delete('page');
      return params;
    });
  };

  const handlePreview = (doc: ResourceDocument | GitHubDocument) => {
    setPreviewDocument(doc);
  };

  const handleDownload = async (doc: ResourceDocument | GitHubDocument) => {
    try {
      let downloadUrl: string;
      let fileName: string;

      if (isGitHub) {
        const githubDoc = doc as GitHubDocument;
        downloadUrl = githubDoc.download_url;
        fileName = githubDoc.name;
      } else {
        const resourceDoc = doc as ResourceDocument;
        downloadUrl = resourceDoc.pdfUrl;
        fileName = downloadUrl.split('/').pop() || 'document.pdf';
      }

      console.log('Downloading document:', fileName);
      
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams(params => {
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }
      return params;
    });
  };

  const closePreview = () => {
    setPreviewDocument(null);
  };

  return {
    // State
    documents: filteredDocuments,
    allSubjects,
    selectedSubject,
    loading,
    previewDocument,
    isGitHub,
    currentPage,
    classTitle,
    resourceTypeTitle,
    classId: classId || '',
    
    // Handlers
    handleSubjectSelect,
    handleBackToSubjects,
    handlePreview,
    handleDownload,
    handlePageChange,
    closePreview
  };
};
