
import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import PDFModal from './PDFModal';

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
  const [jumpToPage, setJumpToPage] = useState('');

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
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage);
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
      setJumpToPage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJumpToPage();
    }
  };

  const openPdfViewer = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  const renderPagination = () => {
    const pagination = [];
    
    // Previous button
    pagination.push(
      <Button
        key="prev"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    );

    // Page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (startPage > 1) {
      pagination.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(1)}
          className="mx-1"
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pagination.push(<span key="ellipsis1" className="mx-1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className="mx-1"
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagination.push(<span key="ellipsis2" className="mx-1">...</span>);
      }
      pagination.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          className="mx-1"
        >
          {totalPages}
        </Button>
      );
    }

    // Next button
    pagination.push(
      <Button
        key="next"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    );

    return pagination;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 to-orange-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-8">
          {title}
        </h1>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for content here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Documents Grid */}
        {currentDocuments.length === 0 ? (
          <div className="text-center text-orange-600 text-lg mt-8">
            No results found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentDocuments.map((pdf, index) => {
              const displayName = pdf.title || extractNameFromUrl(pdf.pdfUrl);
              return (
                <div
                  key={`${pdf.pdfUrl}-${index}`}
                  className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform hover:scale-105 hover:shadow-xl"
                >
                  <h3 className="text-orange-600 font-semibold mb-4 text-sm leading-tight">
                    {displayName}
                  </h3>
                  <Button
                    onClick={() => openPdfViewer(pdf.pdfUrl)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
                  >
                    VIEW
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center flex-wrap justify-center">
              {renderPagination()}
            </div>
            
            {/* Jump to page */}
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                min="1"
                max={totalPages}
                placeholder="Jump to page"
                value={jumpToPage}
                onChange={(e) => setJumpToPage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-32"
              />
              <Button
                onClick={handleJumpToPage}
                variant="outline"
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
              >
                Go
              </Button>
            </div>
          </div>
        )}

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
