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

  const fetchSwaps = () => {
    setLoading(true);
    axios
      .get('http://localhost:5555/swapRequest')
      .then((response) => {
        const allSwaps = response.data.data;
        setSwapsSent(allSwaps.filter((swap) => swap.requester === userData.username));
        setSwapsReceived(allSwaps.filter((swap) => swap.requestee === userData.username));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSwaps();
  }, [userData.username]);

  const onAccept = (swapId) => {
    setLoading(true);
    axios
      .put(`http://localhost:5555/swapRequest/accept/${swapId}`)
      .then(() => {
        fetchSwaps(); // Refetch the data to update UI
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const onReject = (swapId) => {
    setLoading(true);
    axios
      .put(`http://localhost:5555/swapRequest/reject/${swapId}`)
      .then(() => {
        fetchSwaps(); // Refetch the data to update UI
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  if (loading) return <div><Spinner /></div>;

  return (
    <div className="p-6 bg-[#EAEAEA] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SwapsCard swaps={swapsSent} type="sent" />
        <SwapsCard swaps={swapsReceived} type="received" onAccept={onAccept} onReject={onReject} />
      </div>
    </div>
  );
};

export default SwapPage;
