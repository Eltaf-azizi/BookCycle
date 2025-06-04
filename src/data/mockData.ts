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