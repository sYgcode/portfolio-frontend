import React, { useState, useEffect, useRef } from 'react';

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

// Empty state component
const EmptyFeaturedState = ({ type = "photos" }) => (
  <div className="flex flex-col items-center justify-center py-16 px-8">
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-6">
      {type === "photos" ? (
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ) : (
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )}
    </div>
    <h3 className="text-xl font-light text-gray-600 mb-2">
      No Featured {type === "photos" ? "Photos" : "Albums"} Yet
    </h3>
    <p className="text-gray-500 text-center max-w-md">
      Featured {type} will appear here when they're available. Check back soon for curated selections.
    </p>
  </div>
);

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

// Section component for expandability
const FeaturedSection = ({ title, children, viewAllLink, viewAllText = "View All" }) => (
  <section className="mb-16">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-light text-gray-900 mb-2">{title}</h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>
      {viewAllLink && (
        <button
          onClick={() => window.location.href = viewAllLink}
          className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <span>{viewAllText}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
    {children}
  </section>
);

// Main Home component
const Home = ({ photosApi, albumsApi, userApi, isAuthenticated, onPhotoClick = (id) => { window.location.href = `/photo/${id}` }, onAlbumClick = (id) => { window.location.href = `/album/${id}` } }) => {
  const [featuredPhotos, setFeaturedPhotos] = useState([]);
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [favoritePhotos, setFavoritePhotos] = useState([]);
  const [photosLoading, setPhotosLoading] = useState(true);
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [photosError, setPhotosError] = useState(null);
  const [albumsError, setAlbumsError] = useState(null);
  const [favoritesError, setFavoritesError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPhotos = async () => {
      try {
        setPhotosLoading(true);
        setPhotosError(null);
        
        const data = await photosApi.getFeaturedPhotos();
        setFeaturedPhotos(data.photos || data || []);
      } catch (err) {
        console.error('Error fetching featured photos:', err);
        
        // Fallback: try to get regular photos if featured endpoint doesn't exist
        try {
          const fallbackData = await photosApi.getPhotos(4, 1);
          setFeaturedPhotos(fallbackData.photos || fallbackData || []);
          setPhotosError(null);
        } catch (fallbackErr) {
          console.error('Fallback also failed:', fallbackErr);
          setPhotosError(`Featured photos unavailable: ${err.message}`);
        }
      } finally {
        setPhotosLoading(false);
      }
    };

    const fetchFeaturedAlbums = async () => {
      try {
        setAlbumsLoading(true);
        setAlbumsError(null);
        
        const data = await albumsApi.getFeaturedAlbums();
        setFeaturedAlbums(data.albums || data || []);
      } catch (err) {
        console.error('Error fetching featured albums:', err);
        
        // Fallback: try to get regular albums if featured endpoint doesn't exist
        try {
          const fallbackData = await albumsApi.getAlbums(4, 1);
          setFeaturedAlbums(fallbackData.albums || fallbackData || []);
          setAlbumsError(null);
        } catch (fallbackErr) {
          console.error('Albums fallback also failed:', fallbackErr);
          setAlbumsError(`Featured albums unavailable: ${err.message}`);
        }
      } finally {
        setAlbumsLoading(false);
      }
    };

    const fetchFavoritePhotos = async () => {
      if (!isAuthenticated || !userApi) return;

      try {
        setFavoritesLoading(true);
        setFavoritesError(null);
        
        const data = await userApi.getFavorites('photo');
        setFavoritePhotos(data || []);
      } catch (err) {
        console.error('Error fetching favorite photos:', err);
        setFavoritesError(`Favorites unavailable: ${err.message}`);
      } finally {
        setFavoritesLoading(false);
      }
    };

    if (photosApi) {
      fetchFeaturedPhotos();
    }
    
    if (albumsApi) {
      fetchFeaturedAlbums();
    }

    if (isAuthenticated && userApi) {
      fetchFavoritePhotos();
    }
  }, [photosApi, albumsApi, userApi, isAuthenticated]);

  const isLoading = photosLoading || albumsLoading || favoritesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section Loading */}
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="w-64 h-8 bg-gray-200 animate-pulse rounded mx-auto mb-4"></div>
            <div className="w-96 h-6 bg-gray-200 animate-pulse rounded mx-auto"></div>
          </div>
        </div>
        
        {/* Featured Content Loading */}
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
          <div>
            <div className="w-48 h-8 bg-gray-200 animate-pulse rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-64"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="w-48 h-8 bg-gray-200 animate-pulse rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4 tracking-tight">
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-light">
              Welcome to My Portfolio
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Hi, I'm a photographer passionate about capturing moments and telling stories through my lens. 
            This is where I share my favorite work and creative journey.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* My Favorites Section - Only show if user is authenticated and has favorites */}
        {isAuthenticated && favoritePhotos.length > 0 && (
          <FeaturedSection 
            title="My Favorites" 
            viewAllLink="/user"
            viewAllText="View All Favorites"
          >
            {favoritesError ? (
              <div className="text-center py-16">
                <p className="text-red-500">Error loading favorites: {favoritesError}</p>
              </div>
            ) : (
              <FeaturedCarousel 
                items={favoritePhotos} 
                onItemClick={onPhotoClick}
                type="favorites"
              />
            )}
          </FeaturedSection>
        )}

        {/* Featured Photos Section */}
        <FeaturedSection 
          title="Featured Photos" 
          viewAllLink="/gallery"
          viewAllText="View Gallery"
        >
          {photosError ? (
            <div className="text-center py-16">
              <p className="text-red-500">Error loading featured photos: {photosError}</p>
            </div>
          ) : featuredPhotos.length > 0 ? (
            <FeaturedCarousel 
              items={featuredPhotos} 
              onItemClick={onPhotoClick}
              type="photos"
            />
          ) : (
            <EmptyFeaturedState type="photos" />
          )}
        </FeaturedSection>

        {/* Featured Albums Section */}
        <FeaturedSection 
          title="Featured Albums" 
          viewAllLink="/albums"
          viewAllText="View Albums"
        >
          {albumsError ? (
            <div className="text-center py-16">
              <p className="text-red-500">Error loading featured albums: {albumsError}</p>
            </div>
          ) : featuredAlbums.length > 0 ? (
            <FeaturedCarousel 
              items={featuredAlbums} 
              onItemClick={onAlbumClick}
              type="albums"
            />
          ) : (
            <EmptyFeaturedState type="albums" />
          )}
        </FeaturedSection>
      </div>
    </div>
  );
};

export default Home;