import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Book, Users, Clock, Award } from 'lucide-react';
import { Book as BookType, User } from '../types';
import { pakistanCities } from '../types';

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  availableGenres: string[];
}

export interface SearchFilters {
  query: string;
  city: string;
  genre: string;
  condition: string;
  availability: string;
  userRating: number;
  responseTime: string;
  verifiedOnly: boolean;
  bookCount: string;
  distance: number;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch, availableGenres }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    city: '',
    genre: '',
    condition: '',
    availability: 'Available',
    userRating: 0,
    responseTime: '',
    verifiedOnly: false,
    bookCount: '',
    distance: 50,
  });

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      query: '',
      city: '',
      genre: '',
      condition: '',
      availability: 'Available',
      userRating: 0,
      responseTime: '',
      verifiedOnly: false,
      bookCount: '',
      distance: 50,
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'availability' && value === 'Available') return false;
    if (key === 'distance' && value === 50) return false;
    if (key === 'userRating' && value === 0) return false;
    return value !== '' && value !== false;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#2D3142] flex items-center">
          <Search className="h-5 w-5 mr-2" />
          Advanced Search
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-[#C14953] hover:text-[#a73f48] text-sm font-medium"
        >
          <Filter className="h-4 w-4 mr-1" />
          {isExpanded ? 'Less Filters' : 'More Filters'}
        </button>
      </div>

      {/* Basic Search */}
      <div className="mb-4">
        <div className="flex space-x-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search books, authors, or users..."
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
            />
          </div>
          <div className="w-48">
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
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
            onClick={handleSearch}
            className="px-6 py-2 bg-[#C14953] text-white rounded-md hover:bg-[#a73f48] transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Active Filters Indicator */}
      {hasActiveFilters && (
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.city && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  City: {pakistanCities.find(c => c.id === filters.city)?.name}
                </span>
              )}
              {filters.genre && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                  Genre: {filters.genre}
                </span>
              )}
              {filters.condition && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                  Condition: {filters.condition}
                </span>
              )}
              {filters.userRating > 0 && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                  Rating: {filters.userRating}+
                </span>
              )}
              {filters.verifiedOnly && (
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
                  Verified Only
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Book Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre
              </label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
              >
                <option value="">All Genres</option>
                {availableGenres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition
              </label>
              <select
                value={filters.condition}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
              >
                <option value="">Any Condition</option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Worn">Worn</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
              >
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Given Away">Given Away</option>
              </select>
            </div>

            {/* User Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min User Rating
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.userRating}
                  onChange={(e) => handleFilterChange('userRating', parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-8">
                  {filters.userRating}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Time
              </label>
              <select
                value={filters.responseTime}
                onChange={(e) => handleFilterChange('responseTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
              >
                <option value="">Any Response Time</option>
                <option value="Within 1 hour">Within 1 hour</option>
                <option value="Within 6 hours">Within 6 hours</option>
                <option value="Within 24 hours">Within 24 hours</option>
                <option value="Within 2 days">Within 2 days</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (km)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={filters.distance}
                  onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-12">
                  {filters.distance}km
                </span>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mt-4 flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.verifiedOnly}
                onChange={(e) => handleFilterChange('verifiedOnly', e.target.checked)}
                className="mr-2 h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Verified users only</span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User's Book Collection
              </label>
              <select
                value={filters.bookCount}
                onChange={(e) => handleFilterChange('bookCount', e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
              >
                <option value="">Any size</option>
                <option value="1-5">1-5 books</option>
                <option value="6-20">6-20 books</option>
                <option value="21-50">21-50 books</option>
                <option value="50+">50+ books</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;