
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface ResourcePageHeaderProps {
  selectedSubject: string | null;
  classId: string;
  classTitle: string;
  resourceTypeTitle: string;
  currentDocumentsLength: number;
  loading: boolean;
  onBackToSubjects: () => void;
}

const ResourcePageHeader: React.FC<ResourcePageHeaderProps> = ({
  selectedSubject,
  classId,
  classTitle,
  resourceTypeTitle,
  currentDocumentsLength,
  loading,
  onBackToSubjects
}) => {
  return (
    <div className="mb-8">
      {selectedSubject ? (
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" onClick={onBackToSubjects}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
        </div>
      ) : (
        <Link to={`/class/${classId}`}>
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {classTitle}
          </Button>
        </Link>
      )}
      
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
        {selectedSubject ? selectedSubject : resourceTypeTitle}
      </h1>
      <p className="text-lg text-muted-foreground mb-6">
        {selectedSubject 
          ? `${classTitle} - ${loading ? 'Loading...' : `${currentDocumentsLength} document(s) available`}`
          : `${classTitle} - Select a subject to view ${resourceTypeTitle.toLowerCase()}`
        }
      </p>
    </div>
  );
};

export default ResourcePageHeader;
