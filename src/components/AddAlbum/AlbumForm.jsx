import React from 'react';
import { Star, StarOff } from 'lucide-react';

const AlbumForm = ({ formData, onInputChange, isCreating, selectedPhotos }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onInputChange(name, type === 'checkbox' ? checked : value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-xl font-light text-slate-800 mb-2">Album Details</h2>
        <p className="text-gray-500 text-sm">Fill in the information for your new album</p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Album Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={isCreating}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Enter album title..."
            maxLength="200"
          />
          <div className="text-xs text-gray-400 mt-1">
            {formData.title.length}/200 characters
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={isCreating}
            rows="4"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Describe your album..."
            maxLength="1000"
          />
          <div className="text-xs text-gray-400 mt-1">
            {formData.description.length}/1000 characters
          </div>
        </div>

        {/* Cover Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image URL *
          </label>
          <input
            type="url"
            name="coverImageUrl"
            value={formData.coverImageUrl}
            onChange={handleChange}
            disabled={isCreating}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="https://example.com/image.jpg"
          />
          <div className="text-xs text-gray-500 mt-1">
            This will be automatically set when you select photos
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            disabled={isCreating}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="landscape, nature, travel (comma separated)"
          />
          <div className="text-xs text-gray-500 mt-1">
            Separate tags with commas
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Featured Album
            </label>
            <p className="text-xs text-amber-600">
              Featured albums appear prominently on the home page
            </p>
          </div>
          <button
            type="button"
            onClick={() => onInputChange('isFeatured', !formData.isFeatured)}
            disabled={isCreating}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              formData.isFeatured 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md hover:shadow-lg transform hover:scale-105' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {formData.isFeatured ? (
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

        {/* Album Preview Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-800 mb-1">Album Preview</h3>
              <div className="text-xs text-blue-600 space-y-1">
                <div>Photos selected: {selectedPhotos.length}</div>
                {formData.title && <div>Title: "{formData.title}"</div>}
                {formData.isFeatured && <div>✨ Will be featured</div>}
              </div>
            </div>
            {selectedPhotos.length > 0 && (
              <div className="flex -space-x-2">
                {selectedPhotos.slice(0, 3).map((photo, index) => (
                  <div key={photo._id} className="relative">
                    <img
                      src={photo.thumbnailUrl || photo.imageUrl}
                      alt={photo.title}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  </div>
                ))}
                {selectedPhotos.length > 3 && (
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs text-blue-600 font-medium">
                    +{selectedPhotos.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumForm;