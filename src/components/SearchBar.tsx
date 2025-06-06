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