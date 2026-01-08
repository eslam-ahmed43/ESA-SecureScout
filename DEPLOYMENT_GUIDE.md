
# Deployment Guide

SecureScout is ready to be deployed to any static site hosting provider. We recommend **Vercel** or **Netlify**.

## Option 1: Vercel (Recommended)

1.  **Push to GitHub**: Ensure your code is pushed to a GitHub repository.
2.  **Import Project**: Go to Vercel Dashboard -> Add New -> Project -> Import your repo.
3.  **Environment Variables**:
    *   In the Vercel configuration screen, add:
    *   **Name**: `API_KEY`
    *   **Value**: Your Google Gemini API Key.
    *   **Name**: `REACT_APP_API_KEY` (if using Create React App's default env handling, though our code uses `process.env.API_KEY` which Vercel injects automatically during build if configured).
4.  **Deploy**: Click "Deploy". Vercel will detect `create-react-app` and configure the build settings automatically.

## Option 2: Netlify

1.  **New Site from Git**: Connect your GitHub repo.
2.  **Build Settings**:
    *   Build command: `npm run build`
    *   Publish directory: `build`
3.  **Environment Variables**:
    *   Go to Site Settings -> Build & Deploy -> Environment.
    *   Add `API_KEY` with your key.
4.  **Deploy Site**.

## Option 3: Docker (Container)

If you prefer a containerized deployment:

1.  **Build Image**:
    ```bash
    docker build -t securescout .
    ```
2.  **Run Container**:
    ```bash
    docker run -p 3000:3000 -e API_KEY=your_key_here securescout
    ```

*Note: You will need to create a `Dockerfile` for this option.*
