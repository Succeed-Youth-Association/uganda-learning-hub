
import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import PDFModalToolbar from './pdf/PDFModalToolbar';
import PDFThumbnailSidebar from './pdf/PDFThumbnailSidebar';
import PDFLoadingState from './pdf/PDFLoadingState';
import PDFContentRenderer from './pdf/PDFContentRenderer';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface PDFModalProps {
  pdfUrl: string;
  onClose: () => void;
}

const PDFModal: React.FC<PDFModalProps> = ({ pdfUrl, onClose }) => {
  const [currentPdf, setCurrentPdf] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const pagesRef = useRef<HTMLDivElement[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format filename for display
  const formatFileName = (url: string) => {
    try {
      let filename = url.split('/').pop() || 'document.pdf';
      filename = decodeURIComponent(filename);
      filename = filename.replace(/[^a-zA-Z0-9\s.]/g, ' ');
      filename = filename.toUpperCase();
      filename = filename.replace(/\s+/g, ' ').trim();
      filename = filename.replace(/\.[^/.]+$/, '');
      return filename;
    } catch {
      return 'DOCUMENT';
    }
  };

  const displayFileName = formatFileName(pdfUrl);

  useEffect(() => {
    loadPdf();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [pdfUrl]);

  const loadPdf = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      setCurrentPdf(pdf);
      setTotalPages(pdf.numPages);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError('Error loading PDF. Please try again.');
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const rotate = () => setRotation(prev => (prev + 90) % 360);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get all the canvas elements
    const canvases = Array.from(document.querySelectorAll('canvas'));
    
    // Create HTML with all canvas images - Fixed CSS to prevent extra blank pages
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${displayFileName}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body { 
              margin: 0; 
              padding: 0; 
              background-color: white;
            }
            img { 
              width: 100%; 
              height: auto; 
              display: block; 
              margin: 0;
            }
            @page { 
              size: auto; 
              margin: 10mm;
            }
            @media print {
              img {
                break-inside: avoid;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          ${canvases.map(canvas => `
            <img src="${canvas.toDataURL('image/png')}">
          `).join('')}
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    // Wait for images to load
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handlePageClick = (pageNum: number) => {
    const pageContainer = pagesRef.current[pageNum - 1];
    if (pageContainer) {
      pageContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-900 flex flex-col z-50"
      onClick={handleModalClick}
    >
      <PDFModalToolbar
        displayFileName={displayFileName}
        showThumbnails={showThumbnails}
        onClose={onClose}
        onToggleThumbnails={() => setShowThumbnails(!showThumbnails)}
        onRotate={rotate}
        onPrint={handlePrint}
      />

      <div className="flex-1 flex overflow-hidden bg-gray-700 relative">
        <PDFThumbnailSidebar
          showThumbnails={showThumbnails}
          isMobile={isMobile}
          totalPages={totalPages}
          currentPdf={currentPdf}
          pagesRef={pagesRef}
          onClose={() => setShowThumbnails(false)}
          onPageClick={handlePageClick}
        />

        <PDFLoadingState
          isLoading={isLoading}
          error={error}
          onRetry={loadPdf}
        />

        {!isLoading && !error && (
          <PDFContentRenderer
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
