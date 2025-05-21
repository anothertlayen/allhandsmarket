import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  content: string;
  read: boolean;
  relatedListing?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a sender'],
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a recipient'],
    },
    content: {
      type: String,
      required: [true, 'Please provide message content'],
      trim: true,
      maxlength: [2000, 'Message cannot be more than 2000 characters'],
    },
    read: {
      type: Boolean,
      default: false,
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

// Create compound index for conversation queries
MessageSchema.index({ sender: 1, recipient: 1, createdAt: -1 });

// Delete the Message model if it exists to prevent overwrite error in development
const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;