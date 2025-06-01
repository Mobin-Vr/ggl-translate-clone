<div style="display: flex; align-items: center; justify-content: center;">
  <h1 style="margin: 0; display: flex; align-items: center;">
    <img src="public/icon.png" alt="logo" style="width: 35px; height: 35px; border-radius: 3px; margin-right: 10px;" />
    Google Translate&nbsp;<small style="font-size: 0.7em;">(clone)</small>
  </h1>
</div>

<br>

An AI-powered **Google Translate clone** with real-time translation, voice input, and dynamic multilingual support. Built with cutting-edge technologies like **Next.js 15**, **Supabase**, and **Server Actions**, this app replicates Google Translate’s interface and UX with attention to every pixel.

<br>

## 🌐 Live Demo - [**Click to Try Now**](https://ggl-translate-clone.vercel.app/)

> ⚠️ **Google** login in Clerk may require a **VPN** (due to sanctions).
> If login fails, use this test account:

```makefile
Username:  test1
Password:  11223344.Rr
```

<br>

## 📷 Preview

<div style="display: flex; align-items: center; justify-content: center;">
<img src="https://github.com/your-username/translate-clone/blob/main/public/screenshots/preview.gif" width="260" alt="App Preview">
</div>

💡 **Designed to mirror the real Google Translate experience with performance and clarity in mind.**

<br>

## 🚀 Features

- **AI Translation Engine**: Uses **DeepSeek AI** to generate accurate translations in over 20 major languages.
- **Auto Language Detection**: Source language is auto-detected using AI.
- **Live Voice Input**:

  - Users can speak in **English**, and the app converts speech to text using the **Web Speech API**.

- **Text-to-Speech Output**:

  - Speaker buttons allow reading of both source and translated texts (English only).

- **Translation History**:

  - Stores history in Supabase per user session.
  - Supports deleting individual records or clearing all.

- **Server-Side Rendering (SSR)**:

  - All pages are server-rendered using **Next.js App Router**.

- **Smart Caching & ISR**:

  - Some data is served with **Incremental Static Regeneration** for optimized performance.

- **Request Queue with Debounce**:

  - Ensures that only the **latest translation request** is processed and returned (DeepSeek doesn’t support abort).

- **Authentication**:

  - Login via **Clerk** with full route protection and session handling.

- **Responsive & Accurate UI**:

  - Fully responsive, pixel-perfect replication of Google Translate’s interface.

<br>

## 🛠️ Tech Stack

| Technology                  | Purpose                                      |
| --------------------------- | -------------------------------------------- |
| **Next.js 15 (App Router)** | Main framework                               |
| **Supabase**                | Database, History Storage (RLS)              |
| **Clerk**                   | Authentication & User Management             |
| **Server Actions**          | Secure database mutations                    |
| **Zustand**                 | State Management (stored in Session Storage) |
| **Framer Motion**           | Smooth animations for transitions            |
| **Tailwind CSS**            | Styling                                      |
| **Web Speech API**          | Live speech input & audio playback           |

<br>

## 🏆 Technical Challenges & Solutions

### **1️⃣ Real-Time Translation & Aborted Requests**

- **Challenge**: DeepSeek AI does not support request abortion (AbortController).
- **Solution**: Built a **custom request queue system** with debounce to ensure only the **latest input** is translated and displayed.

### **2️⃣ Server Rendering & Caching**

- **Challenge**: Ensuring fast, SEO-friendly page loads while maintaining real-time interaction.
- **Solution**: Used **Next.js SSR + ISR** smartly to pre-render pages and cache specific results.

### **3️⃣ Audio Input & Output**

- **Challenge**: Providing voice input/output using only browser-native APIs.
- **Solution**: Used **Web Speech API** for speech recognition and TTS, limited to English for reliability.

<br>

## 🌟 Key Architectural Decisions

- **Next.js 15**: Chosen for its support of **parallel routes**, **SSR**, and **Server Actions** for clean client-server separation.
- **Server Actions**: All mutations go through server actions to improve security and maintain control.
- **Supabase**: Used for storing and managing user history with secure data access.
- **Debounce + Custom Queue**: Ensures no race conditions during fast, repeated input from users.
- **Authentication**: Secured routes with Clerk, ensuring only authorized access to history features.
- **UI Design**: Fully responsive and pixel-perfect to match Google Translate with custom styling and behavior.

<br>

## 📌 Lessons Learned

This project helped deepen my understanding of:

- **Next.js Server Architecture (SSR, ISR, Server Actions)**
- **Having two pages side by side with parallel routes**
- **Integrating AI APIs in real-time UI**
- **Custom async request management with queues**
- **Browser speech APIs**

<br>
