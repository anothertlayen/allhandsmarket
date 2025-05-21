import { NextRequest } from 'next/server';
import dbConnect from '@/app/(lib)/db';
import ChatSession from '@/app/(models)/ChatSession';
import { successResponse, errorResponse, validateRequestBody } from '@/app/(utils)/api';
import { getCurrentUser } from '@/app/(utils)/auth';
import { generateChatResponse } from '@/app/(lib)/openai';

// Get all chat sessions for the current user
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }
    
    // Get chat sessions
    const chatSessions = await ChatSession.find({ user: user._id })
      .sort({ updatedAt: -1 });
    
    return successResponse(chatSessions);
  } catch (error: any) {
    console.error('Get chat sessions error:', error);
    return errorResponse('Failed to get chat sessions: ' + error.message, 500);
  }
}

// Create a new chat session
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
    const validationError = validateRequestBody(body, ['message']);
    if (validationError) {
      return errorResponse(validationError);
    }
    
    // Create system message with marketplace context
    const systemMessage = {
      role: 'system',
      content: 'You are a helpful assistant for AllHandsMarket, a non-monetary marketplace where people can exchange goods and services without money. Help users find items, understand how the platform works, and provide guidance on listing items or connecting with others.',
      timestamp: new Date()
    };
    
    // Create user message
    const userMessage = {
      role: 'user',
      content: body.message,
      timestamp: new Date()
    };
    
    // Generate AI response
    const messages = [
      { role: 'system', content: systemMessage.content },
      { role: 'user', content: userMessage.content }
    ];
    
    const aiResponse = await generateChatResponse(messages);
    
    // Create assistant message
    const assistantMessage = {
      role: 'assistant',
      content: aiResponse.content,
      timestamp: new Date()
    };
    
    // Create new chat session
    const chatSession = new ChatSession({
      user: user._id,
      title: body.message.substring(0, 30) + (body.message.length > 30 ? '...' : ''),
      messages: [systemMessage, userMessage, assistantMessage]
    });
    
    await chatSession.save();
    
    return successResponse(chatSession, 201);
  } catch (error: any) {
    console.error('Create chat session error:', error);
    return errorResponse('Failed to create chat session: ' + error.message, 500);
  }
}