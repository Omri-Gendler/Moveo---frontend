<div align="center">

# 🪙 AI Crypto Advisor - Moveo Task

### *Personalized Cryptocurrency Intelligence Platform*

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=render)](https://moveo-frontend-prod.onrender.com)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

A modern, intelligent cryptocurrency dashboard that delivers **personalized content** based on user preferences. Features an onboarding quiz, AI-powered daily insights, real-time market data, and an interactive feedback system to continuously improve recommendations.

[View Demo](https://moveo-frontend-prod.onrender.com) • [Report Bug](https://github.com/Omri-Gendler/Moveo---frontend/issues) • [Backend Repo](https://github.com/Omri-Gendler/Moveo---backend)

</div>

---

## 🌐 Live Deployments
---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication System
- Secure login & registration
- JWT-based authentication
- Protected routes
- Persistent sessions

### 📝 Onboarding Quiz
- Interactive questionnaire
- Captures user persona (HODLer, Trader, etc.)
- Investment goals & risk tolerance
- Crypto interests selection

</td>
<td width="50%">

### 📊 Personalized Dashboard
- **📉 Live Prices** - Real-time market data
- **📰 News Feed** - Curated crypto news
- **🤖 AI Insights** - Daily personalized advice
- **😂 Daily Meme** - Crypto humor

### 💬 Smart Feedback System
- Thumbs up/down ratings
- Optimistic UI updates
- Trains recommendation engine
- Improves future content

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.20-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-7.3-007FFF?style=flat-square&logo=mui&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=flat-square&logo=greensock&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-22.16-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)

### Deployment
![Render](https://img.shields.io/badge/Render-Cloud-46E3B7?style=flat-square&logo=render&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)

</div>

<details>
<summary><b>📦 Full Dependency List</b></summary>

```json
{
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@gsap/react": "^2.1.2",
    "@mui/icons-material": "^7.3.6",
    "@mui/material": "^7.3.6",
    "@vitejs/plugin-react": "^4.2.1",
    "gsap": "^3.14.2",
    "react": "^18.2.0",
---

## 🚀 Quick Start

### Prerequisites

```bash
✅ Node.js (v16 or higher)
✅ npm or yarn
✅ Git
```

### Installation Steps

<details open>
<summary><b>1️⃣ Clone the Repository</b></summary>

```bash
git clone https://github.com/Omri-Gendler/Moveo---frontend.git
cd Moveo---frontend
```
</details>

<details open>
<summary><b>2️⃣ Install Dependencies</b></summary>

```bash
npm install
```
</details>

<details open>
<summary><b>3️⃣ Configure Environment</b></summary>

Create a `.env.local` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
VITE_ENV=development
```

> **Note:** The `.env.local` file is for local development only and is ignored by Git.
</details>

<details open>
<summary><b>4️⃣ Start Development Server</b></summary>

```bash
npm run dev
```

🎉 Open [http://localhost:3000](http://localhost:3000) in your browser!
</details>

### Build for Production

```bash
npm run build          # Creates optimized build in dist/
npm run preview        # Preview production build locally
Responsive Design:** Fully adapted for mobile and desktop.

## 🛠 Tech Stack
* **Frontend:** React, Vite, React Router DOM.
* **Styling:** CSS3, Animations (Keyframes), Responsive Grid/Flexbox.
* **Icons:** Material UI Icons (`@mui/icons-material`).
* **Backend:** Node.js, Express.
* **Database:** MongoDB Atlas.
* **Deployment:** Render (Frontend & Backend).

## ⚙️ Installation & Local Setup

### Prerequisites
* Node.js installed.
* MongoDB Atlas account (or local instance).

### Steps
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_GITHUB_USER/YOUR_REPO_NAME.git](https://github.com/YOUR_GITHUB_USER/YOUR_REPO_NAME.git)
    cd YOUR_REPO_NAME
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    # If frontend is in root or a specific folder
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    VITE_API_URL=http://localhost:5000
    ```

4.  **Run Locally:**
    ```bash
    npm run dev
    ```

---

## 🔐 DB Access for Reviewers
As requested in the task guidelines, here is a **Read-Only** connection string to the MongoDB Atlas database to verify data persistence (Users, Preferences, Votes):

```text
mongodb+srv://moveo_guest:Moveo_Boost2026@stations.yvgiuub.mongodb.net/test?appName=stations
```

---

## 🤖 AI Tools Usage Summary

In accordance with the task guidelines, I utilized AI tools (ChatGPT/GitHub Copilot) to optimize development velocity given the 3-day timeframe. My goal was to focus on the core logic and architecture while offloading repetitive or styling-heavy tasks.

<table>
<tr>
<td width="50%" valign="top">

### 🎨 How I Used AI

**UI/UX Styling**
- Generated complex CSS for **Glassmorphism effects** and gradients
- Created **background animations** (CSS keyframes) for Auth and Dashboard pages
- Saved significant time on visual polishing

**Component Boilerplate**
- Scaffolded initial React component structures
- Generated repetitive JSX patterns
- Focused on data integration rather than library syntax

**Optimization Consultation**
- Consulted on performance patterns
- Implemented `useRef` logic for scroll event listeners to minimize re-renders

</td>
<td width="50%" valign="top">

### 💻 My Contribution (Manual Work)

**Application Architecture**
- ✅ Designed overall **application architecture** and directory structure
- ✅ Planned component hierarchy and data flow

**Authentication Flow**
- ✅ Implemented **JWT handling** and token management
- ✅ Created **Protected Routes** system
- ✅ Built auth state management

**Business Logic**
- ✅ **State management** implementation with React hooks
- ✅ **API integration** hooks and error handling
- ✅ **Optimistic UI** updates for the voting system
- ✅ Debugging and connecting Frontend to Backend services

</td>
</tr>
</table>

> **Development Philosophy:** AI tools accelerated styling and boilerplate generation, allowing me to concentrate on unique business logic, architecture decisions, and seamless system integration.