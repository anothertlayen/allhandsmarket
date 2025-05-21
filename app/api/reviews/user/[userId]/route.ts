import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import Review from '@/app/(models)/Review';
import User from '@/app/(models)/User';
import { successResponse, errorResponse } from '@/app/(utils)/api';

// Get reviews for a specific user
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await dbConnect();
    
    // Check if user exists
    const user = await User.findById(params.userId);
    if (!user) {
      return errorResponse('User not found', 404);
    }
    
    // Get reviews for user
    const reviews = await Review.find({ reviewee: params.userId })
      .sort({ createdAt: -1 })
      .populate('reviewer', 'name image')
      .populate('relatedListing', 'title images');
    
    // Get summary stats
    const stats = {
      averageRating: user.rating || 0,
      totalReviews: reviews.length,
      ratingDistribution: {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length
      }
    };
    
    return successResponse({
      reviews,
      stats
    });
  } catch (error: any) {
    console.error('Get reviews error:', error);
    return errorResponse('Failed to get reviews: ' + error.message, 500);
  }
}