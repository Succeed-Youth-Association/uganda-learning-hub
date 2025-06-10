
import { useMemo } from 'react';
import { ResourceDocument } from '../utils/dataLoader';
import { GitHubDocument } from '../utils/githubLoader';
import { extractFileName } from '../utils/fileUtils';

export const useSearchSuggestions = (
  documents: (ResourceDocument | GitHubDocument)[],
  searchTerm: string,
  isGitHub: boolean
) => {
  const suggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) {
      return [];
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    // Extract unique words from all document names
    const allWords = new Set<string>();
    
    documents.forEach(doc => {
      const name = isGitHub ? (doc as GitHubDocument).name : extractFileName((doc as ResourceDocument).pdfUrl);
      const words = name.toLowerCase()
        .replace(/[^\w\s]/g, ' ') // Replace special chars with spaces
        .split(/\s+/)
        .filter(word => word.length > 2); // Only words longer than 2 chars
      
      words.forEach(word => allWords.add(word));
    });

    // Find words that start with the search term or contain it
    const matchingWords = Array.from(allWords)
      .filter(word => 
        word.includes(normalizedSearchTerm) && 
        word !== normalizedSearchTerm
      )
      .sort((a, b) => {
        // Prioritize words that start with the search term
        const aStarts = a.startsWith(normalizedSearchTerm);
        const bStarts = b.startsWith(normalizedSearchTerm);
        
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        // Then sort by length (shorter first)
        return a.length - b.length;
      })
      .slice(0, 5); // Limit to 5 suggestions

    return matchingWords;
  }, [documents, searchTerm, isGitHub]);

  return suggestions;
};
