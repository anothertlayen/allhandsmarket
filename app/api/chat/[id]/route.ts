import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import ChatSession from '@/app/(models)/ChatSession';
import { successResponse, errorResponse, validateRequestBody } from '@/app/(utils)/api';
import { getCurrentUser } from '@/app/(utils)/auth';
import { generateChatResponse } from '@/app/(lib)/openai';

// Get a single chat session by ID
export async function GET(
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
    
    // Find chat session
    const chatSession = await ChatSession.findById(params.id);
    if (!chatSession) {
      return errorResponse('Chat session not found', 404);
    }
    
    // Check if user owns the chat session
    if (chatSession.user.toString() !== user._id.toString()) {
      return errorResponse('Not authorized to access this chat session', 403);
    }
    
    return successResponse(chatSession);
  } catch (error: any) {
    console.error('Get chat session error:', error);
    return errorResponse('Failed to get chat session: ' + error.message, 500);
  }
}

// Add a message to an existing chat session
export async function POST(
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
    
    // Find chat session
    const chatSession = await ChatSession.findById(params.id);
    if (!chatSession) {
      return errorResponse('Chat session not found', 404);
    }
    
    // Check if user owns the chat session
    if (chatSession.user.toString() !== user._id.toString()) {
      return errorResponse('Not authorized to access this chat session', 403);
    }
    
    const body = await req.json();
    
    // Validate required fields
    const validationError = validateRequestBody(body, ['message']);
    if (validationError) {
      return errorResponse(validationError);
    }
    
    // Create user message
    const userMessage = {
      role: 'user',
      content: body.message,
      timestamp: new Date()
    };
    
    // Prepare messages for AI
    const aiMessages = chatSession.messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content
    }));
    
    // Add new user message
    aiMessages.push({ role: 'user', content: body.message });
    
    // Generate AI response
    const aiResponse = await generateChatResponse(aiMessages);
    
    // Create assistant message
    const assistantMessage = {
      role: 'assistant',
      content: aiResponse.content,
      timestamp: new Date()
    };
    
    // Update chat session
    const updatedChatSession = await ChatSession.findByIdAndUpdate(
      params.id,
      {
        $push: { messages: { $each: [userMessage, assistantMessage] } },
        $set: { updatedAt: new Date() }
      },
      { new: true }
    );
    
    return successResponse(updatedChatSession);
  } catch (error: any) {
    console.error('Add message error:', error);
    return errorResponse('Failed to add message: ' + error.message, 500);
  }
}

// Delete a chat session
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
    
    // Find chat session
    const chatSession = await ChatSession.findById(params.id);
    if (!chatSession) {
      return errorResponse('Chat session not found', 404);
    }
    
    // Check if user owns the chat session
    if (chatSession.user.toString() !== user._id.toString()) {
      return errorResponse('Not authorized to delete this chat session', 403);
    }
    
    // Delete chat session
    await ChatSession.findByIdAndDelete(params.id);
    
    return successResponse({ message: 'Chat session deleted successfully' });
  } catch (error: any) {
    console.error('Delete chat session error:', error);
    return errorResponse('Failed to delete chat session: ' + error.message, 500);
  }
}