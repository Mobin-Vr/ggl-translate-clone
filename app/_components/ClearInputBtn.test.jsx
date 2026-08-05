import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import useTranslateStore from "../translateStore";
import ClearInputBtn from "./ClearInputBtn";

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

describe("ClearInputBtn", () => {
  beforeEach(() => {
    resetStore();
  });

  it("does not render when the input is empty", () => {
    render(<ClearInputBtn />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("does not render when the input is only whitespace", () => {
    useTranslateStore.getState().setInputText("   ");
    render(<ClearInputBtn />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("clears input, output, and detected language when clicked", async () => {
    const user = userEvent.setup();

    useTranslateStore.getState().setInputText("Hello");
    useTranslateStore.getState().setOutputText("Bonjour");
    useTranslateStore.getState().setInputLang("English");

    render(<ClearInputBtn />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    await user.click(button);

    const state = useTranslateStore.getState();
    expect(state.inputText).toBe("");
    expect(state.outputText).toBe("");
    expect(state.inputLang).toBe("");
  });
});