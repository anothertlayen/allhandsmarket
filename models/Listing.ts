import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  category: string;
  condition?: string;
  images?: string[];
  location: string;
  tags?: string[];
  owner: mongoose.Types.ObjectId;
  status: 'available' | 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const ListingSchema = new Schema<IListing>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true,
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Electronics',
        'Furniture',
        'Clothing',
        'Books',
        'Sports',
        'Music',
        'Outdoors',
        'Home & Garden',
        'Art',
        'Services',
        'Other',
      ],
    },
    condition: {
      type: String,
      enum: ['new', 'like-new', 'good', 'fair', 'poor'],
    },
    images: {
      type: [String],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    tags: {
      type: [String],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide an owner'],
    },
    status: {
      type: String,
      enum: ['available', 'pending', 'completed'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

// Create text index for search functionality
ListingSchema.index(
  { title: 'text', description: 'text', tags: 'text' },
  { weights: { title: 3, tags: 2, description: 1 } }
);

// Delete the Listing model if it exists to prevent overwrite error in development
const Listing: Model<IListing> = mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);

export default Listing;