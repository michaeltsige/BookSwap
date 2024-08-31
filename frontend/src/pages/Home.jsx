import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { LuBookPlus } from "react-icons/lu";
import { SiBookstack } from "react-icons/si";
import { BiLogOut } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { FaGithub } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

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
  const navigate = useNavigate();

  // checks sessionStorage for user and uses it if available
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

  // load user books if user is found
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

  // navigating through the different 'tabs'
  useEffect(() => {
    if (showType !== prevShowType) {
      setPrevShowType(showType);
    }
  }, [showType, prevShowType]);

  // Function for fetching swaps related to this user from the server/backend
  const fetchSwaps = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/swapRequest`)
      .then(async (response) => {
        const allSwaps = response.data.data;

        // Fetch email addresses for the requester and requestee
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

  // Function for accepting Book Swap Request
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

  // Function for rejecting Book Swap Request
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

  // Call fetchSwaps when needed
  useEffect(() => {
    if (showType === 'swaps' && !swapsLoaded) {
      fetchSwaps();
    }
  }, [showType, swapsLoaded]);

  //loading spinner
  if (!authChecked || loading) {
    return <Spinner />;
  }

  //handle logout
  const handleLogOut = ()=>{
    sessionStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="p-6 bg-[#F5F5F5] min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-x-4">
          <SiBookstack className="text-[#2B6CB0] text-3xl hover:text-[#1A202C] transition duration-300" />
          <h1 className="text-4xl font-semibold text-[#2B6CB0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            BookSwap
          </h1>
        </div>
        <div className="flex items-center gap-x-4">
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
      <div className="flex justify-end mb-0">
        <Link to="/books/create" title="Add a new book">
          <LuBookPlus className="text-[#2B6CB0] text-3xl hover:text-[#1A202C] transition duration-300" />
        </Link>
        <span className="text-sm text-[#2B6CB0] mt-1">Add Book</span>
      </div>
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
