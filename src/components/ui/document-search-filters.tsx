
import React, { useState, useRef, useEffect } from 'react';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Label } from './label';
import { Search } from 'lucide-react';
import SearchSuggestions from './search-suggestions';
import { useSearchSuggestions } from '../../hooks/useSearchSuggestions';
import { ResourceDocument } from '../../utils/dataLoader';
import { GitHubDocument } from '../../utils/githubLoader';

interface DocumentSearchFiltersProps {
  searchTerm: string;
  fileTypeFilter: string;
  onSearchChange: (value: string) => void;
  onFileTypeChange: (value: string) => void;
  documents?: (ResourceDocument | GitHubDocument)[];
  isGitHub?: boolean;
}

const DocumentSearchFilters: React.FC<DocumentSearchFiltersProps> = ({
  searchTerm,
  fileTypeFilter,
  onSearchChange,
  onFileTypeChange,
  documents = [],
  isGitHub = false
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useSearchSuggestions(documents, searchTerm, isGitHub);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    onSearchChange(value);
    setShowSuggestions(value.length >= 2);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (searchTerm.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const shouldShowSuggestions = showSuggestions && isFocused && suggestions.length > 0;

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Label htmlFor="search">Search Documents</Label>
        <div className="relative" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            ref={inputRef}
            id="search"
            type="text"
            placeholder="Search by document name..."
            value={searchTerm}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleInputFocus}
            className="pl-10"
            autoComplete="off"
          />
          <SearchSuggestions
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            isVisible={shouldShowSuggestions}
          />
        </div>
      </div>
      <div className="sm:w-48">
        <Label htmlFor="file-type">Filter by File Type</Label>
        <Select value={fileTypeFilter} onValueChange={onFileTypeChange}>
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
  );
};

export default DocumentSearchFilters;
