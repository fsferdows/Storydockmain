# StoryDock 🚀

> **Write. Share. Inspire.** — A modern, high-performance blogging and article-publishing platform built with modern web technologies, responsive glassmorphic UI, and cloud backend integration.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Application Pages & Modules](#-application-pages--modules)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Database Schema (Cloud Firestore)](#-database-schema-cloud-firestore)
- [Project Structure](#-project-structure)
- [Quick Start / Local Setup](#-quick-start--local-setup)
- [Deployment Guide](#-deployment-guide)
- [Project Team & Contributors](#-project-team--contributors)

---

## 🌟 Overview

**StoryDock** is a full-featured, modern blogging and publishing application tailored for creators, developers, and writers. It provides an intuitive writing environment, rich markdown support, real-time audio narration (Text-to-Speech), user authentication, dynamic story management, and responsive layouts across all device form factors (smartphones, tablets, laptops, and desktop monitors).

---

## ✨ Key Features

- 🎨 **Sleek Glassmorphic Design**: Clean design system with CSS custom properties, smooth transitions, and high-contrast typography.
- 🌙 **Persistent Theme Switching**: Instant Light/Dark mode toggle with automatic persistence in `localStorage`.
- 🔍 **Live Search & Filtering**: Instant multi-criteria keyword search across titles, excerpts, tags, and authors with category pill filters (*Technology, Programming, Design, AI, Lifestyle*).
- ✍️ **Story Creation & Markdown Studio**: Dual-mode writing studio featuring a formatting toolbar (bold, italic, headers, code, quotes, lists, links, images), cover image presets, reading time calculation, and a live Markdown preview tab.
- 📖 **Interactive Article Reader**:
  - **Reading Progress Bar**: Dynamic top progress indicator showing scroll completion.
  - **Audio Narration (TTS)**: Built-in SpeechSynthesis player to listen to article content with play, pause, and stop controls.
  - **Customizable Typography**: Real-time font size scaling (A−, A+, Reset) for optimal readability.
  - **Export & Print**: One-click Markdown file download and print-ready stylesheet formatting.
  - **Engagement**: Interactive like/clap counter, bookmarking, and live nested comments with timestamped user feedback.
- 👤 **Author Profile & Portfolio**:
  - Customizable profile banner and avatar.
  - Bio, role, location, website, and social links editing.
  - 4-metric statistics summary (Stories published, Total views, Total likes, Bookmarks).
  - Author's personal stories management with instant Edit and Delete actions.
- 📊 **Interactive Project Visualizer**: Built-in architecture dashboard (`project.html`) and technical blueprint (`project.md`) detailing schemas, system flows, and security rules.
- 📱 **100% Fully Responsive**: Fluid layouts with adaptive multi-column grids, sliding mobile navigation drawers, and touch-optimized tap targets.

---

## 📄 Application Pages & Modules

| Page | File | Description |
| :--- | :--- | :--- |
| **Home Feed** | `index.html` | Hero banner, live search, category toolbar, sorting dropdown, and dynamic story feed. |
| **Article Reader** | `view.html` | Full article view with TTS audio player, font scaling, engagement stats, comments, and related stories. |
| **Story Creator** | `create.html` | Story editor with markdown toolbar, cover photo presets, and live preview rendering. |
| **Story Editor** | `edit.html` | Edit existing articles with preloaded form data and live sync to storage. |
| **User Profile** | `profile.html` | Author portfolio, statistics dashboard, profile metadata editor, and story management. |
| **Architecture Dashboard** | `project.html` | Interactive visualizer showcasing schemas, workflow diagrams, and technical specifications. |

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: Vanilla HTML5, Modern CSS3 (Grid, Flexbox, Custom Properties), JavaScript (ES6+ Modules).
- **Backend & Cloud Services**: Google Firebase (Authentication & Cloud Firestore NoSQL Database).
- **Typography & Icons**: Google Fonts (*Poppins*), Font Awesome 6 Pro icons.
- **Server & Deployment**: Node.js / Express static file server, Vercel SPA routing (`vercel.json`).

---

## 🗄️ Database Schema (Cloud Firestore)

StoryDock uses structured collections in Cloud Firestore:

### `blogs` Collection
```json
{
  "id": "story_uuid",
  "title": "Getting Started with Modern Web Architecture",
  "excerpt": "A deep dive into building performant web applications...",
  "content": "# Full markdown content...",
  "category": "Technology",
  "tags": ["WebDev", "Architecture", "JavaScript"],
  "coverImage": "https://images.unsplash.com/...",
  "author": {
    "uid": "user_123",
    "name": "Jane Doe",
    "avatar": "https://...",
    "handle": "@janedoe"
  },
  "readTime": "5 min read",
  "views": 340,
  "likes": 42,
  "commentsCount": 8,
  "createdAt": "2026-08-17T10:00:00.000Z",
  "updatedAt": "2026-08-17T10:00:00.000Z"
}
```

### `users` Collection
```json
{
  "uid": "user_123",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "handle": "@janedoe",
  "bio": "Software Architect & Tech Writer",
  "avatar": "https://...",
  "coverImage": "https://...",
  "location": "San Francisco, CA",
  "website": "https://janedoe.dev",
  "twitter": "janedoe",
  "github": "janedoe",
  "joinedAt": "2026-01-15T00:00:00.000Z"
}
```

---

## 📁 Project Structure

```
storydock/
├── index.html                  # Homepage (Hero, Live Search, Categories, Feed)
├── view.html                   # Article Reader (TTS Audio, Markdown, Comments, Likes)
├── create.html                 # Story Creator Studio (Markdown Toolbar, Live Preview)
├── edit.html                   # Story Editor Studio (Preloaded Form, Update Handler)
├── profile.html                # User Profile & Author Portfolio Management
├── project.html                # Interactive Architecture & Blueprint Visualizer
├── project.md                  # Comprehensive Technical Architecture & Schema Spec
├── README.md                   # Project Documentation
├── package.json                # Project Dependencies and npm Scripts
├── server.js                   # Node.js / Express Server
├── vercel.json                 # Vercel Deployment & Static Routing Rules
├── firestore.rules             # Cloud Firestore Security Rules
│
└── assets/
    ├── css/
    │   └── style.css           # Core Design System, Themes & Responsive Breakpoints
    ├── js/
    │   ├── app.js              # Application Logic, Feed Filtering, TTS, Modals
    │   └── firebase-service.js # Firebase Auth & Firestore Client Integration
    └── images/
        └── logo.svg            # Brand Vector Icon
```

---

## 🚀 Quick Start / Local Setup

StoryDock runs directly on any static web server or via the included Node.js server.

### Option 1: Node.js / Express Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/your-username/storydock.git
cd storydock

# Install dependencies
npm install

# Start the development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Option 2: Python Built-in HTTP Server
```bash
# Start server on port 8000
python3 -m http.server 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

---

## ⚡ Deployment Guide

### Deploy to Vercel (CLI & GitHub)

The repository includes `vercel.json` for instant zero-configuration deployment:

#### Via Vercel CLI:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy preview build
vercel

# Deploy to production
vercel --prod
```

#### Via GitHub Integration:
1. Push your repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Vercel will automatically build and deploy with clean static routing.

---

## 👥 Project Team & Contributors

- **FS FERDOWS** — *Lead System Architect & Project Director*
- **Mehedi Hasan** — *Full-Stack Engineer & Core Infrastructure Specialist*
- **TAZ** — *UI/UX Creative Technologist & Interaction Designer*
- **Jannat** — *Frontend Specialist & Quality Assurance Engineer*

---

## 📄 License

This project is licensed under the **MIT License**.

⭐ **Feel free to star this repository if you find it helpful!**
