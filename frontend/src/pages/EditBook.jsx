import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AiOutlineEdit } from 'react-icons/ai';

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

  const handleEditBook = (e) => {
    e.preventDefault();
    
    if (!title || !author || !publishYear) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' });
      return;
    }

    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book updated successfully! ✨', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#9A3412] rounded-xl flex items-center justify-center">
              <AiOutlineEdit className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
              <p className="text-gray-600">Update your book information</p>
            </div>
          </div>
        </div>

        {loading && <Spinner />}

        {/* Form Card */}
        <div className="card-hover bg-white rounded-2xl shadow-sm border border-[#E8EDE5] p-8">
          <form onSubmit={handleEditBook} className="space-y-6">
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
            </div>

            {/* Info Box */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Updating this information will change how the book appears to other users.
              </p>
            </div>

            {/* Action Buttons */}
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
                className="flex-1 btn bg-amber-500 hover:bg-amber-600 text-white py-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <AiOutlineEdit className="text-lg" />
                    Update Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;