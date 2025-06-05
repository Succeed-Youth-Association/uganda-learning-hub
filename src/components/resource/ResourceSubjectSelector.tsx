
import React from 'react';
import { BookOpen, Globe } from 'lucide-react';
import ResourceCard from '../ui/resource-card';

interface ResourceSubjectSelectorProps {
  allSubjects: string[];
  resourceTypeTitle: string;
  classTitle: string;
  onSubjectSelect: (subject: string) => void;
}

const ResourceSubjectSelector: React.FC<ResourceSubjectSelectorProps> = ({
  allSubjects,
  resourceTypeTitle,
  classTitle,
  onSubjectSelect
}) => {
  if (allSubjects.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">No subjects available</h3>
        <p className="text-muted-foreground">
          No subjects have been configured for {resourceTypeTitle.toLowerCase()} in {classTitle}.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
      {allSubjects.map((subject) => (
        <ResourceCard
          key={subject}
          title={subject}
          description={
            subject === 'All Subjects' 
              ? `Browse all ${resourceTypeTitle.toLowerCase()}`
              : `View all ${resourceTypeTitle.toLowerCase()} for ${subject}`
          }
          icon={subject === 'All Subjects' ? Globe : BookOpen}
          iconColor={subject === 'All Subjects' ? 'text-blue-600' : 'text-orange-600'}
          onClick={() => onSubjectSelect(subject)}
          buttonText="View Resources"
        />
      ))}
    </div>
  );
};

export default ResourceSubjectSelector;
