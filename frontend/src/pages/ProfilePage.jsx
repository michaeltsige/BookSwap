import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineLogout, AiOutlineUser, AiOutlineMail, AiOutlineSafety } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import AccountDeleteModal from '../components/profile/AccountDeleteModal';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from 'notistack'; // Add this import

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    if (!userData?.username) { // Add safe navigation
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          setUserData(decodedUser);
          setLoading(false);
        } catch (error) {
          console.log('Invalid token', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    } else {
      setLoading(false);
    }
  }, [userData, setUserData, navigate]);

  const handleLogOut = () => {
    sessionStorage.removeItem('token');
    setUserData({}); // Set to empty object instead of null to avoid null reference
    enqueueSnackbar('Logged out successfully', { variant: 'success' });
    navigate('/login');
  };
  
  const handleDeleteAccount = () => {
    if (!userData?.username) { // Add safety check
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

  // Add safety check for userData
  if (!userData || !userData.username) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Expired</h2>
          <p className="text-gray-600 mb-6">Please log in again to continue.</p>
          <button 
            onClick={() => navigate('/login')}
            className="btn btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="card-hover bg-white rounded-2xl shadow-sm border border-[#E8EDE5] p-8">
              {/* Profile Header */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-[#9A3412] rounded-2xl flex items-center justify-center">
                    <FaUserCircle className="text-white text-4xl" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <AiOutlineSafety className="text-white text-xs" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{userData.username}</h2>
                  <p className="text-gray-600">BookSwap Member</p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
                      Active
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Username */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <AiOutlineUser className="text-[#9A3412] text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Username</p>
                      <p className="text-lg font-semibold text-gray-900">{userData.username}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <AiOutlineMail className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Email Address</p>
                      <p className="text-lg font-semibold text-gray-900">{userData.email}</p>
                    </div>
                  </div>
                </div>

                {/* Account Stats */}
                <div className="p-6 bg-[#FAF9F6] border border-[#E8EDE5] rounded-xl border border-indigo-100">
                  <h3 className="font-semibold text-indigo-900 mb-3">Account Overview</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#9A3412]">0</p>
                      <p className="text-indigo-700">Books Listed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#9A3412]">0</p>
                      <p className="text-indigo-700">Swaps Made</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card-hover bg-white rounded-2xl shadow-sm border border-[#E8EDE5] p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleLogOut}
                  className="w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <AiOutlineLogout className="text-gray-500 group-hover:text-red-500 text-xl" />
                  <span className="font-medium">Log Out</span>
                </button>
                
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                >
                  <AiOutlineDelete className="text-xl" />
                  <span className="font-medium">Delete Account</span>
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="card-hover bg-[#164E63] rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Contact our support team for assistance with your account.
              </p>
              <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 card-hover bg-white rounded-2xl shadow-sm border border-[#E8EDE5] p-6">
          <h3 className="font-semibold text-gray-900 mb-4">About Your Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-700 mb-2">Member Since</p>
              <p>Recently joined</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-2">Account Type</p>
              <p>Standard Member</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-2">Swapping Status</p>
              <p className="text-[#115E59] font-medium">Active</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-2">Community Rating</p>
              <p>New Member</p>
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