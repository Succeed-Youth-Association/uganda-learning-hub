
import React from 'react';
import Bookshelf from './Bookshelf';
import { libraryData } from '../data/libraryData';

const BookshelfSection = () => {
  const nurseryBooks = libraryData.filter(item => 
    ['baby', 'middle', 'top'].includes(item.id)
  );
  
  const primaryBooks1 = libraryData.filter(item => 
    ['p1', 'p2', 'p3'].includes(item.id)
  );
  
  const primaryBooks2 = libraryData.filter(item => 
    [ 'p4', 'p5', 'p6'].includes(item.id)
  );
  
  const secondaryBooks1 = libraryData.filter(item => 
    ['p7','s1', 's2' ].includes(item.id)
  );
  
  const secondaryBooks2 = libraryData.filter(item => 
    ['s3','s4','s5'].includes(item.id)
  );
  const secondaryBooks3 = libraryData.filter(item => 
    ['s6'].includes(item.id)
  );
  return (
    <div className="max-w-6xl mx-auto">
      
      <div className="mb-8">
        <Bookshelf books={nurseryBooks} />
      </div>
      
      <div className="mb-8">
        <Bookshelf books={primaryBooks1} />
      </div>
      
      <div className="mb-8">
        <Bookshelf books={primaryBooks2} />
      </div>
      
      <div className="mb-8">
        <Bookshelf books={secondaryBooks1} />
      </div>
      <div className="mb-8">
        <Bookshelf books={secondaryBooks2} />
      </div>
      <div className="mb-8">
        <Bookshelf books={secondaryBooks3} emptySlots={4} />
      </div>
    </div>
  );
};

export default BookshelfSection;
