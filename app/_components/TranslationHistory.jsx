"use client";

import { AlertIcon, XIcon } from "@/public/icons";
import { useEffect, useState } from "react";
import { getHistoryAction } from "../_lib/actions";
import NoPastTranslations from "./NoPastTranslations";
import TranslationList from "./TranslationList";
import { useUser } from "@clerk/nextjs";
import SpinnerMini from "./ui/SpinnerMini";
import Spinner from "./ui/Spinner";

export default function TranslationHistory({
  setInputText,
  setOutputText,
  setInputLang,
  setOutputLang,
  setIsDataFromHistory,
  handleCloseHistory,
  latestInText, // ref
  latestOutLang, // ref
  className,
}) {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    async function getData() {
      try {
        const result = await getHistoryAction(user.id);
        setHistory(result);
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [user?.id]);

  const ErrorMessage = (
    <div className="flex h-full items-center justify-center text-sm text-gray-600">
      <AlertIcon size="16" />
      <p className="ml-2 leading-0">
        Failed to load history. Please{" "}
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 underline"
        >
          refresh the page
        </button>
        .
      </p>
    </div>
  );

  const LoadingSpinner = (
    <div className="flex h-full items-center justify-center">
      <Spinner className="-translate-y-full" />
    </div>
  );

  const Header = (
    <div className="flex border-b border-b-gray-300 px-6 text-gray-600">
      <h1 className="my-5 text-3xl">History</h1>
      <button
        onClick={handleCloseHistory}
        className="hover:bg-icon-hover z-50 mt-2 mr-0 ml-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300"
      >
        <XIcon />
      </button>
    </div>
  );

  const HistoryContent = (
    <>
      {history.length === 0 ? (
        <NoPastTranslations className="h-full -translate-y-12" />
      ) : (
        <TranslationList
          setInputText={setInputText}
          setOutputText={setOutputText}
          setInputLang={setInputLang}
          setOutputLang={setOutputLang}
          setIsDataFromHistory={setIsDataFromHistory}
          latestInText={latestInText} // ref
          latestOutLang={latestOutLang} // ref
          setHistory={setHistory}
          history={history}
        />
      )}
    </>
  );

  return (
    <div className={`${className} flex flex-col`}>
      {Header}

      {error ? ErrorMessage : isLoading ? LoadingSpinner : HistoryContent}
    </div>
  );
}
