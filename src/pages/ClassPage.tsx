
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, FileText, Book, GraduationCap, BookOpen, Package } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import ResourceCard from '../components/ui/resource-card';
import { getAvailableResourcesForClass, getClassTitle, getResourceTypeTitle } from '../utils/dataLoader';

const ClassPage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();

  const allResourceTypes = [
    {
      title: 'Lesson Notes',
      description: 'Comprehensive lesson notes for all subjects',
      icon: FileText,
      route: 'lesson-notes',
      color: 'text-blue-600'
    },
    {
      title: 'Schemes of Work',
      description: 'Detailed schemes of work for curriculum planning',
      icon: Book,
      route: 'schemes-of-work',
      color: 'text-green-600'
    },
    {
      title: 'Past Papers',
      description: 'Previous examination papers and marking guides',
      icon: GraduationCap,
      route: 'past-papers',
      color: 'text-purple-600'
    },
    {
      title: 'Holiday Packages',
      description: 'Educational materials for holiday assignments',
      icon: Package,
      route: 'holiday-packages',
      color: 'text-yellow-600'
    },
    {
      title: 'Textbooks',
      description: 'Digital textbooks and reference materials',
      icon: BookOpen,
      route: 'textbooks',
      color: 'text-orange-600'
    }
  ];

  const availableResources = getAvailableResourcesForClass(classId || '');
  const resourceTypes = allResourceTypes.filter(resource => 
    availableResources.includes(resource.route)
  );

  const handleResourceClick = (route: string) => {
    navigate(`/class/${classId}/resources/${route}`);
  };

  const classTitle = getClassTitle(classId || '');

  return (
    <PageLayout className="min-w-0">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Button>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            {classTitle}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {resourceTypes.length} resource types available
          </p>
        </div>

        {resourceTypes.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">No resources available</h3>
            <p className="text-muted-foreground">
              No resources have been configured for {classTitle} yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {resourceTypes.map((resource) => (
              <ResourceCard
                key={resource.route}
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
                iconColor={resource.color}
                onClick={() => handleResourceClick(resource.route)}
                buttonText={`Browse ${resource.title}`}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ClassPage;
