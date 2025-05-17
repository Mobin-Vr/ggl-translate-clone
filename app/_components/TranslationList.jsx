"use client";

import { useState, startTransition } from "react";
import { deleteTranslationAction } from "../_lib/actions";
import HistoryCard from "./HistoryCard";
import { showCustomToast } from "./ui/Notification";

function TranslationList({ history }) {
  const [translations, setTranslations] = useState(history);

  async function handleDelete(translationId) {
    setTranslations((prev) =>
      prev.filter((item) => item.translation_id !== translationId),
    );

    try {
      await deleteTranslationAction(translationId);
    } catch (error) {
      showCustomToast("❌ Failed to delete the translation. Please try again.");
      setTranslations(history);
    }
  }

  return (
    <ul className="divide-y rounded-md border">
      {translations.map((translation) => (
        <HistoryCard
          key={translation.translation_id}
          translation={translation}
          onDelete={() => handleDelete(translation.translation_id)}
        />
      ))}
    </ul>
  );
}

export default TranslationList;
