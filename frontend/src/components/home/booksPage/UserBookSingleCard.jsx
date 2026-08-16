import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const UserBookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  const handlePreviewClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* h-full and flex flex-col enforce absolute layout uniformity across all cards! */}
      <div className="group relative overflow-hidden select-none bg-white border border-[#E8EDE5] rounded-2xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
        <div>
          {/* Year Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-[#115E59] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              {book.publishYear}
            </span>
          </div>

          {/* Book Cover Placeholder */}
          <div className="h-48 bg-emerald-50 border border-emerald-100 flex items-center justify-center relative overflow-hidden rounded-xl">
            {book.coverUrl || book.conditionPhoto ? (
              <img 
                src={book.coverUrl ? (book.coverUrl.includes('covers.openlibrary.org') && book.coverUrl.endsWith('-L.jpg') ? book.coverUrl.replace('-L.jpg', '-M.jpg') : book.coverUrl) : book.conditionPhoto} 
                alt={book.title} 
                className="w-full h-full object-cover transition-opacity duration-300" 
                loading="lazy"
              />
            ) : (
              <div className="text-4xl text-[#115E59] opacity-30 flex items-center justify-center h-full">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"/></svg>
              </div>
            )}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity"></div>
          </div>

          {/* Content */}
          <div className="pt-5">
            {/* Title */}
            <div className="flex items-start space-x-3 mb-2.5">
              <PiBookOpenTextLight className="text-[#115E59] text-xl mt-1 flex-shrink-0" />
              <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug font-serif">
                {book.title}
              </h3>
            </div>

            {/* Author */}
            <div className="flex items-center space-x-2 mb-3.5">
              <BiUserCircle className="text-gray-400 text-lg shrink-0" />
              <p className="text-gray-500 text-xs font-medium">{book.author}</p>
            </div>

            {/* Condition & Status */}
            <div className="flex items-center gap-2 mb-4 select-none">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-50 text-gray-600 border border-gray-100 uppercase tracking-tight">
                {book.condition || 'Good'}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-green-50 text-[#115E59]">
                Your Book
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons - Premium Circular Icon Buttons with Custom Inline Tooltips */}
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

          {/* Edit Tooltip Button */}
          <div className="relative group/tooltip flex justify-center">
            <Link
              to={`/books/edit/${book._id}`}
              className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-all active:scale-90"
              aria-label="Edit Book Info"
            >
              <AiOutlineEdit className="text-lg shrink-0" />
            </Link>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[9px] uppercase font-bold tracking-wider rounded shadow-md opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity duration-150 z-20 whitespace-nowrap">
              Edit
            </div>
          </div>

          {/* Delete Tooltip Button */}
          <div className="relative group/tooltip flex justify-center">
            <Link
              to={`/books/delete/${book._id}`}
              className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all active:scale-90"
              aria-label="Delete Book"
            >
              <MdOutlineDelete className="text-lg shrink-0" />
            </Link>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[9px] uppercase font-bold tracking-wider rounded shadow-md opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity duration-150 z-20 whitespace-nowrap">
              Delete
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <BookModal book={book} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default UserBookSingleCard;
