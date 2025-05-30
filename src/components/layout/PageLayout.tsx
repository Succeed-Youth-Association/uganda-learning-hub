
import React from 'react';
import { cn } from '../../lib/utils';
import WhatsAppChat from '../WhatsAppChat';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <WhatsAppChat />
    </div>
  );
};

export default PageLayout;
