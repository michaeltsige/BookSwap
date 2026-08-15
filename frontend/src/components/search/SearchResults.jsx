import React from 'react';
import BooksCard from '../home/booksPage/BooksCard';
import UserBooksCard from '../home/booksPage/UserBooksCard';

const SearchResults = ({ 
  searchQuery, 
  filteredBooks, 
  filteredUserBooks, 
  showType,
  userBooks 
}) => {
  if (!searchQuery) return null;

  const totalResults = filteredBooks.length + filteredUserBooks.length;

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EDE5]">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Search Results
        </h2>
        <p className="text-gray-600">
          Found {totalResults} results for "<span className="font-semibold">{searchQuery}</span>"
        </p>
      </div>

      {/* Browse Books Results */}
      {showType === 'allBooks' && filteredBooks.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Available Books ({filteredBooks.length})
          </h3>
          <BooksCard books={filteredBooks} userBooks={userBooks} />
        </div>
      )}

      {/* My Books Results */}
      {showType === 'myBooks' && filteredUserBooks.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Your Books ({filteredUserBooks.length})
          </h3>
          <UserBooksCard books={filteredUserBooks} />
        </div>
      )}

      {/* No Results */}
      {totalResults === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-[#E8EDE5]">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">
            No books found for "<span className="font-semibold">{searchQuery}</span>"
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Try searching by title, author, or publication year
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;