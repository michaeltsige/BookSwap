import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RiCloseLine } from 'react-icons/ri';
import { UserContext } from '../../../context/UserContext';

const SwapModal = ({ onClose, onConfirm, visible }) => {
  const [userBooks, setUserBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (visible) {
      // Fetch user's books when the modal is visible
      console.log(userData.username);
      axios.get(`http://localhost:5555/books/user/${userData.username}`)
        .then((response) => {
            setUserBooks(response.data.data);
        })
        .catch(error => console.error('Error fetching books:', error));
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <RiCloseLine
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-xl font-bold mb-4">Select a book to swap</h2>
        <ul className="mb-4">
          {userBooks.map(book => (
            <li key={book._id} className="mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="swapBook"
                  value={book._id}
                  checked={selectedBook === book._id}
                  onChange={() => setSelectedBook(book._id)}
                  className="mr-2"
                />
                {book.title}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => onConfirm(selectedBook)}
            disabled={!selectedBook}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
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
