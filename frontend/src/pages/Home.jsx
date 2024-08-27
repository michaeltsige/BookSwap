import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
// import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import UserBooksCard from '../components/home/UserBooksCard';
import { UserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('allBooks');
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {

    const token = sessionStorage.getItem('token');

    if (!token) {
      navigate('/login'); // Redirect to login if no token found
      return;
    }
    
    const decodedUser = jwtDecode(token);
    setUserData(decodedUser);

    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
        console.log(userData);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('allBooks')}
        >
          All Books
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('myBooks')}
        >
          My Books
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'allBooks' ? (
        <BooksCard books={books} />
      ) : (
        <UserBooksCard books={books} user={userData} />
      )}
    </div>
  );
};

export default Home;
