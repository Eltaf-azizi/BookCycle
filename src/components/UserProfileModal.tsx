import React, { useState } from 'react';
import { X } from 'lucide-react';
import { User as UserType, Book as BookType } from '../types';
import UserProfile from './UserProfile';
import ProfileEditModal from './ProfileEditModal';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
  userBooks: BookType[];
  onUpdateUser: (updatedUser: Partial<UserType>) => void;
  onContactUser?: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  userBooks,
  onUpdateUser,
  onContactUser
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedUser: Partial<UserType>) => {
    onUpdateUser(updatedUser);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-50">
        <div className="min-h-screen flex items-start justify-center pt-4 pb-20">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl mx-4 my-8 overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            {/* User Profile Content */}
            <div className="max-h-[85vh] overflow-y-auto">
              <UserProfile
                user={user}
                userBooks={userBooks}
                isOwnProfile={true}
                onEditProfile={handleEditProfile}
                onContactUser={onContactUser}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </>
  );
};

export default UserProfileModal;
