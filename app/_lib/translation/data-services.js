import { CONFIG } from "../configs";
import { openai } from "../deepseek";

export async function detectAndTranslate(text, targetLang) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: CONFIG.ai.promptText,
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
      temperature: CONFIG.ai.promptTemperature,
      max_tokens: CONFIG.ai.maxTokens,
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
