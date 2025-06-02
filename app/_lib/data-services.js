import { unstable_cache } from "next/cache";
import { supabase } from "./supabase";
import { getErrorMessage } from "./utils";
import { CONFIG } from "./configs";

// Gets the translation history for a specific user
export async function getHistory(userId) {
  const { data, error } = await supabase
    .from("history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  if (error) {
    console.error(error);
    throw new Error("History could not be loaded");
  }

  return data;
}

// Gets the supported languages from the translation service
export const getLanguages = unstable_cache(
  async () => {
    const { data, error } = await supabase.from("languages").select("*");

    if (error) {
      console.error(error);
      throw new Error("Languages could not be loaded");
    }

    return data;
  },
  ["languages"],
  { revalidate: CONFIG.revalidate.languages },
);

export const getUserByEmail = unstable_cache(
  async (userEmail) => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("user_email", userEmail)
      .single();

    return data;
  },
  (userEmail) => ["getUserByEmail", userEmail], // Cache key based on email parameter
  { revalidate: CONFIG.revalidate.userByEmail },
);

export const getUserById = unstable_cache(
  async (userId) => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    return data;
  },
  (userId) => ["getUserById", userId], // Cache key based on user ID parameter
  { revalidate: CONFIG.revalidate.userById }, // 1h
);

// Creates a new user in the "users" table
export async function createUser(newUser) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Deletes a specific translation given its translation ID
export async function deleteTranslation(translationId) {
  try {
    await supabase.from("history").delete().eq("translation_id", translationId);
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
}

// Delete many history rows
export async function deleteHistoryRows(translationIds) {
  try {
    await supabase
      .from("history")
      .delete()
      .in("translation_id", translationIds);
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
}

// Stores a new translation history record for a user
export async function addHistory(historyRecord) {
  const { error } = await supabase.from("history").insert([historyRecord]);

  if (error) {
    console.error(error);
    throw new Error("Failed to store translation history in supabase");
  }
}
