
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LibraryNavigation from '../components/LibraryNavigation';
import BookshelfSection from '../components/BookshelfSection';
import { SidebarProvider } from '../components/ui/sidebar';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full">
        <LibraryNavigation />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                Fresh Teacher's Library
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Access educational resources for Uganda curriculum - from Nursery to Senior Six
              </p>
            </div>
            <BookshelfSection />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
