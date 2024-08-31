import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className='p-6 bg-[#F5F5F5] min-h-screen'>
      <BackButton />
      <h1 className='text-3xl font-bold text-[#2D3748] my-4' style={{ fontFamily: "'Montserrat', sans-serif" }}>Delete Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col items-center border border-[#E2E8F0] rounded-lg shadow-lg max-w-md w-full p-6 mx-auto bg-white'>
        <h3 className='text-xl font-semibold text-[#2D3748] mb-4' style={{ fontFamily: "'Montserrat', sans-serif" }}>Are you sure you want to delete this book?</h3>
        <div className='flex gap-4 w-full'>
          <button
            className='flex-1 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
          <button
            className='flex-1 p-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBook;
