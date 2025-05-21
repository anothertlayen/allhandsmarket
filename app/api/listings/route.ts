import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import Listing from '@/app/(models)/Listing';
import User from '@/app/(models)/User';
import { successResponse, errorResponse, validateRequestBody } from '@/app/(utils)/api';
import { getCurrentUser } from '@/app/(utils)/auth';

// Get all listings with optional filtering
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const condition = searchParams.get('condition');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Build query
    const query: any = { isAvailable: true };
    
    if (category) {
      query.category = category;
    }
    
    if (condition) {
      query.condition = condition;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get listings
    const listings = await Listing.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('owner', 'name image');
    
    // Get total count for pagination
    const total = await Listing.countDocuments(query);
    
    return successResponse({
      listings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Get listings error:', error);
    return errorResponse('Failed to get listings: ' + error.message, 500);
  }
}

// Create a new listing
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
    const validationError = validateRequestBody(body, ['title', 'description', 'category', 'condition']);
    if (validationError) {
      return errorResponse(validationError);
    }
    
    // Create new listing
    const listing = new Listing({
      title: body.title,
      description: body.description,
      category: body.category,
      condition: body.condition,
      images: body.images || [],
      owner: user._id,
      location: body.location || user.location,
      tags: body.tags || []
    });
    
    await listing.save();
    
    // Add listing to user's listings
    await User.findByIdAndUpdate(user._id, {
      $push: { listings: listing._id }
    });
    
    return successResponse(listing, 201);
  } catch (error: any) {
    console.error('Create listing error:', error);
    return errorResponse('Failed to create listing: ' + error.message, 500);
  }
}