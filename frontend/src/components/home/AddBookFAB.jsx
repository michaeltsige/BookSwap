import { Link } from 'react-router-dom';
import { LuBookPlus } from 'react-icons/lu';

const AddBookFAB = ({ showType, userBooks, books, userData }) => {
  if (showType === 'swaps') return null;

  const getTooltipText = () => {
    return !userData?.username ? 'Login to Add Book' : showType === 'myBooks' ? 'Add to Collection' : 'Add Book to Community';
  };

  const showPulse = (showType === 'myBooks' && userBooks.length === 0) || 
                   (showType === 'allBooks' && books.length === 0);

  return (
    <Link 
      to={userData?.username ? "/books/create" : "/login"} 
      className="fixed bottom-8 right-8 z-30 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
      title={getTooltipText()}
    >
      <LuBookPlus className="text-2xl" />
      
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        {getTooltipText()}
        <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
      </span>
      
      {/* Pulse animation for empty  */}
      {showPulse && (
        <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-20"></div>
      )}
    </Link>
  );
};

export default AddBookFAB;