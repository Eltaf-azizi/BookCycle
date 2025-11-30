import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';

function App() {
  const [books] = useState([
    {
      id: '1',
      title: 'The Kite Runner',
      author: 'Khaled Hosseini',
      genre: 'Fiction',
      condition: 'Like New',
      city: 'Karachi',
      status: 'Available',
      images: ['https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg'],
      ownerName: 'Fatima Khan'
    },
    {
      id: '2',
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      genre: 'Non-Fiction',
      condition: 'Good',
      city: 'Lahore',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg'],
      ownerName: 'Ahmed Raza'
    },
    {
      id: '3',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      condition: 'Worn',
      city: 'Islamabad',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3747512/pexels-photo-3747512.jpeg'],
      ownerName: 'Saad Ali'
    },
    {
      id: '4',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      condition: 'Good',
      city: 'Quetta',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3747201/pexels-photo-3747201.jpeg'],
      ownerName: 'Bilal Ahmad'
    },
    {
      id: '5',
      title: '1984',
      author: 'George Orwell',
      genre: 'Science Fiction',
      condition: 'Like New',
      city: 'Peshawar',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3747555/pexels-photo-3747555.jpeg'],
      ownerName: 'Sara Begum'
    },
    {
      id: '6',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic Fiction',
      condition: 'Good',
      city: 'Faisalabad',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3747119/pexels-photo-3747119.jpeg'],
      ownerName: 'Muhammad Usman'
    },
    {
      id: '7',
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      genre: 'Fantasy',
      condition: 'Like New',
      city: 'Multan',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3747177/pexels-photo-3747177.jpeg'],
      ownerName: 'Aisha Malik'
    },
    {
      id: '8',
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      genre: 'Self-Help',
      condition: 'Good',
      city: 'Rawalpindi',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3747208/pexels-photo-3747208.jpeg'],
      ownerName: 'Khalid Hussain'
    },
    {
      id: '9',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Coming of Age',
      condition: 'Worn',
      city: 'Gujranwala',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3747046/pexels-photo-3747046.jpeg'],
      ownerName: 'Zainab Sheikh'
    },
    {
      id: '10',
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      genre: 'Finance',
      condition: 'Good',
      city: 'Hyderabad',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3747054/pexels-photo-3747054.jpeg'],
      ownerName: 'Farhan Ali'
    },
    {
      id: '11',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Philosophy',
      condition: 'Like New',
      city: 'Sialkot',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746974/pexels-photo-3746974.jpeg'],
      ownerName: 'Rubina Khan'
    },
    {
      id: '12',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: 'History',
      condition: 'Good',
      city: 'Sargodha',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746947/pexels-photo-3746947.jpeg'],
      ownerName: 'Tariq Mahmood'
    },
    {
      id: '13',
      title: 'The Diary of a Young Girl',
      author: 'Anne Frank',
      genre: 'Biography',
      condition: 'Good',
      city: 'Sukkur',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746898/pexels-photo-3746898.jpeg'],
      ownerName: 'Nadia Ahmad'
    },
    {
      id: '14',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      condition: 'Like New',
      city: 'Bahawalpur',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746818/pexels-photo-3746818.jpeg'],
      ownerName: 'Imran Khan'
    },
    {
      id: '15',
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-Help',
      condition: 'Good',
      city: 'Mardan',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746782/pexels-photo-3746782.jpeg'],
      ownerName: 'Samreen Bibi'
    },
    {
      id: '16',
      title: 'The Girl with the Dragon Tattoo',
      author: 'Stieg Larsson',
      genre: 'Mystery',
      condition: 'Worn',
      city: 'Mingora',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746775/pexels-photo-3746775.jpeg'],
      ownerName: 'Arifullah Khan'
    },
    {
      id: '17',
      title: 'Steve Jobs',
      author: 'Walter Isaacson',
      genre: 'Biography',
      condition: 'Good',
      city: 'Gwadar',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746741/pexels-photo-3746741.jpeg'],
      ownerName: 'Hassan Raza'
    },
    {
      id: '18',
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      genre: 'Spirituality',
      condition: 'Like New',
      city: 'Kohat',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746733/pexels-photo-3746733.jpeg'],
      ownerName: 'Saima Khan'
    },
    {
      id: '19',
      title: 'Gone Girl',
      author: 'Gillian Flynn',
      genre: 'Thriller',
      condition: 'Good',
      city: 'Larkana',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746725/pexels-photo-3746725.jpeg'],
      ownerName: 'Yasir Ahmed'
    },
    {
      id: '20',
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      genre: 'Self-Help',
      condition: 'Good',
      city: 'Khuzdar',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746706/pexels-photo-3746706.jpeg'],
      ownerName: 'Fouzia Begum'
    },
    {
      id: '21',
      title: 'A Game of Thrones',
      author: 'George R.R. Martin',
      genre: 'Fantasy',
      condition: 'Like New',
      city: 'Turbat',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746697/pexels-photo-3746697.jpeg'],
      ownerName: 'Shahid Khan'
    },
    {
      id: '22',
      title: 'The Lean Startup',
      author: 'Eric Ries',
      genre: 'Business',
      condition: 'Good',
      city: 'Bannu',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746679/pexels-photo-3746679.jpeg'],
      ownerName: 'Rizwan Ali'
    },
    {
      id: '23',
      title: 'Educated',
      author: 'Tara Westover',
      genre: 'Memoir',
      condition: 'Good',
      city: 'Abbottabad',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746662/pexels-photo-3746662.jpeg'],
      ownerName: 'Bushra Khan'
    },
    {
      id: '24',
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      genre: 'Mystery',
      condition: 'Worn',
      city: 'Nawabshah',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746651/pexels-photo-3746651.jpeg'],
      ownerName: 'Omer Farooq'
    },
    {
      id: '25',
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Science Fiction',
      condition: 'Good',
      city: 'Mirpurkhas',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746638/pexels-photo-3746638.jpeg'],
      ownerName: 'Sana Ullah'
    },
    {
      id: '26',
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen Covey',
      genre: 'Self-Help',
      condition: 'Like New',
      city: 'Kasur',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746629/pexels-photo-3746629.jpeg'],
      ownerName: 'Kausar Ali'
    },
    {
      id: '27',
      title: 'It',
      author: 'Stephen King',
      genre: 'Horror',
      condition: 'Good',
      city: 'Chitral',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746617/pexels-photo-3746617.jpeg'],
      ownerName: 'Madiha Fatima'
    },
    {
      id: '28',
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      genre: 'Finance',
      condition: 'Good',
      city: 'Dera Ghazi Khan',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746608/pexels-photo-3746608.jpeg'],
      ownerName: 'Shahzad Ahmad'
    },
    {
      id: '29',
      title: 'The Secret',
      author: 'Rhonda Byrne',
      genre: 'Self-Help',
      condition: 'Worn',
      city: 'Jacobabad',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746597/pexels-photo-3746597.jpeg'],
      ownerName: 'Mariam Khan'
    },
    {
      id: '30',
      title: 'Outlander',
      author: 'Diana Gabaldon',
      genre: 'Historical Fiction',
      condition: 'Good',
      city: 'Shikarpur',
      status: 'Available',
      images: ['https://images.pexels.com/photos/3746586/pexels-photo-3746586.jpeg'],
      ownerName: 'Nasir Khan'
    }
  ]);

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
      filtered = filtered.filter(book => book.city.toLowerCase() === searchCity.toLowerCase());
    }
    
    setFilteredBooks(filtered);
  }, [searchQuery, searchCity, books]);

  return (
    <div className="min-h-screen bg-[#F7F3E3]">
      {/* Header */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-[#C14953]" />
              <span className="ml-2 text-xl font-semibold text-[#2D3142]">
                BookCycle <span className="text-[#C14953]">Pakistan</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-[#2D3142] border border-[#6C9A8B] hover:bg-[#6C9A8B] hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Login
              </button>
              <button className="bg-[#C14953] text-white hover:bg-[#a73f48] px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

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
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search for books by title, author, or genre..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-3 py-3 border-2 border-[#6C9A8B] rounded-lg md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                  />
                </div>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="md:w-48 px-3 py-3 border-2 border-[#6C9A8B] md:border-l-0 rounded-lg md:rounded-l-none focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                >
                  <option value="">All Cities</option>
                  
                  {/* Punjab */}
                  <optgroup label="Punjab">
                    <option value="Lahore">Lahore</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Multan">Multan</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Sargodha">Sargodha</option>
                    <option value="Bahawalpur">Bahawalpur</option>
                    <option value="Jhang">Jhang</option>
                    <option value="Sheikhupura">Sheikhupura</option>
                    <option value="Gujrat">Gujrat</option>
                    <option value="Mardan">Mardan</option>
                    <option value="Kasur">Kasur</option>
                    <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                    <option value="Sahiwal">Sahiwal</option>
                    <option value="Nankana Sahib">Nankana Sahib</option>
                    <option value="Chiniot">Chiniot</option>
                    <option value="Mianwali">Mianwali</option>
                    <option value="Jhelum">Jhelum</option>
                    <option value="Chakwal">Chakwal</option>
                    <option value="Attock">Attock</option>
                  </optgroup>
                  
                  {/* Sindh */}
                  <optgroup label="Sindh">
                    <option value="Karachi">Karachi</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Sukkur">Sukkur</option>
                    <option value="Larkana">Larkana</option>
                    <option value="Nawabshah">Nawabshah</option>
                    <option value="Mirpurkhas">Mirpurkhas</option>
                    <option value="Jacobabad">Jacobabad</option>
                    <option value="Shikarpur">Shikarpur</option>
                    <option value="Khairpur">Khairpur</option>
                    <option value="Dadu">Dadu</option>
                    <option value="Thatta">Thatta</option>
                    <option value="Badin">Badin</option>
                    <option value="Umerkot">Umerkot</option>
                  </optgroup>
                  
                  {/* Khyber Pakhtunkhwa */}
                  <optgroup label="Khyber Pakhtunkhwa">
                    <option value="Peshawar">Peshawar</option>
                    <option value="Mingora">Mingora</option>
                    <option value="Kohat">Kohat</option>
                    <option value="Bannu">Bannu</option>
                    <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                    <option value="Abbottabad">Abbottabad</option>
                    <option value="Swabi">Swabi</option>
                    <option value="Nowshera">Nowshera</option>
                    <option value="Chitral">Chitral</option>
                  </optgroup>
                  
                  {/* Balochistan */}
                  <optgroup label="Balochistan">
                    <option value="Quetta">Quetta</option>
                    <option value="Gwadar">Gwadar</option>
                    <option value="Khuzdar">Khuzdar</option>
                    <option value="Turbat">Turbat</option>
                    <option value="Chaman">Chaman</option>
                    <option value="Hub">Hub</option>
                    <option value="Lasbela">Lasbela</option>
                    <option value="Kharan">Kharan</option>
                    <option value="Mastung">Mastung</option>
                    <option value="Kalat">Kalat</option>
                  </optgroup>
                  
                  {/* Islamabad & Azad Kashmir */}
                  <optgroup label="Islamabad & Azad Kashmir">
                    <option value="Islamabad">Islamabad</option>
                    <option value="Muzaffarabad">Muzaffarabad</option>
                    <option value="Mirpur">Mirpur</option>
                  </optgroup>
                  
                  {/* Gilgit-Baltistan */}
                  <optgroup label="Gilgit-Baltistan">
                    <option value="Gilgit">Gilgit</option>
                    <option value="Skardu">Skardu</option>
                  </optgroup>
                </select>
                <button className="bg-[#C14953] hover:bg-[#a73f48] text-white py-3 px-6 rounded-lg transition-colors">
                  Search
                </button>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-3">
                Exchange books in cities across all provinces of Pakistan
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'].map(city => (
                  <button
                    key={city}
                    onClick={() => setSearchCity(city.toLowerCase())}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={book.images[0]}
                      alt={book.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#2D3142] mb-1">{book.title}</h3>
                      <p className="text-gray-600 mb-2">by {book.author}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span className="bg-[#F7F3E3] px-2 py-1 rounded">{book.genre}</span>
                        <span>{book.condition}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">📍 {book.city}</span>
                        <button className="bg-[#6C9A8B] text-white px-3 py-1 rounded text-sm hover:bg-[#5a7f73] transition-colors">
                          Request
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              <button className="px-6 py-3 bg-[#C14953] text-white rounded-md hover:bg-[#a73f48] transition-colors">
                Join The Community
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2D3142] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-[#C14953]" />
              <span className="ml-2 text-lg font-semibold">
                BookCycle <span className="text-[#C14953]">Pakistan</span>
              </span>
            </div>
            <p className="text-gray-300">Share Books, Spread Knowledge</p>
            <p className="text-sm text-gray-400 mt-2">© 2023 BookCycle Pakistan. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add Book Button */}
      <button className="fixed right-6 bottom-6 md:right-10 md:bottom-10 bg-[#C14953] text-white rounded-full p-3 md:p-4 shadow-lg hover:bg-[#a73f48] transition-colors duration-200">
        <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
}

export default App;
