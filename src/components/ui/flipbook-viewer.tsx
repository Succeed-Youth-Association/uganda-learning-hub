
import React, { useEffect, useRef } from 'react';

// Declare the jQuery flipBook plugin
declare global {
  interface JQuery {
    flipBook(options: FlipBookOptions): JQuery;
  }
}

interface FlipBookOptions {
  pdfUrl: string;
  lightBox?: boolean;
  layout?: number;
  currentPage?: {
    vAlign: string;
    hAlign: string;
  };
  btnShare?: {
    enabled: boolean;
  };
  btnPrint?: {
    enabled: boolean;
  };
  btnDownloadPages?: {
    enabled: boolean;
  };
  btnColor?: string;
  sideBtnColor?: string;
  sideBtnSize?: number;
  sideBtnBackground?: string;
  sideBtnRadius?: number;
  btnSound?: {
    vAlign: string;
    hAlign: string;
  };
  btnAutoplay?: {
    vAlign: string;
    hAlign: string;
  };
}

interface FlipBookViewerProps {
  pdfUrl: string;
  className?: string;
}

const FlipBookViewer: React.FC<FlipBookViewerProps> = ({ pdfUrl, className = '' }) => {
  const flipbookRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const loadFlipbook = async () => {
      // Load jQuery if not already loaded
      if (!window.jQuery) {
        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
        document.head.appendChild(jqueryScript);
        
        await new Promise((resolve) => {
          jqueryScript.onload = resolve;
        });
      }

      // Load Flipbook CSS
      if (!document.querySelector('link[href*="flipbook.style.css"]')) {
        const flipbookCSS = document.createElement('link');
        flipbookCSS.rel = 'stylesheet';
        flipbookCSS.type = 'text/css';
        flipbookCSS.href = 'https://cdn.jsdelivr.net/gh/iberezansky/flipbook@latest/css/flipbook.style.css';
        document.head.appendChild(flipbookCSS);
      }

      // Load Flipbook JS
      if (!window.jQuery?.fn?.flipBook) {
        const flipbookScript = document.createElement('script');
        flipbookScript.src = 'https://cdn.jsdelivr.net/gh/iberezansky/flipbook@latest/js/flipbook.min.js';
        document.head.appendChild(flipbookScript);
        
        await new Promise((resolve) => {
          flipbookScript.onload = resolve;
        });
      }

      // Initialize Flipbook
      if (buttonRef.current && window.jQuery) {
        const $ = window.jQuery;
        $(buttonRef.current).flipBook({
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
          },
        });
      }
    };

    if (pdfUrl) {
      loadFlipbook();
    }

    // Cleanup function
    return () => {
      if (buttonRef.current && window.jQuery) {
        // Clean up flipbook instance if needed
        window.jQuery(buttonRef.current).off();
      }
    };
  }, [pdfUrl]);

  return (
    <div ref={flipbookRef} className={`flipbook-container ${className}`}>
      <button
        ref={buttonRef}
        className="w-full h-full min-h-[500px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <div className="text-center">
          <div className="text-4xl mb-4">📖</div>
          <div className="text-lg font-medium">Click to Open PDF Flipbook</div>
          <div className="text-sm text-gray-500 mt-2">Interactive page-turning experience</div>
        </div>
      </button>
    </div>
  );
};

export default FlipBookViewer;
