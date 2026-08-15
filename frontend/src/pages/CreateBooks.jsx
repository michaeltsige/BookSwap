import React, { useContext, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { UserContext } from '../context/UserContext';
import { LuBookPlus, LuCamera } from 'react-icons/lu';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [condition, setCondition] = useState('Good');
  const [conditionPhoto, setConditionPhoto] = useState('');
  const [searching, setSearching] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);

  const handleSearchGoogleBooks = async () => {
    if (!title) {
      enqueueSnackbar('Please enter a book title to search', { variant: 'warning' });
      return;
    }
    setSearching(true);
    try {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}`);
      const item = res.data.items?.[0]?.volumeInfo;
      if (item) {
        if (item.title) setTitle(item.title);
        if (item.authors?.[0]) setAuthor(item.authors[0]);
        if (item.publishedDate) {
          const year = parseInt(item.publishedDate.substring(0, 4), 10);
          if (!isNaN(year)) setPublishYear(year);
        }
        if (item.imageLinks?.thumbnail) {
          setCoverUrl(item.imageLinks.thumbnail.replace('http://', 'https://'));
        } else if (item.imageLinks?.smallThumbnail) {
          setCoverUrl(item.imageLinks.smallThumbnail.replace('http://', 'https://'));
        }
        enqueueSnackbar('Book details auto-filled from Google Books!', { variant: 'success' });
      } else {
        enqueueSnackbar('No book found with that title', { variant: 'info' });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Error searching Google Books', { variant: 'error' });
    } finally {
      setSearching(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'bookswap_preset';

    if (!cloudName) {
      enqueueSnackbar('Cloudinary cloud name missing in Vercel .env settings', { variant: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    setUploadingPhoto(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      setConditionPhoto(res.data.secure_url);
      enqueueSnackbar('Physical book photo uploaded successfully! 📷', { variant: 'success' });
    } catch (err) {
      console.error('Photo upload failed:', err);
      enqueueSnackbar('Failed to upload condition photo (check unsigned preset)', { variant: 'error' });
    } finally {
      setUploadingPhoto(false);
    }
  };

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
      coverUrl,
      condition,
      conditionPhoto,
    };
    
    setLoading(true);
    axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfully! ', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating book', { variant: 'error' });
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
        <div className="card-hover bg-white rounded-2xl shadow-sm border border-[#E8EDE5] p-8">
          <form onSubmit={handleSaveBook} className="space-y-6">
            {/* Title Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="title" className="form-label mb-0">
                  Book Title *
                </label>
                <button
                  type="button"
                  onClick={handleSearchGoogleBooks}
                  disabled={searching || !title}
                  className="text-xs font-semibold text-[#9A3412] hover:text-indigo-800 disabled:opacity-50 underline transition-colors"
                >
                  {searching ? 'Searching Google Books...' : '✨ Search Google Books to Auto-Fill'}
                </button>
              </div>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                placeholder="Enter title (or type & click Auto-Fill above)"
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
                max="2026"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                This helps others find books from specific time periods
              </p>
            </div>

            {/* Condition Dropdown */}
            <div>
              <label htmlFor="condition" className="form-label">
                Book Condition *
              </label>
              <select
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="form-input bg-white"
              >
                <option value="Like New">Like New (No visible wear or markings)</option>
                <option value="Very Good">Very Good (Minimal wear, clean pages)</option>
                <option value="Good">Good (Standard reading wear)</option>
                <option value="Acceptable">Acceptable (Visible wear/notes)</option>
              </select>
            </div>

            {/* Cover URL Field */}
            <div>
              <label htmlFor="coverUrl" className="form-label">
                Cover Image URL (Optional)
              </label>
              <input
                type="url"
                id="coverUrl"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                className="form-input"
                placeholder="https://covers.openlibrary.org/..."
              />
              {coverUrl && (
                <div className="mt-3 h-40 flex justify-center bg-gray-50 rounded-lg border border-[#E8EDE5] p-2">
                  <img src={coverUrl} alt="Cover preview" className="h-full object-contain shadow-sm" />
                </div>
              )}
            </div>

            {/* Upload Physical Copy Photo (Cloudinary) */}
            <div>
              <label className="form-label">
                Upload Photo of Your Physical Copy (Optional)
              </label>
              <div className="flex flex-wrap items-center gap-4">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm font-semibold transition-colors border border-indigo-200 shadow-sm">
                  <LuCamera className="text-lg" />
                  <span>{uploadingPhoto ? 'Uploading...' : 'Upload Physical Copy Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={uploadingPhoto}
                    className="hidden"
                  />
                </label>
                {conditionPhoto && (
                  <button
                    type="button"
                    onClick={() => setConditionPhoto('')}
                    className="text-xs text-red-600 hover:text-red-800 underline font-medium"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
              {conditionPhoto && (
                <div className="mt-3 h-40 flex justify-center bg-gray-50 rounded-lg border border-[#E8EDE5] p-2">
                  <img src={conditionPhoto} alt="Physical copy condition" className="h-full object-contain shadow-sm" />
                </div>
              )}
            </div>

            {/* Owner Info */}
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-sm text-indigo-700">
                <strong>This book will be listed under:</strong> {userData.username}
              </p>
              <p className="text-sm text-[#9A3412] mt-1">
                Other users will be able to request swaps for this book
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || uploadingPhoto}
              className="w-full bg-[#9A3412] text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-sm transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Add Book to Library
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;
