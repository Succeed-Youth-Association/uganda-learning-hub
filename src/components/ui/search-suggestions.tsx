
import React from 'react';
import { Button } from './button';
import { Search } from 'lucide-react';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  isVisible: boolean;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSuggestionClick,
  isVisible
}) => {
  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="ghost"
          className="w-full justify-start text-left px-3 py-2 text-sm hover:bg-muted"
          onClick={() => onSuggestionClick(suggestion)}
        >
          <Search className="h-3 w-3 mr-2 text-muted-foreground" />
          {suggestion}
        </Button>
      ))}
    </div>
  );
};

export default SearchSuggestions;
