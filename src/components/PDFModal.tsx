
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Printer, Loader2, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface PDFModalProps {
  pdfUrl: string;
  onClose: () => void;
}

const PDFModal: React.FC<PDFModalProps> = ({ pdfUrl, onClose }) => {
  const [currentPdf, setCurrentPdf] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [jumpToPage, setJumpToPage] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Touch handling for mobile swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    loadPdf();
    // Add event listeners for keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (currentPdf && currentPage) {
      renderPage(currentPage);
    }
  }, [currentPdf, currentPage, scale, rotation]);

  const loadPdf = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      setCurrentPdf(pdf);
      setTotalPages(pdf.numPages);
      setCurrentPage(1);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError('Error loading PDF. Please try again.');
      setIsLoading(false);
    }
  };

  const renderPage = async (pageNum: number) => {
    if (!currentPdf || !canvasRef.current) return;

    try {
      const page = await currentPdf.getPage(pageNum);
      const viewport = page.getViewport({ scale, rotation });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (err) {
      console.error('Error rendering page:', err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        goToPreviousPage();
        break;
      case 'ArrowRight':
        goToNextPage();
        break;
      case 'Escape':
        onClose();
        break;
      case '+':
      case '=':
        zoomIn();
        break;
      case '-':
        zoomOut();
        break;
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpToPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setJumpToPage('');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const deltaX = touchEndX.current - touchStartX.current;
    
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        goToPreviousPage(); // Swipe right, go to previous page
      } else {
        goToNextPage(); // Swipe left, go to next page
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 flex flex-col z-50"
      onClick={handleModalClick}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center p-2 md:p-4 bg-white border-b shadow-md">
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Page Info */}
          <span className="text-sm md:text-base font-semibold text-gray-800 bg-gray-100 px-2 md:px-3 py-1 md:py-2 rounded-md">
            {currentPdf ? `${currentPage} / ${totalPages}` : ''}
          </span>
          
          {/* Jump to Page - Hidden on small screens */}
          <form onSubmit={handleJumpToPage} className="hidden sm:flex items-center space-x-1">
            <Input
              type="number"
              min="1"
              max={totalPages}
              value={jumpToPage}
              onChange={(e) => setJumpToPage(e.target.value)}
              placeholder="Page"
              className="w-16 md:w-20 h-6 md:h-8 text-xs md:text-sm"
            />
            <Button type="submit" size="sm" variant="outline" className="h-6 md:h-8 px-2 md:px-3 text-xs md:text-sm">
              Go
            </Button>
          </form>
        </div>

        {/* Zoom and Tools */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <Button
            onClick={zoomOut}
            variant="outline"
            size="sm"
            className="h-8 md:h-10 w-8 md:w-10 p-0"
            disabled={scale <= 0.5}
          >
            <ZoomOut className="h-3 md:h-4 w-3 md:w-4" />
          </Button>
          
          <span className="text-xs md:text-sm font-semibold text-gray-800 bg-gray-100 px-2 md:px-3 py-1 md:py-2 rounded-md min-w-[40px] md:min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>
          
          <Button
            onClick={zoomIn}
            variant="outline"
            size="sm"
            className="h-8 md:h-10 w-8 md:w-10 p-0"
            disabled={scale >= 3}
          >
            <ZoomIn className="h-3 md:h-4 w-3 md:w-4" />
          </Button>

          <Button
            onClick={rotate}
            variant="outline"
            size="sm"
            className="h-8 md:h-10 w-8 md:w-10 p-0"
          >
            <RotateCw className="h-3 md:h-4 w-3 md:w-4" />
          </Button>

          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="h-8 md:h-10 w-8 md:w-10 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            <X className="h-4 md:h-5 w-4 md:w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content Area with Side Navigation */}
      <div className="flex-1 flex items-center justify-center bg-gray-200 relative">
        {/* Left Navigation Arrow */}
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage <= 1}
          variant="outline"
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 h-12 md:h-16 w-12 md:w-16 rounded-full bg-white/90 hover:bg-white shadow-lg disabled:opacity-50"
        >
          <ChevronLeft className="h-6 md:h-8 w-6 md:w-8 text-gray-800" />
        </Button>

        {/* PDF Content */}
        <div 
          ref={viewerRef}
          className="flex-1 overflow-auto flex justify-center items-center p-4 mx-16 md:mx-20"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="h-12 md:h-16 w-12 md:w-16 animate-spin text-orange-500 mx-auto mb-4" />
                <p className="text-white text-base md:text-lg font-medium">Loading PDF...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center">
              <div className="text-center bg-white p-6 md:p-8 rounded-lg shadow-lg">
                <p className="text-red-600 text-base md:text-lg mb-4 font-medium">{error}</p>
                <Button onClick={loadPdf} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <div className="max-w-full max-h-full overflow-auto">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full shadow-2xl bg-white rounded-lg"
                style={{ 
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
          )}
        </div>

        {/* Right Navigation Arrow */}
        <Button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          variant="outline"
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 h-12 md:h-16 w-12 md:w-16 rounded-full bg-white/90 hover:bg-white shadow-lg disabled:opacity-50"
        >
          <ChevronRight className="h-6 md:h-8 w-6 md:w-8 text-gray-800" />
        </Button>
      </div>

      {/* Bottom Controls */}
      <div className="bg-white border-t p-2 md:p-4">
        <div className="flex justify-between items-center">
          {/* Mobile Navigation (only on small screens) */}
          <div className="flex sm:hidden items-center space-x-2">
            <Button
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </Button>
            
            <div className="text-xs font-semibold text-gray-800 px-2">
              {currentPage}/{totalPages}
            </div>
            
            <Button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Jump to Page (mobile) */}
          <form onSubmit={handleJumpToPage} className="flex sm:hidden items-center space-x-1">
            <Input
              type="number"
              min="1"
              max={totalPages}
              value={jumpToPage}
              onChange={(e) => setJumpToPage(e.target.value)}
              placeholder="Page"
              className="w-16 h-6 text-xs"
            />
            <Button type="submit" size="sm" variant="outline" className="h-6 px-2 text-xs">
              Go
            </Button>
          </form>

          {/* Print Button */}
          <div className="flex justify-center flex-1 sm:flex-none">
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500 px-3 md:px-4 py-1 md:py-2"
            >
              <Printer className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
              <span className="text-xs md:text-sm font-medium">Print</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFModal;
