<div align="center">
  <img src="https://via.placeholder.com/150/0ea5e9/ffffff?text=ESA" alt="ESA SecureScout Logo" width="120" height="120" />
  <h1>🛡️ ESA SecureScout</h1>
  <p><strong>The AI-Powered Security Analyst in Your Browser</strong></p>
  <p><strong>Developed by Eslam Elokpy</strong></p>
  
  <p>
    <a href="https://github.com/yourusername/securescout/actions"><img src="https://img.shields.io/github/actions/workflow/status/yourusername/securescout/ci.yml?style=flat-square" alt="Build Status"/></a>
    <a href="https://github.com/yourusername/securescout/blob/main/LICENSE"><img src="https://img.shields.io/github/license/yourusername/securescout?style=flat-square" alt="License"/></a>
    <a href="https://typescriptlang.org"><img src="https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square" alt="TypeScript"/></a>
    <a href="https://aistudio.google.com/"><img src="https://img.shields.io/badge/Powered%20By-Gemini%203%20Pro-8e44ad?style=flat-square" alt="Gemini 3 Pro"/></a>
  </p>

  <h3>🏆 Built for the Google DeepMind Hackathon 2025</h3>
</div>

---

## 📖 Overview

**ESA SecureScout** democratizes cybersecurity by combining enterprise-grade vulnerability scanning with the reasoning power of **Google Gemini 3 Pro**. 

Unlike traditional regex-based scanners that flood you with false positives, ESA SecureScout understands the *logic* of your application. It doesn't just find bugs—it explains them in plain English (or Arabic!) and writes the fix for you.

## ✨ Features

*   **Google Authentication**: Secure access control.
*   **Cognitive Analysis**: Uses **Gemini 3 Pro** reasoning.
*   **Instant Remediation**: Copy-pasteable code fixes.
*   **Hacker Terminal UI**: Real-time terminal visualization.
*   **Bilingual Support**: Native English and Arabic (RTL).
*   **Search Grounding**: Verifies threats against CVE databases.

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/esa-securescout.git
    cd esa-securescout
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Firebase Setup**
    Follow the [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) guide to create a project and get your keys.

4.  **Environment Variables**
    Create a `.env` file based on `.env.example`:
    ```bash
    REACT_APP_API_KEY=your_gemini_key
    REACT_APP_FIREBASE_API_KEY=your_firebase_key
    ...
    ```

5.  **Run Development Server**
    ```bash
    npm start
    ```

## 👥 Credits

*   **Developer**: Eslam Elokpy
*   **Powered By**: Google Gemini 3 Pro

Made with ❤️ for the Google DeepMind Hackathon 2025.
