import React, { useEffect, useState, useContext, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { UserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode';

// Components
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import WelcomeSection from '../components/home/WelcomeSection';
import NavigationTabs from '../components/home/NavigationTabs';
import AddBookFAB from '../components/home/AddBookFAB';
import ContentArea from '../components/home/ContentArea';
import SearchBar from '../components/search/SearchBar';
import Spinner from '../components/Spinner';

const Home = () => {
  // State
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('allBooks');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [swapsLoaded, setSwapsLoaded] = useState(false);
  const [swapsSent, setSwapsSent] = useState([]);
  const [swapsReceived, setSwapsReceived] = useState([]);
  const [swapLoading, setSwapLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Context & Hooks
  const { userData, setUserData } = useContext(UserContext);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Search functionality
  const filteredBooks = useMemo(() => {
    if (!searchQuery) return books;
    const query = searchQuery.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.publishYear.toString().includes(query)
    );
  }, [books, searchQuery]);

  const filteredUserBooks = useMemo(() => {
    if (!searchQuery) return userBooks;
    const query = searchQuery.toLowerCase();
    return userBooks.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.publishYear.toString().includes(query)
    );
  }, [userBooks, searchQuery]);

  // Authentication & Initial Data
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
    loadInitialData();
  }, [navigate, setUserData]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [booksResponse, userBooksResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/nuser/${userData.username}`),
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books/user/${userData.username}`)
      ]);
      
      setBooks(booksResponse.data.data);
      setUserBooks(userBooksResponse.data.data);
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Error loading books', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Swap functionality
  const fetchSwaps = async () => {
    if (swapLoading || !userData.username) return;
    
    setSwapLoading(true);
    try {
      const contactsResponse = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/getMySwapContacts`,
        { username: userData.username }
      );

      const contactMap = contactsResponse.data.contacts;
      
      const swapsResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/swapRequest`
      );
      
      const allSwaps = swapsResponse.data.data;
      const userSentSwaps = allSwaps.filter((swap) => swap.requester === userData.username);
      const userReceivedSwaps = allSwaps.filter((swap) => swap.requestee === userData.username);

      const enhanceSwaps = (swaps) => swaps.map(swap => ({
        ...swap,
        requesterEmail: contactMap[swap.requester] || 'Contact not available',
        requesteeEmail: contactMap[swap.requestee] || 'Contact not available',
      }));

      setSwapsSent(enhanceSwaps(userSentSwaps));
      setSwapsReceived(enhanceSwaps(userReceivedSwaps));
      setSwapsLoaded(true);
      
    } catch (error) {
      console.error('Error fetching swaps:', error);
      // Fallback implementation
      try {
        const swapsResponse = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/swapRequest`
        );
        
        const allSwaps = swapsResponse.data.data;
        const userSentSwaps = allSwaps.filter((swap) => swap.requester === userData.username);
        const userReceivedSwaps = allSwaps.filter((swap) => swap.requestee === userData.username);
        
        setSwapsSent(userSentSwaps);
        setSwapsReceived(userReceivedSwaps);
        setSwapsLoaded(true);
      } catch (fallbackError) {
        enqueueSnackbar('Failed to load swap requests', { variant: 'error' });
      }
    } finally {
      setSwapLoading(false);
    }
  };

  const onAccept = (swapId) => {
    setSwapLoading(true);
    axios
      .put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/swapRequest/accept/${swapId}`)
      .then(() => {
        fetchSwaps();
      })
      .catch((error) => {
        setSwapLoading(false);
        enqueueSnackbar('Error accepting swap request', { variant: 'error' });
      });
  };

  const onReject = (swapId) => {
    setSwapLoading(true);
    axios
      .put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/swapRequest/reject/${swapId}`)
      .then(() => {
        fetchSwaps();
      })
      .catch((error) => {
        setSwapLoading(false);
        enqueueSnackbar('Error rejecting swap request', { variant: 'error' });
      });
  };

  useEffect(() => {
    if (showType === 'swaps' && !swapsLoaded && !swapLoading) {
      fetchSwaps();
    }
  }, [showType, swapsLoaded, swapLoading]);

  if (!authChecked || loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        showType={showType}
        userData={userData}
      />
      
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      <main className="container mx-auto px-4 py-8">
        <WelcomeSection userData={userData} />
        
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={`Search ${showType === 'allBooks' ? 'available books' : showType === 'myBooks' ? 'your books' : 'swaps'}...`}
          />
        </div>

        <NavigationTabs 
          showType={showType}
          setShowType={setShowType}
          userBooks={userBooks}
          books={books}
        />

        <ContentArea 
          loading={loading}
          showType={showType}
          books={books}
          userBooks={userBooks}
          swapsSent={swapsSent}
          swapsReceived={swapsReceived}
          onAccept={onAccept}
          onReject={onReject}
          searchQuery={searchQuery}
          filteredBooks={filteredBooks}
          filteredUserBooks={filteredUserBooks}
          swapLoading={swapLoading}
        />

        <AddBookFAB 
          showType={showType}
          userBooks={userBooks}
          books={books}
        />
      </main>
    </div>
  );
};

export default Home;