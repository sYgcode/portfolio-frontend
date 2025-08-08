import React, { useState, useEffect } from 'react';
import AlbumCard from '../components/Albums/AlbumCard';
import Pagination from '../components/Gallery/Pagination';
import TagSearch from '../components/Gallery/TagSearch';

// Main Albums Gallery Component
const Albums = ({ albumsApi }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [albumsPerPage] = useState(8);
  const [selectedTag, setSelectedTag] = useState('');

  const fetchAlbums = async (page = 1, tag = '') => {
    try {
      setLoading(true);
      let response;
      
      if (tag && tag.trim().length > 0) {
        response = await albumsApi.getAlbumsByTag(tag.trim(), albumsPerPage, page);
      } else {
        response = await albumsApi.getAlbums(albumsPerPage, page);
      }
      
      console.log('Albums API Response:', response);
      
      setAlbums(response.albums || []);
      setTotalPages(response.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load albums. Please try again.');
      console.error('Error fetching albums:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums(1, selectedTag);
  }, []);

  const handlePageChange = (page) => {
    console.log('Page change requested:', page);
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchAlbums(page, selectedTag);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTagSearch = (tag) => {
    console.log('Tag search:', tag);
    setSelectedTag(tag);
    setCurrentPage(1);
    fetchAlbums(1, tag);
  };

  const clearTag = () => {
    setSelectedTag('');
    setCurrentPage(1);
    fetchAlbums(1, '');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-48 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: albumsPerPage }, (_, i) => (
              <div key={i} className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={() => fetchAlbums(currentPage, selectedTag)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-thin text-slate-800 mb-4 relative">
            <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Photo Albums
            </span>
            <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse"></div>
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg"></div>
        </div>

        {/* Tag Search */}
        <TagSearch 
          onTagSearch={handleTagSearch}
          selectedTag={selectedTag}
          onClearTag={clearTag}
        />

        {/* Debug info - remove in production */}
        <div className="text-center mb-4 text-sm text-gray-500">
          Albums: {albums.length} | Current Page: {currentPage} | Total Pages: {totalPages}
        </div>

        {/* Albums Grid */}
        {albums.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {albums.map((album) => (
                <AlbumCard key={album._id} album={album} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-slate-500 text-lg">
              {selectedTag ? `No albums found for tag "${selectedTag}"` : 'No albums found'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Albums;