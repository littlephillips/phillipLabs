import { getAuth } from "firebase/auth";
import app from "../lib/firebase";

// Auth lives under admin/ so the public site bundle never includes firebase/auth.
export const auth = getAuth(app);
