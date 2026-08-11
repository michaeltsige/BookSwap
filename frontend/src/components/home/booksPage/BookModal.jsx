import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  useEffect(() => {
    // Disable scrolling when modal is visible
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when modal is unmounted
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle close button click
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={handleBackdropClick}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
          <button
            onClick={handleCloseClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <AiOutlineClose className="text-xl text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {book.coverUrl && (
            <div className="mb-6 rounded-lg overflow-hidden max-h-64 flex justify-center bg-gray-50 border border-gray-100">
              <img src={book.coverUrl} alt={book.title} className="h-64 object-contain shadow-sm" />
            </div>
          )}
          {/* Year & Condition Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold">
              Published: {book.publishYear}
            </div>
            <div className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-200 px-4 py-2 rounded-lg font-semibold">
              Condition: {book.condition || 'Good'}
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <PiBookOpenTextLight className="text-indigo-600 text-2xl flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Title</h3>
                <p className="text-xl font-bold text-gray-900">{book.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BiUserCircle className="text-gray-600 text-2xl flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Author</h3>
                <p className="text-xl text-gray-900">{book.author}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="font-semibold text-indigo-900 mb-2">About this Book</h3>
              <p className="text-indigo-800 leading-relaxed">
                This book is available for swapping in the BookSwap community. 
                Connect with the owner to arrange a book exchange and discover new reading adventures.
              </p>
            </div>

            {book.conditionPhoto && (
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Owner's Photo of Physical Copy
                </p>
                <div className="rounded-lg overflow-hidden max-h-56 flex justify-center bg-gray-50 p-2">
                  <img src={book.conditionPhoto} alt="Physical copy condition" className="h-56 object-contain shadow-sm" />
                </div>
              </div>
            )}

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Owner:</strong> <span className="font-semibold text-gray-900">{book.ownerUsername}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Use the swap feature to request this book from the owner.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleCloseClick}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;