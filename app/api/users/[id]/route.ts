import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import User from '@/app/(models)/User';
import Listing from '@/app/(models)/Listing';
import { successResponse, errorResponse } from '@/app/(utils)/api';

// Get a user profile by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    // Find user
    const user = await User.findById(params.id)
      .select('-password -email');
    
    if (!user) {
      return errorResponse('User not found', 404);
    }
    
    // Get user's active listings
    const listings = await Listing.find({
      owner: params.id,
      isAvailable: true
    }).sort({ createdAt: -1 });
    
    return successResponse({
      user,
      listings
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    return errorResponse('Failed to get user: ' + error.message, 500);
  }
}