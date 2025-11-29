import React from 'react';
import { Users, MapPin, Star, Book, Clock, Award } from 'lucide-react';
import { User, UserRecommendation } from '../types';

interface UserRecommendationsProps {
  currentUser: User;
  allUsers: User[];
}

const UserRecommendations: React.FC<UserRecommendationsProps> = ({ currentUser, allUsers }) => {
  // Mock user data - in real app, this would come from API
  const mockUsers = [
    {
      id: '2',
      name: 'Fatima Khan',
      avatar: '',
      city: 'Karachi',
      rating: 4.9,
      totalReviews: 12,
      favoriteGenres: ['Fiction', 'Biography', 'History'],
      exchangePreferences: {
        preferredMeetingAreas: ['DHA Phase 5', 'Clifton'],
        preferredMeetingTimes: ['Evening (5PM-8PM)', 'Weekend'],
        responseTime: 'Within 6 hours',
      },
      trustAndSafety: {
        emailVerified: true,
        phoneVerified: true,
        identityVerified: true,
      },
      badges: ['Verified Trader', 'Quick Responder'],
      location: {
        latitude: 24.8607,
        longitude: 67.0011,
      },
      stats: {
        booksExchanged: 15,
        successfulTrades: 14,
        averageResponseTime: 3.2,
        communityRank: 8,
      }
    },
    {
      id: '3',
      name: 'Ahmed Raza',
      avatar: '',
      city: 'Lahore',
      rating: 4.7,
      totalReviews: 8,
      favoriteGenres: ['Non-Fiction', 'Science', 'Technology'],
      exchangePreferences: {
        preferredMeetingAreas: ['Gulberg', 'Model Town'],
        preferredMeetingTimes: ['Morning (9AM-12PM)', 'Afternoon (12PM-5PM)'],
        responseTime: 'Within 24 hours',
      },
      trustAndSafety: {
        emailVerified: true,
        phoneVerified: false,
        identityVerified: false,
      },
      badges: ['Helpful Member'],
      location: {
        latitude: 31.5204,
        longitude: 74.3587,
      },
      stats: {
        booksExchanged: 6,
        successfulTrades: 5,
        averageResponseTime: 8.5,
        communityRank: 45,
      }
    },
    {
      id: '4',
      name: 'Saad Ali',
      avatar: '',
      city: 'Islamabad',
      rating: 4.8,
      totalReviews: 15,
      favoriteGenres: ['Fiction', 'Mystery', 'Romance'],
      exchangePreferences: {
        preferredMeetingAreas: ['F-6', 'F-7', 'Blue Area'],
        preferredMeetingTimes: ['Weekend', 'Evening (5PM-8PM)'],
        responseTime: 'Within 12 hours',
      },
      trustAndSafety: {
        emailVerified: true,
        phoneVerified: true,
        identityVerified: false,
      },
      badges: ['Genre Explorer', 'Trusted Trader'],
      location: {
        latitude: 33.6844,
        longitude: 73.0479,
      },
      stats: {
        booksExchanged: 22,
        successfulTrades: 20,
        averageResponseTime: 5.1,
        communityRank: 12,
      }
    }
  ];

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getRecommendations = (): UserRecommendation[] => {
    return mockUsers
      .filter(user => user.id !== currentUser.id)
      .map(user => {
        let score = 0;
        const reasons: string[] = [];

        // Genre compatibility (30 points)
        const commonGenres = user.favoriteGenres?.filter(genre => 
          currentUser.favoriteGenres?.includes(genre)
        ) || [];
        if (commonGenres.length > 0) {
          score += commonGenres.length * 10;
          reasons.push(`Shared interests in ${commonGenres.slice(0, 2).join(' & ')}`);
        }

        // Location proximity (25 points)
        if (user.city === currentUser.city) {
          score += 25;
          reasons.push(`Same city (${user.city})`);
        } else if (user.location && currentUser.location && 
                   user.location.latitude && user.location.longitude && 
                   currentUser.location.latitude && currentUser.location.longitude) {
          const distance = calculateDistance(
            user.location.latitude,
            user.location.longitude,
            currentUser.location.latitude,
            currentUser.location.longitude
          );
          if (distance < 100) {
            score += 15;
            reasons.push(`Nearby location`);
          }
        }

        // Response time compatibility (20 points)
        if (user.exchangePreferences?.responseTime === currentUser.exchangePreferences?.responseTime) {
          score += 20;
          reasons.push('Similar response time');
        }

        // Trust score (15 points)
        const trustScore = (user.trustAndSafety?.emailVerified ? 5 : 0) +
                          (user.trustAndSafety?.phoneVerified ? 5 : 0) +
                          (user.trustAndSafety?.identityVerified ? 5 : 0);
        if (trustScore >= 10) {
          score += 15;
          reasons.push('Highly verified user');
        }

        // Rating (10 points)
        if (user.rating >= 4.5) {
          score += 10;
          reasons.push('Excellent rating');
        }

        return {
          userId: user.id,
          score,
          reasons,
          locationDistance: user.location && currentUser.location && 
                           user.location.latitude && user.location.longitude && 
                           currentUser.location.latitude && currentUser.location.longitude ? 
            calculateDistance(
              user.location.latitude,
              user.location.longitude,
              currentUser.location.latitude,
              currentUser.location.longitude
            ) : undefined
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const recommendations = getRecommendations();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
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
          <Users className="h-5 w-5 mr-2" />
          Recommended Users
        </h3>
        <span className="text-sm text-gray-500">Based on your preferences</span>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const user = mockUsers.find(u => u.id === rec.userId);
          if (!user) return null;

          return (
            <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white text-sm font-bold ${getRandomColor(user.name)}`}>
                      {getInitials(user.name)}
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-md font-medium text-[#2D3142] truncate">
                      {user.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(rec.score)}`}>
                        {rec.score}% Match
                      </span>
                      {user.trustAndSafety?.identityVerified && (
                        <div className="text-green-500">
                          <Award className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{user.city}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      <span>{user.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Book className="h-3 w-3 mr-1" />
                      <span>{user.stats?.booksExchanged || 0} books</span>
                    </div>
                  </div>

                  {/* Matching Reasons */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Why you might connect:</p>
                    <div className="flex flex-wrap gap-1">
                      {rec.reasons.slice(0, 2).map((reason, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Response Time & Distance */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Responds {user.exchangePreferences?.responseTime?.toLowerCase()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {rec.locationDistance && (
                        <span className="text-xs text-gray-500">
                          ~{Math.round(rec.locationDistance)}km away
                        </span>
                      )}
                      <button className="px-3 py-1 bg-[#6C9A8B] text-white rounded text-xs hover:bg-[#5a7f73] transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>

                  {/* Badges */}
                  {user.badges && user.badges.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {user.badges.slice(0, 3).map((badge, index) => (
                        <span key={index} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No recommendations available</p>
          <p className="text-sm mt-1">Complete your profile to get better matches</p>
        </div>
      )}
    </div>
  );
};

export default UserRecommendations;