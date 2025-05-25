
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookshelfSection from '../components/BookshelfSection';
import { SidebarProvider } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full flex">
        <AppSidebar />
        <main className="flex-1 p-4">
          <BookshelfSection />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
