import React, { useState, useEffect, useRef } from 'react';
import FeaturedPhotoCard from './FeaturedPhotoCard';
import FavoritePhotoCard from './FavoritePhotoCard';
import FeaturedAlbumCard from './FeaturedAlbumCard';

// Netflix-style carousel component
const FeaturedCarousel = ({ items, onItemClick, type = "photos" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  const itemsPerView = 3; // Number of items visible at once
  const maxIndex = Math.max(0, items.length - itemsPerView);

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < maxIndex);
  }, [currentIndex, maxIndex]);

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm"
          aria-label={`Previous ${type}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm"
          aria-label={`Next ${type}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden" ref={carouselRef}>
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (320 + 24)}px)` // 320px width + 24px gap
          }}
        >
          {items.map((item) => (
            type === "photos" ? (
              <FeaturedPhotoCard 
                key={item._id} 
                photo={item} 
                onPhotoClick={onItemClick}
              />
            ) : type === "favorites" ? (
              <FavoritePhotoCard 
                key={item._id} 
                photo={item} 
                onPhotoClick={onItemClick}
              />
            ) : (
              <FeaturedAlbumCard 
                key={item._id} 
                album={item} 
                onAlbumClick={onItemClick}
              />
            )
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      {items.length > itemsPerView && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedCarousel;