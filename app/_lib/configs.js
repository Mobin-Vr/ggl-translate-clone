export const DEBOUNCE_DELAY = 1000; // Delay before triggering translation (in ms)
export const TEXT_EXPANDER_MAX_LENGTH = 45; // Maximum number of characters to show before expanding text
export const USER_MOST_FREQUENT_OUT_LANG = "";

// Truncate text
export const MAX_TRUNC_TEXT_CHAR = 40;

// UI Sizes
export const MAIN_BREAKPOINT = 720;
// export const MAX_HEADER_HEIGHT = "65px";
// export const MAX_HISTORY_SIZES = {
//   md: "23rem",
//   xl: "30rem",
// };

// NOTE Refer to global.css, theme for changing ui sizes

// Deep seek configs
export const PROMPT_TEMPERATURE = 0.7;
export const AI_MAX_TOKENS = 1000;
export const DETECT_AND_TRANSLATE_PROMPT = `
You are a professional translator and language detector.
Your task is to:
1. Detect the language of the given input.
2. Translate the text to the specified target language.

Return ONLY a valid JSON object in the following format (no markdown, no extra characters):
{
  "detectedLanguage": "<English name>",
  "translation": "<Translated text>"
}

If detection fails, return:
{
  "detectedLanguage": "Unknown language",
  "translation": "<Translated text>"
}
`.trim();
