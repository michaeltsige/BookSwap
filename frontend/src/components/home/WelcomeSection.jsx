import React from 'react';

const WelcomeSection = ({ userData }) => {
  return (
    <div className="text-center mb-8 fade-in">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {userData.username}! 👋
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Discover new books, manage your collection, and connect with fellow readers.
      </p>
    </div>
  );
};

export default WelcomeSection;