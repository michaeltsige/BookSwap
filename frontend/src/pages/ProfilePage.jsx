import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineLogout } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import AccountDeleteModal from '../components/profile/AccountDeleteModal';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { jwtDecode } from 'jwt-decode';

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.username) {
      // If userData is empty, fetch user data based on token
      const token = sessionStorage.getItem('token');
      if (token) {
        const decodedUser = jwtDecode(token);
        setUserData(decodedUser);
        setLoading(false);
      } else {
        navigate('/login');
      }
    } else {
      setLoading(false);
    }
  }, [userData, setUserData, navigate]);

  const handleLogOut = () => {
    sessionStorage.removeItem('token');
    setUserData(null);
    navigate('/login');
  }
  
  const handleDeleteAccount = () => {
    
    axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/delete/${userData.username}`)
      .then(() => {
        handleLogOut();
      })
      .catch((error) => {
        console.log('Delete account error:', error);
      });
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 bg-[#F5F5F5] min-h-screen relative" style={{ fontFamily: "'Roboto', sans-serif" }}>
      
      <BackButton destination="/" className="absolute top-4 left-4 z-10" />
  
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-8 flex flex-col items-center mx-auto">
        <FaUserCircle className="text-[#2B6CB0] text-8xl mb-4" />
        <h1 className="text-3xl font-semibold text-[#2B6CB0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {userData.username}
        </h1>
        <p className="text-lg text-[#4A5568] mb-6">
          {userData.email}
        </p>
        <div className="flex flex-col items-center w-full">
          <button
            onClick={handleLogOut}
            className="w-full flex items-center justify-center py-2 px-4 rounded-md text-white bg-[#2B6CB0] hover:bg-[#1A202C] transition duration-300 mb-4"
          >
            <AiOutlineLogout className="text-xl mr-2" />
            Logout
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center py-2 px-4 rounded-md text-red-600 bg-white border border-red-600 hover:bg-red-100 transition duration-300"
          >
            <AiOutlineDelete className="text-xl mr-2" />
            Delete Account
          </button>
        </div>
      </div>
  
      {/* Additional content */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#2B6CB0] mb-4">
          Account Settings
        </h2>
        <p className="text-gray-600 mb-4">
          Here you can manage your account logging and deletion. If you want to contact me, Click below.
        </p>
        <a href="/" className="text-blue-600 hover:underline">
          Contact Support
        </a>
      </div>
  
      {/* Modal for account deletion */}
      {showModal && (
        <AccountDeleteModal onDelete={handleDeleteAccount} onCancel={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ProfilePage;
