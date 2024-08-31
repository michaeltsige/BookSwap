import React from 'react';
import SwapsCard from './SwapsCard';

const SwapPage = ({ swapsSent, swapsReceived, onAccept, onReject }) => {
  return (
    <div className="p-6 min-h-screen">
      {/* Add responsive flex direction */}
      <div className="flex flex-col lg:flex-row gap-6">
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
