import React, { useState } from 'react';
import { Plus, X, Image, BookOpen } from 'lucide-react';
import { pakistanCities } from '../types';

interface AddBookButtonProps {
  onAddBook: (bookData: any) => void;
}

const AddBookButton: React.FC<AddBookButtonProps> = ({ onAddBook }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    condition: '',
    genre: '',
    description: '',
    city: '',
    exactLocation: '',
    images: ['https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg'],
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook({
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'Available',
    });
    setIsModalOpen(false);
    // Reset form
    setFormData({
      title: '',
      author: '',
      isbn: '',
      condition: '',
      genre: '',
      description: '',
      city: '',
      exactLocation: '',
      images: ['https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg'],
    });
  };