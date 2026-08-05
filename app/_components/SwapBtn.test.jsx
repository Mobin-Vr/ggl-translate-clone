import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useTranslateStore from "../translateStore";
import SwapBtn from "./SwapBtn";

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

describe("SwapBtn", () => {
  beforeEach(() => {
    resetStore();
  });

  it("swaps input and output text and languages", async () => {
    const user = userEvent.setup();
    const setIsSwaping = vi.fn();

    useTranslateStore.getState().setInputText("Hello");
    useTranslateStore.getState().setOutputText("Bonjour");
    useTranslateStore.getState().setInputLang("English");
    useTranslateStore.getState().setOutputLang("French");

    render(<SwapBtn setIsSwaping={setIsSwaping} />);

    await user.click(screen.getByRole("button"));

    const state = useTranslateStore.getState();
    expect(state.inputText).toBe("Bonjour");
    expect(state.outputText).toBe("Hello");
    expect(state.inputLang).toBe("French");
    expect(state.outputLang).toBe("English");
    expect(state.latestInText).toBe("Bonjour");
    expect(state.latestOutLang).toBe("English");
    expect(setIsSwaping).toHaveBeenCalledWith(true);
  });

  it("maps 'Select a language' output lang to empty input lang on swap", async () => {
    const user = userEvent.setup();
    const setIsSwaping = vi.fn();

    useTranslateStore.getState().setInputText("Hello");
    useTranslateStore.getState().setOutputText("");
    useTranslateStore.getState().setInputLang("English");
    useTranslateStore.getState().setOutputLang("Select a language");

    render(<SwapBtn setIsSwaping={setIsSwaping} />);

    await user.click(screen.getByRole("button"));

    const state = useTranslateStore.getState();
    expect(state.inputLang).toBe("");
    expect(state.outputLang).toBe("English");
  });

  it("maps empty or 'Not' input lang to 'Select a language' output lang on swap", async () => {
    const user = userEvent.setup();
    const setIsSwaping = vi.fn();

    useTranslateStore.getState().setInputText("Hello");
    useTranslateStore.getState().setOutputText("Bonjour");
    useTranslateStore.getState().setInputLang("Not");
    useTranslateStore.getState().setOutputLang("French");

    render(<SwapBtn setIsSwaping={setIsSwaping} />);

    await user.click(screen.getByRole("button"));

    const state = useTranslateStore.getState();
    expect(state.outputLang).toBe("Select a language");
    expect(state.inputLang).toBe("French");
  });

  it("swaps text even when no languages are set", async () => {
    const user = userEvent.setup();
    const setIsSwaping = vi.fn();

    useTranslateStore.getState().setInputText("Hello");
    useTranslateStore.getState().setOutputText("Bonjour");

    render(<SwapBtn setIsSwaping={setIsSwaping} />);

    await user.click(screen.getByRole("button"));

    const state = useTranslateStore.getState();
    expect(state.inputText).toBe("Bonjour");
    expect(state.outputText).toBe("Hello");
  });
});