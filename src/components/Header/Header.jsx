import React from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X, User, LogOut } from 'lucide-react';

export default function Header({ isAuthenticated, onLogout, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const options = ['Home', 'Gallery', 'Albums', 'Contact Us'];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  if(user?.role === 'admin') {
    options.push('Admin');
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 z-30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                UnBlurred
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {options.map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-blue-50"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Desktop Auth Button */}
            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <a
                    href="/user"
                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    <User size={18} className="text-white" />
                  </a>
                  <button
                    onClick={onLogout}
                    className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <LogOut size={14} className="mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
              <a
                href="/login"
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <User size={16} className="mr-2" />
                Login
              </a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        options={options}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />
    </>
  );
};