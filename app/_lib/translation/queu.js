import { translate } from "../actions";

let isTranslating = false;
let latestJob = null;

export async function enqueueTranslation(payload) {
  return new Promise((resolve) => {
    latestJob = { payload, resolve };

    if (!isTranslating) processQueue();
  });
}

async function processQueue() {
  isTranslating = true;

  while (latestJob) {
    const job = latestJob;

    // Reset before processing
    latestJob = null;

    try {
      const result = await translate(job.payload);
      job.resolve(result);
    } catch (err) {
      console.error("Translation failed:", err);
      job.resolve("Translation failed");
    }
  }

  isTranslating = false;
}
