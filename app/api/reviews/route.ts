import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import Review from '@/app/(models)/Review';
import User from '@/app/(models)/User';
import { successResponse, errorResponse, validateRequestBody } from '@/app/(utils)/api';
import { getCurrentUser } from '@/app/(utils)/auth';

// Create a new review
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
    const validationError = validateRequestBody(body, ['userId', 'rating', 'comment']);
    if (validationError) {
      return errorResponse(validationError);
    }
    
    // Validate rating
    if (body.rating < 1 || body.rating > 5) {
      return errorResponse('Rating must be between 1 and 5');
    }
    
    // Check if user exists
    const targetUser = await User.findById(body.userId);
    if (!targetUser) {
      return errorResponse('User not found', 404);
    }
    
    // Check if user is trying to review themselves
    if (user._id.toString() === body.userId) {
      return errorResponse('You cannot review yourself');
    }
    
    // Check if user has already reviewed this user
    const existingReview = await Review.findOne({
      reviewer: user._id,
      reviewee: body.userId
    });
    
    if (existingReview) {
      return errorResponse('You have already reviewed this user');
    }
    
    // Create new review
    const review = new Review({
      reviewer: user._id,
      reviewee: body.userId,
      rating: body.rating,
      comment: body.comment,
      relatedListing: body.relatedListing || null
    });
    
    await review.save();
    
    // Update user's average rating
    const allReviews = await Review.find({ reviewee: body.userId });
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / allReviews.length;
    
    await User.findByIdAndUpdate(body.userId, {
      $set: { 
        rating: averageRating,
        reviewCount: allReviews.length
      }
    });
    
    return successResponse(review, 201);
  } catch (error: any) {
    console.error('Create review error:', error);
    return errorResponse('Failed to create review: ' + error.message, 500);
  }
}