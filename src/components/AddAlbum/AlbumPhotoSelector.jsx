import React, { useState, useEffect } from 'react';
import { Search, ImageIcon, Star, X } from 'lucide-react';

const AlbumPhotoSelector = ({ selectedPhotos, onPhotosChange, photosApi, isCreating, onCoverImageChange }) => {
  const [availablePhotos, setAvailablePhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPhotos();
  }, [searchTerm]);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const response = await photosApi.getPhotos(50, 1); // Get up to 50 photos
      let photos = response.photos || [];
      
      // Filter by search term if provided
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        photos = photos.filter(photo => 
          photo.title.toLowerCase().includes(searchLower) ||
          (photo.tags && photo.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
      }
      
      setAvailablePhotos(photos);
      setError(null);
    } catch (err) {
      console.error('Error loading photos:', err);
      setError('Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoToggle = (photo) => {
    const isSelected = selectedPhotos.some(p => p._id === photo._id);
    let newSelection;
    
    if (isSelected) {
      newSelection = selectedPhotos.filter(p => p._id !== photo._id);
    } else {
      newSelection = [...selectedPhotos, photo];
    }
    
    onPhotosChange(newSelection);
    
    // Auto-set cover image if this is the first photo selected
    if (!isSelected && selectedPhotos.length === 0) {
      onCoverImageChange(photo.imageUrl);
    }
  };

  const handleSetAsCover = (photo) => {
    onCoverImageChange(photo.imageUrl);
  };

  const handleRemoveSelected = (photoToRemove) => {
    const newSelection = selectedPhotos.filter(p => p._id !== photoToRemove._id);
    onPhotosChange(newSelection);
  };

  const selectAllVisible = () => {
    const visiblePhotoIds = availablePhotos.map(p => p._id);
    const alreadySelected = selectedPhotos.filter(p => visiblePhotoIds.includes(p._id));
    const newPhotos = availablePhotos.filter(p => !selectedPhotos.some(sp => sp._id === p._id));
    
    onPhotosChange([...selectedPhotos, ...newPhotos]);
  };

  const clearSelection = () => {
    onPhotosChange([]);
  };

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">Error loading photos</div>
          <button
            onClick={loadPhotos}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-xl font-light text-slate-800 mb-2">Select Photos</h2>
        <p className="text-gray-500 text-sm">Choose photos to include in your album</p>
      </div>

      {/* Selected Photos Summary */}
      {selectedPhotos.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-blue-800">
              Selected Photos ({selectedPhotos.length})
            </h3>
            <button
              onClick={clearSelection}
              disabled={isCreating}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors disabled:opacity-50"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-6 gap-2">
            {selectedPhotos.slice(0, 12).map((photo) => (
              <div key={photo._id} className="relative group">
                <img
                  src={photo.thumbnailUrl || photo.imageUrl}
                  alt={photo.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemoveSelected(photo)}
                  disabled={isCreating}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
                >
                  <X className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleSetAsCover(photo)}
                  disabled={isCreating}
                  className="absolute bottom-1 left-1 bg-blue-500 text-white rounded px-1 py-0.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
                >
                  Cover
                </button>
              </div>
            ))}
            {selectedPhotos.length > 12 && (
              <div className="w-full aspect-square bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs font-medium">
                +{selectedPhotos.length - 12}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isCreating}
              placeholder="Search photos by title or tags..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50"
            />
          </div>
          <button
            onClick={selectAllVisible}
            disabled={isCreating || availablePhotos.length === 0}
            className="px-4 py-3 bg-blue-100 text-blue-800 rounded-xl hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Select All
          </button>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            {loading ? 'Loading photos...' : `${availablePhotos.length} photos available`}
          </span>
          {selectedPhotos.length > 0 && (
            <span className="text-blue-600 font-medium">
              {selectedPhotos.length} selected
            </span>
          )}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="space-y-4">
        {loading ? (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : availablePhotos.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">
              {searchTerm ? `No photos found for "${searchTerm}"` : 'No photos available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-h-96 overflow-y-auto">
            {availablePhotos.map((photo) => {
              const isSelected = selectedPhotos.some(p => p._id === photo._id);
              return (
                <div
                  key={photo._id}
                  className={`relative cursor-pointer group ${
                    isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                  onClick={() => !isCreating && handlePhotoToggle(photo)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={photo.thumbnailUrl || photo.imageUrl}
                      alt={photo.title}
                      className="w-full aspect-square object-cover transition-transform duration-200 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 transition-colors ${
                      isSelected 
                        ? 'bg-blue-500/20' 
                        : 'bg-black/0 group-hover:bg-black/10'
                    }`}>
                      {/* Featured badge */}
                      {photo.isFeatured && (
                        <div className="absolute top-1 left-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        </div>
                      )}
                      
                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Title tooltip */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs truncate">{photo.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumPhotoSelector;