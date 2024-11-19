'use server';

import { revalidatePath } from 'next/cache';
import { parseFormDataLang } from '../_utils/utils';
import { getHistory } from './data-services';
import { detectLanguage, translateText } from './googleAI';
import { supabase } from './supabase';
import { signIn, signOut } from './auth';

export async function translate(prevState, formData) {
   // CHANGE Do Authentican alter

   const rawFormData = {
      inputText: formData.get('inputText'),
      outputText: formData.get('outputText'),
      inputLanguage: parseFormDataLang(formData.get('inputLanguage')),
      outputLanguage: parseFormDataLang(formData.get('outputLanguage')),
   };

   const { inputText, outputText, inputLanguage, outputLanguage } = rawFormData;

   if (!inputText || !outputLanguage) {
      throw new Error(
         'Please provide both the text, input language, and the target language.'
      );
   }

   try {
      // Call the translation functions
      const [detectedInputLanguage, translatedText] = await Promise.all([
         inputLanguage.name === 'Auto-Detection'
            ? detectLanguage(inputText)
            : Promise.resolve(inputLanguage),
         translateText(inputText, outputLanguage.name),
      ]);

      // Create a new record to store translation history in the database
      const newHistory = {
         inputText: inputText,
         outputText: translatedText,
         userId: 1, // CHANGE as needed
         outputLanguage: outputLanguage.name,
         outputLanguageDir: outputLanguage.direction || null,
         inputLanguage:
            inputLanguage.name === 'Auto-Detection'
               ? detectedInputLanguage
               : inputLanguage.name,
      };

      // Insert the new record into the history table in Supabase
      const { error } = await supabase.from('history').insert([newHistory]);

      if (error) {
         console.error('Error inserting history:', error.message);
         throw new Error('History record could not be created');
      }

      revalidatePath('/');

      // Return translated text to the client
      return {
         ...prevState,
         outputText: translatedText,
         inputLanguage: newHistory.inputLanguage,
      };
   } catch (error) {
      console.error('Full error details:', error.message, error.stack);
      throw new Error('An error has occurred');
   }
}

export async function deleteTranslation(TranslationId) {
   // 1) Authentican

   // 2) Authorization
   const userHistory = await getHistory(1); // CHANGE later with real userId (not translationID)
   const userHistoryIds = userHistory.map((translation) => translation.id);

   if (!userHistoryIds.includes(TranslationId))
      throw new Error('You are not allowed to delete this translation');

   // 3) Delete record from DB
   const { error } = await supabase
      .from('history')
      .delete()
      .eq('id', TranslationId);

   if (error) throw new Error('Translation could not be deleted');

   revalidatePath('/');
}

export async function signInAction() {
   await signIn('google', { redirectTo: '/' });
}

export async function signOutAction() {
   await signOut({ redirectTo: '/' });
}
