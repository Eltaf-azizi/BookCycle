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

             <div className="bg-[#F7F3E3] p-4 rounded-md mb-6">
              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 text-[#6C9A8B] mt-0.5 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-[#2D3142]">What happens next?</h4>
                  <p className="text-xs text-gray-700 mt-1">
                    1. The book owner will be notified of your request.<br />
                    2. If they accept, you'll be able to chat and arrange the exchange.<br />
                    3. You will only see their exact location after they accept your request.<br />
                    4. After the exchange, both of you will rate the experience.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-[#C14953] text-white rounded-md hover:bg-[#a73f48] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C14953] focus:ring-offset-2"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;