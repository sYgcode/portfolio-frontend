import React, { useState } from 'react';
import { ImageIcon, Calendar } from 'lucide-react';

// AlbumCard Component
const AlbumCard = ({ album, onAlbumClick = (id) => { window.location.href = `/album/${id}` } }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return null;
    }
  };

  return (
    <div 
      className="relative group cursor-pointer transition-all duration-300 ease-out transform hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onAlbumClick(album._id)}
      style={{
        filter: isHovered ? 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.15))' : 'none'
      }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Cover Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={album.coverImageUrl}
            alt={album.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 animate-pulse" />
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Featured badge */}
          {album.isFeatured && (
            <div className="absolute top-3 left-3">
              <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-xs font-medium shadow-lg backdrop-blur-sm">
                Featured
              </div>
            </div>
          )}

          {/* Photo count badge */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center px-3 py-1 bg-black/70 rounded-full text-white text-xs font-medium backdrop-blur-sm">
              <ImageIcon className="w-3 h-3 mr-1" />
              {album.photos?.length || 0}
            </div>
          </div>
        </div>

        {/* Album Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-medium tracking-wide mb-1 drop-shadow-lg line-clamp-2">
            {album.title}
          </h3>
          
          {album.description && (
            <p className="text-white/80 text-sm drop-shadow-md line-clamp-2 mb-2">
              {album.description}
            </p>
          )}
          
          <div className="flex items-center text-white/70 text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(album.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;