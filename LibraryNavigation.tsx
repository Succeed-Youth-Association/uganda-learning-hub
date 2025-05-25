
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AppSidebar } from './AppSidebar';
import { SidebarTrigger } from './ui/sidebar';
import { BookOpen } from 'lucide-react';

const LibraryNavigation = () => {
  return (
    <>
      <AppSidebar />
      <header className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-800">Fresh Teacher's Library</h2>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 flex-1 max-w-md ml-8">
              <Input
                type="search"
                placeholder="Search for resources, subjects, or classes..."
                className="flex-1"
              />
              <Button className="bg-orange-600 hover:bg-orange-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default LibraryNavigation;
