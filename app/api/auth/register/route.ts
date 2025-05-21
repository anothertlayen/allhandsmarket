import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import User from '@/app/(models)/User';
import { successResponse, errorResponse, validateRequestBody } from '@/app/(utils)/api';
import { generateToken, setAuthCookie } from '@/app/(utils)/auth';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // Validate required fields
    const validationError = validateRequestBody(body, ['name', 'email', 'password']);
    if (validationError) {
      return errorResponse(validationError);
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return errorResponse('User with this email already exists');
    }
    
    // Create new user
    const user = new User({
      name: body.name,
      email: body.email,
      password: body.password,
      image: body.image || '',
      bio: body.bio || '',
      location: body.location || '',
    });
    
    await user.save();
    
    // Generate token
    const token = generateToken(user._id.toString());
    
    // Set auth cookie
    setAuthCookie(token);
    
    // Return user data (excluding password)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      bio: user.bio,
      location: user.location,
      joinedAt: user.joinedAt,
    };
    
    return successResponse({ user: userData, token }, 201);
  } catch (error: any) {
    console.error('Registration error:', error);
    return errorResponse('Registration failed: ' + error.message, 500);
  }
}