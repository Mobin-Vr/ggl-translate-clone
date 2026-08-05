import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// =========================================
// Polyfills required by Radix UI / browser APIs
// =========================================

// ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = globalThis.ResizeObserver || ResizeObserverMock;

// matchMedia
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// scrollIntoView
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// Pointer capture (required by Radix UI Select)
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}

// =========================================
// Mock next/font (Next.js fonts don't work in jsdom)
// =========================================
vi.mock("next/font/google", () => ({
  Roboto: () => ({ className: "roboto-mock" }),
}));

vi.mock("next/font/local", () => ({
  default: () => ({ className: "local-font-mock" }),
}));

// =========================================
// Mock Clerk (auth components are not needed in unit tests)
// =========================================
vi.mock("@clerk/nextjs", () => ({
  ClerkProvider: ({ children }) => children,
  SignedIn: ({ children }) => children,
  SignedOut: ({ children }) => children,
  SignInButton: ({ children }) => children,
  SignUpButton: ({ children }) => children,
  useClerk: () => ({
    openSignIn: vi.fn(),
    openSignUp: vi.fn(),
  }),
  useUser: () => ({
    isLoaded: true,
    isSignedIn: false,
    user: null,
  }),
  useAuth: () => ({
    isLoaded: true,
    isSignedIn: false,
    userId: null,
    getToken: vi.fn(),
  }),
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn().mockResolvedValue({ userId: null }),
}));

// =========================================
// Mock next/cache (server-only)
// =========================================
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  unstable_cache: (fn) => fn,
}));

// =========================================
// Mock autosize (used by useTextareaSyncHeight)
// =========================================
vi.mock("autosize", () => {
  const fn = vi.fn();
  fn.update = vi.fn();
  return { default: fn };
});

// =========================================
// Mock use-debounce so the debounced value updates immediately
// (avoids waiting the real 1000ms debounce delay in tests)
// =========================================
vi.mock("use-debounce", () => ({
  useDebounce: (value) => [value, vi.fn()],
}));

// =========================================
// Mock public/icons.js (contains JSX in a .js file,
// which Vite's oxc parser cannot transform)
// =========================================
vi.mock("@/public/icons", () => {
  const Icon = () => null;
  return {
    MenuIcon: Icon,
    SettingsGearIcon: Icon,
    LanguageIcon: Icon,
    MicSensitivityIcon: Icon,
    SpeakerIcon: Icon,
    BackArrowIcon: Icon,
    CloseIcon: Icon,
    SquareIcon: Icon,
    CopyIcon: Icon,
    GoogleGIcon: Icon,
    AppsDotsIcon: Icon,
    ImageIcon: Icon,
    DocIcon: Icon,
    WebsiteIcon: Icon,
    XIcon: Icon,
    AlertIcon: Icon,
    TrashIcon: Icon,
    SignOutIcon: Icon,
    UserSettingsIcon: Icon,
    ArrowBackIcon: Icon,
  };
});

// =========================================
// Mock speechSynthesis (Web Speech API)
// =========================================
if (!window.speechSynthesis) {
  Object.defineProperty(window, "speechSynthesis", {
    value: {
      speaking: false,
      cancel: vi.fn(),
      speak: vi.fn(),
      getVoices: vi.fn(() => []),
    },
    writable: true,
  });
}

// =========================================
// Mock sessionStorage (used by zustand persist)
// =========================================
if (!window.sessionStorage) {
  const store = {};
  window.sessionStorage = {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((k) => delete store[k]);
    },
  };
}