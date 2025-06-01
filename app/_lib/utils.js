import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MAX_TRUNC_TEXT_CHAR } from "./configs";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Parses a given string to determine if it is valid JSON or a plain string.
 * - If the input appears to be JSON (starts with '{' or '['), it attempts to parse it.
 * - Returns the parsed object if the JSON is valid.
 * - If parsing fails or the input doesn't resemble JSON, it returns the original string.
 *
 * @param {string} language - The string to be parsed, which may be JSON or a simple string.
 * @returns {Object|string} - Returns the parsed JSON object if valid, or the original string.
 */
export function parseFormDataLang(language) {
  if (typeof language === "string" && language.trim().startsWith("{")) {
    try {
      const result = JSON.parse(language);
      const { name, direction } = result;
      return { name, direction };
    } catch (error) {
      return language;
    }
  }

  return language;
}

let currentUtterance = null;

export function playAudio(output, onEnded) {
  const synth = window.speechSynthesis;

  if (!output || !synth) return;

  // Stop any previous speech
  if (synth.speaking || currentUtterance) {
    synth.cancel();
    currentUtterance = null;
  }

  const utterance = new SpeechSynthesisUtterance(output);

  utterance.onend = () => {
    currentUtterance = null;
    if (typeof onEnded === "function") onEnded();
  };

  utterance.onerror = () => {
    currentUtterance = null;
    if (typeof onEnded === "function") onEnded();
  };

  currentUtterance = utterance;
  synth.speak(utterance);
}

export function isSpeaking() {
  return window.speechSynthesis.speaking;
}

export function stopAudio() {
  const synth = window.speechSynthesis;
  if (synth.speaking || currentUtterance) {
    synth.cancel();
    currentUtterance = null;
  }
}

export function rtfToText(rtf) {
  const rtfRegex = /\\([a-z]+)(-?\d+)? ?|[{}]|\\'([0-9a-fA-F]{2})|([^\\{}]+)/g;
  let match;
  let output = [];
  let stack = [];

  while ((match = rtfRegex.exec(rtf)) !== null) {
    if (match[0] === "{") {
      stack.push(output.length);
    } else if (match[0] === "}") {
      output.splice(stack.pop(), 0);
    } else if (match[0][0] === "\\") {
      if (match[1] === "par" || match[1] === "line") {
        output.push("\n");
      } else if (match[1] === "tab") {
        output.push("\t");
      } else if (match[1] === "uc") {
        // Unicode character count to skip
        rtfRegex.lastIndex += Number(match[2]);
      } else if (match[1] === "'") {
        output.push(String.fromCharCode(parseInt(match[3], 16)));
      }
    } else {
      output.push(match[0]);
    }
  }
  return output.join("");
}

export function extractLanguageName(detectedString) {
  if (typeof detectedString !== "string") return "Invalid input";

  if (detectedString.trim().toLowerCase() === "unknown language")
    return "Unknown Language";

  return detectedString;
}

// Function to extract the error message to show a proper message
export const getErrorMessage = (error) => {
  let message;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export function truncateText(text, maxLength = MAX_TRUNC_TEXT_CHAR) {
  if (!text) return "";

  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
