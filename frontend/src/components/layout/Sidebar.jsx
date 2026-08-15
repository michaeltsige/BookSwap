import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaGithub, FaUserCircle } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  if (!sidebarOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setSidebarOpen(false)} className="p-2">
              <FaTimes className="text-lg" />
            </button>
          </div>
          <div className="space-y-4">
            <Link 
              to="https://github.com/michaeltsige" 
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FaGithub className="text-lg" />
              <span>GitHub</span>
            </Link>
            <Link 
              to="/" 
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <HiOutlineMail className="text-lg" />
              <span>Contact</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FaUserCircle className="text-lg" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;