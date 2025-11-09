import React, { useEffect } from 'react';
import { AiOutlineExclamationCircle, AiOutlineDelete } from 'react-icons/ai';

const AccountDeleteModal = ({ onDelete, onCancel }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={handleBackdropClick}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-red-200 bg-red-50 rounded-t-2xl">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <AiOutlineExclamationCircle className="text-red-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-red-900">Delete Account</h2>
            <p className="text-red-700 text-sm">This action cannot be undone</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete your BookSwap account? This will permanently:
            </p>
            
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <AiOutlineDelete className="text-red-500" />
                <span>Remove all your listed books</span>
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineDelete className="text-red-500" />
                <span>Delete all your swap history</span>
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineDelete className="text-red-500" />
                <span>Erase your profile data</span>
              </li>
            </ul>

            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <p className="text-sm text-red-700 font-medium">
                ⚠️ This action is permanent and cannot be reversed.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <AiOutlineDelete />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDeleteModal;