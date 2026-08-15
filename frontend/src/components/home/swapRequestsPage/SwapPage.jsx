import React from 'react';
import SwapsCard from './SwapsCard';
import { RiExchangeLine } from 'react-icons/ri';
import Spinner from '../../Spinner';

const SwapPage = ({ swapsSent, swapsReceived, onAccept, onReject, loading = false }) => {
  const totalPending = 
    swapsSent.filter(swap => swap.status === 'pending').length +
    swapsReceived.filter(swap => swap.status === 'pending').length;

  const totalAccepted = 
    swapsSent.filter(swap => swap.status === 'accepted').length +
    swapsReceived.filter(swap => swap.status === 'accepted').length;

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <Spinner />
        <div className="text-center">
          <p className="text-[#164E63] font-bold uppercase tracking-wider text-xs">Loading swap requests...</p>
          <p className="text-slate-400 text-xs mt-1">This may take a moment</p>
        </div>
      </div>
    );
  }

  // Empty state - Emoji-free, clean line vector icons!
  if (swapsSent.length === 0 && swapsReceived.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-[#E8EDE5] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#9A3412]/5 flex items-center justify-center mb-4 border border-[#9A3412]/15">
          <RiExchangeLine className="text-[#9A3412] text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 font-serif mb-2">No Swap Activity Yet</h3>
        <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto font-light leading-relaxed">
          Start swapping books with other readers! Browse available books in the market and send your first swap request.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 select-none">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-[#E8EDE5] shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 bg-[#164E63] rounded-xl flex items-center justify-center flex-shrink-0">
            <RiExchangeLine className="text-white text-lg" />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-slate-800 leading-tight">
              {swapsSent.length + swapsReceived.length}
            </h3>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Requests</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8EDE5] shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 bg-[#9A3412] rounded-xl flex items-center justify-center flex-shrink-0">
            <RiExchangeLine className="text-white text-lg" />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-slate-800 leading-tight">{totalPending}</h3>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pending Action</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8EDE5] shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 bg-[#115E59] rounded-xl flex items-center justify-center flex-shrink-0">
            <RiExchangeLine className="text-white text-lg" />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-slate-800 leading-tight">{totalAccepted}</h3>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Accepted Swaps</p>
          </div>
        </div>
      </div>

      {/* Swap Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <SwapsCard 
            swaps={swapsSent} 
            type="sent" 
            title="Sent Requests"
            description="Swap requests you have sent to other readers"
          />
        </div>
        <div>
          <SwapsCard 
            swaps={swapsReceived} 
            type="received" 
            onAccept={onAccept}
            onReject={onReject}
            title="Received Requests"
            description="Requests other readers have sent to you"
          />
        </div>
      </div>
    </div>
  );
};

export default SwapPage;
