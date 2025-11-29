export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  city: string;
  bio?: string;
  avatar?: string;
  phone?: string;
  university?: string;
  occupation?: string;
  favoriteGenres?: string[];
  readingGoals?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  totalBooksShared: number;
  totalBooksReceived: number;
  rating: number;
  totalReviews: number;
  verified: boolean;
  lastActive: Date;
  joinedAt: Date;
  preferences: {
    notifications: boolean;
    showEmail: boolean;
    showPhone: boolean;
    allowMessages: boolean;
  };
  // Enhanced fields for better book exchanges
  exchangePreferences: {
    preferredMeetingAreas?: string[];
    preferredMeetingTimes?: string[];
    transportationOptions?: string[];
    exchangeMethods?: string[];
    responseTime?: string;
    availabilitySchedule?: string;
  };
  trustAndSafety: {
    identityVerified: boolean;
    phoneVerified: boolean;
    emailVerified: boolean;
    idDocument?: string;
    emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    };
    safetyRating?: number;
    safetyReviews?: number;
  };
  languages?: string[];
  timezone?: string;
  profileCompleteness: number;
  // Additional enhancement fields
  achievements?: {
    firstBookShared: boolean;
    helpfulReviewer: boolean;
    quickResponder: boolean;
    trustedTrader: boolean;
    genreExplorer: boolean;
    communityHelper: boolean;
  };
  badges?: string[];
  location?: {
    latitude?: number;
    longitude?: number;
    preferredSpots?: string[];
  };
  stats?: {
    booksExchanged: number;
    successfulTrades: number;
    averageResponseTime: number;
    communityRank: number;
  };
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  condition: 'New' | 'Like New' | 'Good' | 'Worn';
  genre: string;
  description?: string;
  images: string[];
  ownerId: string;
  ownerName: string;
  city: string;
  exactLocation?: string;
  status: 'Available' | 'Reserved' | 'Given Away';
  createdAt: Date;
}

export interface BookRequest {
  id: string;
  bookId: string;
  requesterId: string;
  requesterName: string;
  ownerId: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
  message?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  read: boolean;
  type: 'text' | 'system' | 'exchange_request' | 'exchange_update';
  attachments?: string[];
  replyTo?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'book_request' | 'request_accepted' | 'message' | 'book_shared' | 'achievement' | 'reminder';
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: any;
}

export interface ExchangeTracking {
  id: string;
  bookId: string;
  requesterId: string;
  ownerId: string;
  status: 'initiated' | 'agreed' | 'in_transit' | 'completed' | 'cancelled';
  milestones: {
    time: Date;
    status: string;
    note?: string;
  }[];
  meetingDetails?: {
    location: string;
    time: Date;
    confirmed: boolean;
  };
  rating?: {
    requester: number;
    owner: number;
    review?: string;
  };
}

export interface UserRecommendation {
  userId: string;
  score: number;
  reasons: string[];
  bookMatches?: Book[];
  locationDistance?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'sharing' | 'community' | 'exploration' | 'reliability';
  requirement: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface CommunityLeaderboard {
  userId: string;
  name: string;
  avatar?: string;
  points: number;
  rank: number;
  category: 'books_shared' | 'quick_response' | 'community_help' | 'overall';
}


export interface City {
  id: string;
  name: string;
}


export const pakistanCities: City[] = [
  { id: 'karachi', name: 'Karachi' },
  { id: 'lahore', name: 'Lahore' },
  { id: 'islamabad', name: 'Islamabad' },
  { id: 'rawalpindi', name: 'Rawalpindi' },
  { id: 'faisalabad', name: 'Faisalabad' },
  { id: 'multan', name: 'Multan' },
  { id: 'peshawar', name: 'Peshawar' },
  { id: 'quetta', name: 'Quetta' },
  { id: 'sialkot', name: 'Sialkot' },
  { id: 'gujranwala', name: 'Gujranwala' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'abbottabad', name: 'Abbottabad' },
];
