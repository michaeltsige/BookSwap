
import UserBookSingleCard from './UserBookSingleCard';

const UserBooksCard = ({ books }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mx-auto'>
      {books.map((item) => (
        <UserBookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default UserBooksCard;
