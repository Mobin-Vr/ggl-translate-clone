import { create } from "zustand";
import { produce } from "immer";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

// Reusable form state
const initialFormState = {
  inputText: "",
  outputText: "",
  inputLang: "",
  outputLang: "",
  latestInText: "",
  latestOutLang: "",
  isDataFromHistory: false,
};

const useTranslateStore = create(
  devtools(
    persist(
      (set, get) => {
        const immerSet = (fn) => set(produce(fn));

        return {
          userState: null,

          showHistory: false,
          isMobileHistoryView: false,
          isMainSectionVertical: false,

          ...initialFormState,

          // Setters
          setUserState: (userState) =>
            immerSet((s) => {
              s.userState = userState;
            }),

          setIsMainSectionVertical: (bool) =>
            immerSet((s) => {
              s.isMainSectionVertical = bool;
            }),

          setShowHistory: (bool) =>
            immerSet((s) => {
              s.showHistory = bool;
            }),

          setIsMobileHistoryView: (bool) =>
            immerSet((s) => {
              s.isMobileHistoryView = bool;
            }),

          setInputText: (text) =>
            immerSet((s) => {
              s.inputText = text;
            }),

          setOutputText: (text) =>
            immerSet((s) => {
              s.outputText = text;
            }),

          setInputLang: (lang) =>
            immerSet((s) => {
              s.inputLang = lang;
            }),

          setOutputLang: (lang) =>
            immerSet((s) => {
              s.outputLang = lang;
            }),

          setLatestInText: (text) =>
            immerSet((s) => {
              s.latestInText = text;
            }),

          setLatestOutLang: (lang) =>
            immerSet((s) => {
              s.latestOutLang = lang;
            }),

          setIsDataFromHistory: (bool) =>
            immerSet((s) => {
              s.isDataFromHistory = bool;
            }),

          // Set form with translation from history
          moveHistoryDataToForm: (translation) => {
            immerSet(() => ({
              inputText: translation.input_text,
              outputText: translation.output_text,
              inputLang: translation.input_language,
              outputLang: translation.output_language,
              latestInText: translation.input_text,
              latestOutLang: translation.output_language,
              isDataFromHistory: true,
            }));
          },

          // Reset form to initial state
          resetForm: () =>
            immerSet((state) => {
              Object.assign(state, initialFormState);
            }),

          // Getters
          getUserState: () => get().userState,
          getLatestInText: () => get().latestInText,
          getLatestOutLang: () => get().latestOutLang,
          getIsDataFromHistory: () => get().isDataFromHistory,
        };
      },
      {
        name: "Translate Store",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { name: "Translate Store" },
  ),
);

export default useTranslateStore;
