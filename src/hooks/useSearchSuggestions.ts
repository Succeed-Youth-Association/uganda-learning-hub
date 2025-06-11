
import { useState, useEffect, useRef } from 'react';
import { ResourceDocument } from '../utils/dataLoader';
import { GitHubDocument } from '../utils/githubLoader';

export const useSearchSuggestions = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow for clicks on suggestions
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const hideSuggestions = () => {
    setShowSuggestions(false);
  };

  return {
    showSuggestions,
    searchContainerRef,
    handleSearchFocus,
    handleSearchBlur,
    hideSuggestions
  };
};
