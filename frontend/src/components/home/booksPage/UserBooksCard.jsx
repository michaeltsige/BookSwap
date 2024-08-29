
import UserBookSingleCard from './UserBookSingleCard';

const UserBooksCard = ({ books, user }) => {
  
  const filteredBooks = books.filter((book)=>book.ownerUsername === user.username);
  
  return (
    
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {filteredBooks.map((item) => (
        <UserBookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default UserBooksCard;
