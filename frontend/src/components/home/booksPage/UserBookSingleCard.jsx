import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const UserBookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='relative border border-gray-300 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out m-4'>
      
      {/* Publish Year */}
      <div className='absolute top-2 right-2 px-3 py-1 bg-[#F9FAFB] text-[#1A202C] rounded-lg shadow-sm text-sm whitespace-nowrap'
           style={{ fontFamily: "'Lato', sans-serif", zIndex: 10 }}
      >
        {book.publishYear}
      </div>
  
      <div className='p-4'>
        {/* Book Title */}
        <div className='flex items-center mb-2'>
          <div className='flex items-center gap-x-2 flex-grow max-w-[calc(100%-40px)]' style={{ fontFamily: "'Roboto Slab', sans-serif" }}>
            <PiBookOpenTextLight className='text-[#1A202C] text-2xl flex-shrink-0' />
            <h3 className='text-xl font-semibold text-[#1A202C] overflow-hidden whitespace-nowrap text-ellipsis' >
              {book.title}
            </h3>
          </div>
        </div>
        
        {/* Book Author */}
        <div className='flex items-center gap-x-2 mb-4' style={{ fontFamily: "'Roboto', sans-serif" }}>
          <BiUserCircle className='text-[#1A202C] text-2xl' />
          <h4 className='text-lg text-gray-700'>{book.author}</h4>
        </div>
  
        {/* Action Icons */}
        <div className='flex justify-between items-center gap-x-2 mt-4'>
          <BiShow
            className='text-3xl text-blue-600 hover:text-blue-800 cursor-pointer'
            onClick={() => setShowModal(true)}
          />
          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className='text-2xl text-green-600 hover:text-green-800' />
          </Link>
          <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
          </Link>
          <Link to={`/books/delete/${book._id}`}>
            <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
          </Link>
        </div>
      </div>
  
      {/* Book Modal */}
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
  
};

export default UserBookSingleCard;
