import React, { useContext, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { UserContext } from '../context/UserContext';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);


  const handleSaveBook = () => {

    // assumed frontend user wont be able to access
    // this page directly and first will have to go through
    // the home page, in which the userData is obtained for this page/component

    const ownerUsername = userData.username;
    const data = {
      title,
      author,
      publishYear,
      ownerUsername,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-6 bg-[#F0F4F8] min-h-screen'>
      <BackButton />
      <h1 className='text-3xl font-bold text-[#2D3748] my-4'>Create Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border border-[#E2E8F0] rounded-lg shadow-sm w-[600px] p-6 mx-auto bg-white'>
        <div className='my-4'>
          <label className='block text-lg font-medium text-[#2D3748] mb-2'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-[#E2E8F0] rounded-lg px-4 py-2 w-full bg-[#F7FAFC] focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] focus:border-transparent'
          />
        </div>
        <div className='my-4'>
          <label className='block text-lg font-medium text-[#2D3748] mb-2'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border border-[#E2E8F0] rounded-lg px-4 py-2 w-full bg-[#F7FAFC] focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] focus:border-transparent'
          />
        </div>
        <div className='my-4'>
          <label className='block text-lg font-medium text-[#2D3748] mb-2'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border border-[#E2E8F0] rounded-lg px-4 py-2 w-full bg-[#F7FAFC] focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] focus:border-transparent'
          />
        </div>
        <button
          className='mt-6 bg-[#4A5568] text-white px-4 py-2 rounded-lg hover:bg-[#2D3748] focus:outline-none focus:ring-1 focus:ring-[#2B6CB0] focus:ring-opacity-50'
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  );
  
  
}

export default CreateBooks