import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AiOutlineDelete, AiOutlineExclamationCircle, AiOutlineBook } from 'react-icons/ai';

const DeleteBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar('Error loading book details', { variant: 'error' });
      });
  }, [id, enqueueSnackbar]);

  const handleDeleteBook = () => {
    setDeleting(true);
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`)
      .then(() => {
        setDeleting(false);
        enqueueSnackbar('Book deleted successfully 📚', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setDeleting(false);
        enqueueSnackbar('Error deleting book', { variant: 'error' });
        console.log(error);
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Spinner size="lg" centered />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <AiOutlineDelete className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Delete Book</h1>
              <p className="text-gray-600">Remove book from your collection</p>
            </div>
          </div>
        </div>

        {/* Warning Card */}
        <div className="card-hover bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AiOutlineExclamationCircle className="text-red-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Warning: This action cannot be undone</h3>
              <p className="text-red-700">
                Once you delete this book, it will be permanently removed from your collection and will no longer be available for swapping.
              </p>
            </div>
          </div>
        </div>

        {/* Book Details Card */}
        <div className="card-hover bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center">
              <AiOutlineBook className="text-red-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Publication Year</p>
                <p className="text-lg font-semibold text-gray-900">{book.publishYear}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Book ID</p>
                <p className="text-sm font-mono text-gray-600 truncate">{book._id}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Added to Collection</p>
                <p className="text-sm text-gray-900">
                  {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="text-sm text-gray-900">
                  {book.updatedAt ? new Date(book.updatedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Impact Information */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">What happens when you delete this book?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <AiOutlineDelete className="text-red-500" />
                <span>Book will be removed from your collection</span>
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineDelete className="text-red-500" />
                <span>Any pending swap requests for this book will be cancelled</span>
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineDelete className="text-red-500" />
                <span>Other users will no longer see this book available for swapping</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCancel}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            disabled={deleting}
          >
            <AiOutlineBook />
            Keep Book
          </button>
          
          <button
            onClick={handleDeleteBook}
            disabled={deleting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transform hover:-translate-y-0.5 transition-all duration-200 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {deleting ? (
              <>
                <Spinner size="sm" color="white" />
                Deleting...
              </>
            ) : (
              <>
                <AiOutlineDelete />
                Delete Permanently
              </>
            )}
          </button>
        </div>

        {/* Alternative Options */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Changed your mind?{' '}
            <Link 
              to={`/books/edit/${book._id}`} 
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Edit this book instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;