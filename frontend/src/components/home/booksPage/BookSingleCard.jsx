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
      {/* h-full and flex flex-col enforce absolute layout uniformity across all cards! */}
      <div className="group relative overflow-hidden select-none bg-white border border-[#E8EDE5] rounded-2xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
        <div>
          {/* Year Badge - Clean, squarer modern corner tag */}
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-[#9A3412] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded shadow-sm">
              {book.publishYear}
            </span>
          </div>

          {/* Book Cover Placeholder */}
          <div className="h-48 bg-slate-50 border border-slate-100 flex items-center justify-center relative overflow-hidden rounded-xl">
            {book.coverUrl || book.conditionPhoto ? (
              <img 
                src={book.coverUrl ? (book.coverUrl.includes('covers.openlibrary.org') && book.coverUrl.endsWith('-L.jpg') ? book.coverUrl.replace('-L.jpg', '-M.jpg') : book.coverUrl) : book.conditionPhoto} 
                alt={book.title} 
                className="w-full h-full object-cover transition-opacity duration-300" 
                loading="lazy"
              />
            ) : (
              <div className="text-4xl text-[#9A3412] opacity-30 flex items-center justify-center h-full">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"/></svg>
              </div>
            )}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity"></div>
          </div>

          {/* Content - Vertically locked element heights to guarantee identical horizontal alignment (x-axis) */}
          <div className="pt-5">
            {/* Title - Locked h-11 */}
            <div className="flex items-start space-x-3 mb-2.5 h-11 overflow-hidden">
              <PiBookOpenTextLight className="text-[#9A3412] text-xl mt-0.5 flex-shrink-0" />
              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight font-serif">
                {book.title}
              </h3>
            </div>

            {/* Author - Locked h-4 */}
            <div className="flex items-center space-x-2 h-4 mb-3.5">
              <BiUserCircle className="text-gray-400 text-base shrink-0" />
              <p className="text-gray-500 text-xs font-medium truncate">{book.author}</p>
            </div>

            {/* Condition Badge - Locked h-5 */}
            <div className="h-5 mb-3.5 flex items-center">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-50 text-slate-600 border border-gray-100 uppercase tracking-tight">
                Condition: {book.condition || 'Good'}
              </span>
            </div>

            {/* Owner - Locked h-8 */}
            <div className="h-8 mb-2 flex flex-col justify-center">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 leading-none">Owner</span>
              <p className="text-xs text-slate-700 font-bold leading-none mt-1 truncate">{book.ownerUsername}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Premium Circular Icon Buttons with Custom Tooltips */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 select-none mt-auto">
          {/* Preview Tooltip Button */}
          <div className="relative group/tooltip flex justify-center">
            <button
              onClick={handlePreviewClick}
              className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90"
              aria-label="Quick Preview"
            >
              <BiShow className="text-lg shrink-0" />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[9px] uppercase font-bold tracking-wider rounded shadow-md opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity duration-150 z-20 whitespace-nowrap">
              Preview
            </div>
          </div>

          {/* Swap Tooltip Button */}
          <div className="relative group/tooltip flex justify-center">
            <button
              onClick={handleSwapClick}
              disabled={loading || book.ownerUsername === userData.username}
              className="flex items-center justify-center w-8 h-8 rounded-full text-[#9A3412] hover:bg-[#9A3412]/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-90"
              aria-label="Request Book Swap"
            >
              <RiSwapLine className="text-lg shrink-0" />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[9px] uppercase font-bold tracking-wider rounded shadow-md opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity duration-150 z-20 whitespace-nowrap">
              Request Swap
            </div>
          </div>

          {/* Details Tooltip Button */}
          <div className="relative group/tooltip flex justify-center">
            <Link
              to={`/books/details/${book._id}`}
              className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:bg-teal-50 hover:text-[#115E59] transition-all active:scale-90"
              aria-label="View Details"
            >
              <BsInfoCircle className="text-[17px] shrink-0" />
            </Link>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[9px] uppercase font-bold tracking-wider rounded shadow-md opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity duration-150 z-20 whitespace-nowrap">
              Details
            </div>
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
