
import React, { useState, useMemo, useEffect } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Label } from './label';
import { Card } from './card';
import { FileText, File, FileImage, Search, Loader2 } from 'lucide-react';
import { extractFileName, getFileExtension } from '../../utils/fileUtils';
import { ResourceDocument } from '../../utils/dataLoader';
import { GitHubDocument } from '../../utils/githubLoader';
import PaginationWithJump from '../PaginationWithJump';

interface EnhancedDocumentListProps {
  documents: (ResourceDocument | GitHubDocument)[];
  loading: boolean;
  onPreview: (document: ResourceDocument | GitHubDocument) => void;
  onDownload: (document: ResourceDocument | GitHubDocument) => void;
  isGitHub?: boolean;
  resourceType: string;
  classTitle: string;
  selectedSubject: string;
}

// Custom SVG icons for file types with realistic colors
const FileTypeIcon = ({ type, className }: { type: string; className?: string }) => {
  const baseClass = `w-8 h-8 ${className}`;
  
  switch (type) {
    case 'pdf':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#e74c3c" stroke="#c0392b" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#e74c3c"/>
          <path d="M12 2v5h5" fill="none" stroke="#c0392b" strokeWidth="1"/>
          <text x="12" y="16" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">PDF</text>
        </svg>
      );
    case 'doc':
    case 'docx':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#2b579a" stroke="#1e4e8c" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#2b579a"/>
          <path d="M12 2v5h5" fill="none" stroke="#1e4e8c" strokeWidth="1"/>
          <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">W</text>
        </svg>
      );
    case 'xls':
    case 'xlsx':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#217346" stroke="#1a6339" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#217346"/>
          <path d="M12 2v5h5" fill="none" stroke="#1a6339" strokeWidth="1"/>
          <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">X</text>
        </svg>
      );
    case 'ppt':
    case 'pptx':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#d24726" stroke="#b33d1e" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#d24726"/>
          <path d="M12 2v5h5" fill="none" stroke="#b33d1e" strokeWidth="1"/>
          <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">P</text>
        </svg>
      );
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#9b59b6" stroke="#8e44ad" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#9b59b6"/>
          <path d="M12 2v5h5" fill="none" stroke="#8e44ad" strokeWidth="1"/>
          <circle cx="9" cy="10" r="1" fill="white"/>
          <path d="M8 14l2-2 3 3 2-2 2 2v2H8v-3z" fill="white"/>
        </svg>
      );
    case 'txt':
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#7f8c8d" stroke="#6c7a7b" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#7f8c8d"/>
          <path d="M12 2v5h5" fill="none" stroke="#6c7a7b" strokeWidth="1"/>
          <path d="M7 10h6M7 12h6M7 14h4" stroke="white" strokeWidth="1"/>
        </svg>
      );
    default:
      return (
        <svg className={baseClass} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="14" height="20" rx="2" fill="#95a5a6" stroke="#7f8c8d" strokeWidth="1"/>
          <path d="M17 7L12 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" fill="#95a5a6"/>
          <path d="M12 2v5h5" fill="none" stroke="#7f8c8d" strokeWidth="1"/>
        </svg>
      );
  }
};

// File type mapping for categories and labels
const FILE_TYPE_CONFIG = {
  'pdf': { label: 'PDF', category: 'pdf' },
  'doc': { label: 'Word', category: 'doc' },
  'docx': { label: 'Word', category: 'doc' },
  'xls': { label: 'Excel', category: 'xls' },
  'xlsx': { label: 'Excel', category: 'xls' },
  'ppt': { label: 'PowerPoint', category: 'ppt' },
  'pptx': { label: 'PowerPoint', category: 'ppt' },
  'jpg': { label: 'Image', category: 'image' },
  'jpeg': { label: 'Image', category: 'image' },
  'png': { label: 'Image', category: 'image' },
  'gif': { label: 'Image', category: 'image' },
  'txt': { label: 'Text', category: 'other' },
  'default': { label: 'File', category: 'other' }
};

