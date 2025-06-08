
import React from 'react';
import { Button } from './button';
import { Card } from './card';
import { Eye, Download } from 'lucide-react';
import { ResourceDocument } from '../../utils/dataLoader';
import { GitHubDocument } from '../../utils/githubLoader';
import { extractFileName, getFileExtension } from '../../utils/fileUtils';
import { FILE_TYPE_CONFIG } from '../../utils/fileTypeConfig';
import FileTypeIcon from './file-type-icon';

interface EnhancedDocumentCardProps {
  document: ResourceDocument | GitHubDocument;
  isGitHub: boolean;
  selectedSubject: string;
  resourceType: string;
  classTitle: string;
  size?: number;
  onPreview: (document: ResourceDocument | GitHubDocument) => void;
  onDownload: (document: ResourceDocument | GitHubDocument) => void;
  onWhatsAppShare: (document: ResourceDocument | GitHubDocument) => void;
}

const EnhancedDocumentCard: React.FC<EnhancedDocumentCardProps> = ({
  document,
  isGitHub,
  selectedSubject,
  resourceType,
  classTitle,
  size,
  onPreview,
  onDownload,
  onWhatsAppShare
}) => {
  const name = isGitHub ? (document as GitHubDocument).name : extractFileName((document as ResourceDocument).pdfUrl);
  
  const getFileInfo = () => {
    if (isGitHub) {
      const filename = (document as GitHubDocument).name;
      const extension = getFileExtension(filename).toLowerCase().replace('.', '');
      const config = FILE_TYPE_CONFIG[extension] || FILE_TYPE_CONFIG['default'];
      return {
        extension,
        label: config.label,
        category: config.category
      };
    } else {
      const pdfUrl = (document as ResourceDocument).pdfUrl;
      const extension = getFileExtension(pdfUrl).toLowerCase().replace('.', '');
      const config = FILE_TYPE_CONFIG[extension] || FILE_TYPE_CONFIG['default'];
      return {
        extension,
        label: config.label,
        category: config.category
      };
    }
  };

  const formatFileName = (filename: string): string => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    return nameWithoutExt.replace(/[-_]/g, " ").toUpperCase();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const fileInfo = getFileInfo();
  const formattedName = formatFileName(name);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 p-4 lg:p-6 border">
      <div className="flex items-start justify-between mb-4">
        <FileTypeIcon 
          type={fileInfo.extension}
          className="transition-transform hover:scale-110" 
        />
      </div>
      
      <h3 className="text-base lg:text-lg font-semibold text-card-foreground mb-3 line-clamp-2 break-words">
        {formattedName}
      </h3>
      
      <div className="space-y-1 mb-4 text-sm text-muted-foreground">
        <div><span className="font-medium">Subject:</span> {selectedSubject}</div>
        <div><span className="font-medium">Type:</span> {resourceType}</div>
        <div><span className="font-medium">Class:</span> {classTitle}</div>
        <div><span className="font-medium">Format:</span> {fileInfo.extension.toUpperCase()}</div>
        {size && <div><span className="font-medium">Size:</span> {formatFileSize(size)}</div>}
      </div>

      <div className="flex flex-col gap-2">
        {/* Only show preview for PDF files */}
        {fileInfo.extension === 'pdf' && (
          <Button
            onClick={() => onPreview(document)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
        )}
        <Button
          onClick={() => onDownload(document)}
          size="sm"
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
        <Button
          onClick={() => onWhatsAppShare(document)}
          variant="outline"
          size="sm"
          className="w-full text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
        >
          <div className="flex items-center">
            <svg 
              className="h-4 w-4 mr-1" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z"/>
            </svg>
            Share on WhatsApp
          </div>
        </Button>
      </div>
    </Card>
  );
};

export default EnhancedDocumentCard;
