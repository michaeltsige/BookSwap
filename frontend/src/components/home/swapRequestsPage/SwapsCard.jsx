import React from 'react';
import SingleSwapCard from './SingleSwapCard';
import { RiSendPlaneLine, RiInboxLine } from 'react-icons/ri';

const SwapsCard = ({ swaps, type, onAccept, onReject, title, description }) => {
  const acceptedSwaps = swaps.filter(swap => swap.status === 'accepted');
  const rejectedSwaps = swaps.filter(swap => swap.status === 'rejected');
  const pendingSwaps = swaps.filter(swap => swap.status === 'pending');

  const getIcon = () => {
    return type === 'sent' ? 
      <RiSendPlaneLine className="text-white text-lg" /> : 
      <RiInboxLine className="text-white text-lg" />;
  };

  const getHeaderBg = () => {
    return type === 'sent' ? 'bg-[#9A3412]' : 'bg-[#164E63]';
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8EDE5] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 select-none">
      {/* Header - Solid Premium Accents, No Generic Gradients! */}
      <div className={`${getHeaderBg()} p-5 text-white`}>
        <div className="flex items-center gap-3 mb-1.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            {getIcon()}
          </div>
          <h2 className="text-lg font-bold font-serif tracking-tight">{title}</h2>
        </div>
        <p className="text-white/85 text-xs font-light">{description}</p>
        <div className="flex gap-2.5 mt-4 text-[10px] uppercase tracking-wider font-extrabold">
          <span className="bg-white/15 px-2.5 py-1 rounded-lg">
            {swaps.length} total
          </span>
          {pendingSwaps.length > 0 && (
            <span className="bg-amber-500/30 text-amber-200 px-2.5 py-1 rounded-lg">
              {pendingSwaps.length} pending
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 max-h-[500px] overflow-y-auto space-y-5 bg-slate-50/20">
        {/* Pending Swaps - Always show Pending at the very top of lists! */}
        {pendingSwaps.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 bg-[#D97706] rounded-full animate-ping"></div>
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500">
                Pending Action ({pendingSwaps.length})
              </h3>
            </div>
            <div className="space-y-4">
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

        {/* Accepted Swaps */}
        {acceptedSwaps.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 bg-[#115E59] rounded-full"></div>
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500">
                Accepted ({acceptedSwaps.length})
              </h3>
            </div>
            <div className="space-y-4">
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

        {/* Rejected Swaps */}
        {rejectedSwaps.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 bg-[#9A3412] rounded-full"></div>
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500">
                Declined ({rejectedSwaps.length})
              </h3>
            </div>
            <div className="space-y-4">
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
          <div className="text-center py-10 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
              {type === 'sent' ? (
                <RiSendPlaneLine className="text-slate-300 text-xl" />
              ) : (
                <RiInboxLine className="text-slate-300 text-xl" />
              )}
            </div>
            <p className="text-slate-400 text-sm font-medium">
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
