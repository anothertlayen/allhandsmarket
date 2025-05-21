import OpenAI from 'openai';

// Initialize the OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a chat completion using OpenAI's API
 * @param messages Array of message objects with role and content
 * @param options Optional parameters for the API call
 * @returns The generated completion
 */
export async function generateChatCompletion(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
) {
  const {
    model = 'gpt-4-turbo',
    temperature = 0.7,
    max_tokens = 1000,
  } = options;

  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating chat completion:', error);
    throw new Error('Failed to generate response from AI assistant');
  }
}

/**
 * Generate marketplace assistant response
 * @param userMessage User's message
 * @param chatHistory Previous chat history
 * @param contextData Additional context data (listings, user info, etc.)
 * @returns AI assistant's response
 */
export async function generateMarketplaceAssistantResponse(
  userMessage: string,
  chatHistory: { role: 'system' | 'user' | 'assistant'; content: string }[] = [],
  contextData: {
    listings?: any[];
    userInfo?: any;
    searchQuery?: string;
  } = {}
) {
  // Create system prompt with marketplace context
  const systemPrompt = `You are a helpful assistant for AllHandsMarket, a non-monetary marketplace where people share resources, skills, and items with their community. 
  
Your role is to help users find items they're looking for, connect with other users, and navigate the platform.

${contextData.listings ? `Available listings: ${JSON.stringify(contextData.listings)}` : ''}
${contextData.userInfo ? `User information: ${JSON.stringify(contextData.userInfo)}` : ''}
${contextData.searchQuery ? `User is searching for: ${contextData.searchQuery}` : ''}

Provide helpful, concise responses. If asked about specific items, suggest relevant listings if available. 
If asked about how the platform works, explain that it's a community-based sharing economy with no monetary exchange.
Always be friendly, supportive, and encouraging of community participation.`;

  // Combine system prompt, chat history, and new user message
  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory,
    { role: 'user', content: userMessage },
  ];

  // Generate and return the assistant's response
  return generateChatCompletion(messages, {
    temperature: 0.8,
  });
}

export default openai;