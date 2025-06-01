import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, BookOpen, Loader2, Globe } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import ResourceCard from '../components/ui/resource-card';
import EnhancedDocumentList from '../components/ui/enhanced-document-list';
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

  const handlePreview = (document: ResourceDocument | GitHubDocument) => {
    // This is now handled by the FilePreviewModal in EnhancedDocumentList
    console.log('Preview handled by custom modal');
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
  };

  // Combine subjects with "All Subjects" if GitHub repo is available
  const allSubjects = showAllSubjects ? ['All Subjects', ...subjects] : subjects;

  // Get current documents to display
  const currentDocuments = selectedSubject === 'All Subjects' ? githubDocuments : documents;
  const isGitHub = selectedSubject === 'All Subjects';

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
          // Show enhanced document list
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
        )}
      </div>
    </PageLayout>
  );
};

export default ResourcePage;
