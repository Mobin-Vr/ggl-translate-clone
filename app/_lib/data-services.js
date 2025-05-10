import { supabase } from './supabase';
import { openai } from './deepseek';

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

   //  //  For testing
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

/////////////////////////////////
/////////////////////////////////

export async function aiTranslator(text, targetLang) {
   const response = await openai.path('/chat/completions').post({
      body: {
         messages: [
            // {
            //    role: 'system',
            //    content:
            //       'You are a professional translator. you have to just translate without adding any extra words or explanations',
            // },
            {
               role: 'user',
               content: `Translate to: [${text} / the text is: ${targetLang}]`,
            },
         ],
         model: 'DeepSeek-R1',
         max_tokens: 2048,
      },
   });

   if (isUnexpected(response)) throw response.body.error;

   console.log(response.body.choices[0].message.content);

   return response.body.choices[0].message.content;
}

aiTranslator().catch((err) => {
   console.error('The sample encountered an error:', err);
});
