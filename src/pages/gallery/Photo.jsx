import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Maximize2, X, Heart, Mail, Star } from "lucide-react"; // Added new icons
import PhotoMetadataCard from "../../components/Photo/PhotoMetadataCard";
import PhotoTagsCard from "../../components/Photo/PhotoTagsCard";
import PhotoDescriptionCard from "../../components/Photo/PhotoDescriptionCard";
import PhotoAdminControls from "../../components/Photo/PhotoAdminControls";

export default function Photo({ photosApi, userRole, userApi, isAuthenticated }) { // Added userApi, isAuthenticated
    const { id } = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    
    // Added new state for features
    const [isEnlarged, setIsEnlarged] = React.useState(false);
    const [isFavorited, setIsFavorited] = React.useState(false);
    const [favoritesLoading, setFavoritesLoading] = React.useState(false);
    
    React.useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await photosApi.getPhotoById(id);
                setPhoto(response);
                
                // Check if photo is favorited (only if user is authenticated)
                if (isAuthenticated && userApi) {
                    try {
                        const favorited = await userApi.isFavorited(id, 'photo');
                        setIsFavorited(favorited);
                    } catch (err) {
                        console.log('Could not check favorite status:', err);
                    }
                }
            } catch (err) {
                console.error("Error fetching photo:", err);
                setError("Failed to load photo.");
            }
        };
        fetchPhoto();
    }, [id, photosApi, isAuthenticated, userApi]); // Added dependencies

    // Added new handlers
    const handleFavoriteToggle = async () => {
        if (!isAuthenticated || !userApi) {
            navigate('/login');
            return;
        }

        setFavoritesLoading(true);
        try {
            await userApi.toggleFavorite(id, 'photo');
            setIsFavorited(!isFavorited);
        } catch (err) {
            console.error('Error toggling favorite:', err);
            setError('Failed to update favorites');
        } finally {
            setFavoritesLoading(false);
        }
    };

    const handleEnlargeToggle = () => {
        setIsEnlarged(!isEnlarged);
    };

    // Close enlarged view on escape key
    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isEnlarged) {
                setIsEnlarged(false);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isEnlarged]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await photosApi.deletePhoto(id);
            navigate('/gallery'); // Redirect to gallery after deletion
        } catch (err) {
            console.error("Error deleting photo:", err);
            setError("Failed to delete photo.");
            setIsDeleting(false);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        // Close delete confirmation if open
        if (showDeleteConfirm) {
            setShowDeleteConfirm(false);
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
        // Close edit mode if open
        if (isEditing) {
            setIsEditing(false);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
    };

    const handlePhotoUpdate = (updatedPhoto) => {
        setPhoto(updatedPhoto);
        photosApi.updatePhoto(id, updatedPhoto)
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-lg mb-4">{error}</div>
                    <button
                        onClick={() => navigate('/gallery')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
                    >
                        Back to Gallery
                    </button>
                </div>
            </div>
        );
    }

    if (!photo) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-slate-600 text-lg">Loading photo...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header with back button */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/gallery')}
                        className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-200 group"
                        disabled={isDeleting}
                    >
                        <ArrowLeft className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
                        Back to Gallery
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Photo Display - UPDATED */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl group">
                            <img
                                src={photo.imageUrl}
                                alt={photo.title}
                                className="w-full h-auto object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                onClick={handleEnlargeToggle}
                            />
                            {/* Subtle overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                            
                            {/* Hover overlay with enlarge button - NEW */}
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                <button
                                    onClick={handleEnlargeToggle}
                                    className="bg-white/90 backdrop-blur-sm text-slate-700 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                                >
                                    <Maximize2 className="h-6 w-6" />
                                </button>
                            </div>
                            
                            {/* Image info overlay */}
                            {photo.metadata && (photo.metadata.originalWidth || photo.metadata.originalHeight) && (
                                <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                                    {photo.metadata.originalWidth} × {photo.metadata.originalHeight}
                                    {photo.metadata.originalSizeKB && (
                                        <span className="ml-2">
                                            • {(photo.metadata.originalSizeKB / 1024).toFixed(1)} MB
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        {/* Image Actions - NEW SECTION */}
                        <div className="flex items-center justify-between mt-4">
                            {/* Contact for Purchase */}
                            <div className="text-sm text-slate-600">
                                <span>Want this </span>
                                <button
                                    onClick={() => navigate('/contact-us')}
                                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center transition-colors duration-200"
                                >
                                    <Mail className="h-3 w-3 mr-1" />
                                    watermark-free?
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                {/* Favorite Button (All Users) */}
                                {isAuthenticated && (
                                    <button
                                        onClick={handleFavoriteToggle}
                                        disabled={favoritesLoading}
                                        className={`p-2 rounded-full transition-all duration-200 ${
                                            isFavorited 
                                                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        } disabled:opacity-50`}
                                        title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                                    >
                                        <Star className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Photo Information - UNCHANGED */}
                    <div className="space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
                        {/* Title */}
                        <div>
                            <h1 className="text-4xl font-thin text-slate-800 mb-2 relative">
                                <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    {photo.title}
                                </span>
                                <div className="absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
                            </h1>
                            <div className="w-24 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                        </div>

                        {/* Description */}
                        <PhotoDescriptionCard description={photo.description} />

                        {/* Tags */}
                        <PhotoTagsCard tags={photo.tags} />

                        {/* Metadata */}
                        <PhotoMetadataCard photo={photo} />

                        {/* Admin Controls */}
                        <PhotoAdminControls
                            photo={photo}
                            userRole={userRole}
                            isEditing={isEditing}
                            showDeleteConfirm={showDeleteConfirm}
                            onEditToggle={handleEditToggle}
                            onDeleteClick={handleDeleteClick}
                            onDeleteConfirm={handleDelete}
                            onDeleteCancel={handleDeleteCancel}
                            onPhotoUpdate={handlePhotoUpdate}
                            photosApi={photosApi}
                        />

                        {/* Deletion Loading State */}
                        {isDeleting && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                <div className="text-center">
                                    <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                                    <p className="text-red-800 font-medium">Deleting photo...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enlarged Image Modal - NEW SECTION */}
                {isEnlarged && (
                    <div 
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={handleEnlargeToggle}
                    >
                        <div className="relative max-w-screen-xl max-h-screen">
                            <button
                                onClick={handleEnlargeToggle}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
                            >
                                <X className="h-8 w-8" />
                            </button>
                            <img
                                src={photo.imageUrl}
                                alt={photo.title}
                                className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                                {photo.title}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}