import { translate } from "../actions";

let isTranslating = false;
let latestPayload = null;
let latestResolver = null;

export async function enqueueTranslation(payload) {
  return new Promise((resolve) => {
    latestPayload = payload;
    latestResolver = resolve;

    if (!isTranslating) processQueue();
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
