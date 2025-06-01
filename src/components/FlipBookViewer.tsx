
import React, { useEffect, useRef } from 'react';

interface FlipBookViewerProps {
  pdfUrl: string;
  onClose?: () => void;
}

const FlipBookViewer: React.FC<FlipBookViewerProps> = ({ pdfUrl, onClose }) => {
  const flipbookRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    const loadFlipBookAssets = async () => {
      // Load CSS
      if (!document.querySelector('link[href*="flipbook.style.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = '/css/flipbook.style.css';
        document.head.appendChild(cssLink);
      }

      // Load jQuery if not already loaded
      if (!window.jQuery) {
        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js';
        document.head.appendChild(jqueryScript);
        
        await new Promise((resolve) => {
          jqueryScript.onload = resolve;
        });
      }

      // Load jQuery UI
      if (!document.querySelector('script[src*="jqueryui"]')) {
        const jqueryUIScript = document.createElement('script');
        jqueryUIScript.src = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js';
        document.head.appendChild(jqueryUIScript);
        
        await new Promise((resolve) => {
          jqueryUIScript.onload = resolve;
        });
      }

      // Load FlipBook JS
      if (!document.querySelector('script[src*="flipbook.min.js"]')) {
        const flipbookScript = document.createElement('script');
        flipbookScript.src = '/js/flipbook.min.js';
        document.head.appendChild(flipbookScript);
        
        await new Promise((resolve) => {
          flipbookScript.onload = resolve;
        });
      }

      // Initialize flipbook after all assets are loaded
      initializeFlipBook();
    };

    const initializeFlipBook = () => {
      if (window.jQuery && window.jQuery.fn.flipBook && !isInitialized.current) {
        const flipbookId = 'flipbook-viewer';
        
        // Initialize flipBook with exact same configuration as original
        window.jQuery(`#${flipbookId}`).flipBook({
          pdfUrl: pdfUrl,
          lightBox: true,
          layout: 3,
          currentPage: {
            vAlign: "bottom",
            hAlign: "left"
          },
          btnShare: {
            enabled: false
          },
          btnPrint: {
            enabled: true
          },
          btnDownloadPages: {
            enabled: true
          },
          btnColor: 'rgb(255,120,60)',
          sideBtnColor: 'rgb(255,120,60)',
          sideBtnSize: 60,
          sideBtnBackground: "rgba(0,0,0,.7)",
          sideBtnRadius: 60,
          btnSound: {
            vAlign: "top",
            hAlign: "left"
          },
          btnAutoplay: {
            vAlign: "top",
            hAlign: "left"
          }
        });

        isInitialized.current = true;
      }
    };

    loadFlipBookAssets();

    return () => {
      // Cleanup flipbook instance
      if (window.jQuery && isInitialized.current) {
        window.jQuery('#flipbook-viewer').off();
      }
      isInitialized.current = false;
    };
  }, [pdfUrl]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full h-full max-w-6xl max-h-screen bg-white rounded-lg overflow-hidden">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        )}
        
        <div ref={flipbookRef} className="w-full h-full flex items-center justify-center">
          <div
            id="flipbook-viewer"
            className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
          >
            📖 Open FlipBook Viewer
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipBookViewer;
