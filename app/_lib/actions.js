"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import {
  addHistory,
  clearUserHistory,
  createUser,
  deleteTranslation,
} from "./data-services";
import { detectAndTranslate } from "./translation/data-services";
import { extractLanguageName, getErrorMessage } from "./utils";

// Creates a new user in the database
export async function createUserAction(newUser) {
  return await createUser(newUser);
}

// Translates the input text to the specified output language and detects the input language if needed
export async function translate({ inputText, outputLang }) {
  console.log("2>>>");
  try {
    const { translation, detectedLanguage } = await detectAndTranslate(
      inputText,
      outputLang,
    );

    const { userId } = await auth();

    if (userId) {
      const historyRecord = {
        user_id: userId,
        input_language: extractLanguageName(detectedLanguage),
        output_language: outputLang,
        input_text: inputText,
        output_text: translation,
      };

      try {
        await addHistory(historyRecord);

        revalidatePath("/");
      } catch (historyError) {
        console.error("Non-critical: Failed to save history.", historyError);
      }
    }

    // This for users who doesnt logged in
    return { translation, detectedLanguage };
  } catch (error) {
    console.error("Critical Translation Action Error:", error);
    return { error: "Translation failed. Please try again." };
  }
}

// Delete a specific translation
export async function deleteTranslationAction(translationId) {
  try {
    // 1) Authentican
    const { userId } = await auth();

    if (!userId) throw new Error("Authentication failed.");

    // 2) Delete record from DB
    await deleteTranslation(translationId, userId);

    // 3) Revalidate the cache for next request
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
}

// Delete all translations of the user
export async function clearUserHistoryAction() {
  try {
    // 1) Authentication
    const { userId } = await auth();

    if (!userId) throw new Error("Authentication failed.");

    // 2) Delete records from DB
    await clearUserHistory(userId);

    // 3) Revalidate the cache for next request
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
}
