"use client";

import { useShallow } from "zustand/react/shallow";
import useTranslateStore from "../translateStore";
import HistoryHeader from "./HistoryHeader";
import NoPastTranslations from "./NoPastTranslations";
import TranslationList from "./TranslationList";

export default function TranslationHistory({ history }) {
  const { setShowHistory, moveHistoryDataToForm, isMobileHistoryView } =
    useTranslateStore(
      useShallow((state) => ({
        setShowHistory: state.setShowHistory,
        moveHistoryDataToForm: state.moveHistoryDataToForm,
        isMobileHistoryView: state.isMobileHistoryView,
      })),
    );

  const isEmpty = history.length === 0;

  return (
    <>
      <HistoryHeader
        setShowHistory={setShowHistory}
        isMobileHistoryView={isMobileHistoryView}
      />

      {isEmpty ? (
        <NoPastTranslations />
      ) : (
        <TranslationList
          history={history}
          moveHistoryDataToForm={moveHistoryDataToForm}
        />
      )}
    </>
  );
}
