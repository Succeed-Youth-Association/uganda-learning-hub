
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Loader2, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <div className="flex justify-between items-center p-4 bg-white border-b shadow-md">
        <div className="flex items-center space-x-4">
          {/* Navigation Controls */}
          <Button
            onClick={goToPreviousPage}
            disabled={currentPage <= 1}
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium bg-gray-100 px-3 py-2 rounded-md">
              {currentPdf ? `${currentPage} / ${totalPages}` : ''}
            </span>
            
            {/* Jump to Page */}
            <form onSubmit={handleJumpToPage} className="flex items-center space-x-1">
              <Input
                type="number"
                min="1"
                max={totalPages}
                value={jumpToPage}
                onChange={(e) => setJumpToPage(e.target.value)}
                placeholder="Page"
                className="w-20 h-8 text-sm"
              />
              <Button type="submit" size="sm" variant="outline" className="h-8 px-3">
                Go
              </Button>
            </form>
          </div>
          
          <Button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Zoom and Tools */}
        <div className="flex items-center space-x-2">
          <Button
            onClick={zoomOut}
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0"
            disabled={scale <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <span className="text-sm font-medium bg-gray-100 px-3 py-2 rounded-md min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>
          
          <Button
            onClick={zoomIn}
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0"
            disabled={scale >= 3}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Button
            onClick={rotate}
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0"
          >
            <RotateCw className="h-4 w-4" />
          </Button>

          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>

          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="h-10 w-10 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div 
        ref={viewerRef}
        className="flex-1 overflow-auto bg-gray-200 flex justify-center items-center p-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-16 w-16 animate-spin text-orange-500 mx-auto mb-4" />
              <p className="text-white text-lg">Loading PDF...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg">
              <p className="text-red-500 text-lg mb-4">{error}</p>
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

      {/* Bottom Navigation (Mobile Friendly) */}
      <div className="sm:hidden bg-white border-t p-3">
        <div className="flex justify-between items-center">
          <Button
            onClick={goToPreviousPage}
            disabled={currentPage <= 1}
            variant="outline"
            size="sm"
            className="flex-1 mr-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="text-sm font-medium px-4">
            {currentPage} / {totalPages}
          </div>
          
          <Button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
            variant="outline"
            size="sm"
            className="flex-1 ml-2"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PDFModal;
