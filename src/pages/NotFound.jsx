import React, { useState, useEffect } from 'react';
import { ArrowLeft, Camera, RotateCcw, Zap } from 'lucide-react';

const NotFound = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [cameraFlash, setCameraFlash] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(0);

  const photographyJokes = [
    "This page is like an overexposed photo... completely blown out!",
    "404: Image not found. Did you check your memory card?",
    "Oops! This page is out of focus. Try adjusting your URL.",
    "Error 404: This page is in the darkroom developing... indefinitely.",
    "Page not found! It must be camera shy.",
    "404: The page you're looking for has been cropped out of existence.",
    "This URL is like a bad photo - it just didn't develop properly.",
    "404: Page exposure failed. Please try a different aperture... I mean URL."
  ];

  const techJokes = [
    "404: Page not found in any dimension of the multiverse.",
    "This page has achieved quantum superposition - it both exists and doesn't exist.",
    "ERROR: Page.exe has stopped working. Have you tried turning the internet off and on again?",
    "404: The page you seek has been consumed by a black hole.",
    "This page is currently being refactored by an infinite number of monkeys.",
    "404: Page not found. It's probably stuck in a Git merge conflict.",
    "The page has been successfully deleted... wait, that wasn't supposed to happen.",
    "404: This page is taking a coffee break in the cloud."
  ];

  const allJokes = [...photographyJokes, ...techJokes];

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    const jokeInterval = setInterval(() => {
      setCurrentJoke((prev) => (prev + 1) % allJokes.length);
    }, 4000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(jokeInterval);
    };
  }, []);

  const handleCameraClick = () => {
    setCameraFlash(true);
    setTimeout(() => setCameraFlash(false), 300);
    setCurrentJoke((prev) => (prev + 1) % allJokes.length);
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>

      {/* Camera flash overlay */}
      {cameraFlash && (
        <div className="fixed inset-0 bg-white opacity-90 z-50 animate-ping"></div>
      )}

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl">
          {/* Giant 404 with glitch effect */}
          <div className="relative mb-8">
            <h1 
              className={`text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transform transition-all duration-200 ${
                glitchActive ? 'skew-x-2 scale-105' : ''
              }`}
              style={{
                textShadow: glitchActive 
                  ? '2px 2px 0px #ff0000, -2px -2px 0px #00ffff' 
                  : '0 0 20px rgba(147, 51, 234, 0.5)'
              }}
            >
              404
            </h1>
            
            {/* Glitch lines */}
            {glitchActive && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-transparent opacity-20 transform -skew-x-12"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-cyan-500 to-transparent opacity-20 transform skew-x-12"></div>
              </>
            )}
          </div>

          {/* Camera Icon with click interaction */}
          <div className="mb-8 flex justify-center">
            <button
              onClick={handleCameraClick}
              className="group relative p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <Camera className="w-16 h-16 text-white group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              
              {/* Camera flash effect */}
              <div className={`absolute inset-0 bg-white rounded-full transition-opacity duration-150 ${cameraFlash ? 'opacity-60' : 'opacity-0'}`}></div>
            </button>
          </div>

          {/* Dynamic joke text */}
          <div className="mb-12 h-20 flex items-center justify-center">
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl transition-all duration-500 transform">
              {allJokes[currentJoke]}
            </p>
          </div>

          {/* Fun subtitle */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Looks like this page is 
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-medium"> out of focus</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Don't worry, even Ansel Adams had shots that didn't turn out right.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGoHome}
              className="group flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Camera className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Back to Gallery
            </button>
            
            <button
              onClick={handleGoBack}
              className="group flex items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium shadow-lg hover:shadow-gray-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Go Back
            </button>
          </div>

          {/* Fun tech details */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-500 text-sm">
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-1 text-yellow-400" />
                Status: 404
              </div>
              <div className="flex items-center">
                <RotateCcw className="w-4 h-4 mr-1 text-blue-400" />
                Retries: ∞
              </div>
              <div className="flex items-center">
                <Camera className="w-4 h-4 mr-1 text-purple-400" />
                Focus: Not Found
              </div>
            </div>
          </div>

          {/* Easter egg hint */}
          <div className="mt-8">
            <p className="text-gray-600 text-xs">
              💡 Pro tip: Click the camera for a new joke!
            </p>
          </div>
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-20 h-20 border border-purple-400/20 rounded-lg transform rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-16 h-16 border border-blue-400/20 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-lg transform -rotate-12 animate-bounce"></div>
      </div>

      {/* Custom CSS for slow spin */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;