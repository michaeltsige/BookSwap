import React from 'react';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  placeholder = "Search books...",
  className = "" 
}) => {
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HiOutlineX className="text-xl" />
          </button>
        )}
      </div>
      
      {/* Search tips */}
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 p-2 z-10">
          <p className="text-xs text-gray-500">
            Search by title, author, or publication year
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;