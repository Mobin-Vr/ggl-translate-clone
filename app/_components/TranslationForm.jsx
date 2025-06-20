"use client";

import { useRef, useState } from "react";

import { useShallow } from "zustand/react/shallow";
import { useHistoryModal } from "../_hooks/useHistoryModal";
import useSetMostFrequentOutLang from "../_hooks/useSetMostFrequentOutLang";
import { useTextareaSyncHeight } from "../_hooks/useTextareaSyncHeight";
import { useTranslationHandler } from "../_hooks/useTranslationHandler";
import useTranslateStore from "../translateStore";
import HistoryAccessModal from "./HistoryAccessModal";
import HistoryBtn from "./HistoryBtn";
import InputView from "./InputView";
import LanguageBar from "./LanguageBar";
import OutputView from "./OutputView";
import TranslationContentLayout from "./TranslationContentLayout";
import TranslateFeatures from "./ui/TranslateFeatures";

export default function TranslationForm({
  supportedLangs,
  recentHistory,
  userId,
}) {
  const [isSwaping, setIsSwaping] = useState(false);
  const inputElementRef = useRef(null);
  const outputElementRef = useRef(null);

  const {
    isMainSectionVertical,
    showHistory,
    inputText,
    outputText,
    setShowHistory,
  } = useTranslateStore(
    useShallow((state) => ({
      isMainSectionVertical: state.isMainSectionVertical,
      showHistory: state.showHistory,
      inputText: state.inputText,
      outputText: state.outputText,
      setShowHistory: state.setShowHistory,
    })),
  );

  const { isModalOpen, openModal, closeModal, modalRef } = useHistoryModal();

  // Keeps track of the most used language
  useSetMostFrequentOutLang(recentHistory);

  // Keeps both textareas at the same height by matching them to the taller one
  useTextareaSyncHeight(inputElementRef, outputElementRef, [
    inputText,
    outputText,
  ]);

  const isPending = useTranslationHandler(isSwaping, setIsSwaping);

  function handleHistoryBtnClick() {
    if (!userId) {
      openModal();
      return;
    }

    setShowHistory(!showHistory);
  }

  return (
    <div
      className={`relative ${showHistory && isMainSectionVertical ? "px-0" : "px-3"}`}
    >
      <TranslateFeatures className={`h-[3.5rem] px-3`} />

      <LanguageBar
        languages={supportedLangs}
        setIsSwaping={setIsSwaping}
        className={isMainSectionVertical ? "justify-around" : ""} // TODO LATER check this later
      />

      <TranslationContentLayout>
        <InputView inputElementRef={inputElementRef} />
        <OutputView isPending={isPending} outputElementRef={outputElementRef} />
      </TranslationContentLayout>

      <HistoryBtn showHistory={showHistory} onClick={handleHistoryBtnClick} />

      {isModalOpen && (
        <HistoryAccessModal ref={modalRef} onClose={closeModal} />
      )}
    </div>
  );
}
