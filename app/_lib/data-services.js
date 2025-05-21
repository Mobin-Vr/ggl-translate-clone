import { supabase } from "./supabase";

// Gets the translation history for a specific user
export async function getHistory(userId) {
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
}

// Stores a new translation history record for a user
export async function addHistory(historyRecord) {
  const { error } = await supabase.from("history").insert([historyRecord]);

  if (error) {
    console.error(error);
    throw new Error("Failed to store translation history in supabase");
  }
}

// Gets the supported languages from the translation service
export async function getLanguages() {
  const { data, error } = await supabase.from("languages").select("*");

  if (error) {
    console.error(error);
    throw new Error("Languages could not be loaded");
  }

  return data;
}

// Creates a new user in the "users" table
export async function createUser(newUser) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Retrieves a user by their email address
export async function getUserByEmail(userEmail) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("user_email", userEmail)
    .single();

  return data;
}

// Retrieves a user by their ID
export async function getUserById(userId) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  return data;
}

// Deletes a specific translation given its translation ID
export async function deleteTranslation(translationId) {
  const { error } = await supabase
    .from("history")
    .delete()
    .eq("translation_id", translationId);

  if (error) {
    console.error(error);
    throw new Error("Translation could not be deleted");
  }
}

// Delete many history rows
export async function deleteHistoryRows(translationIds) {
  const { data, error } = await supabase
    .from("history")
    .delete()
    .in("translation_id", translationIds);

  if (error) {
    console.error("Error deleting rows:", error);
    return;
  }

  return { successStatus: true };
}
