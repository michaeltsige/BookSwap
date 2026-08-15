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
      <div className="card-hover group relative overflow-hidden">
        {/* Year Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-[#115E59] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {book.publishYear}
          </span>
        </div>

        {/* Book Cover Placeholder */}
        <div className="h-48 bg-emerald-50 border border-emerald-100 flex items-center justify-center relative overflow-hidden">
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
        <div className="p-5">
          {/* Title */}
          <div className="flex items-start space-x-3 mb-3">
            <PiBookOpenTextLight className="text-[#115E59] text-xl mt-1 flex-shrink-0" />
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
              {book.title}
            </h3>
          </div>

          {/* Author */}
          <div className="flex items-center space-x-2 mb-4">
            <BiUserCircle className="text-gray-500 text-lg" />
            <p className="text-gray-600 text-sm">{book.author}</p>
          </div>

          {/* Condition & Status */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-700">
              {book.condition || 'Good'}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Your Book
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={handlePreviewClick}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors group"
              title="Quick view"
            >
              <BiShow className="text-lg" />
              <span className="text-xs font-medium">Preview</span>
            </button>

            <Link
              to={`/books/details/${book._id}`}
              className="flex items-center space-x-1 text-gray-500 hover:text-[#115E59] transition-colors group"
              title="View details"
            >
              <BsInfoCircle className="text-lg" />
              <span className="text-xs font-medium">Details</span>
            </Link>

            <Link
              to={`/books/edit/${book._id}`}
              className="flex items-center space-x-1 text-gray-500 hover:text-amber-600 transition-colors group"
              title="Edit book"
            >
              <AiOutlineEdit className="text-lg" />
              <span className="text-xs font-medium">Edit</span>
            </Link>

            <Link
              to={`/books/delete/${book._id}`}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors group"
              title="Delete book"
            >
              <MdOutlineDelete className="text-lg" />
              <span className="text-xs font-medium">Delete</span>
            </Link>
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