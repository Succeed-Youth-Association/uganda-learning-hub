
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

// File type mapping for icons and colors
const FILE_TYPE_CONFIG = {
  'pdf': { icon: FileText, color: '#e74c3c', label: 'PDF' },
  'doc': { icon: FileText, color: '#2b579a', label: 'Word' },
  'docx': { icon: FileText, color: '#2b579a', label: 'Word' },
  'xls': { icon: FileText, color: '#217346', label: 'Excel' },
  'xlsx': { icon: FileText, color: '#217346', label: 'Excel' },
  'ppt': { icon: FileText, color: '#d24726', label: 'PowerPoint' },
  'pptx': { icon: FileText, color: '#d24726', label: 'PowerPoint' },
  'jpg': { icon: FileImage, color: '#9b59b6', label: 'Image' },
  'jpeg': { icon: FileImage, color: '#9b59b6', label: 'Image' },
  'png': { icon: FileImage, color: '#9b59b6', label: 'Image' },
  'gif': { icon: FileImage, color: '#9b59b6', label: 'Image' },
  'txt': { icon: File, color: '#7f8c8d', label: 'Text' },
  'default': { icon: File, color: '#95a5a6', label: 'File' }
};

const FILE_TYPE_CATEGORIES = {
  'pdf': ['pdf'],
  'doc': ['doc', 'docx'],
  'xls': ['xls', 'xlsx'],
  'ppt': ['ppt', 'pptx'],
  'image': ['jpg', 'jpeg', 'png', 'gif'],
  'other': ['txt']
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

  const getFileInfo = (filename: string) => {
    const extension = getFileExtension(filename).toLowerCase().replace('.', '');
    const config = FILE_TYPE_CONFIG[extension] || FILE_TYPE_CONFIG['default'];
    return {
      extension,
      icon: config.icon,
      color: config.color,
      label: config.label,
      category: getFileCategory(extension)
    };
  };

  const getFileCategory = (extension: string): string => {
    for (const [category, exts] of Object.entries(FILE_TYPE_CATEGORIES)) {
      if (exts.includes(extension)) {
        return category;
      }
    }
    return 'other';
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

  const filteredDocuments = useMemo(() => {
    let filtered = documents.filter(doc => {
      const name = isGitHub ? (doc as GitHubDocument).name : extractFileName((doc as ResourceDocument).pdfUrl);
      return matchesSearch(name, searchTerm);
    });

    if (fileTypeFilter !== 'all') {
      filtered = filtered.filter(doc => {
        const name = isGitHub ? (doc as GitHubDocument).name : extractFileName((doc as ResourceDocument).pdfUrl);
        const fileCategory = getFileInfo(name).category;
        return fileTypeFilter === fileCategory;
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
            const fileInfo = getFileInfo(name);
            const formattedName = formatFileName(name);
            const IconComponent = fileInfo.icon;
            const size = isGitHub ? (document as GitHubDocument).size : undefined;

            return (
              <Card 
                key={`doc-${index}`} 
                className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 p-4 lg:p-6 border"
              >
                <div className="flex items-start justify-between mb-4">
                  <IconComponent 
                    className="h-8 w-8 flex-shrink-0 transition-transform hover:scale-110" 
                    style={{ color: fileInfo.color }}
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {fileInfo.label}
                  </span>
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
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredDocuments.length)} of {filteredDocuments.length} items
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + Math.max(1, currentPage - 2);
              if (page > totalPages) return null;
              
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="min-w-[2rem]"
                >
                  {page}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDocumentList;
