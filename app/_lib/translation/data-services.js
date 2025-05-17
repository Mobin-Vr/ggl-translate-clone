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

// Language Detector
export async function languageDetector(text) {
  try {
    const result = await new DetectLanguage(
      process.env.DETECT_LANGUAGE_API,
    ).detect(text);

    const langCode = result[0]?.language;
    const languageMap = LANGUAGES_MAP;

    console.log("ooo", langCode);

    return languageMap[langCode] || `Not`;
  } catch (error) {
    console.error("Language detection error:", error.message || error);
    throw new Error("Language detection failed");
  }
}
