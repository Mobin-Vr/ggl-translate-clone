import useTranslateStore from "@/app/translateStore";
import { useEffect } from "react";

import { useShallow } from "zustand/react/shallow";

// Helper function to find the most frequent item in an array
function getMostFrequent(arr) {
  if (!arr.length) return null;

  const freqMap = {};
  let maxCount = 0;
  let mostFrequent = null;

  for (const item of arr) {
    freqMap[item] = (freqMap[item] || 0) + 1;

    if (freqMap[item] > maxCount) {
      maxCount = freqMap[item];
      mostFrequent = item;
    }
  }

  return mostFrequent;
}

export default function useSetMostFrequentOutLang(recentHistory) {
  const { setOutLang, outputLang } = useTranslateStore(
    useShallow((state) => ({
      setOutLang: state.setOutputLang,
      outputLang: state.outputLang,
    })),
  );

  useEffect(() => {
    if (outputLang || !recentHistory || !recentHistory.length) return;

    const langs = recentHistory.map((item) => item.output_language);
    const mostUsed = getMostFrequent(langs);

    if (mostUsed) setOutLang(mostUsed);
  }, [recentHistory, setOutLang, outputLang]);
}
