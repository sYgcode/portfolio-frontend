import React from 'react';

// Pagination Component - Fixed with proper button handling
const Pagination = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page, e) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-3 mt-12 mb-8">
      {/* Previous Button */}
      <button
        onClick={(e) => handlePageClick(currentPage - 1, e)}
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md font-medium"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>
      
      {/* First page + ellipsis if needed */}
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={(e) => handlePageClick(1, e)}
            className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 shadow-sm hover:shadow-md font-medium min-w-[40px]"
          >
            1
          </button>
          {visiblePages[0] > 2 && (
            <span className="text-slate-400 px-2 select-none">...</span>
          )}
        </>
      )}
      
      {/* Visible page numbers */}
      {visiblePages.map(page => (
        <button
          key={page}
          onClick={(e) => handlePageClick(page, e)}
          className={`px-4 py-2 rounded-lg border transition-all duration-200 font-medium min-w-[40px] ${
            currentPage === page
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 shadow-sm hover:shadow-md'
          }`}
        >
          {page}
        </button>
      ))}
      
      {/* Last page + ellipsis if needed */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="text-slate-400 px-2 select-none">...</span>
          )}
          <button
            onClick={(e) => handlePageClick(totalPages, e)}
            className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 shadow-sm hover:shadow-md font-medium min-w-[40px]"
          >
            {totalPages}
          </button>
        </>
      )}
      
      {/* Next Button */}
      <button
        onClick={(e) => handlePageClick(currentPage + 1, e)}
        disabled={currentPage === totalPages}
        className="flex items-center px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md font-medium"
      >
        Next
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Page info */}
      <div className="ml-4 text-sm text-slate-500 font-medium">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;