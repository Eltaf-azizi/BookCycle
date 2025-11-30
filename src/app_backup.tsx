import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import AdvancedSearch, { SearchFilters } from './components/AdvancedSearch';
import BookGrid from './components/BookGrid';
import AuthForms from './components/AuthForms';
import AddBookButton from './components/AddBookButton';
import RequestModal from './components/RequestModal';
import UserProfile from './components/UserProfile';
import ProfileEditModal from './components/ProfileEditModal';
import CommunityLeaderboard from './components/CommunityLeaderboard';
import UserRecommendations from './components/UserRecommendations';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Book, BookRequest, Notification, Message, User } from './types';
import { MOCK_BOOKS, MOCK_MESSAGES } from './data/mockData';
import MessagesModal from './components/MessagesModal';

function AppContent() {
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(MOCK_BOOKS);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: '1',
      type: 'book_request',
      title: 'New Book Request',
      message: 'Ahmed Raza wants to exchange "A Brief History of Time" with you.',
      createdAt: new Date('2023-12-20T10:30:00'),
      read: false,
      actionUrl: '/requests/1'
    },
    {
      id: '2',
      userId: '1',
      type: 'message',
      title: 'New Message',
      message: 'Fatima Khan sent you a message about book exchange.',
      createdAt: new Date('2023-12-19T15:45:00'),
      read: false,
      actionUrl: '/messages/2'
    },
    {
      id: '3',
      userId: '1',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'Congratulations! You earned the "Quick Responder" badge.',
      createdAt: new Date('2023-12-18T09:20:00'),
      read: true,
    },
    {
      id: '4',
      userId: '1',
      type: 'request_accepted',
      title: 'Request Accepted',
      message: 'Saad Ali accepted your request for "The Kite Runner".',
      createdAt: new Date('2023-12-17T14:15:00'),
      read: true,
      actionUrl: '/exchanges/4'
    }
  ]);
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [searchParams, setSearchParams] = useState<Partial<SearchFilters>>({ query: '', city: '' });

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
        filtered = filtered.filter(book => book.city.toLowerCase() === (searchParams.city || '').toLowerCase());
      }

      // Additional advanced filters
      if (searchParams.genre) {
        filtered = filtered.filter(book => book.genre.toLowerCase() === (searchParams.genre || '').toLowerCase());
      }

      if (searchParams.condition) {
        filtered = filtered.filter(book => book.condition.toLowerCase() === (searchParams.condition || '').toLowerCase());
      }

      if (searchParams.availability) {
        filtered = filtered.filter(book => book.status.toLowerCase() === (searchParams.availability || '').toLowerCase());
      }

      setFilteredBooks(filtered);
  }, [books, searchParams]);

    const handleSearch = (params: Partial<SearchFilters>) => {
      // Merge new params into existing search params
      setSearchParams(prev => ({ ...prev, ...params }));
  };

  const handleAdvancedSearch = (filters: Partial<SearchFilters>) => {
    // Combine advanced filters with basic search
    const combinedParams = {
      query: filters.query || '',
      city: filters.city || '',
      genre: filters.genre || '',
      condition: filters.condition || '',
      availability: filters.availability || 'Available',
      userRating: filters.userRating || 0,
      responseTime: filters.responseTime || '',
      verifiedOnly: filters.verifiedOnly || false,
      distance: filters.distance || 50,
    };
    setSearchParams(combinedParams);
    setShowAdvancedSearch(false);
  };

  
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== id)
    );
  };

  const handleAddBook = (bookData: Omit<Book, 'id' | 'ownerId' | 'ownerName' | 'createdAt'>) => {
    if (!isAuthenticated) {
      setAuthType('login');
      setIsAuthModalOpen(true);
      return;
    }

    // In a real app, this would make an API call
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
      ownerId: user?.id || '',
      ownerName: user?.name || '',
      createdAt: new Date(),
    };

    setBooks(prev => [newBook, ...prev]);
  };

  const handleRequestBook = (bookId: string) => {
    if (!isAuthenticated) {
      setAuthType('login');
      setIsAuthModalOpen(true);
      return;
    }

    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setIsRequestModalOpen(true);
    }
  };

  const handleSubmitRequest = (request: Partial<BookRequest>) => {
    // Book request submitted successfully

    // Update the book status to Reserved
    setBooks(prev =>
      prev.map(book =>
        book.id === request.bookId
          ? { ...book, status: 'Reserved' }
          : book
      )
    );
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = (userData: Partial<User>) => {
    updateProfile(userData);
  };

  const handleContactUser = () => {
    if (!isAuthenticated) {
      setAuthType('login');
      setIsAuthModalOpen(true);
      return;
    }
    // In a real app, this would open a messaging interface - open messages modal instead
    setShowMessages(true);
  };

  const handleSendMessage = (toUserId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || 'me',
      receiverId: toUserId,
      content,
      type: 'text',
      createdAt: new Date(),
      read: false,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleMarkMessageAsRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };


  // Filter books by user for profile view
  const userBooks = books.filter(book => book.ownerId === user?.id);

  // Show profile page if user clicked on profile
  if (showProfile && user) {
    return (
      <div className="min-h-screen bg-[#F7F3E3]">
        <Header
          onLoginClick={() => {
            setAuthType('login');
            setIsAuthModalOpen(true);
          }}
          onSignupClick={() => {
            setAuthType('signup');
            setIsAuthModalOpen(true);
          }}
          onProfileClick={() => setShowProfile(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkNotificationAsRead}
          onMarkAllAsRead={handleMarkAllNotificationsAsRead}
          onDeleteNotification={handleDeleteNotification}
          onMessagesClick={() => setShowMessages(true)}
        />
         
        <UserProfile
          user={user}
          userBooks={userBooks}
          isOwnProfile={true}
          onEditProfile={handleEditProfile}
          onContactUser={handleContactUser}
        />
        
        <ProfileEditModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          user={user}
          onSave={handleSaveProfile}
        />
        
        <Footer />
        <MessagesModal
          isOpen={showMessages}
          onClose={() => setShowMessages(false)}
          messages={messages}
          currentUser={user}
          onSendMessage={handleSendMessage}
          onMarkAsRead={handleMarkMessageAsRead}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3E3]">
      <Header
        onLoginClick={() => {
          setAuthType('login');
          setIsAuthModalOpen(true);
        }}
        onSignupClick={() => {
          setAuthType('signup');
          setIsAuthModalOpen(true);
        }}
        onProfileClick={handleShowProfile}
        notifications={notifications}
        onMarkAsRead={handleMarkNotificationAsRead}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onDeleteNotification={handleDeleteNotification}
        onMessagesClick={() => setShowMessages(true)}
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


            <div className="flex flex-col items-center gap-3">
              <SearchBar onSearch={handleSearch} />
              <div className="mt-2 flex items-center space-x-3">
                <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="text-sm text-[#2D3142] border border-[#6C9A8B] px-3 py-1 rounded-md hover:bg-[#6C9A8B] hover:text-white transition-colors"
                >
                  {showAdvancedSearch ? 'Hide Advanced Search' : 'Advanced Search'}
                </button>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-3">
                Exchange books in major cities across Pakistan
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad'].map(city => (
                  <button
                    key={city}
                    onClick={() => handleSearch({ ...searchParams, city: city.toLowerCase() })}
                    className={`px-3 py-1 rounded-full text-sm ${
                      searchParams.city === city.toLowerCase()
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

        {/* Advanced Search */}
        {showAdvancedSearch && (
          <section className="py-8 md:py-8 px-4 md:px-6 max-w-7xl mx-auto">
            <AdvancedSearch
              availableGenres={[...new Set(books.map(b => b.genre))]}
              onSearch={handleAdvancedSearch}
            />
          </section>
        )}

        {/* Books Grid Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D3142]">Available Books</h2>
                <p className="text-gray-600 mt-1">Browse books available for exchange</p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-2">Sort by:</span>
                  <button className="flex items-center text-sm font-medium text-[#2D3142] border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50 transition-colors">
                    Newest First
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
                         
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <BookGrid books={filteredBooks} onRequestBook={handleRequestBook} />
                </div>

                <aside className="lg:col-span-1 space-y-6">
                  {/* Recommendations */}
                  {user && (
                    <UserRecommendations currentUser={user} allUsers={[]} />
                  )}

                  {/* Leaderboard */}
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold">Community</h3>
                      <button
                        onClick={() => setShowLeaderboard(!showLeaderboard)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        {showLeaderboard ? 'Hide' : 'Show'}
                      </button>
                    </div>

                    {showLeaderboard ? (
                      <CommunityLeaderboard currentUserId={user?.id} />
                    ) : (
                      <div className="text-sm text-gray-500">Leaderboard hidden — click Show to view community leaders</div>
                    )}
                  </div>
                </aside>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
                  <BookOpen className="h-12 w-12 text-[#C14953] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#2D3142] mb-2">No Books Found</h3>
                  <p className="text-gray-600">
                    We couldn't find any books matching your search criteria. Try adjusting your filters or add your own books to the exchange!
                  </p>
                  
                  <button
                    onClick={() => {
                      setSearchParams({ query: '', city: '' });
                    }}
                    className="mt-4 px-4 py-2 bg-[#6C9A8B] text-white rounded-md hover:bg-[#5a7f73] transition-colors inline-flex items-center"
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
                onClick={() => {
                  if (!isAuthenticated) {
                    setAuthType('signup');
                    setIsAuthModalOpen(true);
                  }
                }}
                className="px-6 py-3 bg-[#C14953] text-white rounded-md hover:bg-[#a73f48] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C14953] focus:ring-offset-2"
              >
                {isAuthenticated ? 'Add Your Books' : 'Join The Community'}
              </button>
            </div>
          </div>
        </section>
      </main>


      <Footer />
      
      {/* Add Book Button */}
      <AddBookButton onAddBook={handleAddBook} />
      
      {/* Auth Modal */}
      <AuthForms
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        type={authType}
      />
      
      {/* Request Modal */}
      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        book={selectedBook}
        onSubmit={handleSubmitRequest}
      />

      <MessagesModal
        isOpen={showMessages}
        onClose={() => setShowMessages(false)}
        messages={messages}
        currentUser={user}
        onSendMessage={handleSendMessage}
        onMarkAsRead={handleMarkMessageAsRead}
      />
      
      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        user={user!}
        onSave={handleSaveProfile}
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