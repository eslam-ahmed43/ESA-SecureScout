# Firebase Setup Guide for ESA SecureScout

To enable Google Authentication for ESA SecureScout, you need to set up a Firebase project. Follow these steps:

## 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add project"**.
3. Name your project (e.g., `esa-securescout`).
4. Disable Google Analytics (optional, for simplicity).
5. Click **"Create project"**.

## 2. Register Web App
1. In the project overview, click the **Web icon** (`</>`) to add an app.
2. Name it "ESA SecureScout Web".
3. Click **"Register app"**.
4. You will see your `firebaseConfig` object. Keep this page open or copy the values.

## 3. Enable Authentication
1. Go to **"Build"** -> **"Authentication"** in the sidebar.
2. Click **"Get started"**.
3. Select **"Google"** from the Sign-in method list.
4. Click **"Enable"**.
5. Set the **"Project support email"**.
6. Click **"Save"**.

## 4. Configure Environment Variables
Copy the values from your Firebase config into your `.env` file (see `.env.example`).

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=esa-securescout.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=esa-securescout
...
```

## 5. Add Authorized Domains (Production)
1. Go to **Authentication** -> **Settings** -> **Authorized domains**.
2. Add your production domain (e.g., `esa-securescout.vercel.app`).
3. `localhost` is authorized by default.

Your application is now ready with secure Google Authentication!
