import React from 'react';
import SwapsCard from './SwapsCard';

const SwapPage = ({ swapsSent, swapsReceived, onAccept, onReject }) => {
  return (
    <div className="p-6 min-h-screen">
      <div className="flex gap-6">
        <div className="flex-1">
          <SwapsCard swaps={swapsSent} type="sent" />
        </div>
        <div className="flex-1">
          <SwapsCard swaps={swapsReceived} type="received" onAccept={onAccept} onReject={onReject} />
        </div>
      </div>
    </div>
  );
};

export default SwapPage;
