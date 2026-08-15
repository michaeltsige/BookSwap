import React from 'react';

const WelcomeSection = ({ userData }) => {
  return (
    <div class="text-center mb-10 fade-in select-none bg-[#FAF9F6] border border-[#E8EDE5] rounded-2xl py-12 px-6 max-w-3xl mx-auto shadow-sm">
      <h2 class="text-2xl md:text-3xl font-medium text-slate-900 mb-3.5 font-serif tracking-tight leading-tight">
        {userData?.username ? `Welcome back, ${userData.username}` : 'Welcome to BookSwap'}
      </h2>
      <p class="text-xs md:text-sm text-slate-500 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
        {userData?.username 
          ? 'Discover fresh additions, manage your collection, and connect with fellow readers across our secure book trading platform.'
          : 'Browse available titles from our community. Sign in or create an account to publish listings, manage requests, and swap books.'}
      </p>
    </div>
  );
};

export default WelcomeSection;
