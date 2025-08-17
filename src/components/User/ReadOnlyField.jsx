import React from 'react';

// Read-Only Field Component
const ReadOnlyField = ({ label, value, note }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="py-2 text-gray-900">{value}</div>
      {note && <p className="text-sm text-gray-500">{note}</p>}
    </div>
  );
};

export default ReadOnlyField;