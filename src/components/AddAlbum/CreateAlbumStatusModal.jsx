import React from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const CreateAlbumStatusModal = ({ createStatus, errorMessage, onClose, onRetry }) => {
  if (!createStatus) return null;

  const isSuccess = createStatus === 'success';
  const isError = createStatus === 'error';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4">
            {isSuccess && (
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full p-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            )}
            {isError && (
              <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-full p-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            )}
          </div>

          {/* Content */}
          {isSuccess && (
            <>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Album Created Successfully!
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Your new album has been created and is now available in your gallery.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Great!
                </button>
                <button
                  onClick={() => window.location.href = '/albums'}
                  className="px-6 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  View Albums
                </button>
              </div>
            </>
          )}

          {isError && (
            <>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Album Creation Failed
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {errorMessage || 'An unexpected error occurred while creating your album.'}
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 text-left">
                <p className="text-xs text-red-600 font-mono break-words">
                  {errorMessage}
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAlbumStatusModal;