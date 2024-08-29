import React from 'react'
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const StatusIcon = ({ status }) => {
  return (
    <div>
        {
            status === 'accepted'? 
                <FaCheckCircle className="text-green-500 text-2xl mr-4" />
            : 
                status === 'pending'? 
                    <FaClock className="text-yellow-500 text-2xl mr-4" />
                :
                    <FaTimesCircle className="text-red-500 text-2xl mr-4" />
        }
    </div>
  )
}

export default StatusIcon

