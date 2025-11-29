import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  Book, 
  MessageCircle, 
  Edit3,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  Heart,
  Share2,
  CheckCircle,
  Globe,
  Settings,
  Award,
  TrendingUp
} from 'lucide-react';
import { User as UserType, Book as BookType } from '../types';
import ProfileCompleteness from './ProfileCompleteness';
import UserRecommendations from './UserRecommendations';

interface UserProfileProps {
  user: UserType;
  userBooks: BookType[];
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onContactUser?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  userBooks, 
  isOwnProfile = false,
  onEditProfile,
  onContactUser 
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'books' | 'reviews'>('about');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (name: string) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const formatJoinDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long' 
    }).format(date);
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return 'Active today';
    if (diff === 1) return 'Active yesterday';
    if (diff < 7) return `Active ${diff} days ago`;
    if (diff < 30) return `Active ${Math.floor(diff / 7)} weeks ago`;
    return `Active ${Math.floor(diff / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-[#F7F3E3]">
      {/* Profile Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className={`h-32 w-32 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg ${getRandomColor(user.name)}`}>
                  {getInitials(user.name)}
                </div>
              )}
              {user.verified && (
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-1">
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-[#2D3142] flex items-center">
                    {user.name}
                    {user.verified && (
                      <CheckCircle className="h-6 w-6 text-blue-500 ml-2" />
                    )}
                  </h1>
                  <div className="flex items-center mt-2 space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{user.city}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Joined {formatJoinDate(user.joinedAt)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{formatLastActive(user.lastActive)}</p>
                </div>

                <div className="mt-4 sm:mt-0 flex space-x-3">
                  {isOwnProfile ? (
                    <button
                      onClick={onEditProfile}
                      className="flex items-center px-4 py-2 bg-[#C14953] text-white rounded-md hover:bg-[#a73f48] transition-colors"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={onContactUser}
                      className="flex items-center px-4 py-2 bg-[#6C9A8B] text-white rounded-md hover:bg-[#5a7f73] transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact
                    </button>
                  )}
                </div>
              </div>

              {/* Bio */}
              {user.bio && (
                <p className="mt-4 text-gray-700 max-w-2xl">{user.bio}</p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-[#F7F3E3] rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Share2 className="h-5 w-5 text-[#C14953]" />
                  </div>
                  <div className="text-2xl font-bold text-[#2D3142]">{user.totalBooksShared}</div>
                  <div className="text-sm text-gray-600">Books Shared</div>
                </div>
                <div className="bg-[#F7F3E3] rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Book className="h-5 w-5 text-[#6C9A8B]" />
                  </div>
                  <div className="text-2xl font-bold text-[#2D3142]">{user.totalBooksReceived}</div>
                  <div className="text-sm text-gray-600">Books Received</div>
                </div>
                <div className="bg-[#F7F3E3] rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#2D3142]">{user.rating.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="bg-[#F7F3E3] rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#2D3142]">{user.totalReviews}</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'about'
                  ? 'border-[#C14953] text-[#C14953]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'books'
                  ? 'border-[#C14953] text-[#C14953]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Books ({userBooks.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-[#C14953] text-[#C14953]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews ({user.totalReviews})
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-[#2D3142] mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  {user.phone && user.preferences.showPhone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-900">{user.phone}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900">{user.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="text-gray-900">{user.age} years old</p>
                    </div>
                  </div>
                  {user.university && (
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">University</p>
                        <p className="text-gray-900">{user.university}</p>
                      </div>
                    </div>
                  )}
                  {user.occupation && (
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Occupation</p>
                        <p className="text-gray-900">{user.occupation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reading Preferences */}
              {user.favoriteGenres && user.favoriteGenres.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-[#2D3142] mb-4 flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Favorite Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.favoriteGenres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#F7F3E3] text-[#2D3142] rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reading Goals */}
              {user.readingGoals && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-[#2D3142] mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Reading Goals
                  </h3>
                  <p className="text-gray-700">{user.readingGoals}</p>
                </div>
              )}

              {/* Exchange Preferences */}
              {user.exchangePreferences && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-[#2D3142] mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Exchange Preferences
                  </h3>
                  <div className="space-y-4">
                    {user.exchangePreferences.preferredMeetingAreas && user.exchangePreferences.preferredMeetingAreas.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Preferred Meeting Areas</p>
                        <div className="flex flex-wrap gap-2">
                          {user.exchangePreferences.preferredMeetingAreas.map((area, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {user.exchangePreferences.preferredMeetingTimes && user.exchangePreferences.preferredMeetingTimes.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Preferred Meeting Times</p>
                        <div className="flex flex-wrap gap-2">
                          {user.exchangePreferences.preferredMeetingTimes.map((time, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {user.exchangePreferences.responseTime && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Response Time</p>
                        <p className="text-gray-900">{user.exchangePreferences.responseTime}</p>
                      </div>
                    )}

                    {user.languages && user.languages.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Languages</p>
                        <div className="flex flex-wrap gap-2">
                          {user.languages.map((lang, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Trust & Safety */}
              {user.trustAndSafety && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-[#2D3142] mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Trust & Safety
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Email Verified</span>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${user.trustAndSafety.emailVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-xs text-gray-500">
                          {user.trustAndSafety.emailVerified ? 'Verified' : 'Not verified'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Phone Verified</span>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${user.trustAndSafety.phoneVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-xs text-gray-500">
                          {user.trustAndSafety.phoneVerified ? 'Verified' : 'Not verified'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Identity Verified</span>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${user.trustAndSafety.identityVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-xs text-gray-500">
                          {user.trustAndSafety.identityVerified ? 'Verified' : 'Not verified'}
                        </span>
                      </div>
                    </div>

                    {user.trustAndSafety.safetyRating && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Safety Rating</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-900">{user.trustAndSafety.safetyRating.toFixed(1)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Completeness - Only for own profile */}
              {isOwnProfile && (
                <ProfileCompleteness 
                  user={user} 
                  onEditProfile={onEditProfile}
                />
              )}

              {/* User Recommendations - Only for own profile */}
              {isOwnProfile && (
                <UserRecommendations 
                  currentUser={user} 
                  allUsers={[]}
                />
              )}

              {/* Contact Information */}
              {!isOwnProfile && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-[#2D3142] mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {user.preferences.showEmail && (
                      <a 
                        href={`mailto:${user.email}`}
                        className="flex items-center text-[#6C9A8B] hover:text-[#5a7f73] transition-colors"
                      >
                        <Mail className="h-4 w-4 mr-3" />
                        Send Email
                      </a>
                    )}
                    {user.phone && user.preferences.showPhone && (
                      <a 
                        href={`tel:${user.phone}`}
                        className="flex items-center text-[#6C9A8B] hover:text-[#5a7f73] transition-colors"
                      >
                        <Phone className="h-4 w-4 mr-3" />
                        Call {user.phone}
                      </a>
                    )}
                    {user.preferences.allowMessages && (
                      <button
                        onClick={onContactUser}
                        className="flex items-center text-[#6C9A8B] hover:text-[#5a7f73] transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 mr-3" />
                        Send Message
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {user.socialLinks && Object.values(user.socialLinks).some(link => link) && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-[#2D3142] mb-4 flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Social Links
                  </h3>
                  <div className="space-y-2">
                    {user.socialLinks.facebook && (
                      <a 
                        href={user.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#6C9A8B] hover:text-[#5a7f73] transition-colors"
                      >
                        Facebook
                      </a>
                    )}
                    {user.socialLinks.instagram && (
                      <a 
                        href={user.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#6C9A8B] hover:text-[#5a7f73] transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                    {user.socialLinks.linkedin && (
                      <a 
                        href={user.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#6C9A8B] hover:text-[#5a7f73] transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {user.socialLinks.twitter && (
                      <a 
                        href={user.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#6C9A8B] hover:text-[#5a7f73] transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Verification Badge */}
              {user.verified && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center text-blue-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Verified User</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    This user has verified their identity and is trustworthy.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'books' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-[#2D3142] mb-4">Books Shared by {user.name}</h3>
            {userBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBooks.map((book) => (
                  <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={book.images[0]}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#2D3142] truncate">{book.title}</h4>
                        <p className="text-sm text-gray-600 truncate">{book.author}</p>
                        <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                          book.status === 'Available' ? 'bg-green-100 text-green-800' :
                          book.status === 'Reserved' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {book.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Book className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No books shared yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-[#2D3142] mb-4">Reviews & Ratings</h3>
            <div className="text-center py-8 text-gray-500">
              <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No reviews yet</p>
              <p className="text-sm mt-2">Reviews will appear here once users rate their exchange experiences.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;