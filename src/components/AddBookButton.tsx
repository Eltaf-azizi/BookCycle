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
    
    
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-6 bottom-6 md:right-10 md:bottom-10 bg-[#C14953] text-white rounded-full p-3 md:p-4 shadow-lg hover:bg-[#a73f48] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C14953] focus:ring-offset-2 z-40"
        aria-label="Add Book"
      >
        <Plus className="h-6 w-6 md:h-8 md:w-8" />
      </button>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 md:mx-0 my-8 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-[#C14953] mr-2" />
                <h2 className="text-xl font-semibold text-[#2D3142]">Add Your Book</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Book Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                      required
                    />
                  </div>


                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                      Author*
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
                      ISBN (Optional)
                    </label>
                    <input
                      type="text"
                      id="isbn"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                    />
                  </div>

                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                      Condition*
                    </label>
                    <select
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                      required
                    >
                      <option value="" disabled>Select condition</option>
                      <option value="New">New</option>
                      <option value="Like New">Like New</option>
                      <option value="Good">Good</option>
                      <option value="Worn">Worn</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                      Genre*
                    </label>
                    <select
                      id="genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                      required
                    >
                      <option value="" disabled>Select genre</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-Fiction">Non-Fiction</option>
                      <option value="Academic">Academic</option>
                      <option value="Children">Children</option>
                      <option value="Self-Help">Self-Help</option>
                      <option value="Biography">Biography</option>
                      <option value="History">History</option>
                      <option value="Science">Science</option>
                      <option value="Religion">Religion</option>
                      <option value="Poetry">Poetry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                      required
                    >
                      <option value="" disabled>Select your city</option>
                      {pakistanCities.map(city => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="exactLocation" className="block text-sm font-medium text-gray-700 mb-1">
                    Exact Location (visible only after request accepted)
                  </label>
                  <input
                    type="text"
                    id="exactLocation"
                    name="exactLocation"
                    placeholder="e.g., DHA Phase 5, Gulberg, etc."
                    value={formData.exactLocation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                  />
                </div>