const EnhancedDocumentList: React.FC<EnhancedDocumentListProps> = ({
  documents,
  loading,
  onPreview,
  onDownload,
  isGitHub = false,
  resourceType,
  classTitle,
  selectedSubject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const getFileInfo = (document: ResourceDocument | GitHubDocument) => {
    // For GitHub documents, use the name property
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
      // For JSON documents, extract extension from pdfUrl
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

  const matchesSearch = (text: string, searchTerm: string): boolean => {
    if (!searchTerm.trim()) return true;
    
    const textLower = text.toLowerCase();
    const searchWords = searchTerm.toLowerCase().split(/\s+/);
    
    const commonWords = ['past', 'papers', 'exam', 'examination', 'test', 'question', 'lesson', 'notes'];
    const filteredSearchWords = searchWords.filter(word => 
      word.length > 2 && !commonWords.includes(word)
    );
    
    if (filteredSearchWords.length === 0) return true;
    
    const textParts = textLower.split(/[\s\-_\.]+/);
    
    return filteredSearchWords.some(searchWord => {
      if (textLower.includes(searchWord)) return true;
      if (textParts.some(part => part.startsWith(searchWord))) return true;
      if (textParts.some(part => searchWord.startsWith(part))) return true;
      
      const numberMap = {
        '1': 'one', '2': 'two', '3': 'three', '4': 'four',
        '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine'
      };
      const searchWithNumbersReplaced = searchWord.replace(
        /[1-9]/g, match => numberMap[match] || match
      );
      return textLower.includes(searchWithNumbersReplaced);
    });
  };

  const handleWhatsAppShare = (document: ResourceDocument | GitHubDocument) => {
    const name = isGitHub ? (document as GitHubDocument).name : extractFileName((document as ResourceDocument).pdfUrl);
    const url = isGitHub ? (document as GitHubDocument).download_url : (document as ResourceDocument).pdfUrl;
    const encodedUrl = encodeURI(url);
    const message = `Hello, I found this educational document named ${name} useful so I decided to share it with you. \n\n Click this link to view it: ${encodedUrl}\n\n For more resources like this, go to Google and search for *Fresh Teacher's Library*.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredDocuments = useMemo(() => {
    let filtered = documents.filter(doc => {
      const name = isGitHub ? (doc as GitHubDocument).name : extractFileName((doc as ResourceDocument).pdfUrl);
      return matchesSearch(name, searchTerm);
    });

    if (fileTypeFilter !== 'all') {
      filtered = filtered.filter(doc => {
        const fileInfo = getFileInfo(doc);
        return fileTypeFilter === fileInfo.category;
      });
    }

    return filtered;
  }, [documents, searchTerm, fileTypeFilter, isGitHub]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, fileTypeFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        <span className="ml-2 text-lg text-muted-foreground">Loading documents...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search">Search Documents</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="search"
              type="text"
              placeholder="Search by document name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <Label htmlFor="file-type">Filter by File Type</Label>
          <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All File Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All File Types</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="doc">Word Documents</SelectItem>
              <SelectItem value="xls">Excel Files</SelectItem>
              <SelectItem value="ppt">PowerPoint Files</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Documents Grid */}
      {currentDocuments.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">No documents found</h3>
          <p className="text-muted-foreground">
            {searchTerm || fileTypeFilter !== 'all'
              ? "No documents match your search criteria"
              : `No ${resourceType.toLowerCase()} available for ${selectedSubject}`
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {currentDocuments.map((document, index) => {
            const name = isGitHub ? (document as GitHubDocument).name : extractFileName((document as ResourceDocument).pdfUrl);
            const fileInfo = getFileInfo(document);
            const formattedName = formatFileName(name);
            const size = isGitHub ? (document as GitHubDocument).size : undefined;

            return (
              <Card 
                key={`doc-${index}`} 
                className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 p-4 lg:p-6 border"
              >
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
                  <Button
                    onClick={() => onPreview(document)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    {fileInfo.extension === 'pdf' ? 'View PDF' : 'Preview'}
                  </Button>
                  <Button
                    onClick={() => onDownload(document)}
                    size="sm"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    Download
                  </Button>
                  <Button
                    onClick={() => handleWhatsAppShare(document)}
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
          })}
        </div>
      )}

      {/* Pagination with Jump */}
      {totalPages > 1 && (
        <PaginationWithJump
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="pt-6"
        />
      )}
    </div>
  );
};

export default EnhancedDocumentList;