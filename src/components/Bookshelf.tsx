
import React from 'react';
import BookCover from './BookCover';

interface Book {
  id: string;
  title: string;
  image: string;
  subjects: any[];
}

interface BookshelfProps {
  books: Book[];
  emptySlots?: number;
}

const Bookshelf: React.FC<BookshelfProps> = ({ books, emptySlots = 0 }) => {
  const shelfImage = "https://fresh-teacher.github.io/images/shelf_wood.png";
  
  const totalSlots = books.length + emptySlots;
  const emptySlotArray = Array(emptySlots).fill(null);

  return (
    <div className="bookshelf text-center p-0 mb-8">
      <div className="covers w-full h-auto z-10 text-center mb-[-12px]">
        {books.map((book, index) => (
          <BookCover key={book.id} book={book} />
        ))}
        {emptySlotArray.map((_, index) => (
          <div key={`empty-${index}`} className="thumb book-1 inline-block cursor-pointer mx-[0.5%] w-[15%] max-w-[120px] shadow-md">
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs">Coming Soon</span>
            </div>
          </div>
        ))}
      </div>
      <img 
        className="shelf-img h-auto max-w-full align-top z-0" 
        src={shelfImage} 
        alt="Wooden shelf"
        style={{ marginTop: '-12px' }}
      />
    </div>
  );
};

export default Bookshelf;
