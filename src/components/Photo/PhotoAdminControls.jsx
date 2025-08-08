// Enhanced PhotoAdminControls component
import React, { useState, useEffect } from 'react';
import { Edit3, Trash2, User, Save, X, Plus, Star, StarOff, Tag } from 'lucide-react';

const PhotoAdminControls = ({ 
  photo,
  userRole, 
  isEditing, 
  showDeleteConfirm,
  onEditToggle,
  onDeleteClick,
  onDeleteConfirm,
  onDeleteCancel,
  onPhotoUpdate, // New prop to handle photo updates
  photosApi // Pass the API instance
}) => {
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    tags: [],
    isFeatured: false
  });
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Initialize edit data when photo changes or editing starts
  useEffect(() => {
    if (photo && isEditing) {
      setEditData({
        title: photo.title || '',
        description: photo.description || '',
        tags: [...(photo.tags || [])],
        isFeatured: photo.isFeatured || false
      });
      setSaveError(null);
    }
  }, [photo, isEditing]);

  if (userRole !== "admin") {
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      const updatedPhoto = await photosApi.updatePhoto(photo._id, editData);
      onPhotoUpdate(updatedPhoto); // Update parent component
      onEditToggle(); // Exit edit mode
    } catch (error) {
      console.error('Error saving photo:', error);
      setSaveError(error.message || 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim().toLowerCase();
    if (trimmedTag && !editData.tags.includes(trimmedTag)) {
      setEditData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
      <h3 className="text-lg font-medium text-amber-800 mb-4 flex items-center">
        <User className="h-5 w-5 mr-2" />
        Admin Controls
      </h3>
      
      {!isEditing ? (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onEditToggle}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Photo
          </button>
          
          <button
            onClick={onDeleteClick}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Photo
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Title
            </label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength="200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Description
            </label>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
              maxLength="1000"
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-amber-800">
              Featured Photo
            </label>
            <button
              onClick={() => setEditData(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                editData.isFeatured 
                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {editData.isFeatured ? (
                <>
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  Featured
                </>
              ) : (
                <>
                  <StarOff className="h-4 w-4 mr-1" />
                  Not Featured
                </>
              )}
            </button>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Tags
            </label>
            
            {/* Current Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {editData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add New Tag */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                maxLength="100"
              />
              <button
                onClick={handleAddTag}
                disabled={!newTag.trim()}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Save Error */}
          {saveError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{saveError}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button
              onClick={onEditToggle}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-center">
            <Trash2 className="h-8 w-8 mx-auto mb-3 text-red-500" />
            <p className="font-medium text-red-800 mb-3">
              Are you sure you want to delete this photo?
            </p>
            <p className="text-sm text-red-600 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={onDeleteCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoAdminControls;