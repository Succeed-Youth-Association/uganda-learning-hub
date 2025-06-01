
import React, { useEffect, useRef, useState } from 'react';

// Declare the jQuery flipBook plugin
declare global {
  interface Window {
    jQuery?: any;
    $?: any;
  }
}

interface FlipBookViewerProps {
  pdfUrl: string;
  className?: string;
}

const FlipBookViewer: React.FC<FlipBookViewerProps> = ({ pdfUrl, className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [flipbookId] = useState(() => `flipbook-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const loadFlipBookAssets = async () => {
      try {
        setIsLoading(true);

        // Load CSS first
        if (!document.querySelector('link[href="/css/flipbook.style.css"]')) {
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
          
          await new Promise((resolve, reject) => {
            jqueryScript.onload = resolve;
            jqueryScript.onerror = reject;
          });
        }

        // Load jQuery UI
        if (!window.jQuery.ui) {
          const jqueryUIScript = document.createElement('script');
          jqueryUIScript.src = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js';
          document.head.appendChild(jqueryUIScript);
          
          await new Promise((resolve, reject) => {
            jqueryUIScript.onload = resolve;
            jqueryUIScript.onerror = reject;
          });
        }

        // Load FlipBook JS
        if (!window.jQuery.fn.flipBook) {
          const flipbookScript = document.createElement('script');
          flipbookScript.src = '/js/flipbook.min.js';
          document.head.appendChild(flipbookScript);
          
          await new Promise((resolve, reject) => {
            flipbookScript.onload = resolve;
            flipbookScript.onerror = reject;
          });
        }

        // Initialize flipbook after all scripts are loaded
        if (buttonRef.current && window.jQuery && window.jQuery.fn.flipBook) {
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
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load FlipBook assets:', error);
        setIsLoading(false);
      }
    };

    if (pdfUrl) {
      loadFlipBookAssets();
    }

    // Cleanup
    return () => {
      if (buttonRef.current && window.jQuery) {
        try {
          window.jQuery(`#${flipbookId}`).off();
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
      }
    };
  }, [pdfUrl, flipbookId]);

  const getFileName = (pdfUrl: string) => {
    return pdfUrl.substring(pdfUrl.lastIndexOf("/") + 1).replace(".pdf", "").toUpperCase();
  };

  return (
    <div className={`flipbook-container ${className}`}>
      <div className="border border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {getFileName(pdfUrl)}
          </h3>
          
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mb-4"></div>
              <p className="text-gray-600">Loading FlipBook components...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button
                ref={buttonRef}
                id={flipbookId}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <span>📖</span>
                View FlipBook
              </button>
              
              <p className="text-sm text-gray-600">
                Interactive page-turning experience
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipBookViewer;
