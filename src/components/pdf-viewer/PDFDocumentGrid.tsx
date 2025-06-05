
import React from 'react';
import { Button } from '../ui/button';

interface PDFDocument {
  pdfUrl: string;
  title?: string;
}

interface PDFDocumentGridProps {
  documents: PDFDocument[];
  onDocumentClick: (pdfUrl: string) => void;
}

const PDFDocumentGrid: React.FC<PDFDocumentGridProps> = ({
  documents,
  onDocumentClick
}) => {
  // Extract name from URL for display
  const extractNameFromUrl = (pdfUrl: string): string => {
    const parts = pdfUrl.split('/');
    const fileName = parts[parts.length - 1].replace('.pdf', '');
    let nameWithoutSpecialChars = fileName.replace(/[^\w\s&.]/g, ' ');
    let nameWithoutHyphensUnderscores = nameWithoutSpecialChars.replace(/[-_]/g, ' ');
    return nameWithoutHyphensUnderscores.toUpperCase();
  };

  if (documents.length === 0) {
    return (
      <div className="text-center text-orange-600 text-lg mt-8">
        No results found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {documents.map((pdf, index) => {
        const displayName = pdf.title || extractNameFromUrl(pdf.pdfUrl);
        return (
          <div
            key={`${pdf.pdfUrl}-${index}`}
            className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-orange-600 font-semibold mb-4 text-sm leading-tight">
              {displayName}
            </h3>
            <Button
              onClick={() => onDocumentClick(pdf.pdfUrl)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
            >
              VIEW
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default PDFDocumentGrid;
