
import React, { useEffect, useRef } from 'react';

// Declare the jQuery flipBook plugin
declare global {
  interface Window {
    jQuery?: any;
    $?: any;
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Load the required CSS and JS files
    const loadFlipBookAssets = () => {
      // Load CSS
      if (!document.querySelector('link[href="/css/flipbook.style.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/flipbook.style.css';
        document.head.appendChild(link);
      }

      // Load jQuery first
      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => resolve();
          script.onerror = reject;
          document.head.appendChild(script);
        });
      };

      // Load scripts in sequence
      const loadAllScripts = async () => {
        try {
          // Load jQuery if not already loaded
          if (!window.jQuery) {
            await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js');
          }

          // Load FlipBook scripts
          await loadScript('/js/flipbook.min.js');
          await loadScript('/js/flipbook.book3.min.js');
          await loadScript('/js/flipbook.swipe.min.js');
          await loadScript('/js/flipbook.webgl.min.js');
          await loadScript('/js/flipbook.pdfservice.min.js');

          // Initialize FlipBook after all scripts are loaded
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
        } catch (error) {
          console.error('Failed to load FlipBook scripts:', error);
        }
      };

      loadAllScripts();
    };

    if (pdfUrl) {
      loadFlipBookAssets();
    }

    // Cleanup
    return () => {
      if (buttonRef.current && window.jQuery) {
        try {
          window.jQuery(buttonRef.current).off();
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
      }
    };
  }, [pdfUrl]);

  return (
    <div className={`flipbook-container ${className}`}>
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
