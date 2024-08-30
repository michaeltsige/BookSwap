import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { LuBookPlus } from "react-icons/lu";
import { SiBookstack } from "react-icons/si";
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
    if (userData.username) {
      setLoading(true);

      axios
        .get(`http://localhost:5555/books/user/${userData.username}`)
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

  if (!authChecked || loading) {
    return <Spinner />;
  }

  const filteredBooks = books.filter(
    (book) => book.ownerUsername !== userData.username
  );

  return (
    <div className="p-6 bg-[#F5F5F5] min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-x-4">
          <SiBookstack className="text-[#2B6CB0] text-3xl hover:text-[#1A202C] transition duration-300" />
          <h1 className="text-4xl font-semibold text-[#2B6CB0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            BookSwap
          </h1>
        </div>
      </div>

      <div className="flex gap-x-4 mb-6">
        <button
          className={`flex-1 px-4 py-3 rounded-md transition duration-300
          ${
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
              <BooksCard books={filteredBooks} />
            ) : showType === 'myBooks' ? (
              <UserBooksCard books={userBooks} />
            ) : showType === 'swaps' ? (
              <SwapPage />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
