import React from 'react';
import EditableField from './EditableField';
import ReadOnlyField from './ReadOnlyField';

// Personal Information Section Component
const PersonalInformationSection = ({ 
  user, 
  editing, 
  formData, 
  loading,
  onEdit, 
  onCancel, 
  onSave, 
  onFormDataChange 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Personal Information</h2>
      
      <div className="space-y-6">
        {/* First Name */}
        <EditableField
          label="First Name"
          field="firstName"
          value={user?.firstName}
          editing={editing}
          formData={formData}
          loading={loading}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={onSave}
          onFormDataChange={onFormDataChange}
        />

        {/* Last Name */}
        <EditableField
          label="Last Name"
          field="lastName"
          value={user?.lastName}
          editing={editing}
          formData={formData}
          loading={loading}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={onSave}
          onFormDataChange={onFormDataChange}
        />

        {/* Username */}
        <EditableField
          label="Username"
          field="username"
          value={user?.username}
          displayValue={`@${user?.username}`}
          editing={editing}
          formData={formData}
          loading={loading}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={onSave}
          onFormDataChange={onFormDataChange}
        />

        {/* Email (Read-only) */}
        <ReadOnlyField
          label="Email"
          value={user?.email}
          note="Email cannot be changed"
        />
      </div>
    </div>
  );
};

export default PersonalInformationSection;