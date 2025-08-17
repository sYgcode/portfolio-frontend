import React from 'react';

// Editable Field Component
const EditableField = ({ 
  label, 
  field, 
  value, 
  displayValue, 
  editing, 
  formData, 
  loading,
  type = "text",
  placeholder = "",
  onEdit, 
  onCancel, 
  onSave, 
  onFormDataChange 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {editing[field] ? (
        <div className="flex gap-2">
          <input
            type={type}
            value={formData[field] || ''}
            onChange={(e) => onFormDataChange({ ...formData, [field]: e.target.value })}
            placeholder={placeholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => onSave(field)}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={() => onCancel(field)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-900">{displayValue || value}</span>
          <button
            onClick={() => onEdit(field)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableField;