import React, { useState, useEffect } from 'react';
import { Edit3, Trash2, User, Save, X, Plus, Star, StarOff, Tag, ImageIcon, Search } from 'lucide-react';

const AlbumAdminControls = ({ 
  album,
  userRole, 
  isEditing, 
  showDeleteConfirm,
  onEditToggle,
  onDeleteClick,
  onDeleteConfirm,
  onDeleteCancel,
  onAlbumUpdate,
  albumsApi,
  photosApi
}) => {
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    tags: [],
    isFeatured: false,
    photos: [],
    coverImageUrl: ''
  });
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  
  // Photo selection states
  const [showPhotoSelector, setShowPhotoSelector] = useState(false);
  const [availablePhotos, setAvailablePhotos] = useState([]);
  const [photoSearchTerm, setPhotoSearchTerm] = useState('');
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  useEffect(() => {
    if (album && isEditing) {
      setEditData({
        title: album.title || '',
        description: album.description || '',
        tags: [...(album.tags || [])],
        isFeatured: album.isFeatured || false,
        photos: album.photos ? album.photos.map(p => typeof p === 'string' ? p : p._id) : [],
        coverImageUrl: album.coverImageUrl || ''
      });
      setSaveError(null);
    }
  }, [album, isEditing]);

  // Load available photos when photo selector is opened
  useEffect(() => {
    if (showPhotoSelector) {
      loadAvailablePhotos();
    }
  }, [showPhotoSelector, photoSearchTerm]);

  const loadAvailablePhotos = async () => {
    setLoadingPhotos(true);
    try {
      const response = await photosApi.getPhotos(50, 1); // Get up to 50 photos
      let photos = response.photos || [];
      
      // Filter by search term if provided
      if (photoSearchTerm.trim()) {
        const searchLower = photoSearchTerm.toLowerCase();
        photos = photos.filter(photo => 
          photo.title.toLowerCase().includes(searchLower) ||
          (photo.tags && photo.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
      }
      
      setAvailablePhotos(photos);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoadingPhotos(false);
    }
  };

  if (userRole !== "admin") {
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      const updatedAlbum = await albumsApi.updateAlbum(album._id, editData);
      onAlbumUpdate(updatedAlbum);
      onEditToggle();
    } catch (error) {
      console.error('Error saving album:', error);
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

  const handleTogglePhoto = (photoId) => {
    setEditData(prev => ({
      ...prev,
      photos: prev.photos.includes(photoId) 
        ? prev.photos.filter(id => id !== photoId)
        : [...prev.photos, photoId]
    }));
  };

  const handleSetCoverImage = (photoUrl) => {
    setEditData(prev => ({
      ...prev,
      coverImageUrl: photoUrl
    }));
  };

  const getSelectedPhotosData = () => {
    return availablePhotos.filter(photo => editData.photos.includes(photo._id));
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
            Edit Album
          </button>
          
          <button
            onClick={onDeleteClick}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Album
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

          {/* Cover Image URL */}
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              value={editData.coverImageUrl}
              onChange={(e) => setEditData(prev => ({ ...prev, coverImageUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-amber-800">
              Featured Album
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

          {/* Photos Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-amber-800">
                Photos ({editData.photos.length})
              </label>
              <button
                onClick={() => setShowPhotoSelector(!showPhotoSelector)}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors duration-200"
              >
                <ImageIcon className="h-4 w-4 mr-1" />
                {showPhotoSelector ? 'Hide' : 'Select Photos'}
              </button>
            </div>

            {/* Selected Photos Preview */}
            {editData.photos.length > 0 && (
              <div className="mb-3">
                <div className="grid grid-cols-4 gap-2">
                  {getSelectedPhotosData().slice(0, 8).map((photo) => (
                    <div key={photo._id} className="relative group">
                      <img
                        src={photo.thumbnailUrl || photo.imageUrl}
                        alt={photo.title}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleTogglePhoto(photo._id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleSetCoverImage(photo.imageUrl)}
                        className="absolute bottom-1 left-1 bg-blue-500 text-white rounded px-1 py-0.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Cover
                      </button>
                    </div>
                  ))}
                  {editData.photos.length > 8 && (
                    <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                      +{editData.photos.length - 8} more
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Photo Selector */}
            {showPhotoSelector && (
              <div className="border border-amber-300 rounded-lg p-4 bg-white">
                {/* Search */}
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={photoSearchTerm}
                      onChange={(e) => setPhotoSearchTerm(e.target.value)}
                      placeholder="Search photos..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Available Photos Grid */}
                {loadingPhotos ? (
                  <div className="text-center py-4">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                    {availablePhotos.map((photo) => {
                      const isSelected = editData.photos.includes(photo._id);
                      return (
                        <div
                          key={photo._id}
                          className={`relative cursor-pointer group ${
                            isSelected ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => handleTogglePhoto(photo._id)}
                        >
                          <img
                            src={photo.thumbnailUrl || photo.imageUrl}
                            alt={photo.title}
                            className="w-full aspect-square object-cover rounded"
                          />
                          <div className={`absolute inset-0 ${
                            isSelected 
                              ? 'bg-blue-500/20' 
                              : 'bg-black/0 group-hover:bg-black/10'
                          } transition-colors rounded`}>
                            {isSelected && (
                              <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {photo.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
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
              Are you sure you want to delete this album?
            </p>
            <p className="text-sm text-red-600 mb-4">
              This action cannot be undone. The photos will not be deleted, only the album.
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

export default AlbumAdminControls;
        