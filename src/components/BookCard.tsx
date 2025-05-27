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
            ></button>