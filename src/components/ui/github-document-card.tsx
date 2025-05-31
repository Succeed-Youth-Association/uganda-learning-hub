
import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Eye, Download, FileText, MessageCircle, Loader2, Check } from 'lucide-react';
import { GitHubDocument } from '../../utils/githubLoader';
import { getFileExtension } from '../../utils/fileUtils';

interface GitHubDocumentCardProps {
  document: GitHubDocument;
  resourceType: string;
  classTitle: string;
  onPreview: (document: GitHubDocument) => void;
  onDownload: (document: GitHubDocument) => void;
}

const GitHubDocumentCard: React.FC<GitHubDocumentCardProps> = ({
  document,
  resourceType,
  classTitle,
  onPreview,
  onDownload
}) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'success'>('idle');

  const handleDownload = async () => {
    if (downloadState !== 'idle') return;
    
    setDownloadState('downloading');
    try {
      await onDownload(document);
      setDownloadState('success');
      setTimeout(() => setDownloadState('idle'), 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadState('idle');
    }
  };

  const handleWhatsAppShare = () => {
    const encodedUrl = encodeURI(document.download_url);
    const message = `Hello, I found this educational document named ${document.name} useful so I decided to share it with you. \n\n Click this link to view it:${encodedUrl}\n\n For more resources like this, go to Google and search for *Fresh Teacher's Library*.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getDownloadButtonContent = () => {
    switch (downloadState) {
      case 'downloading':
        return (
          <>
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            Downloading...
          </>
        );
      case 'success':
        return (
          <>
            <Check className="h-4 w-4 mr-1" />
            Downloaded!
          </>
        );
      default:
        return (
          <>
            <Download className="h-4 w-4 mr-1" />
            Download
          </>
        );
    }
  };

  const getDownloadButtonStyle = () => {
    switch (downloadState) {
      case 'downloading':
        return "w-full bg-orange-400 hover:bg-orange-400 cursor-not-allowed";
      case 'success':
        return "w-full bg-green-600 hover:bg-green-600";
      default:
        return "w-full bg-orange-600 hover:bg-orange-700";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 p-4 lg:p-6 border min-w-0">
      <div className="flex items-start justify-between mb-4">
        <FileText className="h-8 w-8 text-orange-600 flex-shrink-0" />
        <span className="text-xs text-muted-foreground">{getFileExtension(document.name)}</span>
      </div>
      
      <h3 className="text-base lg:text-lg font-semibold text-card-foreground mb-2 line-clamp-2 break-words">
        {document.name.replace('.pdf', '')}
      </h3>
      
      <div className="space-y-1 mb-4">
        <p className="text-sm text-muted-foreground break-words">Subject: All Subjects</p>
        <p className="text-sm text-muted-foreground">Type: {resourceType}</p>
        <p className="text-sm text-muted-foreground">Class: {classTitle}</p>
        <p className="text-sm text-muted-foreground">Size: {formatFileSize(document.size)}</p>
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
          onClick={handleDownload}
          size="sm"
          className={getDownloadButtonStyle()}
          disabled={downloadState === 'downloading'}
        >
          {getDownloadButtonContent()}
        </Button>
        <Button
          onClick={handleWhatsAppShare}
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

export default GitHubDocumentCard;
