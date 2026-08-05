import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useTranslateStore from "../translateStore";
import TranslationForm from "./TranslationForm";

// Mock the translation queue so no real network requests are made
vi.mock("../_lib/translation/queu", () => ({
  enqueueTranslation: vi.fn(),
}));

// Mock use-debounce so the debounced value updates immediately
// (avoids waiting the real 1000ms debounce delay in tests)
vi.mock("use-debounce", () => ({
  useDebounce: (value) => [value, vi.fn()],
}));

// Mock heavy child components that depend on browser APIs
vi.mock("./Recorder", () => ({
  default: () => null,
}));
vi.mock("./Speaker", () => ({
  default: () => null,
}));
vi.mock("./CopyToClipboard", () => ({
  default: () => null,
}));
vi.mock("./GoogleSearchBtn", () => ({
  default: () => null,
}));
vi.mock("./ui/TranslateFeatures", () => ({
  default: () => null,
}));
vi.mock("./HistoryAccessModal", () => ({
  default: () => null,
}));

import { enqueueTranslation } from "../_lib/translation/queu";

const mockEnqueue = vi.mocked(enqueueTranslation);

const languages = [
  { id: "en", name: "English" },
  { id: "fr", name: "French" },
  { id: "de", name: "German" },
];

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

describe("TranslationForm", () => {
  beforeEach(() => {
    resetStore();
    mockEnqueue.mockReset();
  });

  it("renders the input textarea and language selector", () => {
    render(
      <TranslationForm
        supportedLangs={languages}
        recentHistory={[]}
        userId={null}
      />,
    );

    expect(screen.getByPlaceholderText("Translation")).toBeInTheDocument();
    expect(screen.getByText("Auto - detection")).toBeInTheDocument();
  });

  it("types text, selects a language, and shows the translated output", async () => {
    const user = userEvent.setup();
    mockEnqueue.mockResolvedValue({
      translation: "Bonjour",
      detectedLanguage: "English",
    });

    render(
      <TranslationForm
        supportedLangs={languages}
        recentHistory={[]}
        userId={null}
      />,
    );

    // Type into the source textarea (the first textbox)
    const input = screen.getAllByRole("textbox")[0];
    await user.type(input, "Hello");

    // Open the language dropdown and select French
    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByText("French"));

    // Wait for the debounced translation to complete
    await waitFor(
      () => {
        expect(screen.getByDisplayValue("Bonjour")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    expect(mockEnqueue).toHaveBeenCalledWith({
      inputText: "Hello",
      outputLang: "French",
    });
  });

  it("clears the output when the input is cleared", async () => {
    const user = userEvent.setup();
    mockEnqueue.mockResolvedValue({
      translation: "Bonjour",
      detectedLanguage: "English",
    });

    useTranslateStore.getState().setOutputLang("French");

    render(
      <TranslationForm
        supportedLangs={languages}
        recentHistory={[]}
        userId={null}
      />,
    );

    const input = screen.getAllByRole("textbox")[0];
    await user.type(input, "Hello");

    await waitFor(
      () => {
        expect(screen.getByDisplayValue("Bonjour")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await user.clear(input);

    await waitFor(
      () => {
        expect(screen.queryByDisplayValue("Bonjour")).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});