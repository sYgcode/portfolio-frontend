import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhotoMetadataCard from "../../components/Photo/PhotoMetadataCard";
import PhotoTagsCard from "../../components/Photo/PhotoTagsCard";
import PhotoDescriptionCard from "../../components/Photo/PhotoDescriptionCard";
import PhotoAdminControls from "../../components/Photo/PhotoAdminControls";

export default function Photo({ photosApi, userRole }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    
    React.useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await photosApi.getPhotoById(id);
                setPhoto(response);
            } catch (err) {
                console.error("Error fetching photo:", err);
                setError("Failed to load photo.");
            }
        };
        fetchPhoto();
    }, [id, photosApi]);

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
                    {/* Photo Display */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl">
                            <img
                                src={photo.imageUrl}
                                alt={photo.title}
                                className="w-full h-auto object-cover"
                                loading="lazy"
                            />
                            {/* Subtle overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
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

                    {/* Photo Information */}
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
            </div>
        </div>
    );
}