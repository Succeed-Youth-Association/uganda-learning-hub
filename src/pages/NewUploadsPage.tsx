
import React from 'react';
import { useParams } from 'react-router-dom';
import GitHubRepositoryViewer from '../components/GitHubRepositoryViewer';
import { getClassTitle } from '../utils/dataLoader';

const NewUploadsPage = () => {
  const { classId } = useParams();
  
  // Map class IDs to their GitHub repository URLs
  const getRepositoryUrl = (classId: string): string => {
    const repoMap: { [key: string]: string } = {
      's1': 'https://api.github.com/repos/Fresh-Teacher/s1-past-papers/contents/',
      's2': 'https://api.github.com/repos/Fresh-Teacher/s2-resources/contents/',
      's3': 'https://api.github.com/repos/Fresh-Teacher/s3-resources/contents/',
      's4': 'https://api.github.com/repos/Fresh-Teacher/s4-resources/contents/',
      's5': 'https://api.github.com/repos/Fresh-Teacher/s5-resources/contents/',
      's6': 'https://api.github.com/repos/Fresh-Teacher/s6-resources/contents/',
      'p1': 'https://api.github.com/repos/Fresh-Teacher/p1-resources/contents/',
      'p2': 'https://api.github.com/repos/Fresh-Teacher/p2-resources/contents/',
      'p3': 'https://api.github.com/repos/Fresh-Teacher/p3-resources/contents/',
      'p4': 'https://api.github.com/repos/Fresh-Teacher/p4-resources/contents/',
      'p5': 'https://api.github.com/repos/Fresh-Teacher/p5-resources/contents/',
      'p6': 'https://api.github.com/repos/Fresh-Teacher/p6-resources/contents/',
      'p7': 'https://api.github.com/repos/Fresh-Teacher/p7-resources/contents/',
      'baby': 'https://api.github.com/repos/Fresh-Teacher/baby-class-resources/contents/',
      'middle': 'https://api.github.com/repos/Fresh-Teacher/middle-class-resources/contents/',
      'top': 'https://api.github.com/repos/Fresh-Teacher/top-class-resources/contents/'
    };
    
    return repoMap[classId] || repoMap['s1']; // Default to S1 if not found
  };

  const classTitle = getClassTitle(classId || '');
  const repoUrl = getRepositoryUrl(classId || '');
  
  return (
    <GitHubRepositoryViewer
      repoUrl={repoUrl}
      title={`${classTitle} - NEW UPLOADS`}
      description="Access the latest educational materials and resources"
      backTo={classTitle}
      backUrl={`/class/${classId}`}
    />
  );
};

export default NewUploadsPage;
