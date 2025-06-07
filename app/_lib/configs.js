export const CONFIG = {
  debounceDelay: 1000, // Delay before triggering translation (in ms)

  // =========================================
  // UI Config
  ui: {
    mainBreakpoint: 720, // Refer to global.css for breakpoints
    textExpanderMaxLength: 45, // Max chars before expanding long text
    maxTruncTextChar: 40, // For truncated UI preview
    inputMaxLength: 1000,
  },

  // =========================================
  // Revalidation Times (in seconds)
  revalidate: {
    languages: 3600, // 1 hour
    userByEmail: 3600,
    userById: 3600,
  },

  // =========================================
  // AI Translation Configs
  ai: {
    promptTemperature: 0.7,
    maxTokens: 1000,
    promptText: `
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
`.trim(),
  },
};
