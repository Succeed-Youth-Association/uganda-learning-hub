
import React from 'react';

interface PdfProcessorProps {
  url: string;
}

export const PdfProcessor: React.FC<PdfProcessorProps> = ({ url }) => {
  const iframeHtml = `<iframe src="${url}" width="100%" height="600px" style="border: none;"></iframe>`;
  
  return (
    <div 
      className="w-full h-full"
      dangerouslySetInnerHTML={{ __html: iframeHtml }}
    />
  );
};

export const processPdfFile = (url: string): string => {
  return `<iframe src="${url}" width="100%" height="600px" style="border: none;"></iframe>`;
};
