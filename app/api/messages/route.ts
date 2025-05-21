import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import Message from '@/app/(models)/Message';
import User from '@/app/(models)/User';
import { successResponse, errorResponse, validateRequestBody } from '@/app/(utils)/api';
import { getCurrentUser } from '@/app/(utils)/auth';

// Get all conversations for the current user
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }
    
    // Get all unique conversations
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: user._id },
            { recipient: user._id }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', user._id] },
              '$recipient',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 1,
          lastMessage: 1,
          'user.name': 1,
          'user.image': 1
        }
      }
    ]);
    
    return successResponse(conversations);
  } catch (error: any) {
    console.error('Get conversations error:', error);
    return errorResponse('Failed to get conversations: ' + error.message, 500);
  }
}

// Send a new message
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }
    
    const body = await req.json();
    
    // Validate required fields
    const validationError = validateRequestBody(body, ['recipient', 'content']);
    if (validationError) {
      return errorResponse(validationError);
    }
    
    // Check if recipient exists
    const recipient = await User.findById(body.recipient);
    if (!recipient) {
      return errorResponse('Recipient not found', 404);
    }
    
    // Create new message
    const message = new Message({
      sender: user._id,
      recipient: body.recipient,
      content: body.content,
      relatedListing: body.relatedListing || null
    });
    
    await message.save();
    
    return successResponse(message, 201);
  } catch (error: any) {
    console.error('Send message error:', error);
    return errorResponse('Failed to send message: ' + error.message, 500);
  }
}