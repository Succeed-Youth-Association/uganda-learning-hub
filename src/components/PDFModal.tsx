import React, { useState, useEffect, useRef } from 'react';
import { X, RotateCw, Printer, Loader2, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { Button } from './ui/button';
import * as pdfjsLib from 'pdfjs-dist';

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
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (currentPdf) {
      renderAllPages();
    }
  }, [currentPdf, rotation]);

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

  const renderAllPages = async () => {
    if (!currentPdf || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';
    pagesRef.current = [];

    for (let i = 1; i <= totalPages; i++) {
      try {
        const page = await currentPdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.2, rotation });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.className = 'w-full shadow-2xl bg-white rounded-sm mb-4';

        const pageContainer = document.createElement('div');
        pageContainer.className = 'w-full max-w-4xl mx-auto relative';
        pageContainer.dataset.pageNumber = i.toString();
        
        // Add page number indicator
        const pageNumberDiv = document.createElement('div');
        pageNumberDiv.className = 'absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs';
        pageNumberDiv.textContent = `Page ${i} of ${totalPages}`;
        
        pageContainer.appendChild(canvas);
        pageContainer.appendChild(pageNumberDiv);
        container.appendChild(pageContainer);
        pagesRef.current.push(pageContainer);

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
      } catch (err) {
        console.error(`Error rendering page ${i}:`, err);
      }
    }
  };

  const renderThumbnail = async (pageNum: number, container: HTMLElement) => {
    try {
      const page = await currentPdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 0.2, rotation: 0 });
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      canvas.className = 'w-full h-full object-contain';

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
      container.innerHTML = '';
      container.appendChild(canvas);
    } catch (err) {
      console.error(`Error rendering thumbnail for page ${pageNum}:`, err);
      container.textContent = `Error loading page ${pageNum}`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const rotate = () => setRotation(prev => (prev + 90) % 360);
  const handlePrint = () => window.print();
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-900 flex flex-col z-50"
      onClick={handleModalClick}
    >
      {/* Top Toolbar */}
      <div className="flex justify-between items-center p-2 bg-gray-800 text-white">
        <div className="flex items-center">
          <Button
            onClick={() => setShowThumbnails(!showThumbnails)}
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-gray-700 mr-2"
          >
            {showThumbnails ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </Button>
          
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <h1 className="text-sm font-medium truncate max-w-[50vw] md:max-w-md mx-2">
          {displayFileName}
        </h1>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={rotate}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <RotateCw className="h-5 w-5" />
          </Button>
          
          <Button
            onClick={handlePrint}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700 bg-blue-600 hover:bg-blue-700"
          >
            <Printer className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden bg-gray-700 relative">
        {/* Mobile Thumbnail Sidebar */}
        {showThumbnails && isMobile && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex">
            <div className="w-3/4 bg-gray-800 h-full overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-lg font-medium">Pages</h2>
                <Button 
                  onClick={() => setShowThumbnails(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <div 
                      key={i} 
                      className={`p-1 rounded cursor-pointer hover:bg-gray-700`}
                      onClick={() => {
                        const pageContainer = pagesRef.current[pageNum - 1];
                        if (pageContainer) {
                          pageContainer.scrollIntoView({ behavior: 'smooth' });
                        }
                        setShowThumbnails(false);
                      }}
                    >
                      <div className="text-white text-xs mb-1 text-center">Page {pageNum}</div>
                      <div 
                        className="bg-gray-600 h-24 flex items-center justify-center text-white text-xs relative"
                        ref={(el) => {
                          if (el && currentPdf) {
                            renderThumbnail(pageNum, el);
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Thumbnail Sidebar */}
        {showThumbnails && !isMobile && (
          <div className="w-48 bg-gray-800 overflow-y-auto p-2">
            <div className="text-white text-sm font-medium mb-2 px-2">Pages</div>
            <div className="space-y-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <div 
                    key={i} 
                    className={`p-1 rounded cursor-pointer hover:bg-gray-700`}
                    onClick={() => {
                      const pageContainer = pagesRef.current[pageNum - 1];
                      if (pageContainer) {
                        pageContainer.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <div className="text-white text-xs mb-1 text-center">Page {pageNum}</div>
                    <div 
                      className="bg-gray-600 h-24 flex items-center justify-center text-white text-xs relative"
                      ref={(el) => {
                        if (el && currentPdf) {
                          renderThumbnail(pageNum, el);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PDF Content */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-700"
        >
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-white text-lg font-medium">Loading document...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                <p className="text-red-600 text-lg mb-4 font-medium">{error}</p>
                <Button onClick={loadPdf} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFModal;