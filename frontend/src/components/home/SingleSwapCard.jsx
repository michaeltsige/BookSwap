import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const SingleSwapCard = ({ swap, type }) => {
  const { bookRequested, bookOffered, status, requester, requestee } = swap;

  const renderStatusIcon = () => {
    switch (status) {
      case 'accepted':
        return <FaCheckCircle className="text-green-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center mb-4">
      <div>
        <h3 className="text-lg font-semibold">
          {type === 'sent' ? `Requested: ${bookRequested.title}` : `Offered: ${bookOffered.title}`}
        </h3>
        <p className="text-sm text-gray-600">
          {type === 'sent' ? `Offered: ${bookOffered.title}` : `Requested: ${bookRequested.title}`}
        </p>
        <p className="text-sm text-gray-600">
          {type === 'sent' ? `Requestee: ${requestee}` : `Requester: ${requester}`}
        </p>
      </div>
      <div className="flex items-center">
        {renderStatusIcon()}
      </div>
    </div>
  );
};

export default SingleSwapCard;
