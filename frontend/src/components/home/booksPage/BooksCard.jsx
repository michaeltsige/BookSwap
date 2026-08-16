import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books, userBooks }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto'>
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} userBooks={userBooks} />
      ))}
    </div>
  );
};

export default BooksCard;
