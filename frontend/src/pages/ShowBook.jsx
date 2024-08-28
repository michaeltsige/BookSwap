import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-6 bg-[#F8F8F9] min-h-screen'>
      <BackButton />
      <h1 className='text-4xl font-semibold text-[#111439] mb-6'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border border-[#1A237E] rounded-lg shadow-md p-6 bg-[#F1F5F9] w-full max-w-lg mx-auto'>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700'>Id:</span>
            <span className='ml-2 text-lg text-gray-900'>{book._id}</span>
          </div>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700'>Title:</span>
            <span className='ml-2 text-lg text-gray-900'>{book.title}</span>
          </div>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700'>Author:</span>
            <span className='ml-2 text-lg text-gray-900'>{book.author}</span>
          </div>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700'>Publish Year:</span>
            <span className='ml-2 text-lg text-gray-900'>{book.publishYear}</span>
          </div>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700'>Create Time:</span>
            <span className='ml-2 text-lg text-gray-900'>{new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700'>Last Update Time:</span>
            <span className='ml-2 text-lg text-gray-900'>{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
  
 
};


export default ShowBook;
