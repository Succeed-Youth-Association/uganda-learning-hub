
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, FileText, Book, GraduationCap, BookOpen, Package, Upload } from 'lucide-react';
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

  // Add NEW UPLOADS card for all classes
  const newUploadsCard = {
    title: 'NEW UPLOADS',
    description: 'Latest educational materials and resources',
    icon: Upload,
    route: 'new-uploads',
    color: 'text-red-600'
  };

  const availableResources = getAvailableResourcesForClass(classId || '');
  const resourceTypes = allResourceTypes.filter(resource => 
    availableResources.includes(resource.route)
  );

  // Always add NEW UPLOADS card at the beginning
  const allCards = [newUploadsCard, ...resourceTypes];

  const handleResourceClick = (route: string) => {
    if (route === 'new-uploads') {
      navigate(`/class/${classId}/new-uploads`);
    } else {
      navigate(`/class/${classId}/resources/${route}`);
    }
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
            {allCards.length} resource types available
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {allCards.map((resource) => (
            <ResourceCard
              key={resource.route}
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
              iconColor={resource.color}
              onClick={() => handleResourceClick(resource.route)}
              buttonText={resource.route === 'new-uploads' ? 'View New Uploads' : `Browse ${resource.title}`}
              buttonColor={resource.route === 'new-uploads' ? 'bg-red-600 hover:bg-red-700' : undefined}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ClassPage;
