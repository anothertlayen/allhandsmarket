import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import User from '@/app/(models)/User';
import { successResponse, errorResponse, validateRequestBody } from '@/app/(utils)/api';
import { getCurrentUser } from '@/app/(utils)/auth';

// Get current user profile
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }
    
    // Get user with populated listings
    const userWithListings = await User.findById(user._id)
      .select('-password')
      .populate('listings');
    
    return successResponse(userWithListings);
  } catch (error: any) {
    console.error('Get profile error:', error);
    return errorResponse('Failed to get profile: ' + error.message, 500);
  }
}

// Update current user profile
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }
    
    const body = await req.json();
    
    // Check if email is being updated and if it's already in use
    if (body.email && body.email !== user.email) {
      const existingUser = await User.findOne({ email: body.email });
      if (existingUser) {
        return errorResponse('Email already in use');
      }
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          name: body.name || user.name,
          email: body.email || user.email,
          image: body.image || user.image,
          bio: body.bio || user.bio,
          location: body.location || user.location,
          updatedAt: new Date()
        }
      },
      { new: true }
    ).select('-password');
    
    return successResponse(updatedUser);
  } catch (error: any) {
    console.error('Update profile error:', error);
    return errorResponse('Failed to update profile: ' + error.message, 500);
  }
}