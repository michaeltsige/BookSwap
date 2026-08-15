import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const BackButton = ({ destination = '/', label = 'Back', variant = 'primary' }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (destination === 'goBack') {
      e.preventDefault();
      navigate(-1);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#9A3412] text-white hover:from-indigo-700 hover:to-purple-700 shadow-sm hover:shadow-sm';
      case 'secondary':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-[#E8EDE5]';
      case 'outline':
        return 'bg-white text-gray-700 border border-[#E8EDE5] hover:bg-gray-50 shadow-sm';
      case 'ghost':
        return 'bg-transparent text-gray-600 hover:bg-gray-100 border border-transparent';
      default:
        return 'bg-[#9A3412] text-white hover:from-indigo-700 hover:to-purple-700';
    }
  };

  return (
    <Link
      to={destination === 'goBack' ? '#' : destination}
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium
        transition-all duration-200 transform hover:-translate-x-0.5
        focus:outline-none focus:ring-2 focus:ring-[#9A3412] focus:ring-offset-2
        ${getVariantStyles()}
      `}
    >
      {variant === 'primary' ? (
        <BsArrowLeft className="text-lg" />
      ) : (
        <HiOutlineArrowLeft className="text-lg" />
      )}
      <span>{label}</span>
    </Link>
  );
};

export default BackButton;