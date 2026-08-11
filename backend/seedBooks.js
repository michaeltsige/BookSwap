import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sampleBooks = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    publishYear: 2017,
    ownerUsername: "michaeltsige",
    condition: "Like New",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg"
  },
  {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    publishYear: 2008,
    ownerUsername: "elias",
    condition: "Very Good",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    publishYear: 1965,
    ownerUsername: "sara",
    condition: "Good",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg"
  },
  {
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    author: "David Thomas, Andrew Hunt",
    publishYear: 2019,
    ownerUsername: "michaeltsige",
    condition: "Like New",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg"
  },
  {
    title: "Refactoring: Improving the Design of Existing Code",
    author: "Martin Fowler",
    publishYear: 2018,
    ownerUsername: "abebe",
    condition: "Very Good",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780134757599-L.jpg"
  },
  {
    title: "1984",
    author: "George Orwell",
    publishYear: 1949,
    ownerUsername: "sara",
    condition: "Good",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg"
  },
  {
    title: "Introduction to Algorithms (3rd Edition)",
    author: "Thomas H. Cormen, Charles E. Leiserson",
    publishYear: 2009,
    ownerUsername: "michaeltsige",
    condition: "Very Good",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg"
  },
  {
    title: "System Design Interview – An Insider's Guide",
    author: "Alex Xu",
    publishYear: 2020,
    ownerUsername: "elias",
    condition: "Like New",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9798664653403-L.jpg"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    publishYear: 1988,
    ownerUsername: "abebe",
    condition: "Good",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg"
  },
  {
    title: "Structure and Interpretation of Computer Programs (SICP)",
    author: "Harold Abelson, Gerald Jay Sussman",
    publishYear: 1996,
    ownerUsername: "sara",
    condition: "Very Good",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780262510875-L.jpg"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishYear: 1925,
    ownerUsername: "elias",
    condition: "Good",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishYear: 1960,
    ownerUsername: "abebe",
    condition: "Acceptable",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780060935467-L.jpg"
  }
];

const seedBooks = async () => {
  const uri = process.env.mongoDBURL || process.env.MONGODB_URI;
  if (!uri) {
    console.error("ERROR: No mongoDBURL found in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas for seeding books...");

    const deleteResult = await Book.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} old books.`);

    const inserted = await Book.insertMany(sampleBooks);
    console.log(`Successfully seeded ${inserted.length} classic books with verified ISBN high-res cover photography!`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedBooks();
}

export default seedBooks;
