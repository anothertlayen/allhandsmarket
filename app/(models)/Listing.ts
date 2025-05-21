import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  images: string[];
  owner: mongoose.Types.ObjectId;
  location?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

const ListingSchema = new Schema<IListing>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  condition: { 
    type: String, 
    required: true,
    enum: ['new', 'like-new', 'good', 'fair', 'poor']
  },
  images: [{ type: String }],
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: [{ type: String }]
});

// Update the updatedAt field before saving
ListingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);