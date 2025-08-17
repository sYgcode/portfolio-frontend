import React, { useState } from 'react';

// Featured Photo Card Component - for Netflix-style carousel
const FeaturedPhotoCard = ({ photo, onPhotoClick = () => {} }) => {
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 animate-pulse" />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Featured badge */}
        <div className="absolute top-3 left-3">
          <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-xs font-medium shadow-lg backdrop-blur-sm">
            Featured
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

export default FeaturedPhotoCard;