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
    const validationError = validateRequestBody(body, ['email', 'password']);
    if (validationError) {
      return errorResponse(validationError);
    }
    
    // Find user by email
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return errorResponse('Invalid email or password', 401);
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(body.password);
    if (!isPasswordValid) {
      return errorResponse('Invalid email or password', 401);
    }
    
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
    
    return successResponse({ user: userData, token });
  } catch (error: unknown) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return errorResponse('Login failed: ' + errorMessage, 500);
  }
}