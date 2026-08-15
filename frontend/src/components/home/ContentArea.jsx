import React from 'react';
import { Link } from 'react-router-dom';
import { LuBookPlus, LuBookOpen } from 'react-icons/lu';
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
      <h3 className="text-xl font-bold text-slate-900 font-serif tracking-tight">Available Books</h3>
      <span className="text-xs text-slate-500 bg-white border border-[#E3EAE3] px-3 py-1 rounded-full font-semibold">
        {books.length} books available
      </span>
    </div>
    {books.length === 0 ? (
      <EmptyState 
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
      <h3 className="text-xl font-bold text-slate-900 font-serif tracking-tight">My Collection</h3>
      <span className="text-xs text-slate-500 bg-white border border-[#E3EAE3] px-3 py-1 rounded-full font-semibold">
        {userBooks.length} books
      </span>
    </div>
    {userBooks.length === 0 ? (
      <EmptyState 
        title="Your collection is empty"
        description="Start building your book collection to share with others!"
        buttonText="Add Your First Book"
      />
    ) : (
      <UserBooksCard books={userBooks} />
    )}
  </div>
);

const EmptyState = ({ title, description, buttonText }) => (
  <div className="text-center py-16 bg-white rounded-2xl border border-[#E3EAE3] shadow-sm select-none max-w-lg mx-auto">
    <div className="flex justify-center mb-4">
      <div className="p-4 border border-[#E3EAE3] bg-slate-50 rounded-full">
        <LuBookOpen className="text-2xl text-slate-400" />
      </div>
    </div>
    <h3 className="text-md font-bold text-slate-900 mb-2 uppercase tracking-wider">{title}</h3>
    <p className="text-xs text-slate-500 mb-6 font-light leading-relaxed max-w-sm mx-auto">{description}</p>
    <Link to="/books/create" className="btn btn-primary inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold">
      <LuBookPlus className="text-sm" />
      <span>{buttonText}</span>
    </Link>
  </div>
);

export default ContentArea;