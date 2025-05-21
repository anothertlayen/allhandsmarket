import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IChatSession extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  messages: IChatMessage[];
  relatedListing?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    role: {
      type: String,
      enum: ['system', 'user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const ChatSessionSchema = new Schema<IChatSession>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    messages: {
      type: [ChatMessageSchema],
      default: [],
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

// Create index for user to find their chat sessions
ChatSessionSchema.index({ user: 1, updatedAt: -1 });

// Delete the ChatSession model if it exists to prevent overwrite error in development
const ChatSession: Model<IChatSession> = mongoose.models.ChatSession || mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);

export default ChatSession;