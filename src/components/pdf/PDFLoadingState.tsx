
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

interface PDFLoadingStateProps {
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const PDFLoadingState: React.FC<PDFLoadingStateProps> = ({
  isLoading,
  error,
  onRetry
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-white text-lg font-medium">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 text-lg mb-4 font-medium">{error}</p>
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default PDFLoadingState;
