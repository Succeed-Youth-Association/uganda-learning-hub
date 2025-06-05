
import React from 'react';
import { X, RotateCw, Printer, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { Button } from '../ui/button';

interface PDFModalToolbarProps {
  displayFileName: string;
  showThumbnails: boolean;
  onClose: () => void;
  onToggleThumbnails: () => void;
  onRotate: () => void;
  onPrint: () => void;
}

const PDFModalToolbar: React.FC<PDFModalToolbarProps> = ({
  displayFileName,
  showThumbnails,
  onClose,
  onToggleThumbnails,
  onRotate,
  onPrint
}) => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-800 text-white">
      <div className="flex items-center">
        <Button
          onClick={onToggleThumbnails}
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-gray-700 mr-2"
        >
          {showThumbnails ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
        
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <h1 className="text-sm font-medium truncate max-w-[50vw] md:max-w-md mx-2">
        {displayFileName}
      </h1>
      
      <div className="flex items-center space-x-2">
        <Button
          onClick={onRotate}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-700"
        >
          <RotateCw className="h-5 w-5" />
        </Button>
        
        <Button
          onClick={onPrint}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-700 bg-blue-600 hover:bg-blue-700"
        >
          <Printer className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PDFModalToolbar;
