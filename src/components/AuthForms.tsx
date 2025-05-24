import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { pakistanCities } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
}

const AuthForms: React.FC<AuthModalProps> = ({ isOpen, onClose, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    city: '',
    password: '',
  });
  
  const { login, signup, isLoading } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (type === 'login') {
        await login(formData.email, formData.password);
        setSuccess('Login successful!');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else if (type === 'signup') {
        await signup(formData, formData.password);
        setSuccess('Sign up successful!');
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 md:mx-0 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="p-6">
          {type === 'login' && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#2D3142]">Welcome Back</h2>
                <p className="text-gray-600 mt-1">Login to continue your book journey</p>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                  {success}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                    required
                  />
                </div>