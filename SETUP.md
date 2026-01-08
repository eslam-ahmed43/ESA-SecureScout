
# SecureScout Setup Guide

Follow these instructions to get SecureScout running on your local machine.

## Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn
*   A Google Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/))

## Installation Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/securescout.git
    cd securescout
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**
    *   Rename `.env.example` to `.env`
    *   Open `.env` and paste your Gemini API Key:
        ```env
        API_KEY=AIzaSy...YourKeyHere...
        ```

4.  **Start the Development Server**
    ```bash
    npm start
    ```
    The app should now be running at `http://localhost:3000`.

## Building for Production

To create an optimized build for deployment:
```bash
npm run build
```
The output will be in the `build` directory.

## Troubleshooting

*   **Error: "Rate limit exceeded"**: The app has a client-side limit of 5 scans/hour to prevent API abuse. clear your browser's Local Storage to reset.
*   **API Errors**: Ensure your API key has access to the `gemini-3-pro-preview` model.
