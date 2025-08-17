import React, { useState } from 'react';

// Featured Album Card Component
const FeaturedAlbumCard = ({ album, onAlbumClick = () => {} }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex-shrink-0 w-80 group cursor-pointer transition-all duration-500 ease-out transform hover:scale-105 hover:z-10 mr-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onAlbumClick(album._id)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <img
          src={album.coverImageUrl}
          alt={album.title}
          className={`w-full h-48 object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 animate-pulse" />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Featured badge */}
        <div className="absolute top-3 left-3">
          <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full text-white text-xs font-medium shadow-lg backdrop-blur-sm">
            Album
          </div>
        </div>

        {/* Photo count badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center px-3 py-1 bg-black/70 rounded-full text-white text-xs font-medium backdrop-blur-sm">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {album.photos?.length || 0}
          </div>
        </div>
        
        {/* Title and description always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-medium tracking-wide mb-1 drop-shadow-lg line-clamp-2">
            {album.title}
          </h3>
          {album.description && (
            <p className="text-white/80 text-sm drop-shadow-md line-clamp-2">
              {album.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedAlbumCard;