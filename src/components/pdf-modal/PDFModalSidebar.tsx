
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface PDFModalSidebarProps {
  showThumbnails: boolean;
  isMobile: boolean;
  totalPages: number;
  currentPdf: any;
  pagesRef: React.MutableRefObject<HTMLDivElement[]>;
  onClose: () => void;
  onPageClick: (pageNum: number) => void;
}

const PDFModalSidebar: React.FC<PDFModalSidebarProps> = ({
  showThumbnails,
  isMobile,
  totalPages,
  currentPdf,
  pagesRef,
  onClose,
  onPageClick
}) => {
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

  const handlePageClick = (pageNum: number) => {
    const pageContainer = pagesRef.current[pageNum - 1];
    if (pageContainer) {
      pageContainer.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile) {
      onClose();
    }
  };

  if (!showThumbnails) return null;

  // Mobile Thumbnail Sidebar
  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex">
        <div className="w-3/4 bg-gray-800 h-full overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg font-medium">Pages</h2>
            <Button 
              onClick={onClose}
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
                  className="p-1 rounded cursor-pointer hover:bg-gray-700"
                  onClick={() => handlePageClick(pageNum)}
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
    );
  }

  // Desktop Thumbnail Sidebar
  return (
    <div className="w-48 bg-gray-800 overflow-y-auto p-2">
      <div className="text-white text-sm font-medium mb-2 px-2">Pages</div>
      <div className="space-y-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <div 
              key={i} 
              className="p-1 rounded cursor-pointer hover:bg-gray-700"
              onClick={() => handlePageClick(pageNum)}
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
  );
};

export default PDFModalSidebar;
