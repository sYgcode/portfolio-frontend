import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import FileUpload from '../../components/AddPhoto/FileUpload';
import PhotoForm from '../../components/AddPhoto/PhotoForm';
import UploadButton from '../../components/AddPhoto/UploadButton';
import UploadStatusModal from '../../components/AddPhoto/UploadStatusModal';

const AddPhoto = ({ photosApi, onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    photographer: '',
    location: '',
    dateTaken: '',
    originalWidth: '',
    originalHeight: '',
    width: '',
    height: ''
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Fallback navigation
      window.location.href = '/admin';
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (fileData) => {
    setSelectedFile(fileData);
    setCompressionProgress(25);
    
    // Auto-populate dimensions and metadata if detected
    if (fileData.originalWidth && fileData.originalHeight) {
      setFormData(prev => ({
        ...prev,
        originalWidth: fileData.originalWidth.toString(),
        originalHeight: fileData.originalHeight.toString(),
        // Set display dimensions same as original by default
        width: fileData.originalWidth.toString(),
        height: fileData.originalHeight.toString()
      }));
    }

    // Auto-populate date taken if available
    if (fileData.dateTaken) {
      setFormData(prev => ({
        ...prev,
        dateTaken: fileData.dateTaken.toISOString()
      }));
    }
    
    // Simulate compression progress
    setTimeout(() => setCompressionProgress(50), 200);
    setTimeout(() => setCompressionProgress(75), 400);
    setTimeout(() => setCompressionProgress(100), 600);
    setTimeout(() => setCompressionProgress(0), 1000);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFormData(prev => ({
      ...prev,
      originalWidth: '',
      originalHeight: '',
      width: '',
      height: '',
      dateTaken: ''
    }));
  };

  const validateForm = () => {
    if (!selectedFile) {
      alert('Please select an image');
      return false;
    }

    if (!formData.title.trim()) {
      alert('Please enter a title');
      return false;
    }

    if (formData.title.length > 200) {
      alert('Title must be less than 200 characters');
      return false;
    }

    if (formData.description.length > 1000) {
      alert('Description must be less than 1000 characters');
      return false;
    }

    return true;
  };

  const handleUpload = async () => {
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);
    setErrorMessage('');

    try {
      // Parse and validate dimensions
      const parseNumber = (str, fallback = null) => {
        const num = parseInt(str);
        return isNaN(num) ? fallback : num;
      };

      // Prepare comprehensive metadata
      const metadata = {
        photographer: formData.photographer || null,
        location: formData.location || null,
        originalWidth: parseNumber(formData.originalWidth, selectedFile.originalWidth),
        originalHeight: parseNumber(formData.originalHeight, selectedFile.originalHeight),
        width: parseNumber(formData.width, selectedFile.originalWidth),
        height: parseNumber(formData.height, selectedFile.originalHeight),
        originalSizeKB: selectedFile.originalSizeKB || null,
        sizeKB: selectedFile.sizeKB || null,
        format: selectedFile.format || selectedFile.file?.type || 'image/jpeg',
        dateTaken: formData.dateTaken || selectedFile.dateTaken || null
      };

      const photoData = {
        image: selectedFile.file || selectedFile,
        title: formData.title.trim(),
        description: formData.description.trim(),
        photographer: formData.photographer.trim() || null,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        metadata
      };

      console.log('Uploading photo with data:', photoData);
      const response = await photosApi.createPhoto(photoData);
      console.log('Upload response:', response);

      setUploadStatus('success');

      // Reset form
      setFormData({
        title: '',
        description: '',
        tags: '',
        photographer: '',
        location: '',
        dateTaken: '',
        originalWidth: '',
        originalHeight: '',
        width: '',
        height: ''
      });
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      setErrorMessage(error.message || 'Upload failed. Please try again.');
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseModal = () => {
    setUploadStatus(null);
    setErrorMessage('');
  };

  const handleRetryUpload = () => {
    setUploadStatus(null);
    setErrorMessage('');
    handleUpload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Upload Status Modal */}
      <UploadStatusModal
        uploadStatus={uploadStatus}
        errorMessage={errorMessage}
        onClose={handleCloseModal}
        onRetry={uploadStatus === 'error' ? handleRetryUpload : null}
      />

      {/* Header */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={handleBack}
              className="flex items-center justify-center h-12 w-12 rounded-xl bg-gray-50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <div>
              <h1 className="text-3xl sm:text-4xl font-thin text-slate-800 tracking-tight relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Add New Photo
                </span>
                <div className="absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
              </h1>
              <p className="text-gray-500 mt-2 font-light text-sm sm:text-base">
                Upload and organize your gallery images with rich metadata
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - File Upload */}
          <div className="space-y-6">
            <FileUpload
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              onRemoveFile={handleRemoveFile}
              compressionProgress={compressionProgress}
              isUploading={isUploading}
            />

            {/* Desktop Upload Button */}
            <div className="hidden lg:block pt-4">
              <UploadButton
                onUpload={handleUpload}
                isUploading={isUploading}
                selectedFile={selectedFile}
                formData={formData}
              />
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="space-y-6">
            <PhotoForm
              formData={formData}
              onInputChange={handleInputChange}
              isUploading={isUploading}
              selectedFile={selectedFile}
            />

            {/* Mobile Upload Button */}
            <div className="lg:hidden pt-4">
              <UploadButton
                onUpload={handleUpload}
                isUploading={isUploading}
                selectedFile={selectedFile}
                formData={formData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;