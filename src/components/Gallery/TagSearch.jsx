import React, { useState } from 'react';
import { Search, X, Tag } from 'lucide-react';

// TagSearch Component
const TagSearch = ({ onTagSearch, selectedTag, onClearTag }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onTagSearch(inputValue.trim());
      setInputValue('');
    }
  };

  const handleClear = () => {
    setInputValue('');
    onClearTag();
  };

  return (
    <div className="mb-8">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search by tag..."
              className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md text-slate-700 placeholder-slate-400 text-sm"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="submit"
                className="p-1 text-slate-400 hover:text-blue-500 transition-colors duration-200"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Active tag display */}
        {selectedTag && (
          <div className="mt-3 flex items-center justify-center">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 shadow-sm">
              <Tag className="h-3 w-3 mr-1" />
              {selectedTag}
              <button
                onClick={handleClear}
                className="ml-1 hover:text-red-500 transition-colors duration-200"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagSearch;