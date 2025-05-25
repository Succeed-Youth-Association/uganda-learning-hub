
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookshelfSection from '../components/BookshelfSection';
import ScrollToTop from '../components/ScrollToTop';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 w-full flex">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden">
          <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b p-2">
            <SidebarTrigger />
          </div>
          <div className="p-4 lg:p-8">
            <BookshelfSection />
          </div>
        </main>
        <ScrollToTop />
      </div>
    </SidebarProvider>
  );
};

export default Index;
