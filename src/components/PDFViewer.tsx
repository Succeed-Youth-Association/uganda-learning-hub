
import React, { useState, useEffect } from 'react';
import PDFModal from './PDFModal';
import PDFViewerHeader from './pdf-viewer/PDFViewerHeader';
import PDFDocumentGrid from './pdf-viewer/PDFDocumentGrid';
import PDFViewerPagination from './pdf-viewer/PDFViewerPagination';

interface PDFDocument {
  pdfUrl: string;
  title?: string;
}

interface PDFViewerProps {
  documents: PDFDocument[];
  title?: string;
  itemsPerPage?: number;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ 
  documents, 
  title = "PDF Documents", 
  itemsPerPage = 12 
}) => {
  const [filteredData, setFilteredData] = useState<PDFDocument[]>(documents);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  // Extract name from URL for display
  const extractNameFromUrl = (pdfUrl: string): string => {
    const parts = pdfUrl.split('/');
    const fileName = parts[parts.length - 1].replace('.pdf', '');
    let nameWithoutSpecialChars = fileName.replace(/[^\w\s&.]/g, ' ');
    let nameWithoutHyphensUnderscores = nameWithoutSpecialChars.replace(/[-_]/g, ' ');
    return nameWithoutHyphensUnderscores.toUpperCase();
  };

  // Filter documents based on search term
  useEffect(() => {
    const filtered = documents.filter(pdf => {
      const displayName = pdf.title || extractNameFromUrl(pdf.pdfUrl);
      return displayName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, documents]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openPdfViewer = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 to-orange-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <PDFViewerHeader
          title={title}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <PDFDocumentGrid
          documents={currentDocuments}
          onDocumentClick={openPdfViewer}
        />

        <PDFViewerPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* PDF Modal */}
        {selectedPdf && (
          <PDFModal
            pdfUrl={selectedPdf}
            onClose={closePdfViewer}
          />
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
