"use server";

import { auth } from "@clerk/nextjs/server";
import {
  addHistory,
  createUser,
  deleteHistoryRows,
  deleteTranslation,
  getHistory,
  getUserById,
} from "./data-services";
import { detectAndTranslate } from "./translation/data-services";
import { extractLanguageName } from "./utils";

// Creates a new user in the database
export async function createUserAction(newUser) {
  return await createUser(newUser);
}

// Translates the input text to the specified output language and detects the input language if needed
export async function translate({ inputText, outputLang }) {
  if (!inputText || !outputLang) {
    throw new Error("Please provide both the text and the target language.");
  }

  try {
    // Perform translation and language detection
    const { detectedLanguage, translation } = await detectAndTranslate(
      inputText,
      outputLang,
    );

    // 1) Authentican
    const { userId } = await auth();
    const user = await getUserById(userId);

    if (!user)
      throw new Error("You are not authorized to add a translation record.");

    const historyRecord = {
      user_id: userId,
      input_language: extractLanguageName(detectedLanguage),
      output_language: outputLang,
      input_text: inputText,
      output_text: translation,
    };

    addHistory(historyRecord);

    return { translation, detectedLanguage };
  } catch (err) {
    console.error("Translation or detection error:", err.message, err.stack);
    throw new Error(err.message);
  }
}

// Delete a specific translation
export async function deleteTranslationAction(translationId) {
  // 1) Authentican
  const { userId } = await auth();

  // 2) Authorization // NOTE it can be done by a RPC fn
  const userHistory = await getHistory(userId);
  const userHistoryIds = userHistory.map((item) => item.translation_id);

  if (!userHistoryIds.includes(translationId))
    throw new Error("You are not allowed to delete this translation");

  // 3) Delete record from DB
  await deleteTranslation(translationId);
}

// Delete all translations of the user
export async function deleteAllTranslationsAction() {
  // 1) Authentication
  const { userId } = await auth();

  // 2) Authorization
  const userHistory = await getHistory(userId);
  const userHistoryIds = userHistory.map((item) => item.translation_id);

  const allHistoriesBelongToUser = userHistory.every(
    (h) => h.user_id === userId,
  );

  if (!allHistoriesBelongToUser)
    throw new Error(
      "You are not allowed to delete one or more of these translations",
    );

  // 3) Delete records from DB
  const result = await deleteHistoryRows(userHistoryIds);

  return result;
}
