
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, Upload } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import DocumentCard from '../components/ui/document-card';
import { 
  getResourcesForClassAndType, 
  getClassTitle, 
  getResourceTypeTitle,
  ResourceDocument 
} from '../utils/dataLoader';
import { getGitHubRepoUrl } from '../utils/githubRepoUtils';

const ResourcePage = () => {
  const { classId, resourceType } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<{ [subject: string]: ResourceDocument[] }>({});

  const classTitle = getClassTitle(classId || '');
  const resourceTypeTitle = getResourceTypeTitle(resourceType || '');
  const githubRepoUrl = getGitHubRepoUrl(classId || '', resourceType || '');

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      try {
        const data = await getResourcesForClassAndType(classId || '', resourceType || '');
        setResources(data);
      } catch (error) {
        console.error('Error loading resources:', error);
        setResources({});
      } finally {
        setLoading(false);
      }
    };

    if (classId && resourceType) {
      loadResources();
    }
  }, [classId, resourceType]);

  const handlePreview = (document: ResourceDocument) => {
    const pdfUrl = encodeURIComponent(document.pdfUrl);
    const googleViewerUrl = `https://docs.google.com/viewerng/viewer?url=${pdfUrl}`;
    window.open(googleViewerUrl, '_blank');
  };

  const handleDownload = async (document: ResourceDocument) => {
    const link = document.createElement('a');
    link.href = document.pdfUrl;
    link.download = document.pdfUrl.split('/').pop() || 'document.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNewUploads = () => {
    navigate(`/class/${classId}/resources/${resourceType}/new-uploads`);
  };

  const totalDocuments = Object.values(resources).reduce((total, docs) => total + docs.length, 0);

  if (loading) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground">Loading resources...</div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout className="min-w-0">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="mb-8">
          <Link to={`/class/${classId}`}>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {classTitle}
            </Button>
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {resourceTypeTitle}
              </h1>
              <p className="text-lg text-muted-foreground">
                {classTitle} • {totalDocuments} documents available
              </p>
            </div>
            
            {githubRepoUrl && (resourceType === 'lesson-notes' || resourceType === 'past-papers') && (
              <Button 
                onClick={handleNewUploads}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                NEW UPLOADS
              </Button>
            )}
          </div>
        </div>

        {totalDocuments === 0 ? (
          <div className="text-center py-12">
            <div className="text-xl font-semibold text-muted-foreground mb-2">No documents found</div>
            <p className="text-muted-foreground">
              No {resourceTypeTitle.toLowerCase()} are currently available for {classTitle}.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(resources).map(([subject, documents]) => (
              <div key={subject} className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground border-b pb-2">
                  {subject} ({documents.length} documents)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {documents.map((document, index) => (
                    <DocumentCard
                      key={`${subject}-${index}`}
                      document={document}
                      subject={subject}
                      resourceType={resourceTypeTitle}
                      classTitle={classTitle}
                      onPreview={handlePreview}
                      onDownload={handleDownload}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ResourcePage;
