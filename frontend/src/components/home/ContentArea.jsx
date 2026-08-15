import React from 'react';
import { Link } from 'react-router-dom';
import { LuBookPlus, LuBookOpen } from 'react-icons/lu';
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
  // Premium Pulsing Skeleton Cards for beautiful non-blocking loads
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse select-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-[#E3EAE3] rounded-2xl p-5 space-y-4">
            <div className="h-40 bg-slate-100 rounded-xl w-full"></div>
            <div className="h-4 bg-slate-100 rounded w-2/3"></div>
            <div className="h-3 bg-slate-100 rounded w-1/2"></div>
            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <div className="h-3 bg-slate-100 rounded w-1/4"></div>
              <div className="h-3 bg-slate-100 rounded w-1/4"></div>
            </div>
          </div>
        ))}
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

  return (
    <div>
      {/* Browse Books Tab Content - Preserved in DOM to keep images cached and 0ms switch time! */}
      <div className={showType === 'allBooks' ? '' : 'hidden'}>
        <AllBooksContent books={books} userBooks={userBooks} />
      </div>

      {/* My Books Tab Content - Preserved in DOM */}
      <div className={showType === 'myBooks' ? '' : 'hidden'}>
        <MyBooksContent userBooks={userBooks} />
      </div>

      {/* Swap Requests Tab Content - Preserved in DOM */}
      <div className={showType === 'swaps' ? '' : 'hidden'}>
        <SwapPage 
          swapsSent={swapsSent} 
          swapsReceived={swapsReceived} 
          onAccept={onAccept}
          onReject={onReject}
          loading={swapLoading}
        />
      </div>
    </div>
  );
};

// Sub-components for better organization
const AllBooksContent = ({ books, userBooks }) => (
  <div>
    <div className="flex items-center justify-between mb-6 select-none">
      <h3 className="text-lg font-bold text-slate-900 font-serif tracking-tight">Available Books</h3>
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
      <BooksCard books={books} userBooks={userBooks} />
    )}
  </div>
);

const MyBooksContent = ({ userBooks }) => (
  <div>
    <div className="flex items-center justify-between mb-6 select-none">
      <h3 className="text-lg font-bold text-slate-900 font-serif tracking-tight">My Collection</h3>
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
