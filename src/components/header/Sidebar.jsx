import React from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';

export default function Sidebar ({ isOpen, onClose, isAuthenticated, onLogout, options }) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 p-6">
            <ul className="space-y-4">
              {options.map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-lg"
                    onClick={onClose}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Auth Section */}
          <div className="p-6 border-t border-gray-100">
            {isAuthenticated ? (
              <div className="space-y-4">
                {/* Profile Section */}
                <a
                  href="/user"
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Profile</p>
                    <p className="text-xs text-gray-500">View your profile</p>
                  </div>
                </a>
                
                {/* Logout Button */}
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="flex items-center justify-center w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/login"
                onClick={() => {
                  onClose();
                }}
                className="flex items-center justify-center w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <User size={18} className="mr-2" />
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};