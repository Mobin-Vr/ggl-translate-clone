"use client";

import { useState, startTransition } from "react";
import {
  deleteAllTranslationsAction,
  deleteManyTranslationsAction,
  deleteTranslationAction,
} from "../_lib/actions";
import HistoryCard from "./HistoryCard";
import { showCustomToast } from "./ui/Notification";

function TranslationList({
  setInputText,
  setOutputText,
  setInputLang,
  setOutputLang,
  setIsDataFromHistory,
  latestInText, // ref
  latestOutLang, // ref
  history,
  setHistory,
}) {
  // Keep a local copy of history for UI interaction.
  // We avoid mutating the original source (`history`) since it's refreshed on each page load —
  // this allows safe local edits (like optimistic updates) without risk of losing the main data.
  const [translations, setTranslations] = useState(history);

  // Handles deletion of a single translation
  async function handleDelete(translationId) {
    //1. Optimistically update UI by removing the translation locally
    setTranslations((prev) =>
      prev.filter((item) => item.translation_id !== translationId),
    );

    try {
      //2. Attempt to delete the translation from the database
      await deleteTranslationAction(translationId);
    } catch (error) {
      // 3. If deletion fails, show error and revert local state
      showCustomToast("❌ Failed to delete the translation. Please try again.");
      setTranslations(history);
    }
  }

  // Moves the selected history item back into the translation form
  function handleMoveHistoryDataToForm(translation) {
    const {
      input_text: inputText,
      output_text: outputText,
      input_language: inputLang,
      output_language: outputLang,
    } = translation;

    setInputText(inputText);
    setOutputText(outputText);
    setInputLang(inputLang);
    setOutputLang(outputLang);
    setIsDataFromHistory(true);
    latestInText.current = inputText;
    latestOutLang.current = outputLang;
  }

  // Handles deletion of all translation history
  async function handleDeleteAll() {
    // 1. Optimistically clear the translation list from UI
    setTranslations([]);

    try {
      // 2. Attempt to delete all translations from the database
      await deleteAllTranslationsAction();

      // 3. Update history state to keep all UI components synchronized after successful deletion
      setHistory([]);
    } catch (error) {
      // 4. If deletion fails, show error and restore original history
      showCustomToast("❌ Failed to clear the history. Please try again.");
      setTranslations(history);
    }
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <ul className="flex-1 overflow-y-auto">
        {translations.map((translation) => (
          <HistoryCard
            key={translation.translation_id}
            translation={translation}
            onDelete={() => handleDelete(translation.translation_id)}
            onClick={() => handleMoveHistoryDataToForm(translation)}
          />
        ))}
      </ul>

      {translations.length !== 0 && (
        <div className="flex w-full shrink-0 justify-end bg-gray-100">
          <button
            onClick={handleDeleteAll}
            className="my-2.5 mr-4 rounded-sm px-2 py-1 pt-1.5 text-[0.9rem] text-blue-600 hover:bg-gray-300"
          >
            clear all history
          </button>
        </div>
      )}
    </div>
  );
}

export default TranslationList;
