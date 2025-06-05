
import React, { useEffect, useRef } from 'react';

interface PDFContentRendererProps {
  currentPdf: any;
  totalPages: number;
  rotation: number;
  pagesRef: React.MutableRefObject<HTMLDivElement[]>;
}

const PDFContentRenderer: React.FC<PDFContentRendererProps> = ({
  currentPdf,
  totalPages,
  rotation,
  pagesRef
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (currentPdf) {
      renderAllPages();
    }
  }, [currentPdf, rotation]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-700"
    />
  );
};

export default PDFContentRenderer;
