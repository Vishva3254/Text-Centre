
import { GoogleGenAI, Type } from "@google/genai";
import { GrammarResult } from "../types";

export const checkGrammar = async (text: string, language: string): Promise<GrammarResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Proofread and fix the following text in ${language}. Return the corrected text and a list of specific grammatical improvements. Text: "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          correctedText: { type: Type.STRING },
          corrections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                replacement: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ['original', 'replacement', 'reason']
            }
          }
        },
        required: ['correctedText', 'corrections']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
