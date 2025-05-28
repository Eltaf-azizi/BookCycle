import React from 'react';
import BookCard from './BookCard';
import { Book } from '../types';

interface BookGridProps {
  books: Book[];
  onRequestBook: (bookId: string) => void;
}

const BookGrid: React.FC<BookGridProps> = ({ books, onRequestBook }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          onRequest={onRequestBook}
        />
      ))}
    </div>
  );
};

export default BookGrid;