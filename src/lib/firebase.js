import { initializeApp, getApps } from "firebase/app";
import { getFirestore, setLogLevel } from "firebase/firestore/lite";

// Using the "lite" Firestore build: the whole app only does one-shot reads
// and writes (getDocs/addDoc/updateDoc/deleteDoc) — nothing subscribes to
// live updates via onSnapshot. The lite SDK drops the realtime
// listener/watch stream machinery that isn't used, which meaningfully
// shrinks the public site's bundle (Work.jsx and the blog pages import
// Firestore too, not just the admin panel).

// All values come from .env (see .env.example). Never hardcode real keys here —
// Firebase web config isn't a secret in the traditional sense (it's fine to
// ship in the client bundle), but keeping it in env vars makes it easy to
// swap projects between local/staging/prod without touching code.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;

// Quiet the SDK in production: a failed read already degrades to local
// content, and raw RPC errors in the console look alarming to visitors.
if (import.meta.env.PROD) setLogLevel("silent");

// False when no .env is configured (local dev, preview deploys). Reads are
// skipped so the public site renders from its built-in content.
export const firebaseReady = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);
