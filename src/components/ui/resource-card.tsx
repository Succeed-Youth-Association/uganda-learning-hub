
import React from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { LucideIcon } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  onClick: () => void;
  buttonText: string;
  buttonColor?: string;
  className?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor = "text-orange-600",
  onClick,
  buttonText,
  buttonColor = "bg-orange-600 hover:bg-orange-700",
  className = ""
}) => {
  return (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 min-w-0 ${className}`}
      onClick={onClick}
    >
      <CardHeader className="text-center pb-2">
        <Icon className={`h-12 w-12 mx-auto mb-4 ${iconColor}`} />
        <CardTitle className="text-xl font-bold break-words">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className="text-sm break-words mb-4">
          {description}
        </CardDescription>
        <Button 
          className={`w-full ${buttonColor}`}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
