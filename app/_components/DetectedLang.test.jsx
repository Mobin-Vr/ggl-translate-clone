import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import useTranslateStore from "../translateStore";
import DetectedLang from "./DetectedLang";

function resetStore() {
  useTranslateStore.setState({
    userState: null,
    showHistory: false,
    isMobileHistoryView: false,
    isMainSectionVertical: false,
    audioStatus: {
      isMicRecording: false,
      isInputSpeaking: false,
      isOutputSpeaking: false,
    },
    inputText: "",
    outputText: "",
    inputLang: "",
    outputLang: "",
    latestInText: "",
    latestOutLang: "",
    isDataFromHistory: false,
  });
}

describe("DetectedLang", () => {
  beforeEach(() => {
    resetStore();
  });

  it("shows 'Auto - detection' when no language is detected", () => {
    render(<DetectedLang />);
    expect(screen.getByText("Auto - detection")).toBeInTheDocument();
  });

  it("shows 'English - detected' when a language is detected", () => {
    useTranslateStore.getState().setInputLang("English");
    render(<DetectedLang />);
    expect(screen.getByText("English - detected")).toBeInTheDocument();
  });

  it("shows the raw language without '- detected' when data comes from history", () => {
    useTranslateStore.getState().setInputLang("English");
    useTranslateStore.getState().setIsDataFromHistory(true);
    render(<DetectedLang />);
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.queryByText("English - detected")).not.toBeInTheDocument();
  });

  it("shows 'Auto - detection' when the detected language is 'Unknown language'", () => {
    useTranslateStore.getState().setInputLang("Unknown language");
    render(<DetectedLang />);
    expect(screen.getByText("Auto - detection")).toBeInTheDocument();
  });
});