  <img src="public/trIcon.png" alt="logo" style="width: 35px; height: 35px; border-radius: 3px; margin-right: 10px;" />

# Google Translate Clone

A translation application that uses an LLM (DeepSeek) for both language detection and translation instead of a traditional translation API.

Built with Next.js 15 App Router, Supabase, and Clerk, the project explores the challenges of integrating LLMs into responsive, production-oriented web applications.

## 🌐 Live Demo - [**Click to Try Now**](https://ggl-translate-clone.vercel.app/)

**Google** login or use this demo account:

```makefile
Username:  test1
Password:  11223344.Rr
```

---

## Overview

The application provides text translation with automatic language detection, speech input and output through the Web Speech API, language swapping, and authenticated translation history.

Rather than focusing solely on replicating Google Translate's interface, the project explores engineering challenges around asynchronous workflows, LLM integration, server-driven architecture, caching, and reliable user interactions.

One of the primary architectural challenges is request ordering. Since DeepSeek does not support request cancellation, rapid user input can produce out-of-order responses. The application addresses this through a latest-wins request pipeline that guarantees only the newest translation reaches the UI.

---

## Architecture Overview

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

## Engineering Goals

This project explores practical approaches to:

- Reliable asynchronous workflows
- Predictable state management
- Server-first application architecture
- Production-oriented LLM integration
- Responsive user experience under real-world conditions

---

## Engineering Highlights

### Reliable asynchronous request handling

Translation requests pass through a latest-wins request pipeline that prevents stale responses from reaching the UI. Instead of attempting to cancel in-flight requests, the application guarantees that only the most recent user input is rendered.

### LLM response validation

LLM output is treated as untrusted input. Responses are required to follow a structured schema and are validated before entering the application, preventing malformed model output from propagating through the UI.

### Server-driven mutations

Persistent operations are executed through Server Actions, keeping authentication, authorization, and history persistence on the server while simplifying the client.

### Independent UI boundaries

Translation and history are separated into independent rendering boundaries using Next.js parallel routes, allowing independent loading states, caching strategies, and error handling.

### State management

Client state is intentionally scoped to the browser session, balancing persistence with predictable behavior while avoiding stale state across browser sessions.

### User-scoped authorization

History data is isolated per authenticated user, with authorization enforced server-side for every protected operation.

---

## Design Decisions & Trade-offs

### LLM instead of a translation API

DeepSeek performs both language detection and translation through a single interaction with the model.

This simplifies the integration but introduces higher latency and non-deterministic responses compared to traditional translation services, requiring response validation and careful request coordination.

### Server-first architecture

Rendering, mutations, and data fetching are delegated to the server wherever practical, reducing client-side complexity while taking advantage of the App Router architecture.

### Session-scoped client state

Session Storage was chosen over Local Storage so active work survives page refreshes without carrying stale translations across browser sessions.

### Independent rendering boundaries

Separating translation and history into independent rendering boundaries improves maintainability while allowing each feature to evolve independently.

---

## Tech Stack

| Technology              | Responsibility                                    |
| ----------------------- | ------------------------------------------------- |
| Next.js 15 (App Router) | Server Components, Server Actions, App Router     |
| DeepSeek (OpenAI SDK)   | Translation & language detection                  |
| Supabase                | User data, translation history, language metadata |
| Clerk                   | Authentication & authorization                    |
| Zustand + Immer         | Client-side state management                      |
| Zod                     | Runtime validation                                |
| Web Speech API          | Speech recognition & text-to-speech               |
| Tailwind CSS + DaisyUI  | UI                                                |
| Framer Motion           | Animations                                        |

---

## Performance

Desktop Lighthouse measurements:

| Application      | Performance |   FCP |   LCP |
| ---------------- | ----------: | ----: | ----: |
| This Project     |      **96** | 0.5 s | 0.8 s |
| Google Translate |          82 | 1.4 s | 1.4 s |

The measured performance is primarily a consequence of architectural decisions: server-first rendering, reduced client-side JavaScript, Server Actions, and a request pipeline that minimizes unnecessary work.

The comparison illustrates the characteristics of this implementation rather than claiming superiority over Google Translate, which operates under significantly different product constraints.

---

## Future Improvements

- Streaming translation responses
- Multi-provider LLM fallback
- Rate limiting
- Automated tests for critical workflows
- Adaptive request scheduling based on typing behavior
- Dark mode
