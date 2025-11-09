import React, { useState } from 'react';
import StatusIcon from './StatusIcon';
import ContactModal from './ContactModal';
import { PiBookOpenTextLight, PiUserLight } from 'react-icons/pi';

const SingleSwapCard = ({ swap, type, onAccept, onReject }) => {
  const [showModal, setShowModal] = useState(false);
  const { requester, requestee, bookRequestedName, bookOfferedName, status, requesterEmail, requesteeEmail } = swap;

  const renderActionButtons = () => {
    if (status === 'pending' && type === 'received') {
      return (
        <div className="flex gap-2 mt-4">
          <button
            onClick={onAccept}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Reject
          </button>
        </div>
      );
    }
    return null;
  };

  const getStatusColor = () => {
    switch (status) {
      case 'accepted': return 'border-l-green-500';
      case 'rejected': return 'border-l-red-500';
      case 'pending': return 'border-l-amber-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <>
      <div className={`bg-white border-l-4 ${getStatusColor()} rounded-r-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow`}>
        <div className="flex items-start gap-4">
          <StatusIcon status={status} />
          
          <div className="flex-1">
            {/* Books Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div className="flex items-start gap-2">
                <PiBookOpenTextLight className="text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {type === 'sent' ? 'Requested' : 'Offered'}
                  </p>
                  <p className="font-semibold text-gray-900">{bookRequestedName}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <PiBookOpenTextLight className="text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {type === 'sent' ? 'Offered' : 'Requested'}
                  </p>
                  <p className="font-semibold text-gray-900">{bookOfferedName}</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2 mb-3">
              <PiUserLight className="text-gray-500" />
              <p className="text-sm text-gray-600">
                {type === 'sent' ? `With: ${requestee}` : `From: ${requester}`}
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                status === 'accepted' ? 'bg-green-100 text-green-800' :
                status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>

              {status === 'accepted' && (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Contact Info
                </button>
              )}
            </div>

            {renderActionButtons()}
          </div>
        </div>
      </div>

      {showModal && (
        <ContactModal
          onClose={() => setShowModal(false)}
          requesterEmail={requesterEmail}
          requesteeEmail={requesteeEmail}
        />
      )}
    </>
  );
};

export default SingleSwapCard;