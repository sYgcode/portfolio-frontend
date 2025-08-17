import React from 'react';

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4 tracking-tight">
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-light">
            Welcome to Shua's Portfolio
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
          Hi, my name is Shua, and I'm an amateur photographer based in Israel. 
          This is where I share my favorite work and creative journey.
          I hope you enjoy!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;