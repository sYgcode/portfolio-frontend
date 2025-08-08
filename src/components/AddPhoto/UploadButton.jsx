import React from 'react';
import { Upload, Loader2 } from 'lucide-react';

const UploadButton = ({ 
  onUpload, 
  isUploading, 
  disabled, 
  selectedFile, 
  formData,
  className = "" 
}) => {
  const isDisabled = isUploading || !selectedFile || !formData.title.trim() || disabled;

  return (
    <button
      type="button"
      onClick={onUpload}
      disabled={isDisabled}
      className={`w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {isUploading ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Uploading Photo...
        </>
      ) : (
        <>
          <Upload className="h-5 w-5 mr-2" />
          Upload Photo
        </>
      )}
    </button>
  );
};

export default UploadButton;