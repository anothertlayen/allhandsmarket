import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (_error) {
    return null;
  }
}

export function setAuthCookie(token: string) {
  cookies().set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export function getAuthCookie() {
  return cookies().get('auth_token')?.value;
}

export function removeAuthCookie() {
  cookies().delete('auth_token');
}

export function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return null;
  
  const decoded = verifyToken(token);
  return decoded ? (decoded as { userId: string }).userId : null;
}

export async function getCurrentUser() {
  const token = getAuthCookie();
  if (!token) return null;
  
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  const userId = (decoded as { userId: string }).userId;
  
  // Import here to avoid circular dependencies
  const User = (await import('../(models)/User')).default;
  const user = await User.findById(userId).select('-password');
  
  return user;
}