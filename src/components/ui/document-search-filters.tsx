
import React from 'react';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Label } from './label';
import { Search } from 'lucide-react';

interface DocumentSearchFiltersProps {
  searchTerm: string;
  fileTypeFilter: string;
  onSearchChange: (value: string) => void;
  onFileTypeChange: (value: string) => void;
}

const DocumentSearchFilters: React.FC<DocumentSearchFiltersProps> = ({
  searchTerm,
  fileTypeFilter,
  onSearchChange,
  onFileTypeChange
}) => {
  return (
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
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
