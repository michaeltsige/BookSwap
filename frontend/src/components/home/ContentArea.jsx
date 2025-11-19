import React from 'react';
import { Link } from 'react-router-dom';
import { LuBookPlus } from 'react-icons/lu';
import Spinner from '../Spinner';
import BooksCard from '../home/booksPage/BooksCard';
import UserBooksCard from '../home/booksPage/UserBooksCard';
import SwapPage from '../home/swapRequestsPage/SwapPage';
import SearchResults from '../search/SearchResults';

const ContentArea = ({ 
  loading, 
  showType, 
  books, 
  userBooks, 
  swapsSent, 
  swapsReceived, 
  onAccept, 
  onReject,
  searchQuery,
  filteredBooks,
  filteredUserBooks,
  swapLoading 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  }

  // Show search results if there's a search query (only for book tabs)
  if (searchQuery && showType !== 'swaps') {
    return (
      <SearchResults
        searchQuery={searchQuery}
        filteredBooks={filteredBooks}
        filteredUserBooks={filteredUserBooks}
        showType={showType}
        userBooks={userBooks}
      />
    );
  }

  // Regular content based on tab
  switch (showType) {
    case 'allBooks':
      return (
        <AllBooksContent books={books} />
      );
    
    case 'myBooks':
      return (
        <MyBooksContent userBooks={userBooks} />
      );
    
    case 'swaps':
      return (
        <SwapPage 
          swapsSent={swapsSent} 
          swapsReceived={swapsReceived} 
          onAccept={onAccept}
          onReject={onReject}
          loading={swapLoading}
        />
      );
    
    default:
      return null;
  }
};

// Sub-components for better organization
const AllBooksContent = ({ books }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-bold text-gray-900">Available Books</h3>
      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
        {books.length} books available
      </span>
    </div>
    {books.length === 0 ? (
      <EmptyState 
        icon="📚"
        title="No Books Available"
        description="Be the first to add a book to the community!"
        buttonText="Add Your First Book"
      />
    ) : (
      <BooksCard books={books} userBooks={[]} />
    )}
  </div>
);

const MyBooksContent = ({ userBooks }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-bold text-gray-900">My Collection</h3>
      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
        {userBooks.length} books
      </span>
    </div>
    {userBooks.length === 0 ? (
      <EmptyState 
        icon="📖"
        title="Your collection is empty"
        description="Start building your book collection to share with others!"
        buttonText="Add Your First Book"
      />
    ) : (
      <UserBooksCard books={userBooks} />
    )}
  </div>
);

const EmptyState = ({ icon, title, description, buttonText }) => (
  <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <Link to="/books/create" className="btn-primary inline-flex items-center space-x-2">
      <LuBookPlus />
      <span>{buttonText}</span>
    </Link>
  </div>
);

export default ContentArea;