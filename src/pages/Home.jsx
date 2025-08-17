import React, { useState, useEffect } from 'react';
import HeroSection from '../components/Home/HeroSection';
import LoadingSection from '../components/Home/LoadingSection';
import FeaturedSection from '../components/Home/FeaturedSection.jsx';
import FeaturedCarousel from '../components/Home/FeaturedCarousel';
import EmptyFeaturedState from '../components/Home/EmptyFeaturedState';

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
    return <LoadingSection />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

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