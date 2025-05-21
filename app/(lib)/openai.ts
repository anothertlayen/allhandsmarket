import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function generateChatResponse(messages: ChatMessage[]) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message;
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
}

export default openai;