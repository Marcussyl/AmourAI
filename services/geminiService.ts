
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLoveLetter = async (params: {
  recipient: string;
  sender: string;
  mood: string;
  memories: string;
}) => {
  const ai = getAI();
  const prompt = `Write a romantic Valentine's Day love letter.
    Recipient Name: ${params.recipient}
    Sender Name: ${params.sender}
    Mood/Style: ${params.mood} (e.g., poetic, funny, classic)
    Shared Memories/Details: ${params.memories}
    
    The letter should feel sincere and authentic. If the mood is 'funny', include lighthearted humor. If 'poetic', use metaphors.
    
    IMPORTANT: Please sprinkle appropriate heart and romantic emojis throughout the letter to make it look vibrant and expressive (e.g., ❤️, ✨, 🌹, 💌, 💖).
    
    Language: The response should be in the language most appropriate for the names and details provided (default to Chinese/English based on context).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const generateDateIdeas = async (params: {
  city: string;
  budget: string;
  vibe: string;
}) => {
  const ai = getAI();
  const prompt = `Suggest 3 unique Valentine's Day date ideas in ${params.city}.
    Budget Level: ${params.budget}
    Desired Vibe: ${params.vibe}
    
    For each idea, provide a catchy title, a detailed description, and a 'Special Romantic Touch' suggestion.
    Format the output as clear sections.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
