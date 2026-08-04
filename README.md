<img src="public/trIcon.png" alt="logo" width="35" height="35" align="left" style="border-radius: 4px; margin-right: 10px;" />

# Google Translate (clone)

A translation application that uses an LLM (DeepSeek) for both language detection and translation instead of a traditional translation API. Built with Next.js 15 App Router, Supabase, and Clerk, the project explores the challenges of integrating LLMs into responsive, production-oriented web applications.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat&logo=clerk&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433E38?style=flat)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white)

**[Live Demo →](https://ggl-translate-clone.vercel.app/)**

Google login, or use this demo account:

```makefile
Username:  test1
Password:  11223344.Rr
```

---

## Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Engineering Highlights](#engineering-highlights)
- [Tech Stack](#tech-stack)
- [Performance](#performance)
- [Future Improvements](#future-improvements)

---

## Overview

The application provides text translation with automatic language detection, speech input and output through the Web Speech API, language swapping, and authenticated translation history.

Rather than focusing solely on replicating Google Translate's interface, the project explores engineering challenges around asynchronous workflows, LLM integration, server-driven architecture, caching, and reliable user interactions.

One of the primary architectural challenges is request ordering. Since DeepSeek does not support request cancellation, rapid user input can produce out-of-order responses. The application addresses this through a latest-wins request pipeline that guarantees only the newest translation reaches the UI.

---

## Architecture

```text
                           User
                            │
                            ▼
                   Next.js App Router
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
          ▼                                   ▼
   Server Components                 Client Components
          │                                   │
          │                                   ▼
          │                           Zustand Store
          │                                   │
          ▼                                   ▼
     Server Actions                 Speech Recognition
          │                          Text-to-Speech
          │
          ▼
      DeepSeek LLM
          │
          ▼
 Response Validation (Zod)
          │
          ▼
   Supabase Database
   ├── Users
   ├── History
   └── Languages
```

The application follows a server-first architecture where rendering, data mutations, and external API interactions remain on the server whenever practical. Client-side state is intentionally limited to user interaction and session-specific UI state, while persistence, authorization, and business logic are handled server-side.

---

## Engineering Highlights

**Reliable asynchronous request handling.** Translation requests pass through a latest-wins request pipeline that prevents stale responses from reaching the UI. Instead of attempting to cancel in-flight requests — which DeepSeek doesn't support — the application tags each request and guarantees that only the most recent one is ever rendered.

**LLM response validation.** LLM output is treated as untrusted input. Responses are required to follow a structured Zod schema and are validated before entering the application, preventing malformed model output from propagating through the UI.

**LLM instead of a dedicated translation API.** DeepSeek performs both language detection and translation through a single model call, rather than chaining a detection API with a separate translation API. This simplifies the integration surface, but introduces higher latency and non-deterministic responses compared to a traditional translation service — which is precisely why every response is schema-validated before use.

**Server-driven mutations.** Persistent operations are executed through Server Actions, keeping authentication, authorization, and history persistence on the server while simplifying the client.

**Independent UI boundaries.** Translation and history are separated into independent rendering boundaries using Next.js parallel routes, giving each its own loading state, caching strategy, and error handling — and letting the two features evolve independently without touching each other's code.

**Session-scoped state.** Client state is intentionally scoped to the browser session using Session Storage rather than Local Storage: in-progress work survives a page refresh, but stale translations don't carry over into a new session. This trades persistence for predictability.

**User-scoped authorization.** History data is isolated per authenticated user, with authorization enforced server-side for every protected operation.

---

## Tech Stack

| Technology               | Responsibility                                    |
| ------------------------ | -------------------------------------------------- |
| Next.js 15 (App Router)  | Server Components, Server Actions, App Router      |
| DeepSeek (OpenAI SDK)    | Translation & language detection                   |
| Supabase                 | User data, translation history, language metadata  |
| Clerk                    | Authentication & authorization                     |
| Zustand + Immer          | Client-side state management                       |
| Zod                      | Runtime validation                                 |
| Web Speech API           | Speech recognition & text-to-speech                |
| Tailwind CSS + DaisyUI   | UI                                                 |
| Framer Motion            | Animations                                         |

---

## Performance

The measured Lighthouse scores are a consequence of the architectural choices above — server-first rendering, minimal client-side JavaScript, and a request pipeline that avoids unnecessary work:

| Metric      | Score |
| ----------- | ----: |
| Performance |    96 |
| FCP         | 0.5 s |
| LCP         | 0.8 s |

For reference, Google Translate's production site scores 82 / 1.4 s / 1.4 s on the same desktop Lighthouse run — but it also ships full internationalization, ads infrastructure, and dozens of features this clone doesn't attempt, so the numbers aren't a like-for-like comparison. They're included to show the effect of the architectural decisions, not as a claim of beating Google Translate.

---

## Future Improvements

- Streaming translation responses
- Multi-provider LLM fallback
- Rate limiting
- Automated tests for critical workflows
- Adaptive request scheduling based on typing behavior
- Dark mode
