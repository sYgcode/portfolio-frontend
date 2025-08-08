import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhotoCard from "../../components/Gallery/PhotoCard";
import AlbumMetadataCard from "../../components/Albums/AlbumMetadataCard";
import AlbumTagsCard from "../../components/Albums/AlbumTagsCard";
import AlbumDescriptionCard from "../../components/Albums/AlbumDescriptionCard";
import AlbumAdminControls from "../../components/Albums/AlbumAdminControls";

export default function Album({ albumsApi, photosApi, userRole }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [album, setAlbum] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    
    React.useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await albumsApi.getAlbumById(id);
                setAlbum(response);
            } catch (err) {
                console.error("Error fetching album:", err);
                setError("Failed to load album.");
            }
        };
        fetchAlbum();
    }, [id, albumsApi]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await albumsApi.deleteAlbum(id);
            navigate('/albums'); // Redirect to albums after deletion
        } catch (err) {
            console.error("Error deleting album:", err);
            setError("Failed to delete album.");
            setIsDeleting(false);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (showDeleteConfirm) {
            setShowDeleteConfirm(false);
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
        if (isEditing) {
            setIsEditing(false);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
    };

    const handleAlbumUpdate = (updatedAlbum) => {
        setAlbum(updatedAlbum);
    };

    const handlePhotoClick = (photoId) => {
        navigate(`/photo/${photoId}`);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-lg mb-4">{error}</div>
                    <button
                        onClick={() => navigate('/albums')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
                    >
                        Back to Albums
                    </button>
                </div>
            </div>
        );
    }

    if (!album) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-slate-600 text-lg">Loading album...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header with back button */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/albums')}
                        className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-200 group"
                        disabled={isDeleting}
                    >
                        <ArrowLeft className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
                        Back to Albums
                    </button>
                </div>

                {/* Album Header */}
                <div className="mb-12">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl">
                        <img
                            src={album.coverImageUrl}
                            alt={album.title}
                            className="w-full h-64 md:h-80 object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <h1 className="text-4xl md:text-5xl font-thin text-white mb-2 tracking-tight">
                                {album.title}
                            </h1>
                            <div className="flex items-center space-x-4 text-white/80">
                                <span>{album.photos?.length || 0} photos</span>
                                {album.isFeatured && (
                                    <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-medium">
                                        Featured
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content - Photos */}
                    <div className="lg:col-span-2">
                        {album.photos && album.photos.length > 0 ? (
                            <div className="space-y-8">
                                <h2 className="text-2xl font-light text-slate-800 mb-6">
                                    Photos in this Album
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {album.photos.map((photo) => (
                                        <PhotoCard 
                                            key={photo._id} 
                                            photo={photo} 
                                            onPhotoClick={handlePhotoClick}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-light text-gray-600 mb-2">No Photos Yet</h3>
                                <p className="text-gray-500">This album doesn't contain any photos.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Album Information */}
                    <div className="space-y-8">
                        {/* Description */}
                        <AlbumDescriptionCard description={album.description} />

                        {/* Tags */}
                        <AlbumTagsCard tags={album.tags} />

                        {/* Metadata */}
                        <AlbumMetadataCard album={album} />

                        {/* Admin Controls */}
                        <AlbumAdminControls
                            album={album}
                            userRole={userRole}
                            isEditing={isEditing}
                            showDeleteConfirm={showDeleteConfirm}
                            onEditToggle={handleEditToggle}
                            onDeleteClick={handleDeleteClick}
                            onDeleteConfirm={handleDelete}
                            onDeleteCancel={handleDeleteCancel}
                            onAlbumUpdate={handleAlbumUpdate}
                            albumsApi={albumsApi}
                            photosApi={photosApi}
                        />

                        {/* Deletion Loading State */}
                        {isDeleting && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                <div className="text-center">
                                    <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                                    <p className="text-red-800 font-medium">Deleting album...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}