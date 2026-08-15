import React from 'react';

const WelcomeSection = ({ userData }) => {
  return (
    <div className="text-center mb-8 fade-in select-none">
      <h2 className="text-3xl font-medium text-slate-900 mb-2 font-serif tracking-tight">
        {userData?.username ? `Welcome back, ${userData.username}` : 'Welcome to BookSwap'}
      </h2>
      <p className="text-sm text-slate-500 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
        {userData?.username 
          ? 'Discover new books, manage your collection, and connect with fellow readers across the community.'
          : 'Browse available books from the community. Sign in or create an account to request trades and share your collection.'}
      </p>
    </div>
  );
};

export default WelcomeSection;
