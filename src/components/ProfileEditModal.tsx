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
    },
    exchangePreferences: {
      preferredMeetingAreas: user.exchangePreferences?.preferredMeetingAreas || [],
      preferredMeetingTimes: user.exchangePreferences?.preferredMeetingTimes || [],
      transportationOptions: user.exchangePreferences?.transportationOptions || [],
      exchangeMethods: user.exchangePreferences?.exchangeMethods || ['In-Person'],
      responseTime: user.exchangePreferences?.responseTime || 'Within 24 hours',
      availabilitySchedule: user.exchangePreferences?.availabilitySchedule || '',
    },
    trustAndSafety: {
      identityVerified: user.trustAndSafety?.identityVerified || false,
      phoneVerified: user.trustAndSafety?.phoneVerified || false,
      emailVerified: user.trustAndSafety?.emailVerified || true,
      emergencyContact: user.trustAndSafety?.emergencyContact || {
        name: '',
        phone: '',
        relationship: '',
      },
    },
    languages: user.languages || ['English'],
    timezone: user.timezone || 'Asia/Karachi',
  });

  const [avatar, setAvatar] = useState<string>(user.avatar || '');
  const [activeTab, setActiveTab] = useState<'personal' | 'social' | 'exchange' | 'safety' | 'preferences'>('personal');

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
          <nav className="flex flex-wrap">
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'personal'
                  ? 'border-b-2 border-[#C14953] text-[#C14953]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'social'
                  ? 'border-b-2 border-[#C14953] text-[#C14953]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Social & Reading
            </button>
            <button
              onClick={() => setActiveTab('exchange')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'exchange'
                  ? 'border-b-2 border-[#C14953] text-[#C14953]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Exchange Prefs
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'safety'
                  ? 'border-b-2 border-[#C14953] text-[#C14953]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Trust & Safety
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-4 py-3 text-sm font-medium ${
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

          {activeTab === 'exchange' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Meeting Areas
                </label>
                <input
                  type="text"
                  name="exchangePreferences.preferredMeetingAreas"
                  value={formData.exchangePreferences.preferredMeetingAreas.join(', ')}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    exchangePreferences: {
                      ...prev.exchangePreferences,
                      preferredMeetingAreas: e.target.value.split(',').map(area => area.trim()).filter(area => area)
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                  placeholder="e.g., DHA, Clifton, Gulshan (separate with commas)"
                />
                <p className="text-xs text-gray-500 mt-1">List specific areas in your city where you prefer to meet</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Meeting Times
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Morning (9AM-12PM)', 'Afternoon (12PM-5PM)', 'Evening (5PM-8PM)', 'Night (8PM-10PM)'].map(time => (
                    <label key={time} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.exchangePreferences.preferredMeetingTimes.includes(time)}
                        onChange={() => {
                          const times = formData.exchangePreferences.preferredMeetingTimes.includes(time)
                            ? formData.exchangePreferences.preferredMeetingTimes.filter(t => t !== time)
                            : [...formData.exchangePreferences.preferredMeetingTimes, time];
                          setFormData(prev => ({
                            ...prev,
                            exchangePreferences: {
                              ...prev.exchangePreferences,
                              preferredMeetingTimes: times
                            }
                          }));
                        }}
                        className="mr-2 h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transportation Options
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Walking', 'Car/Bike', 'Public Transport', 'Rideshare'].map(transport => (
                    <label key={transport} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.exchangePreferences.transportationOptions.includes(transport)}
                        onChange={() => {
                          const options = formData.exchangePreferences.transportationOptions.includes(transport)
                            ? formData.exchangePreferences.transportationOptions.filter(t => t !== transport)
                            : [...formData.exchangePreferences.transportationOptions, transport];
                          setFormData(prev => ({
                            ...prev,
                            exchangePreferences: {
                              ...prev.exchangePreferences,
                              transportationOptions: options
                            }
                          }));
                        }}
                        className="mr-2 h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{transport}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exchange Methods
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['In-Person', 'Shipping', 'Drop-off Point'].map(method => (
                    <label key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.exchangePreferences.exchangeMethods.includes(method)}
                        onChange={() => {
                          const methods = formData.exchangePreferences.exchangeMethods.includes(method)
                            ? formData.exchangePreferences.exchangeMethods.filter(m => m !== method)
                            : [...formData.exchangePreferences.exchangeMethods, method];
                          setFormData(prev => ({
                            ...prev,
                            exchangePreferences: {
                              ...prev.exchangePreferences,
                              exchangeMethods: methods
                            }
                          }));
                        }}
                        className="mr-2 h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Response Time
                </label>
                <select
                  name="exchangePreferences.responseTime"
                  value={formData.exchangePreferences.responseTime}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    exchangePreferences: {
                      ...prev.exchangePreferences,
                      responseTime: e.target.value
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                >
                  <option value="Within 1 hour">Within 1 hour</option>
                  <option value="Within 6 hours">Within 6 hours</option>
                  <option value="Within 24 hours">Within 24 hours</option>
                  <option value="Within 2 days">Within 2 days</option>
                  <option value="Within 1 week">Within 1 week</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability Schedule
                </label>
                <textarea
                  name="exchangePreferences.availabilitySchedule"
                  rows={3}
                  value={formData.exchangePreferences.availabilitySchedule}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                  placeholder="e.g., Available weekends, weekdays after 6PM, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Languages
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['English', 'Urdu', 'Arabic', 'French', 'German', 'Chinese'].map(lang => (
                    <label key={lang} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(lang)}
                        onChange={() => {
                          const languages = formData.languages.includes(lang)
                            ? formData.languages.filter(l => l !== lang)
                            : [...formData.languages, lang];
                          setFormData(prev => ({ ...prev, languages }));
                        }}
                        className="mr-2 h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-blue-900 mb-2">Trust & Safety Center</h4>
                <p className="text-sm text-blue-700">
                  Help build trust in the community by verifying your information and adding safety details.
                </p>
              </div>

              <div>
                <h5 className="text-md font-medium text-[#2D3142] mb-3">Verification Status</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${formData.trustAndSafety.emailVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm text-gray-700">Email Verified</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formData.trustAndSafety.emailVerified ? '✓ Verified' : 'Not verified'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${formData.trustAndSafety.phoneVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm text-gray-700">Phone Verified</span>
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="trustAndSafety.phoneVerified"
                        checked={formData.trustAndSafety.phoneVerified}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          trustAndSafety: {
                            ...prev.trustAndSafety,
                            phoneVerified: e.target.checked
                          }
                        }))}
                        className="mr-2 h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
                      />
                      <span className="text-xs text-gray-500">Verify now</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${formData.trustAndSafety.identityVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm text-gray-700">Identity Verified</span>
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="trustAndSafety.identityVerified"
                        checked={formData.trustAndSafety.identityVerified}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          trustAndSafety: {
                            ...prev.trustAndSafety,
                            identityVerified: e.target.checked
                          }
                        }))}
                        className="mr-2 h-4 w-4 text-[#C14953] focus:ring-[#C14953] border-gray-300 rounded"
                      />
                      <span className="text-xs text-gray-500">Verify now</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-md font-medium text-[#2D3142] mb-3">Emergency Contact</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Add an emergency contact for additional safety during in-person exchanges.
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="trustAndSafety.emergencyContact.name"
                      value={formData.trustAndSafety.emergencyContact.name}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        trustAndSafety: {
                          ...prev.trustAndSafety,
                          emergencyContact: {
                            ...prev.trustAndSafety.emergencyContact,
                            name: e.target.value
                          }
                        }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="trustAndSafety.emergencyContact.phone"
                      value={formData.trustAndSafety.emergencyContact.phone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        trustAndSafety: {
                          ...prev.trustAndSafety,
                          emergencyContact: {
                            ...prev.trustAndSafety.emergencyContact,
                            phone: e.target.value
                          }
                        }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                      placeholder="+92 XXX XXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relationship
                    </label>
                    <select
                      name="trustAndSafety.emergencyContact.relationship"
                      value={formData.trustAndSafety.emergencyContact.relationship}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        trustAndSafety: {
                          ...prev.trustAndSafety,
                          emergencyContact: {
                            ...prev.trustAndSafety.emergencyContact,
                            relationship: e.target.value
                          }
                        }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                    >
                      <option value="">Select relationship</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Friend">Friend</option>
                      <option value="Roommate">Roommate</option>
                      <option value="Other">Other</option>
                    </select>
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