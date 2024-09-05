import React, { useState } from 'react';
import StatusIcon from './StatusIcon';
import ContactModal from './ContactModal'; // Import the modal component

const SingleSwapCard = ({ swap, type, onAccept, onReject }) => {
  const [showModal, setShowModal] = useState(false);
  const { requester, requestee, bookRequestedName, bookOfferedName, status, requesterEmail, requesteeEmail } = swap;

  const renderActionButtons = () => {
    if (status === 'pending' && type === 'received') {
      return (
        <div className="flex space-x-2 p-4">
          <button
            onClick={onAccept}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex-1"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex-1"
          >
            Reject
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white flex flex-col md:flex-row items-center mb-4 overflow-hidden">
      <div className="flex items-center">
        <StatusIcon status={status} />
        <div>
          <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Roboto Slab', sans-serif" }}>
            {type === 'sent' ? `Requested: ${bookRequestedName}` : `Offered: ${bookOfferedName}`}
          </h3>
          <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: "'Roboto', sans-serif" }}>
            {type === 'sent' ? `Offered: ${bookOfferedName}` : `Requested: ${bookRequestedName}`}
          </p>
          <p className="text-sm text-gray-600" style={{ fontFamily: "'Roboto', sans-serif" }}>
            {type === 'sent' ? `Requestee: ${requestee}` : `Requester: ${requester}`}
          </p>
          {status === 'accepted' && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg mt-2"
            >
              View Contact Info
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {renderActionButtons()}
      </div>
      {showModal && (
        <ContactModal
          onClose={() => setShowModal(false)}
          requesterEmail={requesterEmail}
          requesteeEmail={requesteeEmail}
        />
      )}
    </div>
  );
};

export default SingleSwapCard;
