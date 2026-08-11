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
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            {book.publishYear}
          </span>
        </div>

        {/* Book Cover Placeholder */}
        <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative overflow-hidden">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-6xl text-green-300 opacity-80">📖</div>
          )}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity"></div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <div className="flex items-start space-x-3 mb-3">
            <PiBookOpenTextLight className="text-green-600 text-xl mt-1 flex-shrink-0" />
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
              className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors group"
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