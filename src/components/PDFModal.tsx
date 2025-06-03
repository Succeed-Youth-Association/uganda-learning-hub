
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Printer, Loader2, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';
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
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [jumpToPage, setJumpToPage] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch handling for mobile swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
    if (!currentPdf || !canvasRef.current || !containerRef.current) return;

    try {
      const page = await currentPdf.getPage(pageNum);
      
      // Calculate optimal scale based on container width
      const containerWidth = containerRef.current.clientWidth - 40; // Account for padding
      const viewport = page.getViewport({ scale: 1, rotation });
      const optimalScale = Math.min(containerWidth / viewport.width, scale);
      
      const scaledViewport = page.getViewport({ scale: optimalScale, rotation });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.height = scaledViewport.height;
      canvas.width = scaledViewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport
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
    setScale(prev => Math.min(prev + 0.25, 4));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
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
        goToPreviousPage();
      } else {
        goToNextPage();
      }
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = downloadUrl;
      link.download = `document-page-${currentPage}.pdf`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between bg-white/95 backdrop-blur-sm border-b px-4 py-3 shadow-lg">
        {/* Left Section - Navigation & Page Info */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="hidden sm:flex items-center gap-2">
            <Button
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm font-medium text-gray-800 bg-gray-100 px-3 py-1.5 rounded-md min-w-[80px] text-center">
              {currentPdf ? `${currentPage} / ${totalPages}` : ''}
            </span>
            
            <Button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Jump to Page */}
          <form onSubmit={handleJumpToPage} className="hidden md:flex items-center gap-2">
            <Input
              type="number"
              min="1"
              max={totalPages}
              value={jumpToPage}
              onChange={(e) => setJumpToPage(e.target.value)}
              placeholder="Go to page"
              className="w-24 h-8 text-sm"
            />
            <Button type="submit" size="sm" variant="outline" className="h-8 px-3 text-sm">
              Go
            </Button>
          </form>
        </div>

        {/* Right Section - Tools */}
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              onClick={zoomOut}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-white"
              disabled={scale <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={resetZoom}
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs font-medium hover:bg-white min-w-[50px]"
            >
              {Math.round(scale * 100)}%
            </Button>
            
            <Button
              onClick={zoomIn}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-white"
              disabled={scale >= 4}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              onClick={rotate}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-700 hover:bg-gray-100"
            >
              <RotateCw className="h-4 w-4" />
            </Button>

            <Button
              onClick={handleDownload}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-700 hover:bg-gray-100"
            >
              <Download className="h-4 w-4" />
            </Button>

            <Button
              onClick={handlePrint}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-700 hover:bg-gray-100"
            >
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 relative overflow-hidden">
        {/* Mobile Navigation - Bottom positioned */}
        <div className="sm:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-4 py-2">
            <Button
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm font-medium px-2">
              {currentPage}/{totalPages}
            </span>
            
            <Button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* PDF Display Area */}
        <div 
          ref={containerRef}
          className="h-full w-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="min-h-full flex items-center justify-center p-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                <p className="text-white text-lg font-medium">Loading PDF...</p>
              </div>
            )}

            {error && (
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                <p className="text-red-600 text-lg mb-4 font-medium text-center">{error}</p>
                <Button onClick={loadPdf} className="w-full">
                  Try Again
                </Button>
              </div>
            )}

            {!isLoading && !error && (
              <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="block max-w-full max-h-full"
                  style={{ 
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Jump to Page - Hidden panel */}
      <div className="sm:hidden bg-white/95 backdrop-blur-sm border-t px-4 py-2">
        <form onSubmit={handleJumpToPage} className="flex items-center justify-center gap-2">
          <Input
            type="number"
            min="1"
            max={totalPages}
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            placeholder="Page number"
            className="w-32 h-8 text-sm"
          />
          <Button type="submit" size="sm" variant="outline" className="h-8 px-3 text-sm">
            Go to Page
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PDFModal;
