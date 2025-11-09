import React from 'react';
import SingleSwapCard from './SingleSwapCard';
import { RiSendPlaneLine, RiInboxLine } from 'react-icons/ri';

const SwapsCard = ({ swaps, type, onAccept, onReject, title, description }) => {
  const acceptedSwaps = swaps.filter(swap => swap.status === 'accepted');
  const rejectedSwaps = swaps.filter(swap => swap.status === 'rejected');
  const pendingSwaps = swaps.filter(swap => swap.status === 'pending');

  const getIcon = () => {
    return type === 'sent' ? 
      <RiSendPlaneLine className="text-blue-600 text-xl" /> : 
      <RiInboxLine className="text-green-600 text-xl" />;
  };

  const getHeaderColor = () => {
    return type === 'sent' ? 'from-blue-500 to-indigo-600' : 'from-green-500 to-emerald-600';
  };

  return (
    <div className="card-hover bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getHeaderColor()} p-6 text-white`}>
        <div className="flex items-center gap-3 mb-2">
          {getIcon()}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="text-blue-100 text-sm opacity-90">{description}</p>
        <div className="flex gap-4 mt-3 text-sm">
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full">
            {swaps.length} total
          </span>
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full">
            {pendingSwaps.length} pending
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        {/* Accepted Swaps */}
        {acceptedSwaps.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-900">Accepted ({acceptedSwaps.length})</h3>
            </div>
            <div className="space-y-3">
              {acceptedSwaps.map(swap => 
                <SingleSwapCard 
                  key={swap._id} 
                  swap={swap} 
                  type={type} 
                />
              )}
            </div>
          </div>
        )}

        {/* Pending Swaps */}
        {pendingSwaps.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-900">Pending ({pendingSwaps.length})</h3>
            </div>
            <div className="space-y-3">
              {pendingSwaps.map(swap => 
                <SingleSwapCard 
                  key={swap._id} 
                  swap={swap} 
                  type={type} 
                  onAccept={() => onAccept && onAccept(swap._id)}
                  onReject={() => onReject && onReject(swap._id)}
                />
              )}
            </div>
          </div>
        )}

        {/* Rejected Swaps */}
        {rejectedSwaps.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-900">Rejected ({rejectedSwaps.length})</h3>
            </div>
            <div className="space-y-3">
              {rejectedSwaps.map(swap => 
                <SingleSwapCard 
                  key={swap._id} 
                  swap={swap} 
                  type={type} 
                />
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {swaps.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3 opacity-50">
              {type === 'sent' ? '📤' : '📥'}
            </div>
            <p className="text-gray-500">
              {type === 'sent' 
                ? "You haven't sent any swap requests yet" 
                : "No swap requests received yet"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapsCard;