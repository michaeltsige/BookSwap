import React from 'react'
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const StatusIcon = ({ status }) => {
  return (
    <div>
        {
            status === 'accepted'? 
                <FaCheckCircle className="text-[#115E59] text-2xl mr-4 animate-pulse" />
            : 
                status === 'pending'? 
                    <FaClock className="text-[#D97706] text-2xl mr-4" />
                :
                    <FaTimesCircle className="text-[#9A3412] text-2xl mr-4" />
        }
    </div>
  )
}

export default StatusIcon
