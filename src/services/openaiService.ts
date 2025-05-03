import OpenAI from 'openai';

// Initialize OpenAI client
// Important: In production, this key should be stored securely on a server, not in client-side code
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true, // Only for demo purposes
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const generateChatCompletion = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('Error generating chat completion:', error);
    throw error;
  }
};

export const generateImageWithDalle = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    return response.data?.[0]?.url || '';
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

export default {
  generateChatCompletion,
  generateImageWithDalle,
}; 