
import { useState } from 'react';

export const useFlipBookViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  const openFlipBook = (url: string) => {
    setPdfUrl(url);
    setIsOpen(true);
  };

  const closeFlipBook = () => {
    setIsOpen(false);
    setPdfUrl('');
  };

  return {
    isOpen,
    pdfUrl,
    openFlipBook,
    closeFlipBook
  };
};
