import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { RiSwapLine } from 'react-icons/ri';
import { useContext, useState } from 'react';
import BookModal from './BookModal';
import SwapModal from '../swapRequestsPage/SwapModal';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';
import { enqueueSnackbar } from 'notistack';

const BookSingleCard = ({ book, userBooks }) => {
  const [showBookModal, setShowBookModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserContext);

  const handleConfirmSwap = async (selectedBookId) => {
    if (!selectedBookId) return;

    setLoading(true);

    try {
      const { data: selectedBook } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${selectedBookId.toString()}`);

      if (book.ownerUsername === userData.username) {
        enqueueSnackbar('You cannot swap with your own book.', { variant: 'warning' });
        setLoading(false);
        return;
      }

      const newSwapRequest = {
        requester: userData.username,
        requestee: book.ownerUsername,
        bookRequestedId: book._id,
        bookOfferedId: selectedBookId,
        bookRequestedName: book.title,
        bookOfferedName: selectedBook.title,
        status: 'pending',
      };

      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/swapRequest`, newSwapRequest);
      enqueueSnackbar('Swap request sent successfully!', { variant: 'success' });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        enqueueSnackbar('A similar request already exists!', { variant: 'warning' });
      } else {
        console.log('Error handling swap request:', error);
        enqueueSnackbar('Failed to send request', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Simple, direct handlers without complex event logic
  const handlePreviewClick = () => {
    setShowBookModal(true);
  };

  const handleSwapClick = () => {
    setShowSwapModal(true);
  };

  const handleCloseBookModal = () => {
    setShowBookModal(false);
  };

  const handleCloseSwapModal = () => {
    setShowSwapModal(false);
  };

  const handleSwapConfirm = (selectedBookId) => {
    handleConfirmSwap(selectedBookId);
    setShowSwapModal(false);
  };

  return (
    <>
      <div className="card-hover group relative overflow-hidden">
        {/* Year Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-[#9A3412] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {book.publishYear}
          </span>
        </div>

        {/* Book Cover Placeholder */}
        <div className="h-48 bg-slate-50 border border-slate-100 flex items-center justify-center relative overflow-hidden">
          {book.coverUrl || book.conditionPhoto ? (
            <img 
              src={book.coverUrl ? (book.coverUrl.includes('covers.openlibrary.org') && book.coverUrl.endsWith('-L.jpg') ? book.coverUrl.replace('-L.jpg', '-M.jpg') : book.coverUrl) : book.conditionPhoto} 
              alt={book.title} 
              className="w-full h-full object-cover transition-opacity duration-300" 
              loading="lazy"
            />
          ) : (
            <div className="text-4xl text-[#9A3412] opacity-30 flex items-center justify-center h-full">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"/></svg>
            </div>
          )}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity"></div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <div className="flex items-start space-x-3 mb-3">
            <PiBookOpenTextLight className="text-[#9A3412] text-xl mt-1 flex-shrink-0" />
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
              {book.title}
            </h3>
          </div>

          {/* Author */}
          <div className="flex items-center space-x-2 mb-4">
            <BiUserCircle className="text-gray-500 text-lg" />
            <p className="text-gray-600 text-sm">{book.author}</p>
          </div>

          {/* Condition Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Condition: {book.condition || 'Good'}
            </span>
          </div>

          {/* Owner */}
          <div className="mb-4">
            <span className="text-xs font-medium text-gray-500">Owner:</span>
            <p className="text-sm text-gray-700 font-medium">{book.ownerUsername}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={handlePreviewClick}
              className="flex items-center space-x-1 text-gray-500 hover:text-[#9A3412] transition-colors group"
              title="Quick view"
            >
              <BiShow className="text-lg" />
              <span className="text-xs font-medium">Preview</span>
            </button>

            <button
              onClick={handleSwapClick}
              disabled={loading || book.ownerUsername === userData.username}
              className="flex items-center space-x-1 text-amber-600 hover:text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors group"
              title="Request swap"
            >
              <RiSwapLine className="text-lg" />
              <span className="text-xs font-medium">{loading ? 'Sending...' : 'Swap'}</span>
            </button>

            <Link
              to={`/books/details/${book._id}`}
              className="flex items-center space-x-1 text-gray-500 hover:text-[#115E59] transition-colors group"
              title="View details"
            >
              <BsInfoCircle className="text-lg" />
              <span className="text-xs font-medium">Details</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modals - Rendered outside the card */}
      {showBookModal && (
        <BookModal book={book} onClose={handleCloseBookModal} />
      )}

      {showSwapModal && (
        <SwapModal
          onClose={handleCloseSwapModal}
          onConfirm={handleSwapConfirm}
          visible={showSwapModal}
          userBooks={userBooks}
        />
      )}
    </>
  );
};

export default BookSingleCard;