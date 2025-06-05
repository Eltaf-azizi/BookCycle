import React, { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { Book, BookRequest } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onSubmit: (request: Partial<BookRequest>) => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ isOpen, onClose, book, onSubmit }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  
  if (!isOpen || !book) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!user) {
      alert('You must be logged in to request a book');
      return;
    }
    
    onSubmit({
      bookId: book.id,
      requesterId: user.id,
      requesterName: user.name,
      ownerId: book.ownerId,
      message,
      status: 'Pending',
      createdAt: new Date(),
    });
    
    // Reset form
    setMessage('');
    onClose();
  };
  
    
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 md:mx-0">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-[#2D3142]">Request This Book</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start mb-6">
            <div className="w-20 h-24 bg-gray-200 rounded overflow-hidden flex-shrink-0">
              <img 
                src={book.images[0]} 
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-lg text-[#2D3142]">{book.title}</h3>
              <p className="text-gray-600 text-sm">by {book.author}</p>
              <div className="mt-1 flex items-center">
                <span className="text-sm text-gray-700">Owner: {book.ownerName}</span>
              </div>
              <div className="mt-1 flex items-center">
                <span className="text-sm text-gray-700">Location: {book.city}</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message for the Book Owner
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                placeholder="Introduce yourself and explain why you're interested in this book. You can also suggest how and where you'd like to meet for the exchange."
                required
              />
            </div>