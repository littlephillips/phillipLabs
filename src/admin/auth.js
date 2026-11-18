import { getAuth } from "firebase/auth";
import app, { firebaseReady } from "../lib/firebase";

// Auth lives under admin/ so the public site bundle never includes firebase/auth.
// getAuth throws when the API key is missing (e.g. env vars not set on the host),
// which used to blank the whole admin. null = not configured; screens explain it.
export const auth = firebaseReady ? getAuth(app) : null;
