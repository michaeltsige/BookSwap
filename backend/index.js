import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import authRoute from './routes/authRoute.js';
import swapRoute from './routes/swapRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

dotenv.config();

const PORT = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URL;

//routes
app.use('/books', booksRoute);
app.use('/auth',authRoute);
app.use('/swapRequest',swapRoute);

//databse connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
