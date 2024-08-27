
import BookSingleCard from './BookSingleCard';

const UserBooksCard = ({ books, user }) => {
  
  const filteredBooks = books.filter((book)=>book.ownerUsername === user.username);

  console.log(user);
  console.log(books);
  console.log(filteredBooks);
  
  return (
    
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {filteredBooks.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default UserBooksCard;
