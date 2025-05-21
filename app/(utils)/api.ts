import { NextResponse } from 'next/server';

export function successResponse(data: Record<string, unknown>, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function validateRequestBody(body: Record<string, unknown>, requiredFields: string[]) {
  for (const field of requiredFields) {
    if (!body[field]) {
      return `${field} is required`;
    }
  }
  return null;
}