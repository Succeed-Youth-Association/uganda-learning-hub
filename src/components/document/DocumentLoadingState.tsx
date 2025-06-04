
import React from 'react';
import { Loader2 } from 'lucide-react';

export const DocumentLoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-gray-600">Loading document...</p>
      </div>
    </div>
  );
};
