
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface PDFViewerPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PDFViewerPagination: React.FC<PDFViewerPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const [jumpToPage, setJumpToPage] = useState('');

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
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

  if (totalPages <= 1) return null;

  return (
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
  );
};

export default PDFViewerPagination;
