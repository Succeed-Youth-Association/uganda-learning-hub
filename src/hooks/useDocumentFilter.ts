
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

  // GitHub-like search: simple case-insensitive substring matching
  const matchesSearch = (filename: string, searchTerm: string): boolean => {
    if (!searchTerm.trim()) return true;
    
    const normalizedFilename = filename.toLowerCase();
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    // Split search term by spaces and check if all words are found in filename
    const searchWords = normalizedSearchTerm.split(/\s+/);
    
    return searchWords.every(word => normalizedFilename.includes(word));
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
