import React from 'react';
import { Plus, Loader } from 'lucide-react';

const CreateAlbumButton = ({ onCreate, isCreating, formData, selectedPhotos }) => {
  const isDisabled = isCreating || !formData.title.trim() || !formData.coverImageUrl.trim();

  const getButtonText = () => {
    if (isCreating) return 'Creating Album...';
    if (!formData.title.trim()) return 'Enter Album Title';
    if (!formData.coverImageUrl.trim()) return 'Add Cover Image';
    return 'Create Album';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="space-y-4">
        {/* Create Button */}
        <button
          onClick={onCreate}
          disabled={isDisabled}
          className={`w-full py-4 px-6 rounded-xl font-medium text-lg transition-all duration-300 transform ${
            isDisabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:scale-105 active:scale-95 shadow-md'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            {isCreating ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            <span>{getButtonText()}</span>
          </div>
        </button>

        {/* Album Summary */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Album Summary</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Title:</span>
              <span className="font-medium">
                {formData.title || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Photos:</span>
              <span className="font-medium">
                {selectedPhotos.length} selected
              </span>
            </div>
            <div className="flex justify-between">
              <span>Featured:</span>
              <span className={`font-medium ${
                formData.isFeatured ? 'text-yellow-600' : 'text-gray-500'
              }`}>
                {formData.isFeatured ? 'Yes' : 'No'}
              </span>
            </div>
            {formData.tags && (
              <div className="flex justify-between">
                <span>Tags:</span>
                <span className="font-medium">
                  {formData.tags.split(',').filter(t => t.trim()).length} tags
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Requirements
          </h4>
          <div className="space-y-1">
            <div className={`flex items-center text-sm ${
              formData.title.trim() ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                formData.title.trim() ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {formData.title.trim() && (
                  <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              Album title
            </div>
            <div className={`flex items-center text-sm ${
              formData.coverImageUrl.trim() ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                formData.coverImageUrl.trim() ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {formData.coverImageUrl.trim() && (
                  <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              Cover image
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {isCreating && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Loader className="h-5 w-5 text-blue-600 animate-spin" />
              <div>
                <p className="text-blue-800 font-medium text-sm">Creating your album...</p>
                <p className="text-blue-600 text-xs">This may take a moment</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAlbumButton;