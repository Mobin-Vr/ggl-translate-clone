import { beforeEach, describe, expect, it } from "vitest";
import useTranslateStore from "./translateStore";

describe("translateStore", () => {
  beforeEach(() => {
    // Reset the store to its initial state before each test
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
  });

  it("sets input text", () => {
    useTranslateStore.getState().setInputText("Hello");
    expect(useTranslateStore.getState().inputText).toBe("Hello");
  });

  it("sets output text", () => {
    useTranslateStore.getState().setOutputText("Bonjour");
    expect(useTranslateStore.getState().outputText).toBe("Bonjour");
  });

  it("sets input and output languages", () => {
    useTranslateStore.getState().setInputLang("English");
    useTranslateStore.getState().setOutputLang("French");
    expect(useTranslateStore.getState().inputLang).toBe("English");
    expect(useTranslateStore.getState().outputLang).toBe("French");
  });

  it("sets latest input text and output lang", () => {
    useTranslateStore.getState().setLatestInText("Hello");
    useTranslateStore.getState().setLatestOutLang("French");
    expect(useTranslateStore.getState().latestInText).toBe("Hello");
    expect(useTranslateStore.getState().latestOutLang).toBe("French");
  });

  it("sets isDataFromHistory flag", () => {
    expect(useTranslateStore.getState().isDataFromHistory).toBe(false);
    useTranslateStore.getState().setIsDataFromHistory(true);
    expect(useTranslateStore.getState().isDataFromHistory).toBe(true);
  });

  it("sets audio status by merging partial updates", () => {
    useTranslateStore.getState().setAudioStatus({ isMicRecording: true });
    expect(useTranslateStore.getState().audioStatus).toEqual({
      isMicRecording: true,
      isInputSpeaking: false,
      isOutputSpeaking: false,
    });
  });

  it("resets the form to its initial state", () => {
    useTranslateStore.getState().setInputText("Hello");
    useTranslateStore.getState().setOutputText("Bonjour");
    useTranslateStore.getState().setInputLang("English");
    useTranslateStore.getState().setOutputLang("French");
    useTranslateStore.getState().setLatestInText("Hello");
    useTranslateStore.getState().setLatestOutLang("French");
    useTranslateStore.getState().setIsDataFromHistory(true);

    useTranslateStore.getState().resetForm();

    const state = useTranslateStore.getState();
    expect(state.inputText).toBe("");
    expect(state.outputText).toBe("");
    expect(state.inputLang).toBe("");
    expect(state.outputLang).toBe("");
    expect(state.latestInText).toBe("");
    expect(state.latestOutLang).toBe("");
    expect(state.isDataFromHistory).toBe(false);
  });

  it("moves history data into the form", () => {
    const translation = {
      input_text: "Hello",
      output_text: "Bonjour",
      input_language: "English",
      output_language: "French",
    };

    useTranslateStore.getState().moveHistoryDataToForm(translation);

    const state = useTranslateStore.getState();
    expect(state.inputText).toBe("Hello");
    expect(state.outputText).toBe("Bonjour");
    expect(state.inputLang).toBe("English");
    expect(state.outputLang).toBe("French");
    expect(state.latestInText).toBe("Hello");
    expect(state.latestOutLang).toBe("French");
    expect(state.isDataFromHistory).toBe(true);
  });

  it("exposes getters for latest values", () => {
    useTranslateStore.getState().setLatestInText("Hello");
    useTranslateStore.getState().setLatestOutLang("French");
    useTranslateStore.getState().setIsDataFromHistory(true);

    expect(useTranslateStore.getState().getLatestInText()).toBe("Hello");
    expect(useTranslateStore.getState().getLatestOutLang()).toBe("French");
    expect(useTranslateStore.getState().getIsDataFromHistory()).toBe(true);
  });
});