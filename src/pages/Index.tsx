
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookshelfSection from '../components/BookshelfSection';
import ScrollToTop from '../components/ScrollToTop';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';
import { BookOpen } from 'lucide-react';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 w-full flex">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden min-w-0">
          <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b p-2 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SidebarTrigger />
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-orange-600" />
                <h1 className="text-lg font-bold text-foreground hidden sm:block">
                  Fresh Teacher's Library
                </h1>
                <h1 className="text-sm font-bold text-foreground sm:hidden">
                  Fresh Teacher's
                </h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
          <div className="p-4 lg:p-8">
            <BookshelfSection />
          </div>
          <Footer />
        </main>
        <ScrollToTop />
      </div>
    </SidebarProvider>
  );
};

export default Index;
