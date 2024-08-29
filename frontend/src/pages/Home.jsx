import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksCard from '../components/home/booksPage/BooksCard';
import UserBooksCard from '../components/home/booksPage/UserBooksCard';
import SwapPage from '../components/home/swapRequestsPage/SwapPage'; // Import SwapPage component
import { UserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('allBooks');
  const [prevShowType, setPrevShowType] = useState('allBooks');
  const { userData, setUserData } = useContext(UserContext);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      navigate('/login'); // Redirect to login if no token found
      return;
    }

    try {
      const decodedUser = jwtDecode(token);
      setUserData(decodedUser);
    } catch (error) {
      console.error('Invalid token', error);
      navigate('/login');
      return;
    }

    setAuthChecked(true);
    setLoading(true);

    axios
      .get('http://localhost:5555/books')
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
    // Update prevShowType when showType changes
    if (showType !== prevShowType) {
      setPrevShowType(showType);
    }
  }, [showType, prevShowType]);

  if (!authChecked || loading) {
    // Show spinner until auth check and loading are complete
    return <Spinner />;
  }

  return (
    <div className="p-6 bg-[#EAEAEA] min-h-screen">
      <div className="flex justify-center items-center gap-x-6 mb-6">
        <button
          className={`px-6 py-2 rounded-t-lg transition duration-300 ${
            showType === 'allBooks' ? 'bg-[#4A5568] text-white' : 'bg-[#EAEAEA] text-[#4A5568]'
          } border border-[#4A5568]`}
          onClick={() => setShowType('allBooks')}
        >
          All Books
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg transition duration-300 ${
            showType === 'myBooks' ? 'bg-[#4A5568] text-white' : 'bg-[#EAEAEA] text-[#4A5568]'
          } border border-[#4A5568]`}
          onClick={() => setShowType('myBooks')}
        >
          My Books
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg transition duration-300 ${
            showType === 'swaps' ? 'bg-[#4A5568] text-white' : 'bg-[#EAEAEA] text-[#4A5568]'
          } border border-[#4A5568]`}
          onClick={() => setShowType('swaps')}
        >
          Swaps
        </button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#2D3748]">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-[#4A5568] text-5xl hover:text-[#2D3748] transition duration-300" />
        </Link>
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
              <UserBooksCard books={books} user={userData} />
            ) : showType === 'swaps' ? (
              <SwapPage /> // Render SwapPage component
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
