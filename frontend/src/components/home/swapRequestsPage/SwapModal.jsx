import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RiCloseLine } from 'react-icons/ri';
import { UserContext } from '../../../context/UserContext';
import { PiBookOpenTextBold } from "react-icons/pi";

const SwapModal = ({ onClose, onConfirm, visible }) => {
  const [userBooks, setUserBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (visible) {
      // Fetch user's books when the modal is visible
      axios.get(`http://localhost:5555/books/user/${userData.username}`)
        .then((response) => {
            setUserBooks(response.data.data);
        })
        .catch(error => console.error('Error fetching books:', error));
    }
  }, [visible, userData.username]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl relative max-w-md w-full mx-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <RiCloseLine
          className="absolute top-4 right-4 text-2xl text-gray-600 cursor-pointer hover:text-gray-800 transition duration-200"
          onClick={onClose}
        />
        <h2 className="text-2xl font-bold mb-6 text-center text-[#2B6CB0]">
          Select a Book to Swap
        </h2>
        <ul className="space-y-3">
          {userBooks.map(book => (
            <li key={book._id} className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200">
              <label className="flex items-center w-full cursor-pointer">
                <input
                  type="radio"
                  name="swapBook"
                  value={book._id}
                  checked={selectedBook === book._id}
                  onChange={() => setSelectedBook(book._id)}
                  className="mr-3 accent-[#2B6CB0]"
                />
                <PiBookOpenTextBold className="mr-2 text-[#2B6CB0]" />
                <span className="text-sm text-gray-800">{book.title}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="bg-[#2B6CB0] hover:bg-[#1A202C] text-white px-4 py-2 rounded-md shadow-md transition duration-200 disabled:opacity-50"
            onClick={() => onConfirm(selectedBook)}
            disabled={!selectedBook}
          >
            Confirm
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapModal;
