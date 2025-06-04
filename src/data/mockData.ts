import { Book, BookRequest, Message } from '../types';

// Mock Books Data
export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    isbn: '9781594631931',
    condition: 'Like New',
    genre: 'Fiction',
    description: 'A sweeping story of family, love, and friendship told against the devastating backdrop of the history of Afghanistan over the last thirty years.',
    images: [
      'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    ownerId: '2',
    ownerName: 'Fatima Khan',
    city: 'Karachi',
    status: 'Available',
    createdAt: new Date('2023-07-10'),
  },
  {
    id: '2',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    isbn: '9780553380163',
    condition: 'Good',
    genre: 'Non-Fiction',
    description: 'A landmark volume in science writing by one of the great minds of our time.',
    images: [
      'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    ownerId: '3',
    ownerName: 'Ahmed Raza',
    city: 'Lahore',
    status: 'Available',
    createdAt: new Date('2023-08-15'),
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780061120084',
    condition: 'Worn',
    genre: 'Fiction',
    description: 'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.',
    images: [
      'https://images.pexels.com/photos/3747512/pexels-photo-3747512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    ownerId: '4',
    ownerName: 'Saad Ali',
    city: 'Islamabad',
    status: 'Available',
    createdAt: new Date('2023-09-02'),
  },
  {
    id: '4',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '9780062315007',
    condition: 'New',
    genre: 'Fiction',
    description: 'A fable about following your dream.',
    images: [
      'https://images.pexels.com/photos/3747497/pexels-photo-3747497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    ownerId: '5',
    ownerName: 'Amina Malik',
    city: 'Karachi',
    status: 'Available',
    createdAt: new Date('2023-10-20'),
  },
  {
    id: '5',
    title: 'Fundamentals of Physics',
    author: 'Jearl Walker, David Halliday, Robert Resnick',
    isbn: '9781118230718',
    condition: 'Good',
    genre: 'Academic',
    description: 'Comprehensive university-level physics textbook.',
    images: [
      'https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    ownerId: '1',
    ownerName: 'Ali Ahmed',
    city: 'Lahore',
    status: 'Available',
    createdAt: new Date('2023-11-05'),
  },
  {
    id: '6',
    title: 'The Forty Rules of Love',
    author: 'Elif Shafak',
    isbn: '9780241972939',
    condition: 'Like New',
    genre: 'Fiction',
    description: 'A novel within a novel, exploring the philosophy of Rumi through parallel narratives.',
    images: [
      'https://images.pexels.com/photos/904620/pexels-photo-904620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    ownerId: '6',
    ownerName: 'Zainab Hassan',
    city: 'Islamabad',
    status: 'Available',
    createdAt: new Date('2023-12-15'),
  }
];];

// Mock Book Requests
export const MOCK_REQUESTS: BookRequest[] = [
  {
    id: '1',
    bookId: '1',
    requesterId: '1',
    requesterName: 'Ali Ahmed',
    ownerId: '2',
    status: 'Pending',
    message: 'I would love to read this book. I can meet in DHA Phase 5 or arrange pickup.',
    createdAt: new Date('2023-12-20'),
  },
  {
    id: '2',
    bookId: '2',
    requesterId: '1',
    requesterName: 'Ali Ahmed',
    ownerId: '3',
    status: 'Accepted',
    message: 'I\'ve been looking for this book for my physics studies!',
    createdAt: new Date('2023-12-10'),
  }
];
