import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { PiBookOpenTextLight, PiCalendarLight, PiUserLight, PiClockLight } from 'react-icons/pi';
import { BookCacheContext } from '../context/BookCacheContext';
import { UserContext } from '../context/UserContext';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  
  const { getCache } = useContext(BookCacheContext);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    // Try to retrieve book from cache for instantaneous (0ms) load
    const cacheKeyAll = userData?.username ? `allBooks_${userData.username}` : 'allBooks_anonymous';
    const cacheKeyUser = userData?.username ? `myBooks_${userData.username}` : null;
    
    const cachedAll = getCache(cacheKeyAll) || [];
    const cachedUser = cacheKeyUser ? (getCache(cacheKeyUser) || []) : [];
    
    const foundBook = [...cachedAll, ...cachedUser].find(b => b._id === id);

    if (foundBook) {
      setBook(foundBook);
      // Quiet background fetch to keep it perfectly fresh
      axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/${id}`)
        .then((response) => {
          setBook(response.data);
        })
        .catch((err) => console.log('Background fetch failed:', err));
    } else {
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
        });
    }
  }, [id, userData?.username, getCache]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-8 select-none">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <h1 className="text-2xl font-bold font-serif text-gray-900">Book Details</h1>
          <Link 
            to="/" 
            className="flex items-center justify-center px-4 py-2 border border-[#E3EAE3] bg-white rounded-lg text-xs font-mono font-bold uppercase hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Book Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover Section */}
          <div className="lg:col-span-1">
            <div className="card-hover bg-white rounded-2xl p-6 text-center border border-[#E8EDE5] shadow-sm flex flex-col items-center">
              <div className="w-44 h-60 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mx-auto mb-5 overflow-hidden relative shadow-inner">
                {book.coverUrl || book.conditionPhoto ? (
                  <img 
                    src={book.coverUrl ? (book.coverUrl.includes('covers.openlibrary.org') && book.coverUrl.endsWith('-L.jpg') ? book.coverUrl.replace('-L.jpg', '-M.jpg') : book.coverUrl) : book.conditionPhoto} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-all duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-[#9A3412] opacity-30 flex items-center justify-center h-full">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"/></svg>
                  </div>
                )}
              </div>
              <div className="bg-[#9A3412] text-white px-4.5 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider font-extrabold inline-block shadow-sm">
                Published: {book.publishYear}
              </div>
            </div>
          </div>

          {/* Book Details Section */}
          <div className="lg:col-span-2">
            <div className="card-hover bg-white rounded-2xl p-8 border border-[#E8EDE5] shadow-sm">
              {/* Main Info */}
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 font-serif leading-snug tracking-tight mb-2">{book.title}</h2>
                  <div className="w-16 h-1 bg-[#9A3412] rounded-full"></div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
                  {/* Author */}
                  <div className="flex items-center gap-3.5 p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <PiUserLight className="text-[#9A3412] text-2xl flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Author</p>
                      <p className="text-sm font-bold text-slate-800 leading-tight mt-0.5">{book.author}</p>
                    </div>
                  </div>

                  {/* Publication Year */}
                  <div className="flex items-center gap-3.5 p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <PiCalendarLight className="text-[#9A3412] text-2xl flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Published</p>
                      <p className="text-sm font-bold text-slate-800 leading-tight mt-0.5">{book.publishYear}</p>
                    </div>
                  </div>

                  {/* Owner */}
                  <div className="flex items-center gap-3.5 p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <PiUserLight className="text-[#115E59] text-2xl flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Current Owner</p>
                      <p className="text-sm font-bold text-slate-800 leading-tight mt-0.5">{book.ownerUsername}</p>
                    </div>
                  </div>

                  {/* Book ID */}
                  <div className="flex items-center gap-3.5 p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <PiBookOpenTextLight className="text-slate-400 text-2xl flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Book ID</p>
                      <p className="text-xs font-mono text-slate-600 truncate mt-0.5">{book._id}</p>
                    </div>
                  </div>
                </div>

                {/* Physical Condition Photo if Uploaded */}
                {book.conditionPhoto && (
                  <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-3">
                      Physical Copy Photo
                    </h3>
                    <div className="rounded-xl overflow-hidden max-h-64 flex justify-center bg-white p-2 border border-slate-100 shadow-sm">
                      <img src={book.conditionPhoto} alt="Physical copy condition" className="h-64 object-contain" />
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="border-t border-[#E8EDE5] pt-6 select-none font-sans">
                  <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-4">Activity Logs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-slate-50/20 py-2 px-3.5 rounded-xl border border-slate-100">
                      <PiClockLight className="text-[#115E59] text-xl shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Added to Collection</p>
                        <p className="text-xs font-bold text-slate-700 mt-0.5">
                          {book.createdAt ? new Date(book.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50/20 py-2 px-3.5 rounded-xl border border-slate-100">
                      <PiClockLight className="text-[#9A3412] text-xl shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Last Updated</p>
                        <p className="text-xs font-bold text-slate-700 mt-0.5">
                          {book.updatedAt ? new Date(book.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-[#E8EDE5]">
                  <Link
                    to="/"
                    className="flex-1 text-center py-3 bg-[#115E59] hover:bg-[#0f4e49] text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-all duration-200 hover:shadow active:scale-95"
                  >
                    Browse More Books
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
