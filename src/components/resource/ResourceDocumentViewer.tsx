
import React from 'react';
import PDFViewer from '../PDFViewer';
import EnhancedDocumentList from '../ui/enhanced-document-list';
import { ResourceDocument } from '../../utils/dataLoader';
import { GitHubDocument } from '../../utils/githubLoader';

interface ResourceDocumentViewerProps {
  usePDFViewer: boolean;
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
  usePDFViewer,
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
  // Convert documents to PDFViewer format
  const pdfDocuments = currentDocuments.map(doc => ({
    pdfUrl: 'download_url' in doc ? doc.download_url : doc.pdfUrl,
    title: 'name' in doc ? doc.name : doc.pdfUrl.split('/').pop()?.replace('.pdf', '')
  }));

  if (usePDFViewer) {
    return (
      <PDFViewer
        documents={pdfDocuments}
        title={`${selectedSubject} - ${resourceTypeTitle}`}
      />
    );
  }

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
