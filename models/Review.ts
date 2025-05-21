import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IReview extends Document {
  reviewer: mongoose.Types.ObjectId;
  reviewee: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  relatedListing?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a reviewer'],
    },
    reviewee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a reviewee'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, 'Comment cannot be more than 500 characters'],
    },
    relatedListing: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index to ensure a user can only review another user once per listing
ReviewSchema.index(
  { reviewer: 1, reviewee: 1, relatedListing: 1 },
  { unique: true }
);

// Delete the Review model if it exists to prevent overwrite error in development
const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;