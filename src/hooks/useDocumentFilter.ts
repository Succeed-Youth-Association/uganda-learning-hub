
import { useMemo } from 'react';
import { ResourceDocument } from '../utils/dataLoader';
import { GitHubDocument } from '../utils/githubLoader';
import { extractFileName, getFileExtension } from '../utils/fileUtils';
import { FILE_TYPE_CONFIG } from '../utils/fileTypeConfig';

export const useDocumentFilter = (
  documents: (ResourceDocument | GitHubDocument)[],
  searchTerm: string,
  fileTypeFilter: string,
  isGitHub: boolean
) => {
  const getFileInfo = (document: ResourceDocument | GitHubDocument) => {
    if (isGitHub) {
      const filename = (document as GitHubDocument).name;
      const extension = getFileExtension(filename).toLowerCase().replace('.', '');
      const config = FILE_TYPE_CONFIG[extension] || FILE_TYPE_CONFIG['default'];
      return {
        extension,
        label: config.label,
        category: config.category
      };
    } else {
      const pdfUrl = (document as ResourceDocument).pdfUrl;
      const extension = getFileExtension(pdfUrl).toLowerCase().replace('.', '');
      const config = FILE_TYPE_CONFIG[extension] || FILE_TYPE_CONFIG['default'];
      return {
        extension,
        label: config.label,
        category: config.category
      };
    }
  };

  const matchesSearch = (text: string, searchTerm: string): boolean => {
    if (!searchTerm.trim()) return true;
    
    const textLower = text.toLowerCase();
    const searchWords = searchTerm.toLowerCase().split(/\s+/);
    
    const commonWords = ['past', 'papers', 'exam', 'examination', 'test', 'question', 'lesson', 'notes'];
    const filteredSearchWords = searchWords.filter(word => 
      word.length > 2 && !commonWords.includes(word)
    );
    
    if (filteredSearchWords.length === 0) return true;
    
    const textParts = textLower.split(/[\s\-_\.]+/);
    
    return filteredSearchWords.some(searchWord => {
      if (textLower.includes(searchWord)) return true;
      if (textParts.some(part => part.startsWith(searchWord))) return true;
      if (textParts.some(part => searchWord.startsWith(part))) return true;
      
      const numberMap = {
        '1': 'one', '2': 'two', '3': 'three', '4': 'four',
        '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine'
      };
      const searchWithNumbersReplaced = searchWord.replace(
        /[1-9]/g, match => numberMap[match] || match
      );
      return textLower.includes(searchWithNumbersReplaced);
    });
  };

  const filteredDocuments = useMemo(() => {
    let filtered = documents.filter(doc => {
      const name = isGitHub ? (doc as GitHubDocument).name : extractFileName((doc as ResourceDocument).pdfUrl);
      return matchesSearch(name, searchTerm);
    });

    if (fileTypeFilter !== 'all') {
      filtered = filtered.filter(doc => {
        const fileInfo = getFileInfo(doc);
        return fileTypeFilter === fileInfo.category;
      });
    }

    return filtered;
  }, [documents, searchTerm, fileTypeFilter, isGitHub]);

  return filteredDocuments;
};
