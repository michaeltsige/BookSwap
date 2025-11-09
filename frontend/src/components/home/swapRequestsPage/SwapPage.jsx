import React from 'react';
import SwapsCard from './SwapsCard';
import { RiExchangeLine } from 'react-icons/ri';

const SwapPage = ({ swapsSent, swapsReceived, onAccept, onReject }) => {
  const totalPending = 
    swapsSent.filter(swap => swap.status === 'pending').length +
    swapsReceived.filter(swap => swap.status === 'pending').length;

  const totalAccepted = 
    swapsSent.filter(swap => swap.status === 'accepted').length +
    swapsReceived.filter(swap => swap.status === 'accepted').length;

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-hover bg-white p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <RiExchangeLine className="text-white text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{swapsSent.length + swapsReceived.length}</h3>
          <p className="text-gray-600">Total Requests</p>
        </div>

        <div className="card-hover bg-white p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <RiExchangeLine className="text-white text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{totalPending}</h3>
          <p className="text-gray-600">Pending</p>
        </div>

        <div className="card-hover bg-white p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <RiExchangeLine className="text-white text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{totalAccepted}</h3>
          <p className="text-gray-600">Accepted</p>
        </div>
      </div>

      {/* Swap Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <SwapsCard 
            swaps={swapsSent} 
            type="sent" 
            title="Your Swap Requests"
            description="Requests you've sent to other users"
          />
        </div>
        <div>
          <SwapsCard 
            swaps={swapsReceived} 
            type="received" 
            onAccept={onAccept}
            onReject={onReject}
            title="Received Requests"
            description="Requests from other users"
          />
        </div>
      </div>

      {/* Empty State */}
      {(swapsSent.length === 0 && swapsReceived.length === 0) && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="text-6xl mb-4">🔄</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Swap Activity Yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start swapping books with other readers! Browse available books and send your first swap request.
          </p>
        </div>
      )}
    </div>
  );
};

export default SwapPage;