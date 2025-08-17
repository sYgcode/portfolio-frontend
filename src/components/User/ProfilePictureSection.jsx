import React from 'react';

// Profile Picture Section Component
const ProfilePictureSection = ({ 
  user, 
  editing, 
  formData, 
  loading,
  onEdit, 
  onCancel, 
  onSave, 
  onFormDataChange,
  defaultProfilePicture 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
      <div className="text-center">
        <div className="relative inline-block">
          <img
            src={user?.profilePicture || defaultProfilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-20"></div>
        </div>
        
        <div className="mt-4">
          {editing.profilePicture ? (
            <div className="space-y-3">
              <input
                type="url"
                value={formData.profilePicture || ''}
                onChange={(e) => onFormDataChange({ ...formData, profilePicture: e.target.value })}
                placeholder="Enter image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => onSave('profilePicture')}
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  onClick={() => onCancel('profilePicture')}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onEdit('profilePicture')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Change Photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureSection;