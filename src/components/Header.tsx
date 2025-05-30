import React, { useState } from 'react';
import { BookOpen, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignupClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getRandomColor = (name: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-[#C14953]" />
            <span className="ml-2 text-xl font-semibold text-[#2D3142]">
              BookCycle <span className="text-[#C14953]">Pakistan</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-[#2D3142] hover:text-[#C14953] px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-[#2D3142] hover:text-[#C14953] px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Browse Books
            </a>
            <a href="#" className="text-[#2D3142] hover:text-[#C14953] px-3 py-2 rounded-md text-sm font-medium transition-colors">
              How It Works
            </a>
            
            {isAuthenticated ? (
              <>
                <a href="#" className="text-[#2D3142] hover:text-[#C14953] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  My Books
                </a>
                <a href="#" className="text-[#2D3142] hover:text-[#C14953] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Messages
                </a>
                <div className="relative ml-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold ${getRandomColor(user?.name || '')}`}>
                        {getInitials(user?.name || '')}
                      </div>