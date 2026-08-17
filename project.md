# StoryDock — Production Web Application Blueprint

## 1. Project Overview & Scope

**StoryDock** is a production-grade, high-performance blogging and article-publishing web application designed for writers, content creators, and readers. It provides a complete end-to-end publishing workflow including authentication, database persistence, blog creation/management, real-time search & category filtering, interactive comments, and dark/light themes.

> **Technology Constraint**: Built strictly using **Pure HTML5, Vanilla CSS3, and Modern Client-side Vanilla JavaScript (ES6+)**. No heavy build frameworks (React, Vue, Next.js, Angular, etc.) or server-side languages (Node/Node.js, Express, Python, PHP) are required. All backend infrastructure (Auth & Database) is powered directly via CDN Web SDKs.

---

## 2. Technology Stack & Dependencies

| Layer | Technology | Usage / Purpose |
| :--- | :--- | :--- |
| **Markup** | **HTML5** | Semantic structure (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`), ARIA accessibility. |
| **Styling** | **Vanilla CSS3** | Custom design system using CSS Variables (`:root`), Flexbox, CSS Grid, Glassmorphic cards, smooth transitions, dark theme styling. |
| **Client Logic** | **Vanilla JavaScript (ES6+)** | DOM manipulation, Async/Await API calls, LocalStorage caching, Event delegation, UI state management. |
| **Authentication** | **Firebase Auth JS SDK v10** | Email/Password login, Registration, Google OAuth, Session persistence, Protected Route Guards. |
| **Database** | **Cloud Firestore JS SDK v10** | Cloud NoSQL database storing user profiles, published blogs, comments, tags, and like counters. |
| **Storage / Assets** | **Firebase Storage / Unsplash CDN** | Cover image upload handling & high-quality optimized media delivery. |
| **Icons & Typography**| **FontAwesome 6 & Google Fonts** | Poppins typography, interface icons (Moon, Sun, Bars, Pen, Trash, Heart, Bookmark). |

---

## 3. Database Schema & Data Models

### A. `users` Collection
Stores user account profiles and roles.
```json
{
  "uid": "STRING (Primary Key from Firebase Auth)",
  "displayName": "STRING",
  "email": "STRING",
  "photoURL": "STRING (Avatar URL)",
  "bio": "STRING",
  "role": "STRING ('user' | 'admin')",
  "createdAt": "TIMESTAMP",
  "updatedAt": "TIMESTAMP"
}
```

### B. `blogs` Collection
Stores published posts and draft articles.
```json
{
  "id": "STRING (Auto-generated Firestore Doc ID)",
  "title": "STRING",
  "slug": "STRING",
  "excerpt": "STRING (First 150 characters for feed)",
  "content": "TEXT / HTML",
  "category": "STRING ('Technology' | 'Programming' | 'Travel' | 'Education' | 'Lifestyle')",
  "coverImage": "STRING (Image URL)",
  "authorUid": "STRING (Foreign Key -> users.uid)",
  "authorName": "STRING",
  "authorPhoto": "STRING",
  "likesCount": "NUMBER",
  "commentsCount": "NUMBER",
  "viewsCount": "NUMBER",
  "isPublished": "BOOLEAN",
  "createdAt": "TIMESTAMP",
  "updatedAt": "TIMESTAMP"
}
```

### C. `comments` Collection
Stores reader comments under blog posts.
```json
{
  "id": "STRING (Doc ID)",
  "blogId": "STRING (Foreign Key -> blogs.id)",
  "userUid": "STRING (Foreign Key -> users.uid)",
  "userName": "STRING",
  "userPhoto": "STRING",
  "content": "STRING",
  "createdAt": "TIMESTAMP"
}
```

### D. `likes` Collection
Tracks user post likes to prevent duplicate votes.
```json
{
  "id": "STRING (`${blogId}_${userUid}`)",
  "blogId": "STRING",
  "userUid": "STRING",
  "createdAt": "TIMESTAMP"
}
```

---

## 4. Architecture & File Structure

```
web project/
│
├── index.html              # Homepage (Hero, Live Search, Categories, Blog Feed, Footer)
├── view.html               # Article Reader Page (Full Post, Author Bio, Like/Comment system)
├── create.html             # Rich Blog Post Creator (Auth-protected)
├── edit.html               # Blog Post Editor (Owner-protected)
├── auth.html               # Sign In / Register / Password Reset modal/page
├── profile.html            # User Profile & My Articles Dashboard
│
├── assets/
│   ├── css/
│   │   └── style.css       # Core Design System, Utility Classes, Responsive & Dark Mode
│   │
│   ├── js/
│   │   ├── firebase-config.js  # Firebase Credentials & SDK Initialization
│   │   ├── auth.js            # User Sign in/out, Auth State Observer, Guard utilities
│   │   ├── blog-service.js    # Firestore CRUD (Fetch, Create, Update, Delete)
│   │   ├── view-blog.js       # Reader logic, Like button toggle, Comments rendering
│   │   └── app.js             # Homepage feed controller, live search, dark mode toggle
│   │
│   └── images/
│       └── logo.svg        # StoryDock Brand Vector Asset
│
└── project.md              # Production Architecture & Feature Blueprint
```

---

## 5. Core Feature Specifications

### 1. Authentication & User Management (`assets/js/auth.js`)
- **Sign Up**: Email + Password registration with display name input.
- **Sign In**: Email + Password and Google 1-Click Authentication.
- **Session Observer**: `onAuthStateChanged()` listens to user login state across all pages.
- **Navbar Integration**: Dynamic switch between "Login/Register" button and "Profile / Sign Out" avatar dropdown.
- **Protected Routes**: Redirection guard on `create.html` and `edit.html` if user is not signed in.

### 2. Live Blog Management (`assets/js/blog-service.js`)
- **Feed Rendering**: Dynamic fetching from Firestore (`orderBy("createdAt", "desc")`).
- **Live Search**: Client-side & server-side filter matching titles, authors, and keywords.
- **Category Filter**: Filter posts by `Technology`, `Programming`, `Travel`, `Education`, and `Lifestyle`.
- **Create Post**: Rich input form with live preview image URL verification and validation.
- **Edit & Delete Post**: Restricts modification permissions exclusively to post authors or system admins.

### 3. Interactive Reader Experience (`view.html` & `assets/js/view-blog.js`)
- **Article Display**: Clean typography with estimated read time.
- **Real-time Likes**: Toggle like status stored in Firestore with atomic counter updates.
- **Discussion System**: Post comments under articles with author timestamps and delete permissions for comment owners.

### 4. Design System & User Experience (`assets/css/style.css`)
- **Theme Switcher**: Instant Dark Mode toggle persisted across browser sessions via `localStorage`.
- **Glassmorphism UI**: Backdrop blur cards, soft gradients, rounded micro-interactions.
- **Responsive Layout**: Mobile-first design adapting seamlessly from `320px` to `4K` displays.

---

## 6. Implementation Roadmap

1. **Phase 1: Database & SDK Integration**
   - Link Firebase JS SDK CDN scripts (`firebase-app.js`, `firebase-auth.js`, `firebase-firestore.js`).
   - Create `assets/js/firebase-config.js` with project configuration keys.

2. **Phase 2: Auth Flow Implementation**
   - Add Auth Modal (`#authModal`) into `index.html` navbar.
   - Implement `auth.js` for sign-up, login, and sign-out logic.

3. **Phase 3: Database Migration from LocalStorage to Firestore**
   - Replace `localStorage` calls in `app.js` with Firestore `getDocs()` and `onSnapshot()`.
   - Update `create.html` and `edit.html` forms to perform Firestore `addDoc()` and `updateDoc()`.

4. **Phase 4: Comments, Likes & Profile Page**
   - Implement real-time comments on `view.html`.
   - Build `profile.html` displaying user info and authored posts.

---

## 7. Security Rules (Cloud Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can read any user profile; users can edit only their own profile
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Public read access for blogs; write/delete restricted to post owner
    match /blogs/{blogId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.authorUid;
    }

    // Comments public read; create for logged-in users; delete for comment owner
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && request.auth.uid == resource.data.userUid;
    }
  }
}
```
