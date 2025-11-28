import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: Date.now().toString(),
        name: 'Test User',
        email,
        age: 25,
        city: 'Karachi',
        bio: 'Book lover and avid reader. Always excited to discover new stories and share knowledge through books.',
        avatar: '',
        phone: '',
        university: '',
        occupation: 'Student',
        favoriteGenres: ['Fiction', 'Biography', 'History'],
        readingGoals: 'Read 24 books this year and explore different genres from around the world.',
        socialLinks: {
          facebook: '',
          instagram: '',
          linkedin: '',
          twitter: ''
        },
        totalBooksShared: 5,
        totalBooksReceived: 3,
        rating: 4.8,
        totalReviews: 8,
        verified: true,
        lastActive: new Date(),
        joinedAt: new Date('2023-06-15'),
        preferences: {
          notifications: true,
          showEmail: false,
          showPhone: false,
          allowMessages: true
        }
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUser: User = {
        ...userData as User,
        id: Date.now().toString(),
        avatar: '',
        phone: '',
        university: '',
        occupation: '',
        favoriteGenres: [],
        readingGoals: '',
        socialLinks: {
          facebook: '',
          instagram: '',
          linkedin: '',
          twitter: ''
        },
        totalBooksShared: 0,
        totalBooksReceived: 0,
        rating: 5.0,
        totalReviews: 0,
        verified: false,
        lastActive: new Date(),
        joinedAt: new Date(),
        preferences: {
          notifications: true,
          showEmail: false,
          showPhone: false,
          allowMessages: true
        }
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
