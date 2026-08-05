import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the OpenAI client so no real network requests are made
vi.mock("../deepseek", () => ({
  openai: {
    chat: {
      completions: {
        create: vi.fn(),
      },
    },
  },
}));

import { openai } from "../deepseek";
import { detectAndTranslate } from "./data-services";

const mockCreate = vi.mocked(openai.chat.completions.create);

describe("detectAndTranslate", () => {
  beforeEach(() => {
    mockCreate.mockReset();
  });

  it("throws when text is missing", async () => {
    await expect(detectAndTranslate("", "French")).rejects.toThrow(
      "Input text and target language are required.",
    );
  });

  it("throws when target language is missing", async () => {
    await expect(detectAndTranslate("Hello", "")).rejects.toThrow(
      "Input text and target language are required.",
    );
  });

  it("returns the validated translation and detected language", async () => {
    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify({
              detectedLanguage: "English",
              translation: "Bonjour",
            }),
          },
        },
      ],
    });

    const result = await detectAndTranslate("Hello", "French");

    expect(result).toEqual({
      detectedLanguage: "English",
      translation: "Bonjour",
    });
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });

  it("strips markdown code fences from the LLM response", async () => {
    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content:
              "```json\n" +
              JSON.stringify({
                detectedLanguage: "English",
                translation: "Bonjour",
              }) +
              "\n```",
          },
        },
      ],
    });

    const result = await detectAndTranslate("Hello", "French");

    expect(result).toEqual({
      detectedLanguage: "English",
      translation: "Bonjour",
    });
  });

  it("throws when the LLM response does not match the Zod schema", async () => {
    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify({
              detectedLanguage: "E", // too short (min 2)
              translation: "",
            }),
          },
        },
      ],
    });

    await expect(detectAndTranslate("Hello", "French")).rejects.toThrow();
  });

  it("throws when the LLM returns no content", async () => {
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: "" } }],
    });

    await expect(detectAndTranslate("Hello", "French")).rejects.toThrow(
      "No content received from AI.",
    );
  });

  it("throws when the LLM returns invalid JSON", async () => {
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: "not json at all" } }],
    });

    await expect(detectAndTranslate("Hello", "French")).rejects.toThrow();
  });
});