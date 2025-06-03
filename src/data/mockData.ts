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