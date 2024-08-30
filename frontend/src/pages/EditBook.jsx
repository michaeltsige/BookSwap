import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error fetching book details', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-6 bg-[#F0F4F8] min-h-screen' style={{ fontFamily: "'Roboto', sans-serif" }}>
      <BackButton />
      <h1 className='text-3xl font-bold text-[#2D3748] my-4' style={{ fontFamily: "'Poppins', sans-serif" }}>Edit Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border border-[#E2E8F0] rounded-lg shadow-sm w-[600px] p-6 mx-auto bg-white'>
        <div className='my-4'>
          <label className='block text-lg font-medium text-[#2D3748] mb-2' style={{ fontFamily: "'Roboto', sans-serif" }}>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-[#E2E8F0] rounded-lg px-4 py-2 w-full bg-[#F7FAFC] focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] focus:border-transparent'
            style={{ fontFamily: "'Roboto', sans-serif" }}
          />
        </div>
        <div className='my-4'>
          <label className='block text-lg font-medium text-[#2D3748] mb-2' style={{ fontFamily: "'Roboto', sans-serif" }}>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border border-[#E2E8F0] rounded-lg px-4 py-2 w-full bg-[#F7FAFC] focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] focus:border-transparent'
            style={{ fontFamily: "'Roboto', sans-serif" }}
          />
        </div>
        <div className='my-4'>
          <label className='block text-lg font-medium text-[#2D3748] mb-2' style={{ fontFamily: "'Roboto', sans-serif" }}>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border border-[#E2E8F0] rounded-lg px-4 py-2 w-full bg-[#F7FAFC] focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] focus:border-transparent'
            style={{ fontFamily: "'Roboto', sans-serif" }}
          />
        </div>
        <button
          className='mt-6 bg-[#4A5568] text-white px-4 py-2 rounded-lg hover:bg-[#2D3748] focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] focus:ring-opacity-50'
          onClick={handleEditBook}
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
