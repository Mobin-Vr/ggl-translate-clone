import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { getHistoryAction, getLanguagesAction } from "./_lib/actions";
import { getHistory } from "./_lib/data-services";

const useTranslateStore = create(
  devtools(
    persist(
      (set, get) => ({
        // User and Tasks Data
        userState: null,

        // # Set user's info
        setUserState: (userState) => {
          set(
            produce((state) => {
              state.userState = userState;
            }),
          );
        },

        // # get users info
        getUserState: () => {
          return get().userState;
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
