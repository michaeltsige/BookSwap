import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const swapSchema = Schema({

    requester: {
        type: String,
        // ref: 'User',
        required: true
      },

      requestee: {
        type: String, 
        // ref: 'User',
        required: true
      },

      bookRequestedId: {
        type: Schema.Types.ObjectId, 
        // ref: 'Book',
        required: true
      },

      bookOfferedId: {
        type: Schema.Types.ObjectId, 
        // ref: 'Book',
        required: true
      },

      bookRequestedName: {
        type: String, 
        // ref: 'Book',
        required: true
      },

      bookOfferedName: {
        type: String, 
        // ref: 'Book',
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed'],
        default: 'pending'
      },

      createdAt: {
        type: Date,
        default: Date.now
      },

      updatedAt: {
        type: Date,
        default: Date.now
      }
});

export const Swap = mongoose.model("Swap", swapSchema);

