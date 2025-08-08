import React, { useState } from 'react';

// PhotoCard Component with Featured Badge
const PhotoCard = ({ photo, onPhotoClick = (id) => { window.location.href = `/photo/${id}` } }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer transition-all duration-300 ease-out transform hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPhotoClick(photo._id)}
      style={{
        filter: isHovered ? 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.15))' : 'none'
      }}
    >
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200">
        <img
          src={photo.thumbnailUrl || photo.imageUrl}
          alt={photo.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          style={{
            aspectRatio: photo.aspectRatio || '1',
          }}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse" />
        )}
        
        {/* Featured badge - show if photo is featured */}
        {photo.isFeatured && (
          <div className="absolute top-2 left-2 z-10">
            <div className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-xs font-medium shadow-lg backdrop-blur-sm">
              Featured
            </div>
          </div>
        )}
        
        {/* Simple title overlay with glow effect */}
        <div className={`absolute inset-x-0 bottom-0 p-3 transition-all duration-300 transform ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <h3 className="text-white text-sm font-light tracking-wide relative">
            <span className="relative z-10">{photo.title}</span>
            <div className="absolute inset-0 blur-md bg-black/60 -z-10 rounded"></div>
            <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-400/30 to-purple-400/30 -z-20"></div>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;