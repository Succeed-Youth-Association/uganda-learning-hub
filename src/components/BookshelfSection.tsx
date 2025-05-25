
import React from 'react';
import Bookshelf from './Bookshelf';
import { libraryData } from '../data/libraryData';

const BookshelfSection = () => {
  const nurseryBooks = libraryData.filter(item => 
    ['baby', 'middle', 'top'].includes(item.id)
  );
  
  const primaryBooks1 = libraryData.filter(item => 
    ['p1', 'p2'].includes(item.id)
  );
  
  const primaryBooks2 = libraryData.filter(item => 
    ['p3', 'p4', 'p5', 'p6', 'p7'].includes(item.id)
  );
  
  const secondaryBooks1 = libraryData.filter(item => 
    ['s1', 's2', 's3', 's4', 's5'].includes(item.id)
  );
  
  const secondaryBooks2 = libraryData.filter(item => 
    ['s6'].includes(item.id)
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Fresh Teacher's Library
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Access educational resources for Uganda curriculum - from Nursery to Senior Six
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Nursery Section</h2>
        <Bookshelf books={nurseryBooks} />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Primary Section (Lower)</h2>
        <Bookshelf books={primaryBooks1} />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Primary Section (Upper)</h2>
        <Bookshelf books={primaryBooks2} />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Secondary Section (Lower)</h2>
        <Bookshelf books={secondaryBooks1} />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Secondary Section (Upper)</h2>
        <Bookshelf books={secondaryBooks2} emptySlots={4} />
      </div>
    </div>
  );
};

export default BookshelfSection;
