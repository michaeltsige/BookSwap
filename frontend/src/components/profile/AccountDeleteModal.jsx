import React, { useEffect } from 'react';

const AccountDeleteModal = ({ onDelete, onCancel }) => {
  useEffect(() => {
    // Disable scrolling when modal is visible
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when modal is unmounted
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
        <div className="flex justify-end gap-x-4">
          <button
            onClick={() => onDelete()}
            className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-blue-600 hover:text-blue-800 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDeleteModal;
