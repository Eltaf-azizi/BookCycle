import React, { useState, useEffect } from 'react';
import { BookOpen, Bell } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import AuthForms from './components/AuthForms';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';
import AddBookButton from './components/AddBookButton';
import RequestModal from './components/RequestModal';
import MessagesModal from './components/MessagesModal';
import UserProfileModal from './components/UserProfileModal';
import NotificationSystem from './components/NotificationSystem';
import CommunityLeaderboard from './components/CommunityLeaderboard';
import Footer from './components/Footer';
import { Book, BookRequest, Message, Notification, User } from './types';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  
  // Modal states
  const [authModalType, setAuthModalType] = useState<'login' | 'signup' | 'otp' | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // App state
  const [books, setBooks] = useState<Book[]>([
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
  const [mockNotifications, setMockNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: user?.id || 'demo-user',
      type: 'book_request',
      title: 'New Book Request',
      message: 'Someone requested "The Kite Runner" from your collection',
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      metadata: { requestId: 'req1', bookId: '1' }
    },
    {
      id: '2',
      userId: user?.id || 'demo-user',
      type: 'request_accepted',
      title: 'Request Accepted',
      message: 'Your request for "1984" has been accepted!',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      metadata: { requestId: 'req2', bookId: '5' }
    },
    {
      id: '3',
      userId: user?.id || 'demo-user',
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'Welcome to BookCycle! You\'ve earned the "New Member" badge.',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      metadata: { achievement: 'new_member' }
    }
  ]);

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
  
  // Auth modal handlers
  const handleLoginClick = () => {
    setAuthModalType('login');
    setIsAuthModalOpen(true);
  };

  const handleSignupClick = () => {
    setAuthModalType('signup');
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    setAuthModalType(null);
  };

  // Request handlers
  const handleRequestBook = (bookId: string) => {
    if (!isAuthenticated) {
      handleLoginClick();
      return;
    }

    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setIsRequestModalOpen(true);
    }
  };

  const handleRequestSubmit = (request: Partial<BookRequest>) => {
    if (!user || !selectedBook) return;

    const newRequest: BookRequest = {
      id: Date.now().toString(),
      bookId: selectedBook.id,
      requesterId: user.id,
      requesterName: user.name,
      ownerId: selectedBook.ownerId,
      status: 'Pending',
      message: request.message || '',
      createdAt: new Date()
    };

    setMockRequests([...mockRequests, newRequest]);
    
    // Create notification for book owner
    const notification: Notification = {
      id: Date.now().toString(),
      userId: selectedBook.ownerId,
      type: 'book_request',
      title: 'New Book Request',
      message: `${user.name} requested "${selectedBook.title}"`,
      createdAt: new Date(),
      read: false,
      metadata: { requestId: newRequest.id, bookId: selectedBook.id }
    };

    setMockNotifications([...mockNotifications, notification]);
    setSelectedBook(null);
  };

  const handleMessagesClick = () => {
    if (!isAuthenticated) {
      handleLoginClick();
      return;
    }
    setIsMessagesModalOpen(true);
  };

  const handleSendMessage = (toUserId: string, content: string) => {
    if (!user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: toUserId,
      content,
      createdAt: new Date(),
      read: false,
      type: 'text'
    };

    setMockMessages([...mockMessages, newMessage]);
  };

  const handleMarkAsRead = (messageId: string) => {
    setMockMessages(messages => 
      messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const handleMarkAsReadNotification = (notificationId: string) => {
    setMockNotifications(notifications => 
      notifications.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setMockNotifications(notifications => 
      notifications.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleDeleteNotification = (notificationId: string) => {
    setMockNotifications(notifications => 
      notifications.filter(notif => notif.id !== notificationId)
    );
  };

  const handleAddBook = (bookData: any) => {
    // Add the new book to the books array
    const newBook: Book = {
      id: Date.now().toString(),
      ...bookData,
      images: bookData.images || ['https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg'],
      ownerId: user?.id || 'unknown',
      ownerNames: user?.name ? [user.name] : ['Unknown'],
      cities: bookData.city ? [bookData.city] : [],
      status: 'Available',
      createdAt: new Date()
    };

    // Update the books state with the new book
    setBooks(prevBooks => [...prevBooks, newBook]);
    console.log('New book added:', newBook);
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      handleLoginClick();
      return;
    }
    setIsProfileModalOpen(true);
  };

  const handleUpdateUser = (updatedUser: Partial<User>) => {
    // In a real app, this would update the user in the backend
    console.log('User updated:', updatedUser);
  };

  const handleSearch = ({ query, city }: { query: string; city: string }) => {
    setSearchQuery(query);
    setSearchCity(city);
  };

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
        
        {/* Community & Notifications Section */}
        <section className="py-12 md:py-16 bg-[#F7F3E3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2D3142]">Community Activity</h2>
              <p className="text-gray-600 mt-1">Stay connected with the BookCycle community</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Community Leaderboard */}
              <div className="lg:col-span-2">
                <CommunityLeaderboard currentUserId={user?.id} />
              </div>
              
              {/* Notifications Widget */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-[#2D3142] mb-4 flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-[#C14953]" />
                    Recent Notifications
                  </h3>
                  {isAuthenticated && mockNotifications.length > 0 ? (
                    <NotificationSystem
                      notifications={mockNotifications}
                      onMarkAsRead={handleMarkAsReadNotification}
                      onMarkAllAsRead={handleMarkAllAsRead}
                      onDeleteNotification={handleDeleteNotification}
                    />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No notifications yet</p>
                      <p className="text-sm mt-1">Activity will appear here</p>
                    </div>
                  )}
                </div>
              </div>
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

      {/* User Profile Modal */}
      {user && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
          userBooks={books.filter(book => book.ownerId === user.id)}
          onUpdateUser={handleUpdateUser}
          onContactUser={() => setIsMessagesModalOpen(true)}
        />
      )}
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
