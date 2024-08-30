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
    <div className='p-6 bg-[#F8F8F9] min-h-screen' style={{ fontFamily: "'Roboto', sans-serif" }}>
      <BackButton />
      <h1 className='text-4xl font-semibold text-[#111439] mb-6' style={{ fontFamily: "'Poppins', sans-serif" }}>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border border-[#1A237E] rounded-lg shadow-md p-6 bg-[#F1F5F9] w-full max-w-lg mx-auto'>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700' style={{ fontFamily: "'Roboto', sans-serif" }}>Id:</span>
            <span className='ml-2 text-lg text-gray-900' style={{ fontFamily: "'Roboto', sans-serif" }}>{book._id}</span>
          </div>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700' style={{ fontFamily: "'Roboto', sans-serif" }}>Title:</span>
            <span className='ml-2 text-lg text-gray-900' style={{ fontFamily: "'Roboto', sans-serif" }}>{book.title}</span>
          </div>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700' style={{ fontFamily: "'Roboto', sans-serif" }}>Author:</span>
            <span className='ml-2 text-lg text-gray-900' style={{ fontFamily: "'Roboto', sans-serif" }}>{book.author}</span>
          </div>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700' style={{ fontFamily: "'Roboto', sans-serif" }}>Publish Year:</span>
            <span className='ml-2 text-lg text-gray-900' style={{ fontFamily: "'Roboto', sans-serif" }}>{book.publishYear}</span>
          </div>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700' style={{ fontFamily: "'Roboto', sans-serif" }}>Create Time:</span>
            <span className='ml-2 text-lg text-gray-900' style={{ fontFamily: "'Roboto', sans-serif" }}>{new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className='mb-4'>
            <span className='text-lg font-medium text-gray-700' style={{ fontFamily: "'Roboto', sans-serif" }}>Last Update Time:</span>
            <span className='ml-2 text-lg text-gray-900' style={{ fontFamily: "'Roboto', sans-serif" }}>{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
