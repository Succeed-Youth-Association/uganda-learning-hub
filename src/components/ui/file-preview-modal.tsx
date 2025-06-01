
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { Button } from './button';
import { X, Download, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ResourceDocument } from '../../utils/dataLoader';
import { GitHubDocument } from '../../utils/githubLoader';
import { extractFileName, getFileExtension } from '../../utils/fileUtils';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: ResourceDocument | GitHubDocument | null;
  isGitHub?: boolean;
  onDownload: (document: ResourceDocument | GitHubDocument) => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  document,
  isGitHub = false,
  onDownload
}) => {
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setScale(1.0);
      setRotation(0);
      setPageNumber(1);
      setNumPages(0);
      setLoading(true);
      setError(null);
    }
  }, [isOpen, document]);

  if (!document) return null;

  const fileUrl = isGitHub ? (document as GitHubDocument).download_url : (document as ResourceDocument).pdfUrl;
  const fileName = isGitHub ? (document as GitHubDocument).name : extractFileName((document as ResourceDocument).pdfUrl);
  const fileExtension = getFileExtension(fileUrl).toLowerCase().replace('.', '');

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF document');
    setLoading(false);
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const handlePrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));

  const renderPreviewContent = () => {
    if (fileExtension === 'pdf') {
      return (
        <div className="flex flex-col h-full">
          {/* PDF Controls */}
          <div className="flex items-center justify-between p-4 border-b bg-muted/50">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleRotate}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
            
            {numPages > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={pageNumber <= 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {pageNumber} of {numPages}
                </span>
                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={pageNumber >= numPages}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-auto p-4 bg-gray-100">
            <div className="flex justify-center">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                  <span className="ml-2">Loading PDF...</span>
                </div>
              )}
              
              {error && (
                <div className="text-center py-12">
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button onClick={() => window.open(fileUrl, '_blank')}>
                    Open in New Tab
                  </Button>
                </div>
              )}

              {!error && (
                <Document
                  file={fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading=""
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    rotate={rotation}
                    loading=""
                  />
                </Document>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b bg-muted/50">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 bg-gray-100">
            <div className="flex justify-center">
              <img
                src={fileUrl}
                alt={fileName}
                style={{ 
                  transform: `scale(${scale})`,
                  maxWidth: 'none',
                  height: 'auto'
                }}
                className="shadow-lg"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setError('Failed to load image');
                  setLoading(false);
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    if (fileExtension === 'txt') {
      return (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-auto p-4">
            <iframe
              src={fileUrl}
              className="w-full h-full border-0"
              title={fileName}
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>
      );
    }

    // Fallback for other file types
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Preview not available</h3>
          <p className="text-muted-foreground mb-4">
            This file type cannot be previewed in the browser.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => window.open(fileUrl, '_blank')}>
              Open in New Tab
            </Button>
            <Button variant="outline" onClick={() => onDownload(document)}>
              <Download className="h-4 w-4 mr-2" />
              Download File
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">{fileName}</DialogTitle>
              <DialogDescription>
                {fileExtension.toUpperCase()} File Preview
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onDownload(document)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 min-h-0">
          {renderPreviewContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewModal;
