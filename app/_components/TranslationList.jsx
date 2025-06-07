"use client";

import { useOptimistic, useTransition } from "react";
import toast from "react-hot-toast";
import {
  clearUserHistoryAction,
  deleteTranslationAction,
} from "../_lib/actions";
import HistoryCard from "./HistoryCard";

function TranslationList({ history, moveHistoryDataToForm }) {
  // eslint-disable-next-line no-unused-vars
  const [isPending, startTransition] = useTransition();
  const [optimisticHistory, deleteOptimistic] = useOptimistic(
    history,
    (current, action) => {
      return action.type === "all"
        ? []
        : current.filter((t) => t.translation_id !== action.id);
    },
  );

  // Delete a specific translation
  function handleDelete(id) {
    deleteOptimistic({ type: "single", id });

    startTransition(async () => {
      const res = await deleteTranslationAction(id);
      if (res?.error) toast.error(res.error);
    });
  }

  // Delete all translations
  function handleDeleteAll() {
    deleteOptimistic({ type: "all" });

    startTransition(async () => {
      const res = await clearUserHistoryAction();
      if (res?.error) toast.error(res.error);
    });
  }

  const isOptEmpty = optimisticHistory.length === 0;

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <ul className="flex-1 overflow-y-auto">
        {optimisticHistory.map((translation) => (
          <HistoryCard
            key={translation.translation_id}
            translation={translation}
            onDelete={() => handleDelete(translation.translation_id)}
            moveHistoryDataToForm={moveHistoryDataToForm}
          />
        ))}
      </ul>

      {!isOptEmpty && (
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
