import React, { useContext, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { UserContext } from '../context/UserContext';
import { LuBookPlus } from 'react-icons/lu';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);

  const handleSaveBook = (e) => {
    e.preventDefault();
    
    if (!title || !author || !publishYear) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' });
      return;
    }

    const ownerUsername = userData.username;
    const data = {
      title,
      author,
      publishYear,
      ownerUsername,
    };
    
    setLoading(true);
    axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfully! 📚', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <LuBookPlus className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
              <p className="text-gray-600">Share a book with the community</p>
            </div>
          </div>
        </div>

        {loading && <Spinner />}

        {/* Form Card */}
        <div className="card-hover bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSaveBook} className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="form-label">
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                placeholder="Enter the book title"
                required
              />
            </div>

            {/* Author Field */}
            <div>
              <label htmlFor="author" className="form-label">
                Author *
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="form-input"
                placeholder="Enter the author's name"
                required
              />
            </div>

            {/* Publish Year Field */}
            <div>
              <label htmlFor="publishYear" className="form-label">
                Publication Year *
              </label>
              <input
                type="number"
                id="publishYear"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="form-input"
                placeholder="Enter publication year"
                min="1000"
                max="2024"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                This helps others find books from specific time periods
              </p>
            </div>

            {/* Owner Info */}
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-sm text-indigo-700">
                <strong>This book will be listed under:</strong> {userData.username}
              </p>
              <p className="text-sm text-indigo-600 mt-1">
                Other users will be able to request swaps for this book
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 btn btn-outline py-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn btn-primary py-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding Book...
                  </>
                ) : (
                  <>
                    <LuBookPlus className="text-lg" />
                    Add to Collection
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Make sure the book is in good condition before listing it for swapping
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;