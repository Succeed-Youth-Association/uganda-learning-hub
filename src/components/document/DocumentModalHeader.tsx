
import React from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { FileTypeIcon } from '../ui/file-type-icon';
import { FileType } from '../../types/document';

interface DocumentModalHeaderProps {
  documentTitle: string;
  fileType: FileType;
  onDownload: () => void;
  onClose: () => void;
}

export const DocumentModalHeader: React.FC<DocumentModalHeaderProps> = ({
  documentTitle,
  fileType,
  onDownload,
  onClose
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <FileTypeIcon fileType={fileType} />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{documentTitle}</h2>
          <p className="text-sm text-gray-600">{fileType.toUpperCase()} Document</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={onDownload}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button
          onClick={onClose}
          variant="outline"
          size="sm"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
