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
