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
      cities: ['Karachi', 'Lahore', 'Islamabad'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg'],
      ownerNames: ['Fatima Khan', 'Ahmed Raza', 'Saad Ali']
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
      ownerNames: ['Dr. Ahmed Raza', 'Muhammad Hassan']
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
      ownerNames: ['Saad Ali', 'Bilal Khan', 'Sara Begum']
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
      ownerNames: ['Bilal Ahmad', 'Hassan Raza']
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
      ownerNames: ['Sara Begum', 'Samreen Bibi', 'Arifullah Khan']
    },
    {
      id: '6',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic Fiction',
      condition: 'Good',
      cities: ['Faisalabad', 'Multan', 'Sargodha'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg'],
      ownerNames: ['Muhammad Usman', 'Aisha Malik', 'Tariq Mahmood']
    },
    {
      id: '7',
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      genre: 'Fantasy',
      condition: 'Like New',
      cities: ['Multan', 'Bahawalpur', 'Kasur'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg'],
      ownerNames: ['Aisha Malik', 'Imran Khan', 'Kausar Ali']
    },
    {
      id: '8',
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      genre: 'Self-Help',
      condition: 'Good',
      cities: ['Rawalpindi', 'Gujranwala', 'Sialkot'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg'],
      ownerNames: ['Khalid Hussain', 'Zainab Sheikh', 'Rubina Khan']
    },
    {
      id: '9',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Coming of Age',
      condition: 'Worn',
      cities: ['Gujranwala', 'Jhang', 'Sheikhupura'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg'],
      ownerNames: ['Zainab Sheikh', 'Ali Hassan', 'Rashid Ahmed']
    },
    {
      id: '10',
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      genre: 'Finance',
      condition: 'Good',
      cities: ['Hyderabad', 'Sukkur', 'Larkana'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9781611634095-L.jpg'],
      ownerNames: ['Farhan Ali', 'Nadia Ahmad', 'Yasir Ahmed']
    },
    {
      id: '11',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Philosophy',
      condition: 'Like New',
      cities: ['Sialkot', 'Gujrat', 'Chiniot'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg'],
      ownerNames: ['Rubina Khan', 'Muhammad Ali', 'Khalida Bibi']
    },
    {
      id: '12',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: 'History',
      condition: 'Good',
      cities: ['Sargodha', 'Mianwali', 'Khushab'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780062316110-L.jpg'],
      ownerNames: ['Tariq Mahmood', 'Ijaz Ahmad', 'Shama Parveen']
    },
    {
      id: '13',
      title: 'The Diary of a Young Girl',
      author: 'Anne Frank',
      genre: 'Biography',
      condition: 'Good',
      cities: ['Sukkur', 'Nawabshah', 'Mirpurkhas'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780553577129-L.jpg'],
      ownerNames: ['Nadia Ahmad', 'Omer Farooq', 'Sana Ullah']
    },
    {
      id: '14',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      condition: 'Like New',
      cities: ['Bahawalpur', 'Dera Ghazi Khan', 'Rajanpur'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg'],
      ownerNames: ['Imran Khan', 'Shahzad Ahmad', 'Fouzia Begum']
    },
    {
      id: '15',
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-Help',
      condition: 'Good',
      cities: ['Mardan', 'Nowshera', 'Swabi'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg'],
      ownerNames: ['Samreen Bibi', 'Khalid Khan', 'Nasir Hassan']
    },
    {
      id: '16',
      title: 'The Girl with the Dragon Tattoo',
      author: 'Stieg Larsson',
      genre: 'Mystery',
      condition: 'Worn',
      cities: ['Mingora', 'Chitral', 'Dir'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780307454546-L.jpg'],
      ownerNames: ['Arifullah Khan', 'Madiha Fatima', 'Gul Hassan']
    },
    {
      id: '17',
      title: 'Steve Jobs',
      author: 'Walter Isaacson',
      genre: 'Biography',
      condition: 'Good',
      cities: ['Gwadar', 'Khuzdar', 'Turbat'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg'],
      ownerNames: ['Hassan Raza', 'Fouzia Begum', 'Shahid Khan']
    },
    {
      id: '18',
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      genre: 'Spirituality',
      condition: 'Like New',
      cities: ['Kohat', 'Bannu', 'Dera Ismail Khan'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg'],
      ownerNames: ['Saima Khan', 'Rizwan Ali', 'Bushra Khan']
    },
    {
      id: '19',
      title: 'Gone Girl',
      author: 'Gillian Flynn',
      genre: 'Thriller',
      condition: 'Good',
      cities: ['Larkana', 'Khairpur', 'Shikarpur'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780307588364-L.jpg'],
      ownerNames: ['Yasir Ahmed', 'Mariam Khan', 'Nasir Khan']
    },
    {
      id: '20',
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      genre: 'Self-Help',
      condition: 'Good',
      cities: ['Khuzdar', 'Lasbela', 'Kharan'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg'],
      ownerNames: ['Fouzia Begum', 'Shahid Khan', 'Maria Bibi']
    },
    {
      id: '21',
      title: 'A Game of Thrones',
      author: 'George R.R. Martin',
      genre: 'Fantasy',
      condition: 'Like New',
      cities: ['Turbat', 'Chaman', 'Kech'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780553103540-L.jpg'],
      ownerNames: ['Shahid Khan', 'Madiha Fatima', 'Gul Khan']
    },
    {
      id: '22',
      title: 'The Lean Startup',
      author: 'Eric Ries',
      genre: 'Business',
      condition: 'Good',
      cities: ['Bannu', 'Hangu', 'Karak'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg'],
      ownerNames: ['Rizwan Ali', 'Shahzad Ahmad', 'Khalid Khan']
    },
    {
      id: '23',
      title: 'Educated',
      author: 'Tara Westover',
      genre: 'Memoir',
      condition: 'Good',
      cities: ['Abbottabad', 'Mansehra', 'Haripur'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg'],
      ownerNames: ['Bushra Khan', 'Saima Bibi', 'Rashid Ali']
    },
    {
      id: '24',
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      genre: 'Mystery',
      condition: 'Worn',
      cities: ['Nawabshah', 'Badin', 'Thatta'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780307277670-L.jpg'],
      ownerNames: ['Omer Farooq', 'Sana Bibi', 'Ali Hassan']
    },
    {
      id: '25',
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Science Fiction',
      condition: 'Good',
      cities: ['Mirpurkhas', 'Umerkot', 'Tharparkar'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg'],
      ownerNames: ['Sana Ullah', 'Mariam Khan', 'Fouzia Bibi']
    },
    {
      id: '26',
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen Covey',
      genre: 'Self-Help',
      condition: 'Like New',
      cities: ['Kasur', 'Nankana Sahib', 'Chiniot'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9781451639612-L.jpg'],
      ownerNames: ['Kausar Ali', 'Muhammad Ali', 'Rubina Khan']
    },
    {
      id: '27',
      title: 'It',
      author: 'Stephen King',
      genre: 'Horror',
      condition: 'Good',
      cities: ['Chitral', 'Ghizer', 'Skardu'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9781501142970-L.jpg'],
      ownerNames: ['Madiha Fatima', 'Gul Hassan', 'Shirin Bibi']
    },
    {
      id: '28',
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      genre: 'Finance',
      condition: 'Good',
      cities: ['Dera Ghazi Khan', 'Layyah', 'Muzaffargarh'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780060555665-L.jpg'],
      ownerNames: ['Shahzad Ahmad', 'Mariam Khan', 'Ali Raza']
    },
    {
      id: '29',
      title: 'The Secret',
      author: 'Rhonda Byrne',
      genre: 'Self-Help',
      condition: 'Worn',
      cities: ['Jacobabad', 'Ghotki', 'Kashmore'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9781582702707-L.jpg'],
      ownerNames: ['Mariam Khan', 'Shahzad Ahmed', 'Fouzia Bibi']
    },
    {
      id: '30',
      title: 'Outlander',
      author: 'Diana Gabaldon',
      genre: 'Historical Fiction',
      condition: 'Good',
      cities: ['Shikarpur', 'Kashmore', 'Kandhkot'],
      status: 'Available',
      images: ['https://covers.openlibrary.org/b/isbn/9780385721230-L.jpg'],
      ownerNames: ['Nasir Khan', 'Fouzia Bibi', 'Muhammad Ali']
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
      filtered = filtered.filter(book => 
        book.cities.some(city => city.toLowerCase() === searchCity.toLowerCase())
      );
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
                        <div className="text-sm text-gray-600">
                          📍 {book.cities.length === 1 ? book.cities[0] : `${book.cities[0]} +${book.cities.length - 1} more`}
                        </div>
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
