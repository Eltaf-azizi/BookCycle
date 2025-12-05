// Test utilities - simplified to avoid import errors
import { Book, User } from '../types';

// Mock data factories
export const createMockBook = (overrides: Partial<Book> = {}): Book => {
  return {
    id: '1',
    title: 'Test Book',
    author: 'Test Author',
    genre: 'Fiction',
    condition: 'Good',
    cities: ['Test City'],
    status: 'Available',
    images: ['https://example.com/book.jpg'],
    ownerNames: ['Test Owner'],
    ownerId: 'owner1',
    createdAt: new Date('2023-01-01'),
    ...overrides,
  };
};

export const createMockUser = (overrides: Partial<User> = {}): User => {
  return {
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
  };
};

// Simple test helpers
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateId = () => Math.random().toString(36).substr(2, 9);

console.log('Test utilities loaded');