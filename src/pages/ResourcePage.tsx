
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import ResourcePageContent from '../components/resource/ResourcePageContent';
import { useResourcePage } from '../hooks/useResourcePage';

const ResourcePage = () => {
  const {
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
    handleSubjectSelect,
    handleBackToSubjects,
    handlePreview,
    handleDownload,
    handlePageChange,
    closePreview
  } = useResourcePage();

  return (
    <PageLayout className="min-w-0">
      <ResourcePageContent
        documents={documents}
        allSubjects={allSubjects}
        selectedSubject={selectedSubject}
        loading={loading}
        previewDocument={previewDocument}
        isGitHub={isGitHub}
        currentPage={currentPage}
        classTitle={classTitle}
        resourceTypeTitle={resourceTypeTitle}
        classId={classId}
        onSubjectSelect={handleSubjectSelect}
        onBackToSubjects={handleBackToSubjects}
        onPreview={handlePreview}
        onDownload={handleDownload}
        onPageChange={handlePageChange}
        onClosePreview={closePreview}
      />
    </PageLayout>
  );
};

export default ResourcePage;
