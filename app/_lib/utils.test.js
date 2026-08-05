import { describe, expect, it } from "vitest";
import {
  extractLanguageName,
  getErrorMessage,
  parseFormDataLang,
  truncateText,
} from "./utils";

describe("extractLanguageName", () => {
  it("returns the language name for a normal string", () => {
    expect(extractLanguageName("English")).toBe("English");
  });

  it("normalizes 'unknown language' to 'Unknown Language'", () => {
    expect(extractLanguageName("unknown language")).toBe("Unknown Language");
    expect(extractLanguageName("UNKNOWN LANGUAGE")).toBe("Unknown Language");
  });

  it("returns 'Invalid input' for non-string values", () => {
    expect(extractLanguageName(null)).toBe("Invalid input");
    expect(extractLanguageName(undefined)).toBe("Invalid input");
    expect(extractLanguageName(123)).toBe("Invalid input");
  });
});

describe("truncateText", () => {
  it("returns empty string for falsy input", () => {
    expect(truncateText("")).toBe("");
    expect(truncateText(null)).toBe("");
    expect(truncateText(undefined)).toBe("");
  });

  it("returns the text unchanged when shorter than max length", () => {
    expect(truncateText("Hello", 10)).toBe("Hello");
  });

  it("truncates text longer than max length with an ellipsis", () => {
    expect(truncateText("Hello world", 5)).toBe("Hello...");
  });

  it("uses the default max length of 40 when not provided", () => {
    const longText = "a".repeat(50);
    expect(truncateText(longText)).toBe("a".repeat(40) + "...");
  });
});

describe("getErrorMessage", () => {
  it("extracts the message from an Error instance", () => {
    expect(getErrorMessage(new Error("boom"))).toBe("boom");
  });

  it("extracts the message from an object with a message property", () => {
    expect(getErrorMessage({ message: "object error" })).toBe("object error");
  });

  it("returns the string itself", () => {
    expect(getErrorMessage("string error")).toBe("string error");
  });

  it("returns a fallback for unknown types", () => {
    expect(getErrorMessage(42)).toBe("Something went wrong");
    expect(getErrorMessage(null)).toBe("Something went wrong");
  });
});

describe("parseFormDataLang", () => {
  it("returns the string unchanged when it is not JSON", () => {
    expect(parseFormDataLang("English")).toBe("English");
  });

  it("parses a JSON object with name and direction", () => {
    const result = parseFormDataLang('{"name":"English","direction":"ltr"}');
    expect(result).toEqual({ name: "English", direction: "ltr" });
  });

  it("returns the original string when JSON parsing fails", () => {
    const invalid = '{"name": "broken"';
    expect(parseFormDataLang(invalid)).toBe(invalid);
  });
});