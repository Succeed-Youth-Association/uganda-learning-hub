
import React from 'react';
import ResourcePageHeader from './ResourcePageHeader';
import ResourceSubjectSelector from './ResourceSubjectSelector';
import ResourceDocumentViewer from './ResourceDocumentViewer';
import PDFModal from '../PDFModal';
import { ResourceDocument } from '../../utils/dataLoader';
import { GitHubDocument } from '../../utils/githubLoader';

interface ResourcePageContentProps {
  documents: (ResourceDocument | GitHubDocument)[];
  allSubjects: string[];
  selectedSubject: string | null;
  loading: boolean;
  previewDocument: ResourceDocument | GitHubDocument | null;
  isGitHub: boolean;
  currentPage: number;
  classTitle: string;
  resourceTypeTitle: string;
  classId: string;
  onSubjectSelect: (subject: string) => void;
  onBackToSubjects: () => void;
  onPreview: (document: ResourceDocument | GitHubDocument) => void;
  onDownload: (document: ResourceDocument | GitHubDocument) => void;
  onPageChange: (page: number) => void;
  onClosePreview: () => void;
}

const ResourcePageContent: React.FC<ResourcePageContentProps> = ({
  documents,
  allSubjects,
  selectedSubject,
  loading,
  previewDocument,
  isGitHub,
  currentPage,
  classTitle,
  resourceTypeTitle,
  classId,
  onSubjectSelect,
  onBackToSubjects,
  onPreview,
  onDownload,
  onPageChange,
  onClosePreview
}) => {
  return (
    <div className="max-w-7xl mx-auto min-w-0">
      <ResourcePageHeader
        selectedSubject={selectedSubject}
        classId={classId}
        classTitle={classTitle}
        resourceTypeTitle={resourceTypeTitle}
        currentDocumentsLength={documents.length}
        loading={loading}
        onBackToSubjects={onBackToSubjects}
      />

      {selectedSubject ? (
        <ResourceDocumentViewer
          currentDocuments={documents}
          selectedSubject={selectedSubject}
          resourceTypeTitle={resourceTypeTitle}
          classTitle={classTitle}
          loading={loading}
          isGitHub={isGitHub}
          currentPage={currentPage}
          onPreview={onPreview}
          onDownload={onDownload}
          onPageChange={onPageChange}
        />
      ) : (
        <ResourceSubjectSelector
          allSubjects={allSubjects}
          resourceTypeTitle={resourceTypeTitle}
          classTitle={classTitle}
          onSubjectSelect={onSubjectSelect}
        />
      )}

      {previewDocument && (
        <PDFModal
          pdfUrl={isGitHub ? (previewDocument as GitHubDocument).download_url : (previewDocument as ResourceDocument).pdfUrl}
          onClose={onClosePreview}
        />
      )}
    </div>
  );
};

export default ResourcePageContent;
