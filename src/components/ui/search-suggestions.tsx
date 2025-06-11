
import React from 'react';
import { ResourceDocument } from '../../utils/dataLoader';
import { GitHubDocument } from '../../utils/githubLoader';
import { extractFileName } from '../../utils/fileUtils';
import HighlightedText from './highlighted-text';
import { Card } from './card';
import { FileText } from 'lucide-react';

interface SearchSuggestionsProps {
  documents: (ResourceDocument | GitHubDocument)[];
  searchTerm: string;
  isGitHub: boolean;
  onDocumentClick: (document: ResourceDocument | GitHubDocument) => void;
  maxSuggestions?: number;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  documents,
  searchTerm,
  isGitHub,
  onDocumentClick,
  maxSuggestions = 5
}) => {
  if (!searchTerm.trim() || documents.length === 0) {
    return null;
  }

  const displayedDocuments = documents.slice(0, maxSuggestions);

  return (
    <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto bg-background border shadow-lg">
      <div className="p-2">
        <div className="text-xs text-muted-foreground mb-2 px-2">
          Showing {displayedDocuments.length} of {documents.length} matching documents
        </div>
        {displayedDocuments.map((document, index) => {
          const name = isGitHub 
            ? (document as GitHubDocument).name 
            : extractFileName((document as ResourceDocument).pdfUrl);
          
          return (
            <div
              key={`suggestion-${index}`}
              className="flex items-center gap-3 p-2 hover:bg-muted rounded cursor-pointer"
              onClick={() => onDocumentClick(document)}
            >
              <FileText className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium break-words">
                  <HighlightedText text={name} searchTerm={searchTerm} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SearchSuggestions;
