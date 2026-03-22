# IronMind AI 💪

A highly opinionated, domain-specific **AI Personal Trainer and Nutrition Coach** built with **React**, **Vite**, **Tailwind CSS**, and **Llama 3.3 (via Groq)**. IronMind AI provides fast, highly accurate fitness advice while strictly refusing to engage in non-fitness-related conversations, ensuring a focused and premium user experience.

**Live Demo:** [Insert Your Vercel Link Here]
**Video Walkthrough:** [Insert Your Video Link Here]

---

# Table of Contents

1. [Introduction](#introduction)
2. [Features & "Anti-Slop" Engineering](#features--anti-slop-engineering)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [How It Works](#how-it-works)
6. [Llama 3.3 & Strict Prompt Integration](#llama-33--strict-prompt-integration)
7. [Setup and Usage](#setup-and-usage)
8. [Components Overview](#components-overview)

---

# Introduction

Built for the Thinkly Labs frontend engineering assignment, IronMind AI solves the problem of generic, unfocused AI wrappers. Instead of a standard chatbot that answers everything from math to coding, IronMind is strictly locked into the domain of fitness, strength training, and nutrition. 

Drawing on my experience building full-stack applications like Career Sync, I focused heavily on frontend polish, edge-case management (loading, empty, and error states), and ensuring the UI feels like a native, immersive application rather than a basic web form.

---

# Features & "Anti-Slop" Engineering

1. **Strict Domain Constraint:** The AI actively rejects "model sycophancy." If asked a general knowledge question (e.g., "What is 2+2?"), it will gracefully refuse and redirect the user back to fitness.
2. **Custom Lightweight Markdown Parser:** Bypassed heavy, crash-prone external libraries (like `react-markdown`) by writing a custom string parser that handles raw LLM text, bolding, and bullet points natively in the DOM.
3. **Immersive Floating UI:** Features a 100% edge-to-edge layout with a modern, glass-morphism floating input bar and invisible spacer blocks to prevent auto-scroll UI clipping.
4. **Sanitized Error States:** Raw API errors (401s, 500s) are intercepted and translated into user-friendly, gym-themed UI alerts to protect the illusion of the AI coach.
5. **Smart Auto-Scrolling:** Utilizes React `useRef` hooks to smoothly auto-scroll the user to the bottom of long, heavily structured diet or workout plans.

---

# Technologies Used

- **Frontend Core:**
  - React 18
  - Vite (for lightning-fast HMR and optimized builds)
  - Tailwind CSS (for utility-first, responsive styling)
- **AI & API:**
  - **Llama-3.3-70b-versatile** (Open Source LLM)
  - **Groq API** (For ultra-fast, low-latency inference)
  - Axios (For HTTP requests)
- **UI/UX Icons:**
  - Lucide React

---

## Project Structure
```text
ironmind-ai/
│
├── src/
│   ├── components/
│   │   └── ChatInterface.jsx   # The "Display": Main chat UI, custom parser, and state management
│   ├── services/
│   │   └── huggingface.js      # The "Brain": Groq API integration and strict system prompting
│   ├── App.jsx                 # Main layout wrapper and header
│   ├── index.css               # Tailwind directives and CSS reset
│   └── main.jsx                # React DOM entry point
│
├── .env                        # Configuration (VITE_GROQ_API_KEY)
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind theme configuration
└── README.md                   # This file