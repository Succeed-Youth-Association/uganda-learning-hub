
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Search, FileText, File, Image, Download, Eye, ArrowUp, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from './layout/PageLayout';
import PaginationWithJump from './PaginationWithJump';

interface GitHubFile {
  name: string;
  download_url: string;
  type: string;
  path: string;
}

interface GitHubRepositoryViewerProps {
  repoUrl: string;
  title: string;
  description: string;
  backTo: string;
  backUrl: string;
}

const GitHubRepositoryViewer: React.FC<GitHubRepositoryViewerProps> = ({
  repoUrl,
  title,
  description,
  backTo,
  backUrl
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allFiles, setAllFiles] = useState<GitHubFile[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const itemsPerPage = 20;

  // File type mappings
  const fileTypeIcons = {
    'pdf': FileText,
    'doc': FileText,
    'docx': FileText,
    'xls': FileText,
    'xlsx': FileText,
    'ppt': FileText,
    'pptx': FileText,
    'jpg': Image,
    'jpeg': Image,
    'png': Image,
    'gif': Image,
    'txt': File,
    'default': File
  };

  const fileTypeCategories = {
    'pdf': ['pdf'],
    'doc': ['doc', 'docx'],
    'xls': ['xls', 'xlsx'],
    'ppt': ['ppt', 'pptx'],
    'image': ['jpg', 'jpeg', 'png', 'gif'],
    'other': ['txt']
  };

  const fileTypeColors = {
    'pdf': 'text-red-600',
    'doc': 'text-blue-600',
    'docx': 'text-blue-600',
    'xls': 'text-green-600',
    'xlsx': 'text-green-600',
    'ppt': 'text-orange-600',
    'pptx': 'text-orange-600',
    'jpg': 'text-purple-600',
    'jpeg': 'text-purple-600',
    'png': 'text-purple-600',
    'gif': 'text-purple-600',
    'txt': 'text-gray-600',
    'default': 'text-gray-500'
  };

  // Get file extension and type
  const getFileType = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    return {
      extension,
      icon: fileTypeIcons[extension as keyof typeof fileTypeIcons] || fileTypeIcons['default'],
      category: getFileCategory(extension),
      color: fileTypeColors[extension as keyof typeof fileTypeColors] || fileTypeColors['default']
    };
  };

  // Get file category for filtering
  const getFileCategory = (extension: string) => {
    for (const [category, exts] of Object.entries(fileTypeCategories)) {
      if (exts.includes(extension)) {
        return category;
      }
    }
    return 'other';
  };

  // Format filename
  const formatFileName = (filename: string) => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    return nameWithoutExt.replace(/[-_]/g, " ").toUpperCase();
  };

  // Search matching function
  const matchesSearch = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return true;
    
    const textLower = text.toLowerCase();
    const searchWords = searchTerm.toLowerCase().split(/\s+/);
    
    const commonWords = ['past', 'papers', 'exam', 'examination', 'test', 'question'];
    const filteredSearchWords = searchWords.filter(word => 
      word.length > 2 && !commonWords.includes(word)
    );
    
    if (filteredSearchWords.length === 0) return true;
    
    const textParts = textLower.split(/[\s\-_\.]+/);
    
    return filteredSearchWords.some(searchWord => {
      if (textLower.includes(searchWord)) return true;
      if (textParts.some(part => part.startsWith(searchWord))) return true;
      if (textParts.some(part => searchWord.startsWith(part))) return true;
      
      const numberMap: { [key: string]: string } = {
        '1': 'one', '2': 'two', '3': 'three', '4': 'four',
        '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine'
      };
      const searchWithNumbersReplaced = searchWord.replace(
        /[1-9]/g, match => numberMap[match] || match
      );
      return textLower.includes(searchWithNumbersReplaced);
    });
  };

  // Filter files
  const filteredFiles = useMemo(() => {
    let filtered = allFiles.filter(file => 
      matchesSearch(file.name, searchTerm) || 
      matchesSearch(file.path, searchTerm)
    );

    if (fileTypeFilter !== 'all') {
      filtered = filtered.filter(file => {
        const fileCategory = getFileType(file.name).category;
        return fileTypeFilter === fileCategory;
      });
    }

    return filtered;
  }, [allFiles, searchTerm, fileTypeFilter]);

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFiles = filteredFiles.slice(startIndex, startIndex + itemsPerPage);

  // Fetch files from GitHub
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(repoUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch files. GitHub API rate limit may be exceeded.');
        }
        const data = await response.json();
        setAllFiles(data.filter((file: GitHubFile) => file.type === 'file'));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [repoUrl]);

  // Handle scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle file preview/download
  const handleFileAction = (file: GitHubFile) => {
    const fileType = getFileType(file.name);
    
    if (fileType.extension === 'pdf') {
      const pdfUrl = encodeURIComponent(file.download_url);
      const googleViewerUrl = `https://docs.google.com/viewerng/viewer?url=${pdfUrl}`;
      window.open(googleViewerUrl, '_blank');
    } else {
      window.open(file.download_url, '_blank');
    }
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, fileTypeFilter]);

  return (
    <PageLayout className="min-w-0">
      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white z-50 shadow-lg"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      <div className="max-w-7xl mx-auto min-w-0">
        <div className="mb-8">
          <Link to={backUrl}>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {backTo}
            </Button>
          </Link>
          
          <div className="text-center mb-8 pb-6 border-b">
            <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-2">Search Papers</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="   Search by paper name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex-1 lg:max-w-xs">
              <label className="block text-sm font-semibold mb-2">Filter by File Type</label>
              <Select value={fileTypeFilter} onValueChange={setFileTypeFilter} disabled={loading}>
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
        </div>

        {/* File List */}
        <div className="min-h-[500px] mb-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-lg text-muted-foreground">Loading files...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 text-lg">{error}</div>
            </div>
          ) : currentFiles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No files found</h3>
              <p className="text-muted-foreground">
                {searchTerm || fileTypeFilter !== 'all' 
                  ? `No files match your search criteria`
                  : `No files available in this repository`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentFiles.map((file, index) => {
                const fileType = getFileType(file.name);
                const IconComponent = fileType.icon;
                const formattedName = formatFileName(file.name);

                return (
                  <Card 
                    key={`${file.name}-${index}`}
                    className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <IconComponent className={`h-8 w-8 mr-3 flex-shrink-0 ${fileType.color}`} />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base break-words mb-2">
                            {formattedName}
                          </h3>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div><span className="font-medium">Format:</span> {fileType.extension.toUpperCase()}</div>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleFileAction(file)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {fileType.extension === 'pdf' ? (
                          <>
                            <Eye className="h-4 w-4 mr-1" />
                            View PDF
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredFiles.length)} of {filteredFiles.length} items
            </div>
            <PaginationWithJump
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default GitHubRepositoryViewer;
