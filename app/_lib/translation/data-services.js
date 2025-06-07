import { CONFIG } from "../configs";
import { openai } from "../deepseek";

import { z } from "zod";

const TranslationResponseSchema = z.object({
  detectedLanguage: z.string().min(2),
  translation: z.string().min(1),
});

export async function detectAndTranslate(text, targetLang) {
  if (!text || !targetLang) {
    throw new Error("Input text and target language are required.");
  }

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
    if (!raw) throw new Error("No content received from AI.");

    raw = raw.replace(/^```json\s*|```$/g, "").trim();

    const rawJson = JSON.parse(raw);

    const validatedResult = TranslationResponseSchema.parse(rawJson);

    return validatedResult;
  } catch (err) {
    console.error("Detection & Translation failed:", err);
    throw err;
  }
}
