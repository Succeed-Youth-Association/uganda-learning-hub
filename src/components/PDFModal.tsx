
import React from 'react';
import { usePDFModal } from '../hooks/usePDFModal';
import PDFModalHeader from './pdf-modal/PDFModalHeader';
import PDFModalSidebar from './pdf-modal/PDFModalSidebar';
import PDFModalLoadingError from './pdf-modal/PDFModalLoadingError';
import PDFModalContent from './pdf-modal/PDFModalContent';

interface PDFModalProps {
  pdfUrl: string;
  onClose: () => void;
}

const PDFModal: React.FC<PDFModalProps> = ({ pdfUrl, onClose }) => {
  const {
    currentPdf,
    totalPages,
    isLoading,
    error,
    rotation,
    showThumbnails,
    isMobile,
    pagesRef,
    displayFileName,
    loadPdf,
    rotate,
    handlePrint,
    handlePageClick,
    setShowThumbnails
  } = usePDFModal(pdfUrl);

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-900 flex flex-col z-50"
      onClick={handleModalClick}
    >
      <PDFModalHeader
        displayFileName={displayFileName}
        showThumbnails={showThumbnails}
        onClose={onClose}
        onToggleThumbnails={() => setShowThumbnails(!showThumbnails)}
        onRotate={rotate}
        onPrint={handlePrint}
      />

      <div className="flex-1 flex overflow-hidden bg-gray-700 relative">
        <PDFModalSidebar
          showThumbnails={showThumbnails}
          isMobile={isMobile}
          totalPages={totalPages}
          currentPdf={currentPdf}
          pagesRef={pagesRef}
          onClose={() => setShowThumbnails(false)}
          onPageClick={handlePageClick}
        />

        <PDFModalLoadingError
          isLoading={isLoading}
          error={error}
          onRetry={loadPdf}
        />

        {!isLoading && !error && (
          <PDFModalContent
            currentPdf={currentPdf}
            totalPages={totalPages}
            rotation={rotation}
            pagesRef={pagesRef}
          />
        )}
      </div>
    </div>
  );
};

export default PDFModal;
