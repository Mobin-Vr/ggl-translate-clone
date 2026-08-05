import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the server action so no real network requests are made
vi.mock("../actions", () => ({
  translate: vi.fn(),
}));

import { translate } from "../actions";
import { enqueueTranslation } from "./queu";

const mockTranslate = vi.mocked(translate);

describe("enqueueTranslation", () => {
  beforeEach(() => {
    mockTranslate.mockReset();
  });

  it("translates a payload and resolves with the result", async () => {
    mockTranslate.mockResolvedValue({
      translation: "Bonjour",
      detectedLanguage: "English",
    });

    const result = await enqueueTranslation({
      inputText: "Hello",
      outputLang: "French",
    });

    expect(mockTranslate).toHaveBeenCalledWith({
      inputText: "Hello",
      outputLang: "French",
    });
    expect(result).toEqual({
      translation: "Bonjour",
      detectedLanguage: "English",
    });
  });

  it("resolves with 'Translation failed' when the translate action throws", async () => {
    mockTranslate.mockRejectedValue(new Error("Network error"));

    const result = await enqueueTranslation({
      inputText: "Hello",
      outputLang: "French",
    });

    expect(result).toBe("Translation failed");
  });

  it("overwrites a queued job with a newer one (latest-wins)", async () => {
    let resolveFirst;
    mockTranslate
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

    const firstPromise = enqueueTranslation({
      inputText: "Hello",
      outputLang: "French",
    });
    // While the first job is in-flight, enqueue two more quickly.
    // The second is overwritten by the third, so only the third is processed.
    enqueueTranslation({
      inputText: "Hello world",
      outputLang: "French",
    });
    const latestPromise = enqueueTranslation({
      inputText: "Hello world!",
      outputLang: "French",
    });

    // Resolve the first job
    resolveFirst({
      translation: "STALE",
      detectedLanguage: "English",
    });

    const firstResult = await firstPromise;
    const latestResult = await latestPromise;

    // The first job resolves with its own result
    expect(firstResult).toEqual({
      translation: "STALE",
      detectedLanguage: "English",
    });
    // The latest job gets the fresh result
    expect(latestResult).toEqual({
      translation: "Bonjour",
      detectedLanguage: "English",
    });
    // translate was called only twice: once for the first job and once for
    // the latest job (the middle one was overwritten and never had a call)
    expect(mockTranslate).toHaveBeenCalledTimes(2);
    expect(mockTranslate).toHaveBeenNthCalledWith(1, {
      inputText: "Hello",
      outputLang: "French",
    });
    expect(mockTranslate).toHaveBeenNthCalledWith(2, {
      inputText: "Hello world!",
      outputLang: "French",
    });
  });
});