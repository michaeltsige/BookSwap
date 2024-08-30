import React from 'react';

const AddBookIcon = ({ className, ...props }) => {
  return (
    <svg
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink" // Corrected attribute name
      viewBox="0 0 32 32"
      xmlSpace="preserve" // Corrected attribute name
      className={className}
      {...props}
    >
      <style type="text/css">
        {`
          .st0 {
            fill: none;
            stroke: #000000;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-miterlimit: 10;
          }
        `}
      </style>
      <path
        className="st0"
        d="M26,3H9C7.3,3,6,4.3,6,6v0c0,1.7,1.3,3,3,3h17v8"
      />
      <path
        className="st0"
        d="M19,29H9c-1.7,0-3-1.3-3-3v0V6"
      />
      <line className="st0" x1="26" y1="6" x2="9" y2="6" />
      <line className="st0" x1="10" y1="9" x2="10" y2="29" />
      <circle className="st0" cx="24" cy="24" r="7" />
      <line className="st0" x1="24" y1="21" x2="24" y2="27" />
      <line className="st0" x1="21" y1="24" x2="27" y2="24" />
    </svg>
  );
};

export default AddBookIcon;
