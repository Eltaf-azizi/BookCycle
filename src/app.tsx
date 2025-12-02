import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import AuthForms from './components/AuthForms';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';
import AddBookButton from './components/AddBookButton';
import RequestModal from './components/RequestModal';
import MessagesModal from './components/MessagesModal';
import Footer from './components/Footer';
import { Book, BookRequest, Message, Notification } from './types';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  
  // Modal states
  const [authModalType, setAuthModalType] = useState<'login' | 'signup' | 'otp' | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // App state
  const [books] = useState<Book[]>([
    {
      id: '1',
      title: 'The Kite Runner',
      author: 'Khaled Hosseini',
      genre: 'Fiction',
      condition: 'Like New',
      cities: ['Karachi', 'Lahore', 'Islamabad'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg'],
      ownerNames: ['Fatima Khan', 'Ahmed Raza', 'Saad Ali'],
      ownerId: 'owner1',
      createdAt: new Date('2023-12-01')
    },
    {
      id: '2',
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      genre: 'Non-Fiction',
      condition: 'Good',
      cities: ['Lahore', 'Faisalabad'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg'],
      ownerNames: ['Dr. Ahmed Raza', 'Muhammad Hassan'],
      ownerId: 'owner2',
      createdAt: new Date('2023-11-30')
    },
    {
      id: '3',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      condition: 'Worn',
      cities: ['Islamabad', 'Rawalpindi', 'Peshawar'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg'],
      ownerNames: ['Saad Ali', 'Bilal Khan', 'Sara Begum'],
      ownerId: 'owner3',
      createdAt: new Date('2023-11-29')
    },
    {
      id: '4',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      condition: 'Good',
      cities: ['Quetta', 'Gwadar'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg'],
      ownerNames: ['Bilal Ahmad', 'Hassan Raza'],
      ownerId: 'owner4',
      createdAt: new Date('2023-11-28')
    },
    {
      id: '5',
      title: '1984',
      author: 'George Orwell',
      genre: 'Science Fiction',
      condition: 'Like New',
      cities: ['Peshawar', 'Mardan', 'Mingora'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg'],
      ownerNames: ['Sara Begum', 'Samreen Bibi', 'Arifullah Khan'],
      ownerId: 'owner5',
      createdAt: new Date('2023-11-27')
    }
  ]);

  // Mock data for demonstration
  const [mockRequests, setMockRequests] = useState<BookRequest[]>([]);
  const [mockMessages, setMockMessages] = useState<Message[]>([]);
  const [mockNotifications, setMockNotifications] = useState<Notification[]>([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);

  useEffect(() => {
    let filtered = [...books];
    
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (searchCity) {
      filtered = filtered.filter(book => 
        book.cities && book.cities.some(city => city.toLowerCase() === searchCity.toLowerCase())
      );
    }
    
    setFilteredBooks(filtered);
  }, [searchQuery, searchCity, books]);

  return (
    <div className="min-h-screen bg-[#F7F3E3]">
      {/* Header */}
      <Header
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
        onProfileClick={handleProfileClick}
        onMessagesClick={handleMessagesClick}
        notifications={isAuthenticated ? mockNotifications : undefined}
        onMarkAsRead={handleMarkAsReadNotification}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDeleteNotification={handleDeleteNotification}
      />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative bg-[#2D3142] text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D3142] to-[#4F5D75] mix-blend-multiply"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-10">
              <BookOpen className="h-16 w-16 text-[#C14953] mx-auto mb-4" />
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Share Books, Spread Knowledge
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Give your books a new life and discover your next great read in Pakistan's first community-driven book exchange
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-3">
                Exchange books in cities across all provinces of Pakistan
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'].map(city => (
                  <button
                    key={city}
                    onClick={() => handleSearch({ query: '', city: city.toLowerCase() })}
                    className={`px-3 py-1 rounded-full text-sm ${
                      searchCity === city.toLowerCase()
                        ? 'bg-[#C14953] text-white'
                        : 'bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Books Grid Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D3142]">Available Books</h2>
                <p className="text-gray-600 mt-1">Browse books available for exchange</p>
              </div>
            </div>
                          
            {filteredBooks.length > 0 ? (
              <BookGrid
                books={filteredBooks}
                onRequestBook={handleRequestBook}
              />
            ) : (
              <div className="text-center py-12">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
                  <BookOpen className="h-12 w-12 text-[#C14953] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#2D3142] mb-2">No Books Found</h3>
                  <p className="text-gray-600">
                    We couldn't find any books matching your search criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchCity('');
                    }}
                    className="mt-4 px-4 py-2 bg-[#6C9A8B] text-white rounded-md hover:bg-[#5a7f73] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2D3142]">How It Works</h2>
              <p className="text-gray-600 mt-1">Simple steps to start exchanging books</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F7F3E3] rounded-lg p-6 text-center">
                <div className="bg-[#C14953] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-[#2D3142] mb-2">List Your Books</h3>
                <p className="text-gray-600">
                  Add books you no longer need to your profile. Include photos and details about the condition.
                </p>
              </div>
              
              <div className="bg-[#F7F3E3] rounded-lg p-6 text-center">
                <div className="bg-[#C14953] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-[#2D3142] mb-2">Connect With Others</h3>
                <p className="text-gray-600">
                  Browse books available in your city, or request books from other cities with shipping options.
                </p>
              </div>

              <div className="bg-[#F7F3E3] rounded-lg p-6 text-center">
                <div className="bg-[#C14953] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-[#2D3142] mb-2">Exchange & Enjoy</h3>
                <p className="text-gray-600">
                  Meet in a public place or arrange shipping to complete the exchange. Rate your experience afterward.
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <button
                onClick={isAuthenticated ? handleProfileClick : handleSignupClick}
                className="px-6 py-3 bg-[#C14953] text-white rounded-md hover:bg-[#a73f48] transition-colors"
              >
                Join The Community
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Add Book Button - Only show when authenticated */}
      {isAuthenticated && (
        <AddBookButton onAddBook={handleAddBook} />
      )}

      {/* Auth Modal */}
      <AuthForms
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        type={authModalType || 'login'}
      />

      {/* Request Modal */}
      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => {
          setIsRequestModalOpen(false);
          setSelectedBook(null);
        }}
        book={selectedBook}
        onSubmit={handleRequestSubmit}
      />

      {/* Messages Modal */}
      <MessagesModal
        isOpen={isMessagesModalOpen}
        onClose={() => setIsMessagesModalOpen(false)}
        messages={mockMessages}
        currentUser={user}
        onSendMessage={handleSendMessage}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
