import React, { useState } from 'react';

// Favorite Photo Card Component - slightly different styling
const FavoritePhotoCard = ({ photo, onPhotoClick = () => {} }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex-shrink-0 w-80 group cursor-pointer transition-all duration-500 ease-out transform hover:scale-105 hover:z-10 mr-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPhotoClick(photo._id)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <img
          src={photo.thumbnailUrl || photo.imageUrl}
          alt={photo.title}
          className={`w-full h-48 object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-100 animate-pulse" />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Favorite badge */}
        <div className="absolute top-3 left-3">
          <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-xs font-medium shadow-lg backdrop-blur-sm flex items-center">
            <svg className="w-3 h-3 mr-1 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Favorite
          </div>
        </div>
        
        {/* Title and photographer always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-medium tracking-wide mb-1 drop-shadow-lg line-clamp-2">
            {photo.title}
          </h3>
          {(photo.photographer || photo.metadata?.photographer) && (
            <p className="text-white/80 text-sm drop-shadow-md">
              by {photo.photographer || photo.metadata?.photographer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritePhotoCard;