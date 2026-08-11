import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    ownerUsername:{
      type: String,
    },
    coverUrl: {
      type: String,
      default: '',
    },
    condition: {
      type: String,
      default: 'Good',
    },
    conditionPhoto: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);
