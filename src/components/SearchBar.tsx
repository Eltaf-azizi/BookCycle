import { Search, MapPin } from 'lucide-react';
import { pakistanCities } from '../types';

interface SearchBarProps {
  onSearch: (params: { query: string; city: string; }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, city });
  };
  
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 md:gap-0">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for books by title, author, or genre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-3 border-2 border-[#6C9A8B] rounded-lg md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-[#6C9A8B] focus:border-transparent"
          />
        </div>
        
        <div className="relative md:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full pl-10 pr-3 py-3 border-2 border-[#6C9A8B] md:border-l-0 rounded-lg md:rounded-l-none focus:outline-none focus:ring-2 focus:ring-[#6C9A8B] focus:border-transparent appearance-none bg-white"
          >
            <option value="">All Cities</option>
            {pakistanCities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          className="bg-[#C14953] hover:bg-[#a73f48] text-white py-3 px-6 rounded-lg md:rounded-l-none transition-colors duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;