// SwapPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import SwapsCard from './SwapsCard';
import { UserContext } from '../../../context/UserContext';
import Spinner from '../../Spinner';

const SwapPage = () => {
  const { userData } = useContext(UserContext);
  const [swapsSent, setSwapsSent] = useState([]);
  const [swapsReceived, setSwapsReceived] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        axios
            .get('http://localhost:5555/swapRequest')
            .then((response)=>{
                const allSwaps = response.data.data;
                // Filter swaps based on the logged-in user
                
                setSwapsSent(allSwaps.filter(swap => swap.requester === userData.username));
                setSwapsReceived(allSwaps.filter(swap => swap.requestee === userData.username));
                console.log(allSwaps);
                
                setLoading(false);
            })
            .catch((error)=>{
                setLoading(false);
                console.log(error);
            });
    
  }, [userData.username]);

  const onAccept = (swapId) => {
    
    // Handle accept logic, send a request to update the swap status to "accepted"
    axios
            .put(`http://localhost:5555/swapRequest/accept/${swapId}`)
            .then((response)=>{
                
                setLoading(false);
            })
            .catch((error)=>{
                setLoading(false);
                console.log(error);
            });
  };

  const onReject = (swapId) => {
    // Handle reject logic, send a request to update the swap status to "rejected"
    console.log(`Rejecting swap with ID: ${swapId}`);
  }

  if (loading) return <div> <Spinner /> </div>;

  return (
    <div className="p-6 bg-[#EAEAEA] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SwapsCard swaps={swapsSent} type="sent" />
        <SwapsCard swaps={swapsReceived} type="received" onAccept={onAccept} onReject={onReject}  />
      </div>
    </div>
  );
};

export default SwapPage;
