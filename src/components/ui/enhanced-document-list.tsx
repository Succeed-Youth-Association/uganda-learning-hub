
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ResourceDocument } from '../../utils/dataLoader';
import { GitHubDocument } from '../../utils/githubLoader';
import PaginationWithJump from '../PaginationWithJump';
import DocumentSearchFilters from './document-search-filters';
import EnhancedDocumentCard from './enhanced-document-card';
import DocumentEmptyState from './document-empty-state';
import { useDocumentFilter } from '../../hooks/useDocumentFilter';
import { useDocumentOperations } from '../../hooks/useDocumentOperations';

interface EnhancedDocumentListProps {
  documents: (ResourceDocument | GitHubDocument)[];
  loading: boolean;
  currentPage: number;
  onPreview: (document: ResourceDocument | GitHubDocument) => void;
  onDownload: (document: ResourceDocument | GitHubDocument) => void;
  onPageChange: (page: number) => void;
  isGitHub?: boolean;
  resourceType: string;
  classTitle: string;
  selectedSubject: string;
}

const EnhancedDocumentList: React.FC<EnhancedDocumentListProps> = ({
  documents,
  loading,
  currentPage,
  onPreview,
  onDownload,
  onPageChange,
  isGitHub = false,
  resourceType,
  classTitle,
  selectedSubject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [documentSizes, setDocumentSizes] = useState<Record<string, number>>({});
  const itemsPerPage = 20;

  const { handleWhatsAppShare } = useDocumentOperations();
  const filteredDocuments = useDocumentFilter(documents, searchTerm, fileTypeFilter, isGitHub);

  // Fetch file sizes for non-GitHub documents
  useEffect(() => {
    const fetchFileSizes = async () => {
      if (isGitHub) return;

      const sizes: Record<string, number> = {};
      
      for (const document of documents) {
        const pdfUrl = (document as ResourceDocument).pdfUrl;
        try {
          const response = await fetch(pdfUrl, { method: 'HEAD' });
          const contentLength = response.headers.get('content-length');
          if (contentLength) {
            sizes[pdfUrl] = parseInt(contentLength, 10);
          }
        } catch (error) {
          console.error(`Failed to fetch size for ${pdfUrl}:`, error);
        }
      }
      
      setDocumentSizes(sizes);
    };

    if (!isGitHub && documents.length > 0) {
      fetchFileSizes();
    }
  }, [documents, isGitHub]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  }, [searchTerm, fileTypeFilter]);

  const handlePageChangeInternal = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <DocumentSearchFilters
        searchTerm={searchTerm}
        fileTypeFilter={fileTypeFilter}
        onSearchChange={setSearchTerm}
        onFileTypeChange={setFileTypeFilter}
        documents={documents}
        isGitHub={isGitHub}
      />

      {/* Documents Grid */}
      {currentDocuments.length === 0 ? (
        <DocumentEmptyState
          searchTerm={searchTerm}
          fileTypeFilter={fileTypeFilter}
          resourceType={resourceType}
          selectedSubject={selectedSubject}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {currentDocuments.map((document, index) => {
            const size = isGitHub 
              ? (document as GitHubDocument).size 
              : documentSizes[(document as ResourceDocument).pdfUrl];

            return (
              <EnhancedDocumentCard
                key={`doc-${index}`}
                document={document}
                isGitHub={isGitHub}
                selectedSubject={selectedSubject}
                resourceType={resourceType}
                classTitle={classTitle}
                size={size}
                onPreview={onPreview}
                onDownload={onDownload}
                onWhatsAppShare={(doc) => handleWhatsAppShare(doc, isGitHub)}
              />
            );
          })}
        </div>
      )}

      {/* Pagination with Jump */}
      {totalPages > 1 && (
        <PaginationWithJump
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChangeInternal}
          className="pt-6"
        />
      )}
    </div>
  );
};

export default EnhancedDocumentList;
