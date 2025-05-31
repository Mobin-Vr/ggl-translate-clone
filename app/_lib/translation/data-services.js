import {
  AI_MAX_TOKENS,
  DETECT_AND_TRANSLATE_PROMPT,
  PROMPT_TEMPERATURE,
} from "../configs";
import { openai } from "../deepseek";

export async function detectAndTranslate(text, targetLang) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: DETECT_AND_TRANSLATE_PROMPT,
        },
        {
          role: "user",
          content: `
          Target language:[${targetLang}],
          Text to analyze: [${text}]
          `.trim(),
        },
      ],
      model: "deepseek-chat",
      temperature: PROMPT_TEMPERATURE,
      max_tokens: AI_MAX_TOKENS,
    });

    let raw = response.choices[0]?.message?.content?.trim();

    if (!raw) throw new Error("No response received.");

    // Clean up potential markdown fences like ```json ... ```
    raw = raw.replace(/^```json\s*|```$/g, "").trim();

    const result = JSON.parse(raw);

    if (!result.detectedLanguage || !result.translation) {
      throw new Error("Incomplete data returned.");
    }

    return result;
  } catch (err) {
    console.error("Detection & Translation failed:", err.message || err);
    throw new Error("Combined operation failed. Please try again later.");
  }
}
