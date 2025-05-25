
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  image: string;
  subjects: any[];
}

interface BookCoverProps {
  book: Book;
}

const BookCover: React.FC<BookCoverProps> = ({ book }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    console.log(`Clicked on ${book.title}`);
    navigate(`/class/${book.id}`);
  };

  return (
    <div 
      className="thumb book-1 inline-block cursor-pointer mx-[0.5%] w-[15%] max-w-[120px] shadow-md hover:transform hover:scale-105 transition-transform duration-200"
      onClick={handleBookClick}
    >
      <img 
        src={book.image} 
        alt={book.title}
        className="w-full block align-top"
      />
    </div>
  );
};

export default BookCover;
