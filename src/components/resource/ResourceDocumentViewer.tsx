
import React from 'react';
import EnhancedDocumentList from '../ui/enhanced-document-list';
import { ResourceDocument } from '../../utils/dataLoader';
import { GitHubDocument } from '../../utils/githubLoader';

interface ResourceDocumentViewerProps {
  currentDocuments: (ResourceDocument | GitHubDocument)[];
  selectedSubject: string;
  resourceTypeTitle: string;
  classTitle: string;
  loading: boolean;
  isGitHub: boolean;
  currentPage: number;
  onPreview: (document: ResourceDocument | GitHubDocument) => void;
  onDownload: (document: ResourceDocument | GitHubDocument) => void;
  onPageChange: (page: number) => void;
}

const ResourceDocumentViewer: React.FC<ResourceDocumentViewerProps> = ({
  currentDocuments,
  selectedSubject,
  resourceTypeTitle,
  classTitle,
  loading,
  isGitHub,
  currentPage,
  onPreview,
  onDownload,
  onPageChange
}) => {
  return (
    <EnhancedDocumentList
      documents={currentDocuments}
      loading={loading}
      currentPage={currentPage}
      onPreview={onPreview}
      onDownload={onDownload}
      onPageChange={onPageChange}
      isGitHub={isGitHub}
      resourceType={resourceTypeTitle}
      classTitle={classTitle}
      selectedSubject={selectedSubject}
    />
  );
};

export default ResourceDocumentViewer;
