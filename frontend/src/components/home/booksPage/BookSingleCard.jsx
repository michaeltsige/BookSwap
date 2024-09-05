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

const UserBookSingleCard = ({ book, userBooks }) => {
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

      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/swapRequest`, newSwapRequest);

      enqueueSnackbar('Request Sent successfully', { variant: 'success' });
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

  return (
    <div className='relative border border-gray-300 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out m-4'>
      
      {/* Publish Year */}
      <div className='absolute top-2 right-2 px-3 py-1 bg-[#F9FAFB] text-[#1A202C] rounded-lg shadow-sm text-sm whitespace-nowrap'
           style={{ fontFamily: "'Lato', sans-serif", zIndex: 10 }}
      >
        {book.publishYear}
      </div>
  
      <div className='p-4'>
        {/* Book Title */}
        <div className='flex items-center mb-2'>
          <div className='flex items-center gap-x-2 flex-grow max-w-[calc(100%-40px)]' style={{ fontFamily: "'Roboto Slab', sans-serif" }}>
            <PiBookOpenTextLight className='text-[#1A202C] text-2xl flex-shrink-0' />
            <h3 className='text-xl font-semibold text-[#1A202C] overflow-hidden whitespace-nowrap text-ellipsis' >
              {book.title}
            </h3>
          </div>
        </div>
        
        {/* Book Author */}
        <div className='flex items-center gap-x-2 mb-4' style={{ fontFamily: "'Roboto', sans-serif" }}>
          <BiUserCircle className='text-[#1A202C] text-2xl' />
          <h4 className='text-lg text-gray-700'>{book.author}</h4>
        </div>
  
        {/* Action Icons */}
        <div className='flex justify-between items-center gap-x-2 mt-4'>
          <BiShow
            className='text-3xl text-blue-600 hover:text-blue-800 cursor-pointer'
            onClick={() => setShowBookModal(true)}
          />
          <RiSwapLine
            className='text-2xl text-yellow-600 hover:text-yellow-800 cursor-pointer'
            onClick={() => setShowSwapModal(true)}
          />
          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className='text-2xl text-green-600 hover:text-green-800' />
          </Link>
        </div>
      </div>
  
      {/* Book Modal */}
      {showBookModal && (
        <BookModal book={book} onClose={() => setShowBookModal(false)} />
      )}
  
      {/* Swap Modal */}
      {showSwapModal && (
        <SwapModal
          onClose={() => setShowSwapModal(false)}
          onConfirm={(selectedBookId) => {
            if (selectedBookId) {
              handleConfirmSwap(selectedBookId);
            }
            setShowSwapModal(false);
          }}
          visible={showSwapModal}
          userBooks={userBooks}
        />
      )}
    </div>
  );
  
  
};

export default UserBookSingleCard;
