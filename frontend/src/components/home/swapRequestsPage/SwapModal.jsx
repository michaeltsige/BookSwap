import React, { useState, useEffect, useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { UserContext } from '../../../context/UserContext';
import { PiBookOpenTextBold } from "react-icons/pi";

const SwapModal = ({ onClose, onConfirm, visible, userBooks }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  const handleConfirmClick = () => {
    if (selectedBook) {
      onConfirm(selectedBook);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={handleBackdropClick}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8EDE5]">
          <h2 className="text-2xl font-bold text-[#9A3412]">Select Book to Swap</h2>
          <button
            onClick={handleCloseClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RiCloseLine className="text-xl text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!userBooks ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9A3412] mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading your books...</p>
            </div>
          ) : userBooks.length === 0 ? (
            <div className="text-center py-8">
              <PiBookOpenTextBold className="text-4xl text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No books available in your collection</p>
              <p className="text-sm text-gray-500 mt-1">Add books to your collection first</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">Choose which book you'd like to offer in exchange:</p>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {userBooks.map(book => (
                  <div
                    key={book._id}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedBook === book._id
                        ? 'border-[#9A3412] bg-indigo-50'
                        : 'border-[#E8EDE5] bg-gray-50 hover:border-[#E8EDE5]'
                    }`}
                    onClick={() => setSelectedBook(book._id)}
                  >
                    <input
                      type="radio"
                      name="swapBook"
                      value={book._id}
                      checked={selectedBook === book._id}
                      onChange={() => setSelectedBook(book._id)}
                      className="mr-3 accent-indigo-600"
                    />
                    <PiBookOpenTextBold className="mr-3 text-[#9A3412] text-xl" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{book.title}</p>
                      <p className="text-sm text-gray-600">{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[#E8EDE5] bg-gray-50">
          <button
            onClick={handleCloseClick}
            className="px-6 py-2 border border-[#E8EDE5] text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmClick}
            disabled={!selectedBook}
            className="px-6 py-2 bg-[#9A3412] text-white rounded-lg hover:bg-[#7C2D12] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Confirm Swap
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapModal;