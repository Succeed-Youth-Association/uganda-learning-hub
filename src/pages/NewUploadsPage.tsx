
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Search, FileText, Loader2, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import PaginationWithJump from '../components/PaginationWithJump';
import PageLayout from '../components/layout/PageLayout';
import { getClassTitle, getResourceTypeTitle } from '../utils/dataLoader';
import { getGitHubRepoUrl } from '../utils/githubRepoMapper';

interface GitHubFile {
  name: string;
  path: string;
  download_url: string;
  html_url: string;
  size: number;
  type: string;
}

const NewUploadsPage = () => {
  const { classId, resourceType } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useState<GitHubFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 12;

  const classTitle = getClassTitle(classId || '');
  const resourceTypeTitle = getResourceTypeTitle(resourceType || '');
  const repoUrl = getGitHubRepoUrl(classId || '', resourceType || '');

  useEffect(() => {
    const fetchGitHubFiles = async () => {
      if (!repoUrl) {
        setError('No GitHub repository configured for this resource type');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Extract owner and repo from GitHub URL
        const urlParts = repoUrl.replace('https://github.com/', '').split('/');
        const owner = urlParts[0];
        const repo = urlParts[1];

        console.log(`Fetching files from GitHub: ${owner}/${repo}`);

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Filter for PDF files and other document types
        const documentFiles = data.filter((file: any) => 
          file.type === 'file' && 
          (file.name.toLowerCase().endsWith('.pdf') || 
           file.name.toLowerCase().endsWith('.doc') || 
           file.name.toLowerCase().endsWith('.docx'))
        );

        setFiles(documentFiles);
        console.log(`Found ${documentFiles.length} document files`);
      } catch (error) {
        console.error('Error fetching GitHub files:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch files from GitHub');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubFiles();
  }, [repoUrl]);

  const filteredFiles = useMemo(() => {
    return files.filter(file =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [files, searchTerm]);

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFiles = filteredFiles.slice(startIndex, startIndex + itemsPerPage);

  const handleDownload = (file: GitHubFile) => {
    console.log('Downloading:', file.name);
    window.open(file.download_url, '_blank');
  };

  const handlePreview = (file: GitHubFile) => {
    console.log('Opening in GitHub:', file.name);
    window.open(file.html_url, '_blank');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const extractFileName = (fileName: string): string => {
    return fileName.replace(/\.[^/.]+$/, '').replace(/[._-]/g, ' ').toUpperCase();
  };

  if (!repoUrl) {
    return (
      <PageLayout className="min-w-0">
        <div className="max-w-7xl mx-auto min-w-0">
          <div className="mb-8">
            <Link to={`/class/${classId}/resources/${resourceType}`}>
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {resourceTypeTitle}
              </Button>
            </Link>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              New Uploads
            </h1>
          </div>
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              Repository Not Configured
            </h3>
            <p className="text-muted-foreground">
              No GitHub repository has been configured for {resourceTypeTitle} in {classTitle}.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout className="min-w-0">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="mb-8">
          <Link to={`/class/${classId}/resources/${resourceType}`}>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {resourceTypeTitle}
            </Button>
          </Link>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            New Uploads - {resourceTypeTitle}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {classTitle} - {loading ? 'Loading...' : `${filteredFiles.length} file(s) available`}
          </p>

          {!loading && !error && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="   Search files..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            <span className="ml-2 text-lg text-muted-foreground">Loading files from GitHub...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">Error Loading Files</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : currentFiles.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">No files found</h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? `No files match "${searchTerm}"`
                : 'No document files available in this repository'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
              {currentFiles.map((file, index) => (
                <Card key={`${file.path}-${index}`} className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-orange-200 dark:hover:border-orange-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <FileText className="h-8 w-8 text-orange-600 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-tight line-clamp-2">
                      {extractFileName(file.name)}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>From GitHub Repository</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownload(file)}
                      >
                        Download
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handlePreview(file)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <PaginationWithJump
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mb-8"
              />
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default NewUploadsPage;
