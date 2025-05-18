"use server";

import { revalidatePath } from "next/cache";
import {
  createUser,
  deleteTranslation,
  getHistory,
  getLanguages,
  getUserByEmail,
} from "./data-services";
import { supabase } from "./supabase";
import { languageDetector, translator } from "./translation/data-services";
import { auth } from "@clerk/nextjs/server";

// Gets the translation history for a specific user
export async function getHistoryAction(userId) {
  return await getHistory(userId);
}

// Gets the supported languages from the translation service
export async function getLanguagesAction() {
  return await getLanguages();
}

// Creates a new user in the database
export async function createUserAction(newUser) {
  return await createUser(newUser);
}

// Retrieves a user by their email address
export async function getUserByEmailAction(userEmail) {
  return await getUserByEmail(userEmail);
}

// Translates the input text to the specified output language and detects the input language if needed
export async function translate({ inputText, inputLanguage, outputLanguage }) {
  console.log("server", inputText, " - ", outputLanguage);

  if (!inputText || !outputLanguage) {
    throw new Error("Please provide both the text and the target language.");
  }

  try {
    // Perform translation and language detection
    const [detectedLanguage, translatedText] = await Promise.all([
      // 1. Detect the input language
      languageDetector(inputText),

      // 2. Translate the text
      translator(inputText, outputLanguage),
    ]);

    // TODO: Add logic for language detection if inputLanguage is "Auto-Detection"

    const historyRecord = {
      inputText,
      outputText: translatedText,
      userId: 1, // TODO: Replace with actual user ID
      inputLanguage: inputLanguage.name,
      outputLanguage: outputLanguage.name,
      outputLanguageDir: outputLanguage.direction ?? null,
    };

    // TODO: Store the history in Supabase
    // const { error } = await supabase.from("history").insert([historyRecord]);
    // if (error) throw new Error("Failed to store translation history");

    console.log("jjj", translatedText);

    return { translatedText, detectedLanguage };
  } catch (err) {
    console.error("Translation or detection error:", err.message, err.stack);
    throw new Error(err.message);
  }
}

export async function deleteTranslationAction(translationId) {
  // 1) Authentican
  const { userId } = await auth();

  // 2) Authorization
  const userHistory = await getHistory(userId);
  const userHistoryIds = userHistory.map((item) => item.translation_id);

  if (!userHistoryIds.includes(translationId))
    throw new Error("You are not allowed to delete this translation");

  // 3) Delete record from DB
  await deleteTranslation(translationId);
}

//////////////////////////////////
///////// User Actions //////////
//////////////////////////////////

///////////////////////////////////////////////

// export async function translate(prevState, formData) {
//   // CHANGE Do Authentican later
//
//   const rawFormData = {
//     inputText: formData.get("inputText"),
//     outputText: formData.get("outputText"),
//     inputLanguage: parseFormDataLang(formData.get("inputLanguage")),
//     outputLanguage: parseFormDataLang(formData.get("outputLanguage")),
//   };
//
//   const { inputText, outputText, inputLanguage, outputLanguage } = rawFormData;
//
//   if (!inputText || !outputLanguage) {
//     throw new Error(
//       "Please provide both the text, input language, and the target language.",
//     );
//   }
//
//   try {
//     // Call the translator functions
//     const translatedText = await aiTranslator(inputText, outputLanguage.name);
//
//     //       const [detectedLanguage, translatedText] = await Promise.all([
//     //          inputLanguage.name === 'Auto-Detection'
//     //             ? detectLanguage(inputText)
//     //             : Promise.resolve(inputLanguage),
//     //
//     //          aiTranslator(inputText, outputLanguage.name),
//     //       ]);
//
//     // Create a new record to store translation history in the database
//     const newHistory = {
//       inputText: inputText,
//       outputText: translatedText,
//       userId: 1, // CHANGE as needed
//       outputLanguage: outputLanguage.name,
//       outputLanguageDir: outputLanguage.direction || null,
//       inputLanguage: inputLanguage.name,
//       //  inputLanguage:
//       //     inputLanguage.name === 'Auto-Detection'
//       //        ? detectedLanguage
//       //        : inputLanguage.name,
//     };
//
//     // Insert the new record into the history table in Supabase
//     //       const { error } = await supabase.from('history').insert([newHistory]);
//     //
//     //       if (error) {
//     //          console.error('Error inserting history:', error.message);
//     //          throw new Error('History record could not be created');
//     //       }
//
//     // Return translated text to the client
//     return {
//       ...prevState,
//       outputText: translatedText,
//       inputLanguage: newHistory.inputLanguage,
//     };
//   } catch (error) {
//     console.error("Full error details:", error.message, error.stack);
//     throw new Error("An error has occurred");
//   }
// }
