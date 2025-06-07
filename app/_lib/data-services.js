import { unstable_cache } from "next/cache";
import { CONFIG } from "./configs";
import { supabase } from "./supabase";

// Gets the translation history for a specific user
export const getHistory = unstable_cache(
  async (userId) => {
    const { data, error } = await supabase
      .from("history")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      throw new Error("History could not be loaded");
    }
    return data;
  },
  (userId) => ["history", userId],
  { revalidate: CONFIG.revalidate.languages },
);

// Gets the latest 5 translation history records for a specific user
export const getRecentHistory = unstable_cache(
  async (userId) => {
    const { data, error } = await supabase
      .from("history")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5); // Limit to the last 5 records (latest records)

    if (error) {
      console.error(error);
      throw new Error("Recent history could not be loaded");
    }
    return data;
  },
  (userId) => ["recent-history", userId],
  // { revalidate: CONFIG.revalidate.languages },
  { revalidate: 1 },
);

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

  if (error) throw error;

  return data;
}

// Stores a new translation history record for a user
export async function addHistory(historyRecord) {
  const { error } = await supabase.from("history").insert([historyRecord]);

  if (error) throw error;
}

// Deletes a specific translation given its translation ID
export async function deleteTranslation(translationId, userId) {
  const { error } = await supabase.from("history").delete().match({
    translation_id: translationId,
    user_id: userId,
  });

  if (error) throw error;
}

// Delete many history rows
export async function clearUserHistory(userId) {
  const { error } = await supabase
    .from("history")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;
}
