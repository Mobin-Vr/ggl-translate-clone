import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Uses Google Generative AI to translate text to a specified language.
 * @param {string} inputText - The text to be translated.
 * @param {Object|string} outputLanguage - The target language for translation.
 * @returns {Promise<string>} - The translated text.
 */

export async function translateText(inputText, outputLanguage) {
   try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
       the following text to ${outputLanguage} without adding any extra words or explanations: "${inputText}"`;

      const result = await model.generateContent(prompt);

      return result.response.text();
   } catch (error) {
      console.error('Translation error:', error);
      throw new Error('An error occurred during translation.');
   }
}

/**
 * Uses Google Generative AI to detect the language of the given text.
 * @param {string} inputText - The text to detect the language of.
 * @returns {Promise<string>} - The detected language in a single word.
 */

export async function detectLanguage(inputText) {
   try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `Detect the language of the following text and respond with the name of the language in a single word, like 'French' or 'Persian', without any extra words or explanations: "${inputText}"`;

      const result = await model.generateContent(prompt);

      return result.response.text().trim();
   } catch (error) {
      console.error('Language detection error:', error);
      throw new Error('An error occurred during language detection.');
   }
}
