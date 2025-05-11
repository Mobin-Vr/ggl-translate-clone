import { supabase } from './supabase';
import { openai } from './deepseek';

export async function getLanguages() {
   const { data, error } = await supabase.from('languages').select('*');

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

   //  await new Promise((res) => setTimeout(res, 5000));

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

// Creates a new user in the "users" table
export async function createUser(newUser) {
   const { data, error } = await supabase
      .from('users')
      .insert([newUser])
      .select();

   if (error) throw new Error(error.message || JSON.stringify(error));

   return data;
}

// Retrieves a user by their email address
export async function getUserByEmail(userEmail) {
   const { data } = await supabase
      .from('users')
      .select('*')
      .eq('user_email', userEmail)
      .single();

   return data;
}

// Translator function (deepseek ai)
export async function aiTranslator(text, targetLang) {
   console.log(`>>> Translate this text to "${targetLang}":\n\n${text}`);

   try {
      const response = await openai.chat.completions.create({
         messages: [
            {
               role: 'system',
               content: `You are a professional and precise translator. Translate the given input into the specified target language only. Do not add explanations or repeat the source text.`,
            },
            {
               role: 'user',
               content: `Translate this text to "${targetLang}":\n\n${text}`,
            },
         ],
         model: 'deepseek-chat',
         temperature: 1.3,
         max_tokens: 1000,
      });

      const translation = response.choices[0]?.message?.content?.trim();

      if (!translation) {
         throw new Error('No translation returned from the AI model.');
      }

      console.log(translation);

      return translation;
   } catch (err) {
      console.error('Translation failed:', err.message || err);
      throw new Error('Translation failed. Please try again later.');
   }
}
