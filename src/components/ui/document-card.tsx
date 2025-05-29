
import React from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Eye, Download, FileText, MessageCircle } from 'lucide-react';
import { extractFileName, getFileExtension } from '../../utils/fileUtils';
import { ResourceDocument } from '../../utils/dataLoader';

interface DocumentCardProps {
  document: ResourceDocument;
  subject: string;
  resourceType: string;
  classTitle: string;
  onPreview: (document: ResourceDocument) => void;
  onDownload: (document: ResourceDocument) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  subject,
  resourceType,
  classTitle,
  onPreview,
  onDownload
}) => {
  const handleWhatsAppShare = () => {
    const fileName = extractFileName(document.pdfUrl);
    const message = `Check out this ${resourceType} for ${subject} (${classTitle}): ${fileName}\n\nDownload: ${document.pdfUrl}\n\nShared from Fresh Teacher's Library`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 p-4 lg:p-6 border min-w-0">
      <div className="flex items-start justify-between mb-4">
        <FileText className="h-8 w-8 text-orange-600 flex-shrink-0" />
        <span className="text-xs text-muted-foreground">{getFileExtension(document.pdfUrl)}</span>
      </div>
      
      <h3 className="text-base lg:text-lg font-semibold text-card-foreground mb-2 line-clamp-2 break-words">
        {extractFileName(document.pdfUrl)}
      </h3>
      
      <div className="space-y-1 mb-4">
        <p className="text-sm text-muted-foreground break-words">Subject: {subject}</p>
        <p className="text-sm text-muted-foreground">Type: {resourceType}</p>
        <p className="text-sm text-muted-foreground">Class: {classTitle}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          onClick={() => onPreview(document)}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>
        <Button
          onClick={() => onDownload(document)}
          size="sm"
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
        <Button
          onClick={handleWhatsAppShare}
          variant="outline"
          size="sm"
          className="w-full text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          Share on WhatsApp
        </Button>
      </div>
    </Card>
  );
};

export default DocumentCard;
