
import React from 'react';
import { useParams } from 'react-router-dom';
import GitHubRepositoryViewer from '../components/GitHubRepositoryViewer';
import { getClassTitle, getResourceTypeTitle } from '../utils/dataLoader';
import { getGitHubRepoUrl } from '../utils/githubRepoUtils';

const NewUploadsPage = () => {
  const { classId, resourceType } = useParams();
  
  const classTitle = getClassTitle(classId || '');
  const resourceTypeTitle = getResourceTypeTitle(resourceType || '');
  const repoUrl = getGitHubRepoUrl(classId || '', resourceType || '');
  
  if (!repoUrl) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Repository Not Found</h1>
          <p className="text-muted-foreground">
            No GitHub repository found for {resourceTypeTitle} in {classTitle}.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <GitHubRepositoryViewer
      repoUrl={repoUrl}
      title={`${classTitle} - ${resourceTypeTitle} - NEW UPLOADS`}
      description="Access the latest educational materials and resources"
      backTo={`${classTitle} ${resourceTypeTitle}`}
      backUrl={`/class/${classId}/resources/${resourceType}`}
    />
  );
};

export default NewUploadsPage;
