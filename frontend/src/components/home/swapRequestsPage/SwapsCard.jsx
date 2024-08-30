import React from 'react';
import SingleSwapCard from './SingleSwapCard';

const SwapsCard = ({ swaps, type, onAccept, onReject }) => {
  const acceptedSwaps = swaps.filter(swap => swap.status === 'accepted');
  const rejectedSwaps = swaps.filter(swap => swap.status === 'rejected');
  const pendingSwaps = swaps.filter(swap => swap.status === 'pending');

  return (
    <div className="border border-gray-300 p-6 bg-[#F8F8F9] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 " style={{ fontFamily: "'Raleway', sans-serif" }}>
        {type === 'sent' ? 'Sent Requests' : 'Received Requests'}
      </h2>

      <h3 className="text-xl font-semibold mt-4 py-1" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Accepted</h3>
      <div className='mt-2'>
        {acceptedSwaps.length > 0 ? (
          acceptedSwaps.map(swap => 
          <SingleSwapCard 
            key={swap._id} 
            swap={swap} 
            type={type} 
          />)
        ) : (
          <p className="text-gray-500" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>No accepted swaps.</p>
        )}
      </div>

      <h3 className="text-xl font-semibold mt-4" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Rejected</h3>
      <div className='mt-2'>
        {rejectedSwaps.length > 0 ? (
          rejectedSwaps.map(swap => 
          <SingleSwapCard 
            key={swap._id} 
            swap={swap} 
            type={type} 
          />)
        ) : (
          <p className="text-gray-500" style={{ fontFamily: "'Source Sans Pro', sans-serif" }} >No rejected swaps.</p>
        )}
      </div>

      <h3 className="text-xl font-semibold mt-4 py-1" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Pending</h3>
      <div className='mt-2'>
        {pendingSwaps.length > 0 ? (
          pendingSwaps.map(swap => 
          <SingleSwapCard 
            key={swap._id} 
            swap={swap} 
            type={type} 
            onAccept={()=> onAccept(swap._id)}
            onReject={()=> onReject(swap._id)} 
          />)
        ) : (
          <p className="text-gray-500" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>No pending swaps.</p>
        )}
      </div>
    </div>
  );
};

export default SwapsCard;
