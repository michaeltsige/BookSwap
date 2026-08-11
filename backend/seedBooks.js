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
    coverUrl: "https://covers.openlibrary.org/b/id/10291771-L.jpg"
  },
  {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    publishYear: 2008,
    ownerUsername: "elias",
    condition: "Very Good",
    coverUrl: "https://covers.openlibrary.org/b/id/8316261-L.jpg"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    publishYear: 1965,
    ownerUsername: "sara",
    condition: "Good",
    coverUrl: "https://covers.openlibrary.org/b/id/13141251-L.jpg"
  },
  {
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    author: "David Thomas, Andrew Hunt",
    publishYear: 2019,
    ownerUsername: "michaeltsige",
    condition: "Like New",
    coverUrl: "https://covers.openlibrary.org/b/id/10134440-L.jpg"
  },
  {
    title: "Fikr Eske Mekabir (Love Unto Crypt)",
    author: "Haddis Alemayehu",
    publishYear: 1968,
    ownerUsername: "abebe",
    condition: "Very Good",
    coverUrl: "https://covers.openlibrary.org/b/id/12839441-L.jpg"
  },
  {
    title: "1984",
    author: "George Orwell",
    publishYear: 1949,
    ownerUsername: "sara",
    condition: "Good",
    coverUrl: "https://covers.openlibrary.org/b/id/12652159-L.jpg"
  },
  {
    title: "Introduction to Algorithms (3rd Edition)",
    author: "Thomas H. Cormen, Charles E. Leiserson",
    publishYear: 2009,
    ownerUsername: "michaeltsige",
    condition: "Very Good",
    coverUrl: "https://covers.openlibrary.org/b/id/12547141-L.jpg"
  },
  {
    title: "System Design Interview – An Insider's Guide",
    author: "Alex Xu",
    publishYear: 2020,
    ownerUsername: "elias",
    condition: "Like New",
    coverUrl: "https://covers.openlibrary.org/b/id/10415307-L.jpg"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    publishYear: 1988,
    ownerUsername: "abebe",
    condition: "Good",
    coverUrl: "https://covers.openlibrary.org/b/id/12845872-L.jpg"
  },
  {
    title: "Structure and Interpretation of Computer Programs (SICP)",
    author: "Harold Abelson, Gerald Jay Sussman",
    publishYear: 1996,
    ownerUsername: "sara",
    condition: "Very Good",
    coverUrl: "https://covers.openlibrary.org/b/id/6423985-L.jpg"
  },
  {
    title: "Oromay",
    author: "Bealu Girma",
    publishYear: 1983,
    ownerUsername: "elias",
    condition: "Good",
    coverUrl: "https://covers.openlibrary.org/b/id/12738914-L.jpg"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishYear: 1960,
    ownerUsername: "abebe",
    condition: "Acceptable",
    coverUrl: "https://covers.openlibrary.org/b/id/8225266-L.jpg"
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
    console.log(`Successfully seeded ${inserted.length} classic books with high-res cover photography!`);

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
