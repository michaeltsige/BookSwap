
import UserBookSingleCard from './UserBookSingleCard';

const UserBooksCard = ({ books }) => {
  
  return (
    
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((item) => (
        <UserBookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default UserBooksCard;
