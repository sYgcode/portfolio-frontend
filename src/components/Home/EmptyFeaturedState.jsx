import React from 'react';

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

export default EmptyFeaturedState;