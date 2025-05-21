import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import Listing from '@/app/(models)/Listing';
import User from '@/app/(models)/User';
import { successResponse, errorResponse } from '@/app/(utils)/api';

// Search listings and users
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get search parameters
    const url = new URL(req.url);
    const query = url.searchParams.get('q') || '';
    const category = url.searchParams.get('category') || '';
    const location = url.searchParams.get('location') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    
    // Build search filter
    const filter: any = { isAvailable: true };
    
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    // Search listings
    const listings = await Listing.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('owner', 'name image rating');
    
    // Get total count for pagination
    const total = await Listing.countDocuments(filter);
    
    // Search users if query is provided
    let users = [];
    if (query) {
      users = await User.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { bio: { $regex: query, $options: 'i' } }
        ]
      })
      .select('name image bio rating reviewCount')
      .limit(5);
    }
    
    return successResponse({
      listings,
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Search error:', error);
    return errorResponse('Failed to search: ' + error.message, 500);
  }
}