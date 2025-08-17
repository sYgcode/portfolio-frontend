import React from 'react';

// Loading Section Component
const LoadingSection = () => {
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
};

export default LoadingSection;