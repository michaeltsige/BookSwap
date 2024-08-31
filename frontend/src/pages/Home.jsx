import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LuBookPlus } from 'react-icons/lu';
import { SiBookstack } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';
import { FaUserCircle, FaGithub } from 'react-icons/fa';
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
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
  }, [navigate, setUserData]);

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
        fetchSwaps(); // Refetch the data to update UI
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
        fetchSwaps(); // Refetch the data to update UI
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
    <div className="p-6 bg-[#F5F5F5] min-h-screen flex flex-col relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-40 h-full bg-white shadow-md transform ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 lg:hidden flex flex-col items-center justify-between py-4`}
        style={{ width: '250px' }}
      >
        {/* Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-3xl p-4 focus:outline-none text-[#2B6CB0] self-end"
        >
          &times;
        </button>
  
        {/* Sidebar Content */}
        <div className="flex flex-col items-center gap-8">
          {/* Sidebar Title or Logo */}
          <h2 className="text-xl font-semibold text-[#2B6CB0]">Menu</h2>
  
          {/* Navigation Links */}
          <div className="flex flex-col items-center gap-6">
            <Link to="/t" className="text-black hover:text-gray-700 transition duration-300 flex items-center">
              <FaGithub className="text-3xl" />
              <span className="ml-2 text-sm">More Projects</span>
            </Link>
            <Link to="/" className="text-[#28a745] hover:text-[#218838] transition duration-300 flex items-center">
              <HiOutlineMail className="text-3xl" />
              <span className="ml-2 text-sm">Contact</span>
            </Link>
            <Link to="/profile" className="text-slate-600 hover:text-slate-500 transition duration-300 flex items-center">
              <FaUserCircle className="text-3xl" />
              <span className="ml-2 text-sm">Account</span>
            </Link>
          </div>
        </div>
  
        {/* Optional Footer or Additional Content */}
        <div className="mb-4 text-sm text-gray-500">© 2024 BookSwap</div>
      </div>
  
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-x-4">
          <SiBookstack className="text-[#2B6CB0] text-3xl hover:text-[#1A202C] transition duration-300" />
          <h1 className="text-4xl font-semibold text-[#2B6CB0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            BookSwap
          </h1>
        </div>
        {/* Hamburger menu button for smaller screens */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-[#2B6CB0] text-3xl hover:text-[#1A202C] transition duration-300 focus:outline-none"
        >
          ☰
        </button>
        {/* Main menu for larger screens */}
        <div className="hidden lg:flex lg:items-center gap-x-4">
          <Link to="/t" className="text-black hover:text-gray-700 transition duration-300 flex items-center">
            <FaGithub className="text-3xl" />
            <span className="ml-2 text-sm">More Projects</span>
          </Link>
          <Link to="/" className="text-[#28a745] hover:text-[#218838] transition duration-300 flex items-center">
            <HiOutlineMail className="text-3xl" />
            <span className="ml-2 text-sm">Contact</span>
          </Link>
          <Link to="/profile" className="text-slate-600 hover:text-slate-500 transition duration-300 flex items-center">
            <FaUserCircle className="text-3xl" />
            <span className="ml-2 text-sm">Logout</span>
          </Link>
        </div>
      </div>
  
      {/* Tab Buttons */}
      <div className="flex gap-x-4 mb-6">
        <button
          className={`flex-1 px-4 py-3 rounded-md transition duration-300 ${
            showType === 'allBooks' ? 'bg-[#2B6CB0] text-white' : 'bg-white text-[#2B6CB0]'
          } border border-[#2B6CB0] shadow-md hover:bg-[#2B6CB0] hover:text-white`}
          onClick={() => setShowType('allBooks')}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          All Books
        </button>
        <button
          className={`flex-1 px-4 py-3 rounded-md transition duration-300 ${
            showType === 'myBooks' ? 'bg-[#2B6CB0] text-white' : 'bg-white text-[#2B6CB0]'
          } border border-[#2B6CB0] shadow-md hover:bg-[#2B6CB0] hover:text-white`}
          onClick={() => setShowType('myBooks')}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          My Books
        </button>
        <button
          className={`flex-1 px-4 py-3 rounded-md transition duration-300 ${
            showType === 'swaps' ? 'bg-[#2B6CB0] text-white' : 'bg-white text-[#2B6CB0]'
          } border border-[#2B6CB0] shadow-md hover:bg-[#2B6CB0] hover:text-white`}
          onClick={() => setShowType('swaps')}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Swaps
        </button>
      </div>
  
      {/* Add Book Icon */}
      <div className="flex justify-end mb-1">
        <Link to="/books/create" title="Add a new book" className="flex flex-col items-center">
          <LuBookPlus className="text-[#2B6CB0] text-3xl hover:text-[#1A202C] transition duration-300" />
          <span className="text-sm text-[#2B6CB0] mt-1">Add Book</span>
        </Link>
      </div>
  
      {/* Main content */}
      <div className="relative">
        {loading ? (
          <Spinner />
        ) : (
          <div
            className={`transition-opacity duration-300 ${
              showType === prevShowType ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {showType === 'allBooks' ? (
              <BooksCard books={books} />
            ) : showType === 'myBooks' ? (
              <UserBooksCard books={userBooks} />
            ) : showType === 'swaps' ? (
              <SwapPage swapsSent={swapsSent} swapsReceived={swapsReceived} onAccept={onAccept} onReject={onReject} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Home;
