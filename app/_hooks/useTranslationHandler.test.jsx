import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useTranslateStore from "../translateStore";
import { useTranslationHandler } from "./useTranslationHandler";

// Mock the translation queue so no real network requests are made
vi.mock("../_lib/translation/queu", () => ({
  enqueueTranslation: vi.fn(),
}));

// Mock use-debounce so the debounced value updates immediately
// (avoids waiting the real 1000ms debounce delay in tests)
vi.mock("use-debounce", () => ({
  useDebounce: (value) => [value, vi.fn()],
}));

import { enqueueTranslation } from "../_lib/translation/queu";

const mockEnqueue = vi.mocked(enqueueTranslation);

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

describe("useTranslationHandler", () => {
  beforeEach(() => {
    resetStore();
    mockEnqueue.mockReset();
  });

  it("clears output and latest text when input becomes empty", async () => {
    mockEnqueue.mockResolvedValue({
      translation: "Bonjour",
      detectedLanguage: "English",
    });

    useTranslateStore.getState().setInputText("Hello");
    useTranslateStore.getState().setOutputText("Bonjour");
    useTranslateStore.getState().setLatestInText("Hello");
    useTranslateStore.getState().setOutputLang("French");

    renderHook(() => useTranslationHandler(false, vi.fn()));

    // Wait for the translation to fire
    await waitFor(() => {
      expect(mockEnqueue).toHaveBeenCalled();
    });

    // Now clear the input
    act(() => {
      useTranslateStore.getState().setInputText("");
    });

    await waitFor(() => {
      const state = useTranslateStore.getState();
      expect(state.outputText).toBe("");
      expect(state.latestInText).toBe("");
    });
  });

  it("does not call the API when no output language is selected", async () => {
    useTranslateStore.getState().setInputText("Hello");

    renderHook(() => useTranslationHandler(false, vi.fn()));

    // Give the debounce time to fire
    await new Promise((r) => setTimeout(r, 1200));

    expect(mockEnqueue).not.toHaveBeenCalled();
  });

  it("does not call the API when output language is 'Select a language'", async () => {
    useTranslateStore.getState().setInputText("Hello");
    useTranslateStore.getState().setOutputLang("Select a language");

    renderHook(() => useTranslationHandler(false, vi.fn()));

    await new Promise((r) => setTimeout(r, 1200));

    expect(mockEnqueue).not.toHaveBeenCalled();
  });

  it("calls the API with trimmed text and the selected output language", async () => {
    mockEnqueue.mockResolvedValue({
      translation: "Bonjour",
      detectedLanguage: "English",
    });

    useTranslateStore.getState().setOutputLang("French");

    renderHook(() => useTranslationHandler(false, vi.fn()));

    act(() => {
      useTranslateStore.getState().setInputText("  Hello  ");
    });

    await waitFor(() => {
      expect(mockEnqueue).toHaveBeenCalledWith({
        inputText: "Hello",
        outputLang: "French",
      });
    });

    await waitFor(() => {
      const state = useTranslateStore.getState();
      expect(state.outputText).toBe("Bonjour");
      expect(state.inputLang).toBe("English");
    });
  });

  it("sets isPending to true while translating and false after completion", async () => {
    let resolveTranslation;
    mockEnqueue.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveTranslation = resolve;
        }),
    );

    useTranslateStore.getState().setOutputLang("French");

    const { result } = renderHook(() => useTranslationHandler(false, vi.fn()));

    act(() => {
      useTranslateStore.getState().setInputText("Hello");
    });

    await waitFor(() => {
      expect(mockEnqueue).toHaveBeenCalled();
    });

    expect(result.current).toBe(true);

    await act(async () => {
      resolveTranslation({
        translation: "Bonjour",
        detectedLanguage: "English",
      });
    });

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it("discards stale results when input changes while waiting (latest-wins)", async () => {
    let resolveFirst;
    mockEnqueue
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockResolvedValueOnce({
        translation: "Bonjour",
        detectedLanguage: "English",
      });

    useTranslateStore.getState().setOutputLang("French");

    renderHook(() => useTranslationHandler(false, vi.fn()));

    act(() => {
      useTranslateStore.getState().setInputText("Hello");
    });

    await waitFor(() => {
      expect(mockEnqueue).toHaveBeenCalledTimes(1);
    });

    // Change input while the first request is still pending
    act(() => {
      useTranslateStore.getState().setInputText("Hello world");
    });

    await waitFor(() => {
      expect(mockEnqueue).toHaveBeenCalledTimes(2);
    });

    // Resolve the stale (first) request - its result must be discarded
    await act(async () => {
      resolveFirst({
        translation: "STALE",
        detectedLanguage: "English",
      });
    });

    // The output should NOT contain the stale translation
    expect(useTranslateStore.getState().outputText).not.toBe("STALE");

    // The latest request resolves with the correct result
    await waitFor(() => {
      expect(useTranslateStore.getState().outputText).toBe("Bonjour");
    });
  });

  it("skips translation when data is loaded from history", async () => {
    // Set input and latest values to match so the hook does not clear
    // isDataFromHistory on mount
    useTranslateStore.getState().setInputText("Hello");
    useTranslateStore.getState().setLatestInText("Hello");
    useTranslateStore.getState().setLatestOutLang("French");
    useTranslateStore.getState().setIsDataFromHistory(true);
    useTranslateStore.getState().setOutputLang("French");

    renderHook(() => useTranslationHandler(false, vi.fn()));

    await new Promise((r) => setTimeout(r, 100));

    expect(mockEnqueue).not.toHaveBeenCalled();
  });

  it("skips translation while swapping languages", async () => {
    useTranslateStore.getState().setOutputLang("French");

    const setIsSwaping = vi.fn();
    renderHook(() => useTranslationHandler(true, setIsSwaping));

    act(() => {
      useTranslateStore.getState().setInputText("Hello");
    });

    await new Promise((r) => setTimeout(r, 1200));

    expect(mockEnqueue).not.toHaveBeenCalled();
    expect(setIsSwaping).toHaveBeenCalledWith(false);
  });
});