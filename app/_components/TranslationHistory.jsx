"use client";

import { useShallow } from "zustand/react/shallow";
import useTranslateStore from "../translateStore";
import CloseHistoryBtn from "./CloseHistoryBtn";
import NoPastTranslations from "./NoPastTranslations";
import TranslationList from "./TranslationList";

export default function TranslationHistory({ history }) {
  const { setShowHistory, moveHistoryDataToForm } = useTranslateStore(
    useShallow((state) => ({
      setShowHistory: state.setShowHistory,
      moveHistoryDataToForm: state.moveHistoryDataToForm,
    })),
  );

  const isEmpty = history.length === 0;

  console.log(<TranslationList history={history} />);

  return (
    <div className="fixed top-[65px] right-0 z-50 flex h-[calc(100vh-65px)] w-full flex-col border-l border-gray-300 md:max-w-[21rem] xl:max-w-[30rem]">
      <CloseHistoryBtn setShowHistory={setShowHistory} />

      {isEmpty ? (
        <NoPastTranslations />
      ) : (
        <TranslationList
          history={history}
          moveHistoryDataToForm={moveHistoryDataToForm}
        />
      )}
    </div>
  );
}
