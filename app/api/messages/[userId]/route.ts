import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import Message from '@/app/(models)/Message';
import User from '@/app/(models)/User';
import { successResponse, errorResponse } from '@/app/(utils)/api';
import { getCurrentUser } from '@/app/(utils)/auth';

// Get conversation messages between current user and another user
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await dbConnect();
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }
    
    // Check if other user exists
    const otherUser = await User.findById(params.userId);
    if (!otherUser) {
      return errorResponse('User not found', 404);
    }
    
    // Get messages between users
    const messages = await Message.find({
      $or: [
        { sender: user._id, recipient: params.userId },
        { sender: params.userId, recipient: user._id }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('relatedListing', 'title images price');
    
    // Mark unread messages as read
    await Message.updateMany(
      { sender: params.userId, recipient: user._id, read: false },
      { $set: { read: true } }
    );
    
    return successResponse({
      messages,
      otherUser: {
        _id: otherUser._id,
        name: otherUser.name,
        image: otherUser.image
      }
    });
  } catch (error: any) {
    console.error('Get conversation error:', error);
    return errorResponse('Failed to get conversation: ' + error.message, 500);
  }
}