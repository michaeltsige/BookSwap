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
    <div className={`relative ${className} select-none`}>
      <div className="relative">
        <HiOutlineSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 border border-[#E3EAE3] bg-white rounded-xl focus:ring-1 focus:ring-[#9A3412] focus:border-[#9A3412] focus:bg-white text-sm text-slate-800 focus:outline-none transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <HiOutlineX className="text-lg" />
          </button>
        )}
      </div>
      
      {/* Search tips */}
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 bg-white border border-[#E3EAE3] rounded-lg shadow-sm mt-1.5 p-2.5 z-10 animate-fadeIn">
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
            Filtering by title, author, or publication year
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;