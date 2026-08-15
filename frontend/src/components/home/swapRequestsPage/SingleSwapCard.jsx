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
        <div className="flex gap-3 mt-4">
          <button
            onClick={onAccept}
            className="flex-1 bg-[#115E59] hover:bg-[#0f4e49] text-white px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all shadow-sm hover:shadow active:scale-95"
          >
            Accept Request
          </button>
          <button
            onClick={onReject}
            className="flex-1 bg-[#9A3412] hover:bg-[#7c2a0f] text-white px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all shadow-sm hover:shadow active:scale-95"
          >
            Decline
          </button>
        </div>
      );
    }
    return null;
  };

  const getStatusColor = () => {
    switch (status) {
      case 'accepted': return 'border-l-[#115E59]';
      case 'rejected': return 'border-l-[#9A3412]';
      case 'pending': return 'border-l-[#D97706]';
      default: return 'border-l-gray-400';
    }
  };

  return (
    <>
      <div className={`bg-white border-l-4 ${getStatusColor()} rounded-r-2xl p-5 border border-[#E8EDE5] hover:border-slate-300 transition-all duration-200 select-none`}>
        <div className="flex items-start gap-1">
          <StatusIcon status={status} />
          
          <div className="flex-1">
            {/* Books Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3.5">
              <div className="flex items-start gap-2.5">
                <PiBookOpenTextLight className="text-[#9A3412] text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                    {type === 'sent' ? 'Requested Book' : 'Your Book (Offered)'}
                  </p>
                  <p className="text-sm font-bold text-slate-800 leading-tight mt-0.5">{bookRequestedName}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <PiBookOpenTextLight className="text-[#D97706] text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                    {type === 'sent' ? 'Your Book (Offered)' : 'Their Book (Requested)'}
                  </p>
                  <p className="text-sm font-bold text-slate-800 leading-tight mt-0.5">{bookOfferedName}</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2 mb-3.5 bg-slate-50/50 py-1.5 px-3 rounded-lg inline-flex border border-slate-100">
              <PiUserLight className="text-slate-400 text-sm" />
              <p className="text-xs font-semibold text-slate-600">
                {type === 'sent' ? `With: ${requestee}` : `From: ${requester}`}
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex items-center justify-between mt-1">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-extrabold ${
                status === 'accepted' ? 'bg-[#115E59]/10 text-[#115E59]' :
                status === 'rejected' ? 'bg-[#9A3412]/10 text-[#9A3412]' :
                'bg-[#D97706]/10 text-[#D97706]'
              }`}>
                {status}
              </span>

              {status === 'accepted' && (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-xs text-[#164E63] hover:text-[#115E59] hover:underline font-bold uppercase tracking-wider"
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
