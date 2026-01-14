
import { GoogleGenAI, Type } from "@google/genai";
import { RecognitionResult } from "../types";

export const recognizeFood = async (base64Image: string): Promise<RecognitionResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          {
            text: 'Analyze this food image. Identify the main dish, estimate its total calories, and provide a breakdown of macronutrients (protein, carbs, fats in grams). Be precise. Provide a brief description of what you see.',
          },
        ],
      },
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          macros: {
            type: Type.OBJECT,
            properties: {
              protein: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fats: { type: Type.NUMBER },
            },
            required: ['protein', 'carbs', 'fats'],
          },
          description: { type: Type.STRING },
          confidence: { type: Type.NUMBER, description: 'A value between 0 and 100' },
        },
        required: ['name', 'calories', 'macros', 'description', 'confidence'],
      },
    },
  });

  const result = JSON.parse(response.text || '{}');
  return result as RecognitionResult;
};
