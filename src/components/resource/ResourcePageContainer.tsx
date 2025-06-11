
import React from 'react';
import ResourcePageHeader from './ResourcePageHeader';
import ResourceSubjectSelector from './ResourceSubjectSelector';
import ResourceDocumentViewer from './ResourceDocumentViewer';
import PDFModal from '../PDFModal';
import { useResourcePageLogic } from '../../hooks/useResourcePageLogic';

const ResourcePageContainer: React.FC = () => {
  const {
    selectedSubject,
    loading,
    selectedPdfUrl,
    currentPage,
    classId,
    classTitle,
    resourceTypeTitle,
    allSubjects,
    currentDocuments,
    isGitHub,
    handlePreview,
    handleDownload,
    handleSubjectSelect,
    handleBackToSubjects,
    handlePageChange,
    closePdfModal
  } = useResourcePageLogic();

  return (
    <div className="max-w-7xl mx-auto min-w-0">
      <ResourcePageHeader
        selectedSubject={selectedSubject}
        classId={classId}
        classTitle={classTitle}
        resourceTypeTitle={resourceTypeTitle}
        currentDocumentsLength={currentDocuments.length}
        loading={loading}
        onBackToSubjects={handleBackToSubjects}
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
  );
};

export default ResourcePageContainer;
