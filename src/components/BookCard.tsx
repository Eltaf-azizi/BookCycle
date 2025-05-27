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