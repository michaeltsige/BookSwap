import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LuBookPlus } from 'react-icons/lu';
import { SiBookstack } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';
import { FaUserCircle, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import Spinner from '../components/Spinner';
import BooksCard from '../components/home/booksPage/BooksCard';
import UserBooksCard from '../components/home/booksPage/UserBooksCard';
import SwapPage from '../components/home/swapRequestsPage/SwapPage';
import { UserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('allBooks');
  const [prevShowType, setPrevShowType] = useState('allBooks');
  const { userData, setUserData } = useContext(UserContext);
  const [authChecked, setAuthChecked] = useState(false);
  const [swapsLoaded, setSwapsLoaded] = useState(false);
  const [swapsSent, setSwapsSent] = useState([]);
  const [swapsReceived, setSwapsReceived] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const decodedUser = jwtDecode(token);
      setUserData(decodedUser);
    } catch (error) {
      console.log('Invalid token', error);
      navigate('/login');
      return;
    }
    setAuthChecked(true);
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/nuser/${userData.username}`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [navigate, setUserData, userData.username]);

  useEffect(() => {
    if (userData.username) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/user/${userData.username}`)
        .then((response) => {
          setUserBooks(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [userData.username]);

  useEffect(() => {
    if (showType !== prevShowType) {
      setPrevShowType(showType);
    }
  }, [showType, prevShowType]);

  const fetchSwaps = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/swapRequest`)
      .then(async (response) => {
        const allSwaps = response.data.data;
        const swapsWithEmails = await Promise.all(
          allSwaps.map(async (swap) => {
            const requester = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/getContact/${swap.requester}`);
            const requestee = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/getContact/${swap.requestee}`);
            return {
              ...swap,
              requesterEmail: requester.data.contact,
              requesteeEmail: requestee.data.contact,
            };
          })
        );
        setSwapsSent(swapsWithEmails.filter((swap) => swap.requester === userData.username));
        setSwapsReceived(swapsWithEmails.filter((swap) => swap.requestee === userData.username));
        setSwapsLoaded(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const onAccept = (swapId) => {
    setLoading(true);
    axios
      .put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/swapRequest/accept/${swapId}`)
      .then(() => {
        fetchSwaps();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const onReject = (swapId) => {
    setLoading(true);
    axios
      .put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/swapRequest/reject/${swapId}`)
      .then(() => {
        fetchSwaps();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (showType === 'swaps' && !swapsLoaded) {
      fetchSwaps();
    }
  }, [showType, swapsLoaded]);

  if (!authChecked || loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <SiBookstack className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BookSwap
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="https://github.com/michaeltsige" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <FaGithub className="text-lg" />
                <span className="text-sm font-medium">GitHub</span>
              </Link>
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <HiOutlineMail className="text-lg" />
                <span className="text-sm font-medium">Contact</span>
              </Link>
              <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <FaUserCircle className="text-lg" />
                <span className="text-sm font-medium">Profile</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setSidebarOpen(false)} className="p-2">
                  <FaTimes className="text-lg" />
                </button>
              </div>
              <div className="space-y-4">
                <Link 
                  to="https://github.com/michaeltsige" 
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaGithub className="text-lg" />
                  <span>GitHub</span>
                </Link>
                <Link 
                  to="/" 
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <HiOutlineMail className="text-lg" />
                  <span>Contact</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaUserCircle className="text-lg" />
                  <span>Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8 fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userData.username}! 👋
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover new books, manage your collection, and connect with fellow readers.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            className={`flex items-center justify-center space-x-2 px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
              showType === 'allBooks' 
                ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg' 
                : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-600 hover:shadow-md'
            }`}
            onClick={() => setShowType('allBooks')}
          >
            <SiBookstack className="text-lg" />
            <span className="font-semibold">Browse Books</span>
            {showType === 'allBooks' && <BsArrowRight className="text-lg" />}
          </button>

          <button
            className={`flex items-center justify-center space-x-2 px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
              showType === 'myBooks' 
                ? 'border-amber-500 bg-amber-500 text-white shadow-lg' 
                : 'border-gray-300 bg-white text-gray-700 hover:border-amber-500 hover:shadow-md'
            }`}
            onClick={() => setShowType('myBooks')}
          >
            <LuBookPlus className="text-lg" />
            <span className="font-semibold">My Books</span>
            {showType === 'myBooks' && <BsArrowRight className="text-lg" />}
          </button>

          <button
            className={`flex items-center justify-center space-x-2 px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
              showType === 'swaps' 
                ? 'border-green-500 bg-green-500 text-white shadow-lg' 
                : 'border-gray-300 bg-white text-gray-700 hover:border-green-500 hover:shadow-md'
            }`}
            onClick={() => setShowType('swaps')}
          >
            <HiOutlineMail className="text-lg" />
            <span className="font-semibold">Swap Requests</span>
            {showType === 'swaps' && <BsArrowRight className="text-lg" />}
          </button>
        </div>

        {/* Add Book FAB */}
        <Link 
          to="/books/create" 
          className="fixed bottom-8 right-8 z-30 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-110 transition-all duration-300 group"
          title="Add a new book"
        >
          <LuBookPlus className="text-2xl" />
          <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Add Book
          </span>
        </Link>

        {/* Content Area */}
        <div className="fade-in">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner />
            </div>
          ) : (
            <>
              {showType === 'allBooks' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Available Books</h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {books.length} books available
                    </span>
                  </div>
                  {books.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Books Available</h3>
                      <p className="text-gray-600 mb-6">Be the first to add a book to the community!</p>
                      <Link to="/books/create" className="btn-primary inline-flex items-center space-x-2">
                        <LuBookPlus />
                        <span>Add Your First Book</span>
                      </Link>
                    </div>
                  ) : (
                    <BooksCard books={books} userBooks={userBooks} />
                  )}
                </div>
              )}

              {showType === 'myBooks' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">My Collection</h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {userBooks.length} books
                    </span>
                  </div>
                  {userBooks.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
                      <div className="text-6xl mb-4">📖</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Your collection is empty</h3>
                      <p className="text-gray-600 mb-6">Start building your book collection to share with others!</p>
                      <Link to="/books/create" className="btn-primary inline-flex items-center space-x-2">
                        <LuBookPlus />
                        <span>Add Your First Book</span>
                      </Link>
                    </div>
                  ) : (
                    <UserBooksCard books={userBooks} />
                  )}
                </div>
              )}

              {showType === 'swaps' && (
                <SwapPage swapsSent={swapsSent} swapsReceived={swapsReceived} onAccept={onAccept} onReject={onReject} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;