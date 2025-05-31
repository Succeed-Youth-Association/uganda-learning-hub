
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../AppSidebar';
import ThemeToggle from '../ThemeToggle';
import Footer from '../Footer';
import WhatsAppChat from '../WhatsAppChat';

interface PageLayoutProps {
  children: React.ReactNode;
  showTitle?: boolean;
  title?: string;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  showTitle = true, 
  title = "Fresh Teacher's Library",
  className = ""
}) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 w-full flex">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden min-w-0">
          <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b p-2 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SidebarTrigger />
              {showTitle && (
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-bold text-foreground hidden sm:block">
                    {title}
                  </h1>
                  <h1 className="text-sm font-bold text-foreground sm:hidden">
                    {title}
                  </h1>
                </div>
              )}
            </div>
            <ThemeToggle />
          </div>
          <div className={`p-4 lg:p-8 ${className}`}>
            {children}
          </div>
          <Footer />
        </main>
        <WhatsAppChat />
      </div>
    </SidebarProvider>
  );
};

export default PageLayout;
