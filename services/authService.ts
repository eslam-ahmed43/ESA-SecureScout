import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Support both Vite (VITE_) and CRA (REACT_APP_) environment variables
const getEnv = (key: string) => {
  // @ts-ignore
  return typeof process !== 'undefined' && process.env ? (process.env[`REACT_APP_${key}`] || process.env[`VITE_${key}`]) : undefined;
};

const firebaseConfig = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('FIREBASE_APP_ID')
};

// Initialize Firebase only if config is present to avoid crash during initial setup
let auth: any;
let googleProvider: any;

try {
  // Check if apiKey exists to avoid initialization error
  if (firebaseConfig.apiKey) {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } else {
    console.warn("Firebase config missing. Authentication features will be mocked or unavailable.");
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export const signInWithGoogle = async () => {
  if (!auth) throw new Error("Firebase not configured. Please check .env file.");
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};

export { auth };
