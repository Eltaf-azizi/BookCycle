import React, { useState } from 'react';
import { Book, MapPin, Star, Clock, User } from 'lucide-react';
import { Book as BookType } from '../types';

interface BookCardProps {
  book: BookType;
  onRequest: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onRequest }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New':
        return 'bg-green-100 text-green-800';
      case 'Like New':
        return 'bg-blue-100 text-blue-800';
      case 'Good':
        return 'bg-yellow-100 text-yellow-800';
      case 'Worn':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) {
      return 'Today';
    } else if (diff === 1) {
      return 'Yesterday';
    } else if (diff < 7) {
      return `${diff} days ago`;
    } else if (diff < 30) {
      const weeks = Math.floor(diff / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      const months = Math.floor(diff / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === book.images.length - 1 ? 0 : prevIndex + 1);
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? book.images.length - 1 : prevIndex - 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 flex flex-col h-full">
      {/* Book Image */}
      <div className="relative h-48 sm:h-64 bg-gray-200">
        <img
          src={book.images[currentImageIndex]}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        
        {book.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        <div className="absolute top-2 left-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getConditionColor(book.condition)}`}>
            {book.condition}
          </span>
        </div>

        <div className="absolute top-2 right-2">
          <span className="bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 rounded-full">
            {book.images.length > 1 ? `${currentImageIndex + 1}/${book.images.length}` : '1 Photo'}
          </span>
        </div>
      </div>
      
      {/* Book Info */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-[#2D3142] line-clamp-1">{book.title}</h3>
        <p className="text-gray-600 text-sm">{book.author}</p>
        
        <div className="mt-2 flex items-center">
          <Book className="h-4 w-4 text-[#6C9A8B] mr-1" />
          <span className="text-sm text-gray-700">{book.genre}</span>
        </div>
        
        <div className="mt-2 flex items-center">
          <MapPin className="h-4 w-4 text-[#C14953] mr-1" />
          <span className="text-sm text-gray-700">
            {book.cities && book.cities.length > 0 
              ? (book.cities.length === 1 ? book.cities[0] : `${book.cities[0]} +${book.cities.length - 1} more`)
              : book.city || 'Location not specified'
            }
          </span>
        </div>
        
        <div className="mt-2 flex items-center">
          <User className="h-4 w-4 text-[#2D3142] mr-1" />
          <span className="text-sm text-gray-700">
            {book.ownerNames && book.ownerNames.length > 0 
              ? (book.ownerNames.length === 1 ? book.ownerNames[0] : `${book.ownerNames[0]} +${book.ownerNames.length - 1} more`)
              : book.ownerName || 'Owner not specified'
            }
          </span>
        </div>
        
        <div className="mt-2 flex items-center">
          <Clock className="h-4 w-4 text-gray-500 mr-1" />
          <span className="text-xs text-gray-500">Added {formatDate(book.createdAt)}</span>
        </div>
        
        <button
          onClick={() => onRequest(book.id)}
          className="mt-4 bg-[#C14953] hover:bg-[#a73f48] text-white py-2 rounded-md transition-colors w-full font-medium focus:outline-none focus:ring-2 focus:ring-[#C14953] focus:ring-offset-2"
        >
          I Want This Book
        </button>
      </div>
    </div>
  );
};

export default BookCard;