
import React from 'react';
import { FileText } from 'lucide-react';

interface DocumentEmptyStateProps {
  searchTerm: string;
  fileTypeFilter: string;
  resourceType: string;
  selectedSubject: string;
}

const DocumentEmptyState: React.FC<DocumentEmptyStateProps> = ({
  searchTerm,
  fileTypeFilter,
  resourceType,
  selectedSubject
}) => {
  return (
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
  );
};

export default DocumentEmptyState;
