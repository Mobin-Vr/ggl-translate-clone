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
