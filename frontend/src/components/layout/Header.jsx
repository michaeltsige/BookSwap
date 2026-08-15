import React from 'react';
import { Link } from 'react-router-dom';
import { SiBookstack } from 'react-icons/si';
import { FaUserCircle, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Header = ({ sidebarOpen, setSidebarOpen, showType, userData }) => {
  return (
    <header class="bg-white border-b border-[#E8EDE5] sticky top-0 z-40 select-none">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          {/* Logo - Elegant Serif Typography paired with custom matte badge */}
          <Link to="/" class="flex items-center space-x-3 group">
            <div class="w-9 h-9 border border-[#9A3412]/15 bg-[#9A3412]/5 rounded-lg flex items-center justify-center transition-colors group-hover:bg-[#9A3412]/10">
              <SiBookstack class="text-[#9A3412] text-base" />
            </div>
            <h1 class="text-xl font-bold font-serif text-slate-900 tracking-tight group-hover:text-[#9A3412] transition-colors">
              BookSwap
            </h1>
          </Link>

          {/* Desktop Navigation - Sleek lowercase and uppercase items */}
          <div class="hidden lg:flex items-center space-x-6">
            <a href="https://github.com/michaeltsige" target="_blank" rel="noopener" class="flex items-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors">
              <FaGithub class="text-sm" />
              <span class="text-xs uppercase tracking-wider font-semibold">GitHub</span>
            </a>
            <Link to="/" class="flex items-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors">
              <HiOutlineMail class="text-sm" />
              <span class="text-xs uppercase tracking-wider font-semibold">Contact</span>
            </Link>
            {userData?.username ? (
              <Link to="/profile" class="flex items-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors">
                <FaUserCircle class="text-sm" />
                <span class="text-xs uppercase tracking-wider font-semibold">Profile</span>
              </Link>
            ) : (
              <Link to="/login" class="flex items-center space-x-2 px-4 py-2 bg-[#9A3412] hover:bg-[#7C2D12] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
                <span>Login / Sign Up</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            class="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors"
          >
            {sidebarOpen ? <FaTimes class="text-lg" /> : <FaBars class="text-lg" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;