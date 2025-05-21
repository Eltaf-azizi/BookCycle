import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';
import AuthForms from './components/AuthForms';
import AddBookButton from './components/AddBookButton';
import RequestModal from './components/RequestModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Book, BookRequest } from './types';
import { MOCK_BOOKS } from './data/mockData';

function AppContent() {
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(MOCK_BOOKS);
  const [authType, setAuthType] = useState<'login' | 'signup' | 'otp'>('login');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [cityFilter, setCityFilter] = useState('');
  const [searchParams, setSearchParams] = useState({ query: '', city: '' });

    
  useEffect(() => {
    let filtered = [...books];
    
    // Filter by search query
    if (searchParams.query) {
      const query = searchParams.query.toLowerCase();
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) || 
        book.genre.toLowerCase().includes(query)
      );
    }
    
    // Filter by city
    if (searchParams.city) {
      filtered = filtered.filter(book => book.city.toLowerCase() === searchParams.city.toLowerCase());
    }
    
    setFilteredBooks(filtered);
  }, [books, searchParams]);