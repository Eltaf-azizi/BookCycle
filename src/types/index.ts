export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  city: string;
  bio?: string;
  rating: number;
  joinedAt: Date;
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
}