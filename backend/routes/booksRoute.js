import express, { response } from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.ownerUsername
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear, ownerUsername',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
      ownerUsername: request.body.ownerUsername,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    // console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    //console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    //console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    //console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    //console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for getting all books of a single user, (books to be given in the trade)

router.get('/user/:username', async (request, response)=>{
  try {

    const { username } = request.params;
    const userBooks = await Book.find({ownerUsername: username});
    return response.status(200).json({
      count: userBooks.length,
      data: userBooks,
    });

  } catch(error) {
    //console.log(error);
    response.status(500).send({ message: error.message });
  }
});


//getting books that are not the user's (books to be taken in the trade)
router.get('/nuser/:username', async(request, response)=>{
  try {

    const { username } = request.params;
    const notUserBooks = await Book.find({ ownerUsername: { $ne: username } });

    return response.status(200).json({
      count: notUserBooks.length,
      data: notUserBooks,
    });

  } catch(error) {
    //may throw error on frontend request if there are no books
    return response.status(404).json({message: 'nobooks'});
  }
});

export default router;
