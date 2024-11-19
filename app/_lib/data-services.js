import { supabase } from './supabase';

export async function getLanguages() {
   const { data, error } = await supabase.from('languages').select('*');

   // For testing
   //  await new Promise((res) => setTimeout(res, 5000));

   if (error) {
      console.error(error);
      throw new Error('Languages could not be loaded');
   }
   return data;
}

export async function getHistory(userId) {
   const { data, error } = await supabase
      .from('history')
      .select('*')
      .eq('userId', userId)
      .order('created_at', { ascending: false });

   //  For testing
   await new Promise((res) => setTimeout(res, 5000));

   if (error) {
      console.error(error);
      throw new Error('History could not be loaded');
   }

   return data;
}

// Guests are uniquely identified by their email address
export async function getUser(email) {
   const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

   // No error here! We handle the possibility of no guest in the sign in callback

   return data;
}

export async function createUser(newGuest) {
   const { data, error } = await supabase.from('users').insert([newGuest]);

   if (error) {
      console.error(error);
      throw new Error('Guest could not be created');
   }

   return data;
}
