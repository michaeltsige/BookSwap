import React from 'react';
import { Link } from 'react-router-dom';
import { SiBookstack } from 'react-icons/si';
import { FaUserCircle, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Header = ({ sidebarOpen, setSidebarOpen, showType, userData }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <SiBookstack className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BookSwap
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="https://github.com/michaeltsige" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <FaGithub className="text-lg" />
              <span className="text-sm font-medium">GitHub</span>
            </Link>
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <HiOutlineMail className="text-lg" />
              <span className="text-sm font-medium">Contact</span>
            </Link>
            {userData?.username ? (
              <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <FaUserCircle className="text-lg" />
                <span className="text-sm font-medium">Profile</span>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                <span>Login / Sign Up</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;