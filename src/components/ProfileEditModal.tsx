import React, { useState } from 'react';
import { X, Upload, User, MapPin, Phone, Mail, GraduationCap, Briefcase, Heart, Globe, Settings } from 'lucide-react';
import { User as UserType } from '../types';
import { pakistanCities } from '../types';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
  onSave: (updatedUser: Partial<UserType>) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    age: user.age.toString(),
    city: user.city.toLowerCase(),
    bio: user.bio || '',
    phone: user.phone || '',
    university: user.university || '',
    occupation: user.occupation || '',
    favoriteGenres: user.favoriteGenres || [],
    readingGoals: user.readingGoals || '',
    socialLinks: {
      facebook: user.socialLinks?.facebook || '',
      instagram: user.socialLinks?.instagram || '',
      linkedin: user.socialLinks?.linkedin || '',
      twitter: user.socialLinks?.twitter || '',
    },
    preferences: {
      notifications: user.preferences.notifications,
      showEmail: user.preferences.showEmail,
      showPhone: user.preferences.showPhone,
      allowMessages: user.preferences.allowMessages,
    }
  });

  const [avatar, setAvatar] = useState<string>(user.avatar || '');
  const [activeTab, setActiveTab] = useState<'personal' | 'social' | 'preferences'>('personal');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value
        }
      }));
    } else if (name.startsWith('preferences.')) {
      const prefField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefField]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser: Partial<UserType> = {
      ...formData,
      age: parseInt(formData.age),
      city: pakistanCities.find(c => c.id === formData.city)?.name || formData.city,
      avatar,
      lastActive: new Date()
    };

    onSave(updatedUser);
    onClose();
  };

  if (!isOpen) return null;

  const availableGenres = [
    'Fiction', 'Non-Fiction', 'Academic', 'Children', 'Self-Help', 
    'Biography', 'History', 'Science', 'Religion', 'Poetry', 
    'Mystery', 'Romance', 'Fantasy', 'Science Fiction', 'Philosophy'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 md:mx-0 my-8 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-[#2D3142] flex items-center">
            <User className="h-6 w-6 text-[#C14953] mr-2" />
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'personal'
                  ? 'border-b-2 border-[#C14953] text-[#C14953]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'social'
                  ? 'border-b-2 border-[#C14953] text-[#C14953]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Social & Reading
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'preferences'
                  ? 'border-b-2 border-[#C14953] text-[#C14953]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Privacy
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile"
                      className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl font-bold">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-[#C14953] text-white rounded-full p-2 cursor-pointer hover:bg-[#a73f48] transition-colors">
                    <Upload className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#2D3142]">Profile Picture</h3>
                  <p className="text-sm text-gray-600">Upload a clear photo of yourself</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="13"
                    max="120"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                    required
                  >
                    <option value="" disabled>Select your city</option>
                    {pakistanCities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                    placeholder="+92 XXX XXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    University/Institution
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                    placeholder="e.g., University of Karachi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                  placeholder="e.g., Software Engineer, Student, Teacher"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                  placeholder="Tell others about yourself, your interests, and why you love books..."
                />
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reading Goals
                </label>
                <textarea
                  name="readingGoals"
                  rows={3}
                  value={formData.readingGoals}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                  placeholder="What do you hope to achieve through reading? Any specific goals or challenges?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Favorite Genres
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableGenres.map(genre => (
                    <label key={genre} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.favoriteGenres.includes(genre)}
                        onChange={() => handleGenreToggle(genre)}
                        className="mr-2 h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-[#2D3142] mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Social Media Links
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Facebook
                    </label>
                    <input
                      type="url"
                      name="social.facebook"
                      value={formData.socialLinks.facebook}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                      placeholder="https://facebook.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram
                    </label>
                    <input
                      type="url"
                      name="social.instagram"
                      value={formData.socialLinks.instagram}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                      placeholder="https://instagram.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      name="social.linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter
                    </label>
                    <input
                      type="url"
                      name="social.twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-[#2D3142] mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Privacy Settings
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">Email Visibility</h5>
                    <p className="text-sm text-gray-600">Allow others to see your email address</p>
                  </div>
                  <input
                    type="checkbox"
                    name="preferences.showEmail"
                    checked={formData.preferences.showEmail}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">Phone Visibility</h5>
                    <p className="text-sm text-gray-600">Allow others to see your phone number</p>
                  </div>
                  <input
                    type="checkbox"
                    name="preferences.showPhone"
                    checked={formData.preferences.showPhone}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">Allow Messages</h5>
                    <p className="text-sm text-gray-600">Allow other users to send you messages</p>
                  </div>
                  <input
                    type="checkbox"
                    name="preferences.allowMessages"
                    checked={formData.preferences.allowMessages}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">Email Notifications</h5>
                    <p className="text-sm text-gray-600">Receive email notifications for new messages and requests</p>
                  </div>
                  <input
                    type="checkbox"
                    name="preferences.notifications"
                    checked={formData.preferences.notifications}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#C14953] text-white rounded-md hover:bg-[#a73f48] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C14953] focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;