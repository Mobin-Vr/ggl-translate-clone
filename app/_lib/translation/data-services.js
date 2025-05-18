import DetectLanguage from "detectlanguage";
import { LANGUAGES_MAP } from "../configs";
import { openai } from "../deepseek";

// Translator function (deepseek ai)
export async function translator(text, targetLang) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a professional and precise translator. Translate the given input into the specified target language only. Do not add explanations or repeat the source text.`,
        },
        {
          role: "user",
          content: `Translate this text to "${targetLang}":\n\n${text}`,
        },
      ],
      model: "deepseek-chat",
      temperature: 1.3,
      max_tokens: 1000,
    });

    const translation = response.choices[0]?.message?.content?.trim();

    if (!translation) {
      throw new Error("No translation returned from the AI model.");
    }

    return translation;
  } catch (err) {
    console.error("Translation failed:", err.message || err);
    throw new Error("Translation failed. Please try again later.");
  }
}

// Language detector function (deepseek ai)
export async function languageDetector(text) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a professional language detector. Detect the language of the provided text and return only the name of the language in English, such as "English", "Persian", "German", etc. Do not return any explanations or the original text. If you are not sure what the language is, respond with only this word: Not.`,
        },
        {
          role: "user",
          content: `Detect the language of this text:\n\n${text}`,
        },
      ],
      model: "deepseek-chat",
      temperature: 0.2,
      max_tokens: 20,
    });

    const detectedLang = response.choices[0]?.message?.content?.trim();

    if (!detectedLang) {
      throw new Error("No language detected by the AI model.");
    }

    return detectedLang;
  } catch (err) {
    console.error("Language detection failed:", err.message || err);
    throw new Error("Language detection failed. Please try again later.");
  }
}

// Language Detector Api (Alternative)
// export async function languageDetector(text) {
//   try {
//     const result = await new DetectLanguage(
//       process.env.DETECT_LANGUAGE_API,
//     ).detect(text);
//
//     const langCode = result[0]?.language;
//     const languageMap = LANGUAGES_MAP;
//
//     return languageMap[langCode] || `Not`;
//   } catch (error) {
//     console.error("Language detection error:", error.message || error);
//     throw new Error("Language detection failed");
//   }
// }
