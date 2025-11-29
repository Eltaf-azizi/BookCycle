import React from 'react';
import { CheckCircle, Circle, Award, TrendingUp, Users, MapPin } from 'lucide-react';
import { User } from '../types';

interface ProfileCompletenessProps {
  user: User;
  onEditProfile?: () => void;
}

const ProfileCompleteness: React.FC<ProfileCompletenessProps> = ({ user, onEditProfile }) => {
  const getCompletenessScore = () => {
    let score = 0;
    const maxScore = 100;

    // Basic profile (25 points)
    if (user.name) score += 5;
    if (user.email) score += 5;
    if (user.bio && user.bio.length > 50) score += 10;
    if (user.avatar) score += 5;

    // Contact info (20 points)
    if (user.phone) score += 10;
    if (user.preferences.showPhone) score += 5;
    if (user.preferences.showEmail) score += 5;

    // Location & Preferences (20 points)
    if (user.city) score += 5;
    if (user.exchangePreferences?.preferredMeetingAreas?.length) score += 10;
    if (user.location?.preferredSpots?.length) score += 5;

    // Trust & Safety (15 points)
    if (user.trustAndSafety?.emailVerified) score += 5;
    if (user.trustAndSafety?.phoneVerified) score += 5;
    if (user.trustAndSafety?.identityVerified) score += 5;

    // Reading profile (10 points)
    if (user.favoriteGenres?.length) score += 5;
    if (user.readingGoals) score += 5;

    // Social & Languages (10 points)
    if (user.languages && user.languages.length > 1) score += 5;
    if (Object.values(user.socialLinks || {}).some(link => link)) score += 5;

    return Math.min(score, maxScore);
  };

  const getRecommendations = () => {
    const recommendations = [];

    if (!user.bio || user.bio.length < 50) {
      recommendations.push({
        type: 'bio',
        title: 'Add a detailed bio',
        description: 'Tell others about yourself and your reading interests',
        icon: <Users className="h-5 w-5" />,
        points: 10
      });
    }

    if (!user.phone) {
      recommendations.push({
        type: 'phone',
        title: 'Add your phone number',
        description: 'Make it easier for others to contact you for book exchanges',
        icon: <MapPin className="h-5 w-5" />,
        points: 10
      });
    }

    if (!user.exchangePreferences?.preferredMeetingAreas?.length) {
      recommendations.push({
        type: 'locations',
        title: 'Set preferred meeting areas',
        description: 'Specify where you prefer to meet for book exchanges',
        icon: <MapPin className="h-5 w-5" />,
        points: 10
      });
    }

    if (!user.trustAndSafety?.phoneVerified) {
      recommendations.push({
        type: 'verification',
        title: 'Verify your phone number',
        description: 'Build trust by verifying your contact information',
        icon: <CheckCircle className="h-5 w-5" />,
        points: 5
      });
    }

    if (!user.favoriteGenres?.length) {
      recommendations.push({
        type: 'genres',
        title: 'Add favorite genres',
        description: 'Help others find books you might be interested in',
        icon: <Award className="h-5 w-5" />,
        points: 5
      });
    }

    return recommendations.slice(0, 3); // Show top 3 recommendations
  };

  const score = getCompletenessScore();
  const recommendations = getRecommendations();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#2D3142] flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Profile Completeness
        </h3>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
          <div className="text-sm text-gray-500">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${getScoreBg(score)}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h4 className="text-md font-medium text-[#2D3142] mb-3">
          Complete your profile to get more book exchange matches
        </h4>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-[#C14953] mr-3 mt-1">
                {rec.icon}
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-medium text-gray-900">
                  {rec.title}
                </h5>
                <p className="text-xs text-gray-600 mt-1">
                  {rec.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-[#6C9A8B] font-medium">
                    +{rec.points} points
                  </span>
                  {onEditProfile && (
                    <button
                      onClick={onEditProfile}
                      className="text-xs text-[#C14953] hover:text-[#a73f48] font-medium"
                    >
                      Complete now →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Status */}
      {user.achievements && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-md font-medium text-[#2D3142] mb-3 flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Recent Achievements
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(user.achievements).map(([key, achieved]) => {
              if (!achieved) return null;
              
              const achievementNames: { [key: string]: string } = {
                firstBookShared: 'First Book Shared',
                helpfulReviewer: 'Helpful Reviewer',
                quickResponder: 'Quick Responder',
                trustedTrader: 'Trusted Trader',
                genreExplorer: 'Genre Explorer',
                communityHelper: 'Community Helper'
              };

              return (
                <span 
                  key={key}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {achievementNames[key]}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCompleteness;