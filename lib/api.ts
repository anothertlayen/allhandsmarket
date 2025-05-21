import { NextResponse } from 'next/server';

/**
 * Standard API response format
 */
type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

/**
 * Create a success response
 * @param data Data to include in the response
 * @param message Optional success message
 * @returns NextResponse with standardized format
 */
export function successResponse<T = any>(
  data?: T,
  message?: string
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
  });
}

/**
 * Create an error response
 * @param error Error message or object
 * @param status HTTP status code
 * @returns NextResponse with standardized format
 */
export function errorResponse(
  error: string | Error,
  status: number = 400
): NextResponse<ApiResponse> {
  const errorMessage = error instanceof Error ? error.message : error;
  
  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
    },
    { status }
  );
}

/**
 * Handle API errors and return appropriate response
 * @param error Error object
 * @returns NextResponse with appropriate error details
 */
export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  console.error('API Error:', error);
  
  if (error instanceof Error) {
    // Handle specific error types
    if (error.name === 'ValidationError') {
      return errorResponse(error.message, 400);
    }
    
    if (error.name === 'UnauthorizedError') {
      return errorResponse('Unauthorized', 401);
    }
    
    if (error.name === 'ForbiddenError') {
      return errorResponse('Forbidden', 403);
    }
    
    if (error.name === 'NotFoundError') {
      return errorResponse('Resource not found', 404);
    }
    
    return errorResponse(error.message, 500);
  }
  
  return errorResponse('An unexpected error occurred', 500);
}