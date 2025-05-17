import { translate } from "../actions";
import { DEBOUNCE_DELAY } from "../configs";

let isTranslating = false;
let latestPayload = null;
let latestResolver = null;
let debounceTimerId = null;

export async function enqueueTranslation(payload) {
  return new Promise((resolve) => {
    latestPayload = payload;
    latestResolver = resolve;

    clearTimeout(debounceTimerId);

    debounceTimerId = setTimeout(() => {
      if (!isTranslating) processQueue();
    }, DEBOUNCE_DELAY);
  });
}

async function processQueue() {
  isTranslating = true;

  while (latestPayload) {
    const payload = latestPayload;
    const resolve = latestResolver;

    // Reset before processing
    latestPayload = null;
    latestResolver = null;

    try {
      const result = await translate(payload);

      resolve(result);
    } catch (err) {
      console.error("Translation failed:", err);
      resolve("Translation failed");
    }
  }

  isTranslating = false;
}
