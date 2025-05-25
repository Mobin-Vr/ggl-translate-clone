import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useTranslateStore = create(
  devtools(
    persist(
      (set, get) => ({
        userState: null,

        isMainSectionVertical: false,
        showHistory: false,
        isDataFromHistory: false,

        inputText: "",
        outputText: "",
        inputLang: "",
        outputLang: "",
        latestInText: "",
        latestOutLang: "",

        // # Set user's info
        setUserState: (userState) => {
          set(
            produce((state) => {
              state.userState = userState;
            }),
          );
        },

        // # Set main section layout vertical or horizontal
        setIsMainSectionVertical: (bool) => {
          set(
            produce((state) => {
              state.isMainSectionVertical = bool;
            }),
          );
        },

        // # Set show history or not
        setShowHistory: (bool) => {
          set(
            produce((state) => {
              state.showHistory = bool;
            }),
          );
        },

        // # Set input text
        setInputText: (text) => {
          set(
            produce((state) => {
              state.inputText = text;
            }),
          );
        },

        // # Set output text
        setOutputText: (text) => {
          set(
            produce((state) => {
              state.outputText = text;
            }),
          );
        },

        // # Set input language
        setInputLang: (lang) => {
          set(
            produce((state) => {
              state.inputLang = lang;
            }),
          );
        },

        // # Set output language
        setOutputLang: (lang) => {
          set(
            produce((state) => {
              state.outputLang = lang;
            }),
          );
        },

        // # Set latest input text
        setLatestInText: (text) => {
          set(
            produce((state) => {
              state.latestInText = text;
            }),
          );
        },

        // # Set latest output language
        setLatestOutLang: (lang) => {
          set(
            produce((state) => {
              state.latestOutLang = lang;
            }),
          );
        },

        // # Set is data from history or not
        setIsDataFromHistory: (bool) => {
          set(
            produce((state) => {
              state.isDataFromHistory = bool;
            }),
          );
        },

        // # get users info
        getUserState: () => {
          return get().userState;
        },

        // # get latest input text
        getLatestInText: () => {
          return get().latestInText;
        },

        // # get latest output language
        getLatestOutLang: () => {
          return get().latestOutLang;
        },
      }),
      {
        name: "Translate Store", // Key name for storage
        storage: createJSONStorage(() => sessionStorage), // Use localStorage for persisting the data
      },
    ),
    { name: "Translate Store" }, // Redux DevTools name
  ),
);

export default useTranslateStore;
