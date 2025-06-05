
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface PDFViewerHeaderProps {
  title: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const PDFViewerHeader: React.FC<PDFViewerHeaderProps> = ({
  title,
  searchTerm,
  onSearchChange
}) => {
  return (
    <>
      {/* Header */}
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-8">
        {title}
      </h1>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for content here..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </>
  );
};

export default PDFViewerHeader;
