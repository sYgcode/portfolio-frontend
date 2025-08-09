import React, { useState, useEffect } from 'react';

const UserProfile = ({ userApi }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({});
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Default profile picture
  const defaultProfilePicture = `data:image/svg+xml;base64,${btoa(`
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="url(#gradient)"/>
      <circle cx="60" cy="45" r="20" fill="white" opacity="0.9"/>
      <path d="M20 100c0-22 18-40 40-40s40 18 40 40" fill="white" opacity="0.9"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3B82F6"/>
          <stop offset="100%" style="stop-color:#8B5CF6"/>
        </linearGradient>
      </defs>
    </svg>
  `)}`;

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const userData = await userApi.getCurrentUser();
      setUser(userData);
      setFormData(userData);
    } catch (err) {
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field) => {
    setEditing({ ...editing, [field]: true });
    setError('');
    setSuccess('');
  };

  const handleCancel = (field) => {
    setEditing({ ...editing, [field]: false });
    setFormData({ ...formData, [field]: user[field] });
  };

  const handleSave = async (field) => {
    try {
      setLoading(true);
      let result;
      
      switch (field) {
        case 'firstName':
          result = await userApi.updateFirstName(formData.firstName);
          break;
        case 'lastName':
          result = await userApi.updateLastName(formData.lastName);
          break;
        case 'username':
          result = await userApi.updateUsername(formData.username);
          break;
        case 'profilePicture':
          result = await userApi.updateProfilePicture(formData.profilePicture);
          break;
        default:
          throw new Error('Invalid field');
      }
      
      setUser({ ...user, [field]: formData[field] });
      setEditing({ ...editing, [field]: false });
      setSuccess(result.message);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const result = await userApi.updatePassword(
        passwordData.currentPassword, 
        passwordData.newPassword
      );
      setSuccess(result.message);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}

        {/* Profile Picture Section */}
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
                    onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                    placeholder="Enter image URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleSave('profilePicture')}
                      disabled={loading}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleCancel('profilePicture')}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit('profilePicture')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Change Photo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Personal Information</h2>
          
          <div className="space-y-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              {editing.firstName ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleSave('firstName')}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancel('firstName')}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-900">{user?.firstName}</span>
                  <button
                    onClick={() => handleEdit('firstName')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              {editing.lastName ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleSave('lastName')}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancel('lastName')}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-900">{user?.lastName}</span>
                  <button
                    onClick={() => handleEdit('lastName')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              {editing.username ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.username || ''}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleSave('username')}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancel('username')}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-900">@{user?.username}</span>
                  <button
                    onClick={() => handleEdit('username')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="py-2 text-gray-900">{user?.email}</div>
              <p className="text-sm text-gray-500">Email cannot be changed</p>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Change Password</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                minLength="6"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                minLength="6"
                required
              />
            </div>
            
            <button
              onClick={handlePasswordUpdate}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 font-medium"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;