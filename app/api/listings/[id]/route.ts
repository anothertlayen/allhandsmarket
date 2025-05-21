import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import Listing from '@/app/(models)/Listing';
import User from '@/app/(models)/User';
import { successResponse, errorResponse } from '@/app/(utils)/api';
import { getCurrentUser } from '@/app/(utils)/auth';

// Get a single listing by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const listing = await Listing.findById(params.id)
      .populate('owner', 'name email image bio location joinedAt');
    
    if (!listing) {
      return errorResponse('Listing not found', 404);
    }
    
    return successResponse(listing);
  } catch (error: any) {
    console.error('Get listing error:', error);
    return errorResponse('Failed to get listing: ' + error.message, 500);
  }
}

// Update a listing
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }
    
    // Find listing
    const listing = await Listing.findById(params.id);
    if (!listing) {
      return errorResponse('Listing not found', 404);
    }
    
    // Check if user is the owner
    if (listing.owner.toString() !== user._id.toString()) {
      return errorResponse('Not authorized to update this listing', 403);
    }
    
    const body = await req.json();
    
    // Update listing
    const updatedListing = await Listing.findByIdAndUpdate(
      params.id,
      {
        $set: {
          title: body.title || listing.title,
          description: body.description || listing.description,
          category: body.category || listing.category,
          condition: body.condition || listing.condition,
          images: body.images || listing.images,
          location: body.location || listing.location,
          isAvailable: body.isAvailable !== undefined ? body.isAvailable : listing.isAvailable,
          tags: body.tags || listing.tags,
          updatedAt: new Date()
        }
      },
      { new: true }
    );
    
    return successResponse(updatedListing);
  } catch (error: any) {
    console.error('Update listing error:', error);
    return errorResponse('Failed to update listing: ' + error.message, 500);
  }
}

// Delete a listing
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }
    
    // Find listing
    const listing = await Listing.findById(params.id);
    if (!listing) {
      return errorResponse('Listing not found', 404);
    }
    
    // Check if user is the owner
    if (listing.owner.toString() !== user._id.toString()) {
      return errorResponse('Not authorized to delete this listing', 403);
    }
    
    // Delete listing
    await Listing.findByIdAndDelete(params.id);
    
    // Remove listing from user's listings
    await User.findByIdAndUpdate(user._id, {
      $pull: { listings: params.id }
    });
    
    return successResponse({ message: 'Listing deleted successfully' });
  } catch (error: any) {
    console.error('Delete listing error:', error);
    return errorResponse('Failed to delete listing: ' + error.message, 500);
  }
}