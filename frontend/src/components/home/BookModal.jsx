import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-6 flex flex-col relative shadow-lg'
      >
        <AiOutlineClose
          className='absolute right-4 top-4 text-2xl text-gray-700 hover:text-gray-900 cursor-pointer transition-colors'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-2 bg-[#E2E8F0] text-[#2D3748] rounded-lg mb-4'>
          {book.publishYear}
        </h2>
        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center gap-x-2'>
            <PiBookOpenTextLight className='text-[#4A5568] text-2xl' />
            <h2 className='text-xl font-semibold text-[#2D3748]'>{book.title}</h2>
          </div>
          <div className='flex items-center gap-x-2'>
            <BiUserCircle className='text-[#4A5568] text-2xl' />
            <h2 className='text-xl text-gray-700'>{book.author}</h2>
          </div>
          <p className='mt-4 text-gray-700'>
            Anything you want to show
          </p>
          <p className='mt-2 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
            voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
            necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
            nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
            dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
            vitae voluptate sequi repellat!
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default BookModal;
