import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/', label = 'Return' }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (destination === 'goBack') {
      e.preventDefault();
      navigate(-1);
    }
  };

  return (
    <Link
      to={destination === 'goBack' ? '#' : destination}
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E3EAE3] bg-white rounded-lg text-xs font-mono font-bold uppercase text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:-translate-x-0.5 transition-all shadow-sm active:scale-95 select-none"
    >
      <BsArrowLeft className="text-sm shrink-0" />
      <span>{label}</span>
    </Link>
  );
};

export default BackButton;
