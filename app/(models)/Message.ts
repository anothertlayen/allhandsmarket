import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
  listing?: mongoose.Types.ObjectId;
  createdAt: Date;
  isRead: boolean;
}

const MessageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  listing: { type: Schema.Types.ObjectId, ref: 'Listing' },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);