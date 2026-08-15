import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { UserContext } from '../context/UserContext';
import { BookCacheContext } from '../context/BookCacheContext';
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
  const { getCache, setCacheValue } = useContext(BookCacheContext);
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
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUserData(decodedUser);
      } catch (error) {
        console.log('Invalid token', error);
        sessionStorage.removeItem('token');
        setUserData({});
      }
    } else {
      setUserData({});
    }
    setAuthChecked(true);
  }, [setUserData]);

  // Background Quiet Update (Stale-While-Revalidate)
  const refreshDataBackground = useCallback(async (cacheKeyAll, cacheKeyUser) => {
    try {
      const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      if (userData?.username) {
        const [booksResponse, userBooksResponse] = await Promise.all([
          axios.get(`${baseURL}/books/nuser/${userData.username}`),
          axios.get(`${baseURL}/books/user/${userData.username}`)
        ]);
        
        const freshBooks = booksResponse.data.data || [];
        const freshUserBooks = userBooksResponse.data.data || [];
        
        setBooks(freshBooks);
        setUserBooks(freshUserBooks);
        
        setCacheValue(cacheKeyAll, freshBooks);
        setCacheValue(cacheKeyUser, freshUserBooks);
      } else {
        const booksResponse = await axios.get(`${baseURL}/books`);
        const freshBooks = booksResponse.data.data || [];
        setBooks(freshBooks);
        setCacheValue(cacheKeyAll, freshBooks);
      }
    } catch (err) {
      console.log('Background sync failed:', err.message);
    }
  }, [userData?.username, setCacheValue]);

  const loadInitialData = async () => {
    const cacheKeyAll = userData?.username ? `allBooks_${userData.username}` : 'allBooks_anonymous';
    const cacheKeyUser = userData?.username ? `myBooks_${userData.username}` : null;

    const cachedAll = getCache(cacheKeyAll);
    const cachedUser = cacheKeyUser ? getCache(cacheKeyUser) : null;

    // SWR Cache Hit: serve immediately and refresh silently in background (0ms latency!)
    if (cachedAll) {
      setBooks(cachedAll);
      if (cachedUser) {
        setUserBooks(cachedUser);
      }
      setLoading(false);
      refreshDataBackground(cacheKeyAll, cacheKeyUser);
      return;
    }

    setLoading(true);
    try {
      const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      if (userData?.username) {
        // Parallelizing requests using Promise.all to completely eliminate sequential waterfalls!
        const [booksResponse, userBooksResponse] = await Promise.all([
          axios.get(`${baseURL}/books/nuser/${userData.username}`),
          axios.get(`${baseURL}/books/user/${userData.username}`)
        ]);
        
        const freshBooks = booksResponse.data.data || [];
        const freshUserBooks = userBooksResponse.data.data || [];
        
        setBooks(freshBooks);
        setUserBooks(freshUserBooks);
        
        setCacheValue(cacheKeyAll, freshBooks);
        setCacheValue(cacheKeyUser, freshUserBooks);
      } else {
        const booksResponse = await axios.get(`${baseURL}/books`);
        const freshBooks = booksResponse.data.data || [];
        setBooks(freshBooks);
        setCacheValue(cacheKeyAll, freshBooks);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Error loading books', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authChecked) {
      loadInitialData();
    }
  }, [authChecked, userData?.username]);

  // Swap functionality
  const fetchSwaps = async () => {
    if (swapLoading || !userData.username) return;
    
    // Check cache for swaps
    const cacheKeySwaps = `swaps_${userData.username}`;
    const cachedSwaps = getCache(cacheKeySwaps);
    
    if (cachedSwaps) {
      setSwapsSent(cachedSwaps.sent);
      setSwapsReceived(cachedSwaps.received);
      setSwapsLoaded(true);
      // Quiet background update
      refreshSwapsBackground(cacheKeySwaps);
      return;
    }

    setSwapLoading(true);
    try {
      const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      
      // Parallelize fetching of swap data and contacts to eliminate waterfalls
      const [contactsResponse, swapsResponse] = await Promise.all([
        axios.post(`${baseURL}/auth/getMySwapContacts`, { username: userData.username }),
        axios.get(`${baseURL}/swapRequest`)
      ]);

      const contactMap = contactsResponse.data.contacts;
      const allSwaps = swapsResponse.data.data;
      
      const userSentSwaps = allSwaps.filter((swap) => swap.requester === userData.username);
      const userReceivedSwaps = allSwaps.filter((swap) => swap.requestee === userData.username);

      const enhanceSwaps = (swaps) => swaps.map(swap => ({
        ...swap,
        requesterEmail: contactMap[swap.requester] || 'Contact not available',
        requesteeEmail: contactMap[swap.requestee] || 'Contact not available',
      }));

      const sent = enhanceSwaps(userSentSwaps);
      const received = enhanceSwaps(userReceivedSwaps);

      setSwapsSent(sent);
      setSwapsReceived(received);
      setSwapsLoaded(true);
      
      setCacheValue(cacheKeySwaps, { sent, received });
    } catch (error) {
      console.error('Error fetching swaps:', error);
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

  const refreshSwapsBackground = async (cacheKeySwaps) => {
    try {
      const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      const [contactsResponse, swapsResponse] = await Promise.all([
        axios.post(`${baseURL}/auth/getMySwapContacts`, { username: userData.username }),
        axios.get(`${baseURL}/swapRequest`)
      ]);

      const contactMap = contactsResponse.data.contacts;
      const allSwaps = swapsResponse.data.data;
      
      const userSentSwaps = allSwaps.filter((swap) => swap.requester === userData.username);
      const userReceivedSwaps = allSwaps.filter((swap) => swap.requestee === userData.username);

      const enhanceSwaps = (swaps) => swaps.map(swap => ({
        ...swap,
        requesterEmail: contactMap[swap.requester] || 'Contact not available',
        requesteeEmail: contactMap[swap.requestee] || 'Contact not available',
      }));

      const sent = enhanceSwaps(userSentSwaps);
      const received = enhanceSwaps(userReceivedSwaps);

      setSwapsSent(sent);
      setSwapsReceived(received);
      setCacheValue(cacheKeySwaps, { sent, received });
    } catch (err) {
      console.log('Background swap sync failed:', err.message);
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

  const handleSetShowType = (tabId) => {
    if ((tabId === 'myBooks' || tabId === 'swaps') && !userData?.username) {
      navigate('/login');
      return;
    }
    setShowType(tabId);
  };

  if (!authChecked || loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-slate-800">
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

      <main className="container mx-auto px-6 py-12">
        <WelcomeSection userData={userData} />
        
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={`Search ${showType === 'allBooks' ? 'available books' : showType === 'myBooks' ? 'your books' : 'swaps'}...`}
          />
        </div>

        <NavigationTabs 
          showType={showType}
          setShowType={handleSetShowType}
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
          userData={userData}
        />
      </main>
    </div>
  );
};

export default Home;