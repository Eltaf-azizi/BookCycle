import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { vi } from 'vitest';
import { AuthProvider } from '../contexts/AuthContext';

// Custom render function that includes providers
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

// Test data factories
export const createMockBook = (overrides = {}) => ({
  id: '1',
  title: 'Test Book',
  author: 'Test Author',
  genre: 'Fiction',
  condition: 'Good' as const,
  cities: ['Test City'],
  status: 'Available' as const,
  images: ['https://example.com/book.jpg'],
  ownerNames: ['Test Owner'],
  ownerId: 'owner1',
  createdAt: new Date('2023-01-01'),
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  age: 25,
  city: 'Test City',
  bio: 'Test bio',
  avatar: '',
  phone: '',
  university: '',
  occupation: '',
  favoriteGenres: ['Fiction'],
  readingGoals: 'Test goals',
  socialLinks: {
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  },
  totalBooksShared: 5,
  totalBooksReceived: 3,
  rating: 4.8,
  totalReviews: 8,
  verified: false,
  lastActive: new Date(),
  joinedAt: new Date('2023-01-01'),
  preferences: {
    notifications: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,
  },
  exchangePreferences: {
    preferredMeetingAreas: [],
    preferredMeetingTimes: [],
    transportationOptions: [],
    exchangeMethods: ['In-Person'],
    responseTime: 'Within 24 hours',
    availabilitySchedule: '',
  },
  trustAndSafety: {
    identityVerified: false,
    phoneVerified: false,
    emailVerified: true,
    safetyRating: 5.0,
    safetyReviews: 0,
  },
  languages: ['English'],
  timezone: 'Asia/Karachi',
  profileCompleteness: 75,
  achievements: {
    firstBookShared: true,
    helpfulReviewer: false,
    quickResponder: true,
    trustedTrader: false,
    genreExplorer: false,
    communityHelper: false,
  },
  badges: ['Early Adopter'],
  location: {
    latitude: 24.8607,
    longitude: 67.0011,
    preferredSpots: ['Test Area'],
  },
  stats: {
    booksExchanged: 8,
    successfulTrades: 7,
    averageResponseTime: 4.5,
    communityRank: 23,
  },
  ...overrides,
});

export const createMockNotification = (overrides = {}) => ({
  id: '1',
  userId: '1',
  type: 'book_request' as const,
  title: 'Test Notification',
  message: 'Test message',
  createdAt: new Date(),
  read: false,
  metadata: {},
  ...overrides,
});

// Helper to mock localStorage
export const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();