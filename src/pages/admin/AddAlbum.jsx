import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import AlbumForm from '../../components/AddAlbum/AlbumForm';
import AlbumPhotoSelector from '../../components/AddAlbum/AlbumPhotoSelector';
import CreateAlbumButton from '../../components/AddAlbum/CreateAlbumButton';
import CreateAlbumStatusModal from '../../components/AddAlbum/CreateAlbumStatusModal';

const AddAlbum = ({ albumsApi, photosApi, onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    coverImageUrl: '',
    isFeatured: false
  });
  
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [createStatus, setCreateStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = '/admin';
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotosChange = (photos) => {
    setSelectedPhotos(photos);
    
    // Auto-set cover image if not already set and photos are selected
    if (photos.length > 0 && !formData.coverImageUrl) {
      setFormData(prev => ({
        ...prev,
        coverImageUrl: photos[0].imageUrl
      }));
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      alert('Please enter an album title');
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

    if (!formData.coverImageUrl.trim()) {
      alert('Please provide a cover image URL or select photos');
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }

    setIsCreating(true);
    setCreateStatus(null);
    setErrorMessage('');

    try {
      const albumData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        coverImageUrl: formData.coverImageUrl.trim(),
        photos: selectedPhotos.map(photo => photo._id),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        isFeatured: formData.isFeatured
      };

      console.log('Creating album with data:', albumData);
      const response = await albumsApi.createAlbum(albumData);
      console.log('Create response:', response);

      setCreateStatus('success');

      // Reset form
      setFormData({
        title: '',
        description: '',
        tags: '',
        coverImageUrl: '',
        isFeatured: false
      });
      setSelectedPhotos([]);
    } catch (error) {
      console.error('Album creation failed:', error);
      setErrorMessage(error.message || 'Failed to create album. Please try again.');
      setCreateStatus('error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCloseModal = () => {
    setCreateStatus(null);
    setErrorMessage('');
  };

  const handleRetryCreate = () => {
    setCreateStatus(null);
    setErrorMessage('');
    handleCreate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Create Status Modal */}
      <CreateAlbumStatusModal
        createStatus={createStatus}
        errorMessage={errorMessage}
        onClose={handleCloseModal}
        onRetry={createStatus === 'error' ? handleRetryCreate : null}
      />

      {/* Header */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
                  Create New Album
                </span>
                <div className="absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
              </h1>
              <p className="text-gray-500 mt-2 font-light text-sm sm:text-base">
                Organize your photos into beautiful albums
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Album Form */}
          <div className="space-y-6">
            <AlbumForm
              formData={formData}
              onInputChange={handleInputChange}
              isCreating={isCreating}
              selectedPhotos={selectedPhotos}
            />

            {/* Desktop Create Button */}
            <div className="hidden lg:block pt-4">
              <CreateAlbumButton
                onCreate={handleCreate}
                isCreating={isCreating}
                formData={formData}
                selectedPhotos={selectedPhotos}
              />
            </div>
          </div>

          {/* Right Column - Photo Selector */}
          <div className="space-y-6">
            <AlbumPhotoSelector
              selectedPhotos={selectedPhotos}
              onPhotosChange={handlePhotosChange}
              photosApi={photosApi}
              isCreating={isCreating}
              onCoverImageChange={(imageUrl) => handleInputChange('coverImageUrl', imageUrl)}
            />

            {/* Mobile Create Button */}
            <div className="lg:hidden pt-4">
              <CreateAlbumButton
                onCreate={handleCreate}
                isCreating={isCreating}
                formData={formData}
                selectedPhotos={selectedPhotos}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAlbum;