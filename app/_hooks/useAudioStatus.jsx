import { useShallow } from "zustand/react/shallow";
import useTranslateStore from "../translateStore";

export function useAudioStatus() {
  return useTranslateStore(
    useShallow((state) => ({
      audioStatus: state.audioStatus,
      setAudioStatus: state.setAudioStatus,
    })),
  );
}
