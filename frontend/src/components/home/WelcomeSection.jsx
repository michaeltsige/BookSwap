import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const WelcomeSection = ({ userData }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('welcome_dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('welcome_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div class="relative bg-[#FAF9F6] border border-[#E8EDE5] rounded-xl py-3 px-4 max-w-3xl mx-auto mb-6 flex items-center justify-between shadow-sm select-none">
      <div class="flex-grow pr-6 text-left">
        <p class="text-sm text-slate-700 leading-normal font-serif">
          <span class="font-bold text-[#9A3412]">
            {userData?.username ? `Welcome back, ${userData.username}! ` : 'Welcome to BookSwap! '}
          </span>
          <span class="text-xs text-slate-500 font-light">
            {userData?.username 
              ? 'Discover fresh additions, manage your collection, and swap books.'
              : 'Browse titles, sign in to publish listings, and start swapping.'}
          </span>
        </p>
      </div>
      <button 
        onClick={handleDismiss} 
        class="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
        aria-label="Dismiss welcome message"
      >
        <FaTimes class="text-xs" />
      </button>
    </div>
  );
};

export default WelcomeSection;
