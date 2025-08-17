import React from 'react';

// Password Section Component
const PasswordSection = ({ 
  passwordData, 
  loading, 
  onPasswordDataChange, 
  onPasswordUpdate 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Change Password</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => onPasswordDataChange({ ...passwordData, currentPassword: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => onPasswordDataChange({ ...passwordData, newPassword: e.target.value })}
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
            onChange={(e) => onPasswordDataChange({ ...passwordData, confirmPassword: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            minLength="6"
            required
          />
        </div>
        
        <button
          onClick={onPasswordUpdate}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </div>
  );
};

export default PasswordSection;