import React from 'react';
import StatusIcon from './StatusIcon';

const SingleSwapCard = ({ swap, type, onAccept, onReject }) => {
  const { requester, requestee, bookRequestedId, bookOfferedId, bookRequestedName, bookOfferedName, status } = swap;


  const renderActionButtons = () => {
    if (status === 'pending' && type === 'received') {
      return (
        <div className="flex space-x-2">
          <button
            onClick={onAccept}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
          >
            Reject
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center mb-4">
      <div className="flex items-center">
        <StatusIcon status={status} />
        <div>
          <h3 className="text-lg font-semibold">
            {type === 'sent' ? `Requested: ${bookRequestedName}` : `Offered: ${bookOfferedName}`}
          </h3>
          <p className="text-sm text-gray-600">
            {type === 'sent' ? `Offered: ${bookOfferedName}` : `Requested: ${bookRequestedName}`}
          </p>
          <p className="text-sm text-gray-600">
            {type === 'sent' ? `Requestee: ${requestee}` : `Requester: ${requester}`}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        {renderActionButtons()}
      </div>
    </div>
  );
};

export default SingleSwapCard;
