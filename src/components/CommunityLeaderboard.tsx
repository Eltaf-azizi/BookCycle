import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users, Star, Book, MessageCircle } from 'lucide-react';
import { CommunityLeaderboard as LeaderboardType } from '../types';

interface CommunityLeaderboardProps {
  currentUserId?: string;
}

const CommunityLeaderboard: React.FC<CommunityLeaderboardProps> = ({ currentUserId }) => {
  const [activeCategory, setActiveCategory] = useState<'overall' | 'books_shared' | 'quick_response' | 'community_help'>('overall');

  // Mock leaderboard data
  const mockLeaderboards = {
    overall: [
      {
        userId: '1',
        name: 'Ali Ahmed',
        avatar: '',
        points: 2850,
        rank: 1,
        category: 'overall' as const,
      },
      {
        userId: '2',
        name: 'Fatima Khan',
        avatar: '',
        points: 2720,
        rank: 2,
        category: 'overall' as const,
      },
      {
        userId: '3',
        name: 'Ahmed Raza',
        avatar: '',
        points: 2590,
        rank: 3,
        category: 'overall' as const,
      },
      {
        userId: '4',
        name: 'Saad Ali',
        avatar: '',
        points: 2340,
        rank: 4,
        category: 'overall' as const,
      },
      {
        userId: '5',
        name: 'Amina Malik',
        avatar: '',
        points: 2180,
        rank: 5,
        category: 'overall' as const,
      },
    ],
    books_shared: [
      {
        userId: '2',
        name: 'Fatima Khan',
        avatar: '',
        points: 45,
        rank: 1,
        category: 'books_shared' as const,
      },
      {
        userId: '4',
        name: 'Saad Ali',
        avatar: '',
        points: 38,
        rank: 2,
        category: 'books_shared' as const,
      },
      {
        userId: '1',
        name: 'Ali Ahmed',
        avatar: '',
        points: 32,
        rank: 3,
        category: 'books_shared' as const,
      },
    ],
    quick_response: [
      {
        userId: '1',
        name: 'Ali Ahmed',
        avatar: '',
        points: 95,
        rank: 1,
        category: 'quick_response' as const,
      },
      {
        userId: '3',
        name: 'Ahmed Raza',
        avatar: '',
        points: 88,
        rank: 2,
        category: 'quick_response' as const,
      },
      {
        userId: '5',
        name: 'Amina Malik',
        avatar: '',
        points: 82,
        rank: 3,
        category: 'quick_response' as const,
      },
    ],
    community_help: [
      {
        userId: '2',
        name: 'Fatima Khan',
        avatar: '',
        points: 156,
        rank: 1,
        category: 'community_help' as const,
      },
      {
        userId: '4',
        name: 'Saad Ali',
        avatar: '',
        points: 142,
        rank: 2,
        category: 'community_help' as const,
      },
      {
        userId: '3',
        name: 'Ahmed Raza',
        avatar: '',
        points: 128,
        rank: 3,
        category: 'community_help' as const,
      },
    ],
  };

  const getCurrentLeaderboard = () => mockLeaderboards[activeCategory];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-orange-500" />;
      default:
        return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'overall':
        return <TrendingUp className="h-4 w-4" />;
      case 'books_shared':
        return <Book className="h-4 w-4" />;
      case 'quick_response':
        return <MessageCircle className="h-4 w-4" />;
      case 'community_help':
        return <Users className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'overall':
        return 'Overall Leaders';
      case 'books_shared':
        return 'Most Books Shared';
      case 'quick_response':
        return 'Quickest Responses';
      case 'community_help':
        return 'Community Helpers';
      default:
        return 'Leaders';
    }
  };

  const getScoreLabel = (category: string) => {
    switch (category) {
      case 'overall':
        return 'Points';
      case 'books_shared':
        return 'Books';
      case 'quick_response':
        return 'Score';
      case 'community_help':
        return 'Thanks';
      default:
        return 'Score';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (name: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#2D3142] flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          Community Leaderboard
        </h3>
        <span className="text-sm text-gray-500">This month</span>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['overall', 'books_shared', 'quick_response', 'community_help'] as const).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-[#C14953] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getCategoryIcon(category)}
            <span className="ml-1">{getCategoryTitle(category)}</span>
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        {getCurrentLeaderboard().map((entry, index) => (
          <div
            key={entry.userId}
            className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
              entry.userId === currentUserId
                ? 'bg-blue-50 border border-blue-200'
                : 'hover:bg-gray-50'
            }`}
          >
            {/* Rank */}
            <div className="flex-shrink-0 w-8 flex justify-center">
              {getRankIcon(entry.rank)}
            </div>

            {/* Avatar */}
            <div className="flex-shrink-0">
              {entry.avatar ? (
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${getRandomColor(entry.name)}`}>
                  {getInitials(entry.name)}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`text-sm font-medium truncate ${
                    entry.userId === currentUserId ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {entry.name}
                    {entry.userId === currentUserId && (
                      <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded">
                        You
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-gray-500">
                    Rank #{entry.rank}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-bold text-[#2D3142]">
                    {entry.points}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getScoreLabel(activeCategory)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Want to climb the leaderboard?
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Book className="h-3 w-3 mr-1" />
              <span>Share books</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="h-3 w-3 mr-1" />
              <span>Respond quickly</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>Help others</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;