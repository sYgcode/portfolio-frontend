import React from 'react';
import { Calendar, MapPin, User, Ruler, Camera } from 'lucide-react';

const PhotoForm = ({ formData, onInputChange, isUploading, selectedFile }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    // Convert to ISO string for consistent handling
    const dateValue = value ? new Date(value).toISOString() : '';
    onInputChange(name, dateValue);
  };

  // Format date for input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="space-y-4">
          {/* Title - Required */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={isUploading}
              maxLength={200}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50"
              placeholder="Enter photo title..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">{formData.title.length}/200 characters</p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={isUploading}
              maxLength={1000}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 resize-none"
              placeholder="Describe your photo..."
            />
            <p className="text-xs text-gray-500 mt-1">{formData.description.length}/1000 characters</p>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              disabled={isUploading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50"
              placeholder="nature, landscape, photography (comma separated)"
            />
            <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
          </div>
        </div>
      </div>

      {/* Photo Details */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Camera className="h-5 w-5 mr-2 text-blue-600" />
          Photo Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Photographer */}
          <div>
            <label htmlFor="photographer" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              Photographer
            </label>
            <input
              type="text"
              id="photographer"
              name="photographer"
              value={formData.photographer}
              onChange={handleInputChange}
              disabled={isUploading}
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50"
              placeholder="Photographer name"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={isUploading}
              maxLength={200}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50"
              placeholder="Where was this taken?"
            />
          </div>

          {/* Date Taken */}
          <div className="sm:col-span-2">
            <label htmlFor="dateTaken" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-1" />
              Date Taken
            </label>
            <input
              type="date"
              id="dateTaken"
              name="dateTaken"
              value={formatDateForInput(formData.dateTaken)}
              onChange={handleDateChange}
              disabled={isUploading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Ruler className="h-5 w-5 mr-2 text-blue-600" />
          Technical Information
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Original Width */}
          <div>
            <label htmlFor="originalWidth" className="block text-sm font-medium text-gray-700 mb-2">
              Width (px)
            </label>
            <input
              type="number"
              id="originalWidth"
              name="originalWidth"
              value={formData.originalWidth}
              onChange={handleInputChange}
              disabled={isUploading}
              min="1"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 text-sm"
              placeholder="Auto"
            />
          </div>

          {/* Original Height */}
          <div>
            <label htmlFor="originalHeight" className="block text-sm font-medium text-gray-700 mb-2">
              Height (px)
            </label>
            <input
              type="number"
              id="originalHeight"
              name="originalHeight"
              value={formData.originalHeight}
              onChange={handleInputChange}
              disabled={isUploading}
              min="1"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 text-sm"
              placeholder="Auto"
            />
          </div>

          {/* Display Width */}
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-2">
              Display W (px)
            </label>
            <input
              type="number"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              disabled={isUploading}
              min="1"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 text-sm"
              placeholder="Auto"
            />
          </div>

          {/* Display Height */}
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
              Display H (px)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              disabled={isUploading}
              min="1"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 text-sm"
              placeholder="Auto"
            />
          </div>
        </div>

        {/* Auto-detected information display */}
        {selectedFile && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Auto-detected Information</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-600">
              <div>
                <span className="font-medium">Original Size:</span>
                <br />
                {selectedFile.originalSizeKB ? `${selectedFile.originalSizeKB.toFixed(1)} KB` : 'N/A'}
              </div>
              <div>
                <span className="font-medium">Compressed Size:</span>
                <br />
                {selectedFile.sizeKB ? `${selectedFile.sizeKB.toFixed(1)} KB` : 'N/A'}
              </div>
              <div>
                <span className="font-medium">Format:</span>
                <br />
                {selectedFile.format || 'N/A'}
              </div>
              <div>
                <span className="font-medium">Dimensions:</span>
                <br />
                {selectedFile.originalWidth && selectedFile.originalHeight 
                  ? `${selectedFile.originalWidth} × ${selectedFile.originalHeight}`
                  : 'N/A'
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoForm;