
import React from 'react';
import { Button } from '../ui/button';

interface DocumentErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const DocumentErrorState: React.FC<DocumentErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center bg-red-50 p-8 rounded-lg">
        <p className="text-red-600 mb-4">{error}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};
