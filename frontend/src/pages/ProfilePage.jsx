import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineLogout, AiOutlineUser, AiOutlineMail, AiOutlineSafety } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import AccountDeleteModal from '../components/profile/AccountDeleteModal';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from 'notistack';

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalSwaps, setTotalSwaps] = useState(0);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    if (!userData?.username) {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          setUserData(decodedUser);
        } catch (error) {
          console.log('Invalid token', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    }
  }, [userData, setUserData, navigate]);

  useEffect(() => {
    if (userData?.username) {
      const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      // Fetch dynamic stats for the profile overview!
      Promise.all([
        axios.get(`${baseURL}/books/user/${userData.username}`),
        axios.get(`${baseURL}/swapRequest`)
      ])
        .then(([booksRes, swapsRes]) => {
          const userBooks = booksRes.data.data || [];
          setTotalBooks(userBooks.length);
          
          const allSwaps = swapsRes.data.data || [];
          const userSwaps = allSwaps.filter(s => s.requester === userData.username || s.requestee === userData.username);
          setTotalSwaps(userSwaps.length);
          setLoading(false);
        })
        .catch((err) => {
          console.log('Error fetching stats:', err);
          setLoading(false);
        });
    }
  }, [userData?.username]);

  const handleLogOut = () => {
    sessionStorage.removeItem('token');
    setUserData({});
    enqueueSnackbar('Logged out successfully', { variant: 'success' });
    navigate('/login');
  };
  
  const handleDeleteAccount = () => {
    if (!userData?.username) {
      enqueueSnackbar('User not found', { variant: 'error' });
      return;
    }

    axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/delete/${userData.username}`)
      .then(() => {
        enqueueSnackbar('Account deleted successfully', { variant: 'success' });
        handleLogOut();
      })
      .catch((error) => {
        console.log('Delete account error:', error);
        enqueueSnackbar('Error deleting account', { variant: 'error' });
      });
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-8 select-none">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <h1 className="text-2xl font-bold font-serif text-gray-900">Account Settings</h1>
          <Link 
            to="/" 
            className="flex items-center justify-center px-4 py-2 border border-[#E3EAE3] bg-white rounded-lg text-xs font-mono font-bold uppercase hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#E8EDE5] p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              {/* Profile Header */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 bg-[#9A3412] rounded-2xl flex items-center justify-center shadow-inner">
                    <FaUserCircle className="text-white text-4xl" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#115E59] rounded-full border-4 border-white flex items-center justify-center">
                    <AiOutlineSafety className="text-white text-xs" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 font-serif leading-tight truncate">{userData.username}</h2>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mt-0.5">BookSwap Member</p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-[#115E59]/10 text-[#115E59] text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-lg">
                      Active
                    </span>
                    <span className="bg-[#9A3412]/10 text-[#9A3412] text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-lg">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Username */}
                  <div className="flex items-center gap-4 p-4 bg-slate-50/50 border border-slate-100 rounded-xl min-w-0">
                    <div className="w-11 h-11 bg-[#9A3412]/10 rounded-xl flex items-center justify-center shrink-0">
                      <AiOutlineUser className="text-[#9A3412] text-xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Username</p>
                      <p className="text-sm font-bold text-slate-800 break-all leading-tight mt-0.5">{userData.username}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 p-4 bg-slate-50/50 border border-slate-100 rounded-xl min-w-0">
                    <div className="w-11 h-11 bg-[#115E59]/10 rounded-xl flex items-center justify-center shrink-0">
                      <AiOutlineMail className="text-[#115E59] text-xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Email Address</p>
                      <p className="text-sm font-bold text-slate-800 break-all leading-tight mt-0.5">{userData.email}</p>
                    </div>
                  </div>
                </div>

                {/* Account Stats */}
                <div className="p-6 bg-[#FAF9F6] border border-[#E8EDE5] rounded-2xl shadow-inner select-none font-sans">
                  <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-4">Account Overview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white border border-[#E3EAE3] rounded-xl">
                      <p className="text-3xl font-black text-[#9A3412] leading-none mb-1.5">{totalBooks}</p>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Books Listed</p>
                    </div>
                    <div className="text-center p-3 bg-white border border-[#E3EAE3] rounded-xl">
                      <p className="text-3xl font-black text-[#115E59] leading-none mb-1.5">{totalSwaps}</p>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Swaps Made</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-[#E8EDE5] p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={handleLogOut}
                  className="w-full flex items-center gap-3 p-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-all group font-semibold text-sm border border-transparent hover:border-slate-100 active:scale-95"
                >
                  <AiOutlineLogout className="text-slate-400 group-hover:text-red-500 text-lg transition-colors" />
                  <span>Log Out</span>
                </button>
                
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full flex items-center gap-3 p-3 text-[#9A3412] hover:bg-[#9A3412]/5 rounded-xl transition-all group font-semibold text-sm border border-transparent hover:border-[#9A3412]/15 active:scale-95"
                >
                  <AiOutlineDelete className="text-lg" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-[#164E63] rounded-2xl p-6 text-white shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <h3 className="font-serif text-lg font-bold mb-1.5 tracking-tight">Need Help?</h3>
              <p className="text-white/85 text-xs font-light leading-relaxed mb-5">
                Contact our support team for assistance with your account, security settings, or swap inquiries.
              </p>
              <a 
                href="mailto:michaeltsigecherenet@gmail.com"
                className="w-full flex items-center justify-center bg-white text-[#164E63] py-2.5 rounded-xl text-xs uppercase tracking-wider font-extrabold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Rich Dynamic Account Information */}
        <div className="mt-8 bg-white rounded-2xl border border-[#E8EDE5] p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-4">About Your Account</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs text-gray-600">
            <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider mb-1.5">Member Since</p>
              <p className="text-slate-800 font-bold text-sm">August 2026</p>
            </div>
            <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider mb-1.5">Account Status</p>
              <p className="text-[#115E59] font-extrabold text-sm">Active &amp; Secure</p>
            </div>
            <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider mb-1.5">Active Region</p>
              <p className="text-slate-800 font-bold text-sm">East Africa (EAT)</p>
            </div>
            <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100">
              <p className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider mb-1.5">Trust Score</p>
              <p className="text-slate-800 font-bold text-sm">Excellent (100%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showModal && (
        <AccountDeleteModal 
          onDelete={handleDeleteAccount} 
          onCancel={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default ProfilePage;
