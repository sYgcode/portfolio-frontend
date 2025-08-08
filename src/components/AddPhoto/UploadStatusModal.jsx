import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const UploadStatusModal = ({ 
  uploadStatus, 
  errorMessage, 
  onClose, 
  onRetry 
}) => {
  if (!uploadStatus) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {uploadStatus === 'success' ? (
          <>
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Photo Uploaded Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              Your photo has been successfully uploaded to the gallery and is now available for viewing.
            </p>
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium"
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Upload Failed
            </h3>
            <p className="text-gray-600 mb-6">
              {errorMessage || 'Something went wrong while uploading your photo. Please try again.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
                >
                  Try Again
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadStatusModal;