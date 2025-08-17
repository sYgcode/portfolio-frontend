import React from 'react';

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

export default FeaturedSection;