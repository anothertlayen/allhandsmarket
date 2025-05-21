import { NextRequest } from 'next/server';
import { successResponse } from '@/app/(utils)/api';
import { removeAuthCookie } from '@/app/(utils)/auth';

export async function POST(req: NextRequest) {
  // Remove auth cookie
  removeAuthCookie();
  
  return successResponse({ message: 'Logged out successfully' });
}