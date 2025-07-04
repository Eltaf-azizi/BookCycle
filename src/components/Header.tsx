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
                      <span className="text-sm font-medium text-[#2D3142]">{user?.name.split(' ')[0]}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center text-[#2D3142] hover:text-[#C14953] transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onLoginClick}
                  className="text-[#2D3142] border border-[#6C9A8B] hover:bg-[#6C9A8B] hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={onSignupClick}
                  className="bg-[#C14953] text-white hover:bg-[#a73f48] px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#2D3142] hover:text-[#C14953] focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>


      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
            <a href="#" className="block px-4 py-2 text-base font-medium text-[#2D3142] hover:bg-[#F7F3E3] hover:text-[#C14953]">
              Home
            </a>
            <a href="#" className="block px-4 py-2 text-base font-medium text-[#2D3142] hover:bg-[#F7F3E3] hover:text-[#C14953]">
              Browse Books
            </a>
            <a href="#" className="block px-4 py-2 text-base font-medium text-[#2D3142] hover:bg-[#F7F3E3] hover:text-[#C14953]">
              How It Works
            </a>
            
            {isAuthenticated ? (
              <>
                <a href="#" className="block px-4 py-2 text-base font-medium text-[#2D3142] hover:bg-[#F7F3E3] hover:text-[#C14953]">
                  My Books
                </a>
                <a href="#" className="block px-4 py-2 text-base font-medium text-[#2D3142] hover:bg-[#F7F3E3] hover:text-[#C14953]">
                  Messages
                </a>
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center space-x-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold ${getRandomColor(user?.name || '')}`}>
                      {getInitials(user?.name || '')}
                    </div>
                    <span className="text-sm font-medium text-[#2D3142]">{user?.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="ml-auto flex items-center text-[#2D3142] hover:text-[#C14953]"
                  >
                    <LogOut className="h-6 w-6" />
                    <span className="ml-2">Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-3 space-y-2">
                <button
                  onClick={onLoginClick}
                  className="w-full text-center text-[#2D3142] border border-[#6C9A8B] hover:bg-[#6C9A8B] hover:text-white px-4 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={onSignupClick}
                  className="w-full text-center bg-[#C14953] text-white hover:bg-[#a73f48] px-4 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

                  