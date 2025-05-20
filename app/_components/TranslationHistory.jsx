"use client";

import { XIcon } from "@/public/icons";
import { useEffect, useState } from "react";
import { getHistoryAction } from "../_lib/actions";
import NoPastTranslations from "./NoPastTranslations";
import TranslationList from "./TranslationList";
import { useUser } from "@clerk/nextjs";
import Spinner from "./ui/Spinner";
import SpinnerMini from "./ui/SpinnerMini";

function TranslationHistory({ className, handleCloseHistory }) {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user?.id) return;

    async function getData() {
      try {
        const result = await getHistoryAction(user.id);
        setHistory(result);
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setError("Failed to load history, please refresh the page");
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [isLoaded, user?.id]);

  if (isLoading) return <SpinnerMini />;
  if (error) return <p>{error}</p>; // TODO LATER make it nicer with a link(refresh) and a icon (ex in a circle)

  return (
    <div className={className}>
      <div className="flex border border-b border-b-gray-300">
        <h1 className="my-5 text-3xl text-gray-600">History</h1>
        <button onClick={handleCloseHistory} className="mr-0 ml-auto">
          <XIcon />
        </button>
      </div>

      <div className="flex w-full justify-end">
        <button className="">clear history</button>
      </div>

      {history.length === 0 ? (
        <NoPastTranslations />
      ) : (
        <TranslationList history={history} />
      )}
    </div>
  );
}

export default TranslationHistory;
