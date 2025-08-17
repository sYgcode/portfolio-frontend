import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/User/LoadingSpinner';
import ProfileHeader from '../components/User/ProfileHeader';
import AlertMessages from '../components/User/AlertMessages';
import ProfilePictureSection from '../components/User/ProfilePictureSection';
import PersonalInformationSection from '../components/User/PersonalInformationSection';
import PasswordSection from '../components/User/PasswordSection';

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
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <ProfileHeader />

        {/* Alert Messages */}
        <AlertMessages error={error} success={success} />

        {/* Profile Picture Section */}
        <ProfilePictureSection
          user={user}
          editing={editing}
          formData={formData}
          loading={loading}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSave={handleSave}
          onFormDataChange={setFormData}
          defaultProfilePicture={defaultProfilePicture}
        />

        {/* Personal Information */}
        <PersonalInformationSection
          user={user}
          editing={editing}
          formData={formData}
          loading={loading}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSave={handleSave}
          onFormDataChange={setFormData}
        />

        {/* Password Section */}
        <PasswordSection
          passwordData={passwordData}
          loading={loading}
          onPasswordDataChange={setPasswordData}
          onPasswordUpdate={handlePasswordUpdate}
        />
      </div>
    </div>
  );
};

export default UserProfile;