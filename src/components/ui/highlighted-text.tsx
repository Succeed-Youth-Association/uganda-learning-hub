
import React from 'react';

interface HighlightedTextProps {
  text: string;
  searchTerm: string;
  className?: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, searchTerm, className = "" }) => {
  if (!searchTerm.trim()) {
    return <span className={className}>{text}</span>;
  }

  const normalizedText = text.toLowerCase();
  const normalizedSearchTerm = searchTerm.toLowerCase().trim();
  
  // Split search term by spaces to handle multiple words
  const searchWords = normalizedSearchTerm.split(/\s+/).filter(word => word.length > 0);
  
  if (searchWords.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Create a regex pattern that matches any of the search words
  const pattern = searchWords.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  
  const parts = text.split(regex);
  
  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isMatch = searchWords.some(word => 
          part.toLowerCase() === word.toLowerCase()
        );
        
        return isMatch ? (
          <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};

export default HighlightedText;
