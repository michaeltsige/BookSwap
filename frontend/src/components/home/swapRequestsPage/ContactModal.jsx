import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { BsExclamationCircle } from "react-icons/bs";

const ContactModal = ({ onClose, requesterEmail, requesteeEmail }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        <RiCloseLine
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-xl font-bold mb-2">Contact Information</h2>
        <h6 className="text-xs mb-2 flex items-center gap-1" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
          <BsExclamationCircle className="text-yellow-700" />
          Contact each other for swapping books
        </h6>
        <p className="mb-2" ><strong>Requester Email:</strong> {requesterEmail}</p>
        <p><strong>Requestee Email:</strong> {requesteeEmail}</p>
      </div>
    </div>
  );
};

export default ContactModal;
