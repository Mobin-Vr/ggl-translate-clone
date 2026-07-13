// actions.js

"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { detectAndTranslate } from "./translation/data-services";
import { extractLanguageName, getErrorMessage } from "./utils";

/**
 * Creates a new user in the database with duplicate check
 * Uses upsert to avoid duplicate key errors
 */
export async function createUserAction(newUser) {
  try {
    const { userId } = await auth();

    // Use Clerk userId if not provided
    const finalUserId = newUser.user_id || userId;

    if (!finalUserId) {
      throw new Error("User ID is required");
    }

    if (!newUser.user_email) {
      throw new Error("User email is required");
    }

    // Upsert user (insert or update if exists)
    const { data, error } = await supabase
      .from("users")
      .upsert(
        {
          user_id: finalUserId,
          user_email: newUser.user_email,
          user_fullname: newUser.user_fullname || null,
          default_output_language: newUser.default_output_language || "en",
        },
        {
          onConflict: "user_id",
          ignoreDuplicates: false,
        },
      )
      .select()
      .single();

    if (error) {
      console.error("Upsert error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Create user action error:", error);
    throw error;
  }
}

/**
 * Translates the input text to the specified output language
 * Detects input language automatically if needed
 */
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
        // Save history directly in action
        const { error: historyError } = await supabase
          .from("history")
          .insert([historyRecord]);

        if (historyError) {
          console.error("Non-critical: Failed to save history.", historyError);
        } else {
          revalidatePath("/");
        }
      } catch (historyError) {
        console.error("Non-critical: Failed to save history.", historyError);
      }
    }

    // Return for non-logged-in users
    return { translation, detectedLanguage };
  } catch (error) {
    console.error("Critical Translation Action Error:", error);
    return { error: "Translation failed. Please try again." };
  }
}

/**
 * Deletes a specific translation by its ID
 * Only the owner can delete their own translations
 */
export async function deleteTranslationAction(translationId) {
  try {
    // 1) Authenticate
    const { userId } = await auth();

    if (!userId) throw new Error("Authentication failed.");

    // 2) Delete record from DB directly
    const { error } = await supabase.from("history").delete().match({
      translation_id: translationId,
      user_id: userId,
    });

    if (error) throw error;

    // 3) Revalidate the cache for next request
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
}

/**
 * Deletes all translations for the current user
 */
export async function clearUserHistoryAction() {
  try {
    // 1) Authentication
    const { userId } = await auth();

    if (!userId) throw new Error("Authentication failed.");

    // 2) Delete records from DB directly
    const { error } = await supabase
      .from("history")
      .delete()
      .eq("user_id", userId);

    if (error) throw error;

    // 3) Revalidate the cache for next request
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
}
