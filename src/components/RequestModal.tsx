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
    