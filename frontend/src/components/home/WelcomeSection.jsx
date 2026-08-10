import React from 'react';

const WelcomeSection = ({ userData }) => {
  return (
    <div className="text-center mb-8 fade-in">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {userData?.username ? `Welcome back, ${userData.username}! 👋` : 'Welcome to BookSwap! 📚'}
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {userData?.username 
          ? 'Discover new books, manage your collection, and connect with fellow readers.'
          : 'Browse available books from the community. Sign in or create an account to request trades and share your collection!'}
      </p>
    </div>
  );
};

export default WelcomeSection;