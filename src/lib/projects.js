import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore/lite";
import { db, firebaseReady } from "./firebase";

const PROJECTS = collection(db, "projects");

// Document shape (mirrors the old PROJECTS array in constants.js):
// { tag, title, img (Cloudinary URL), url, desc, color,
//   variant: "" | "admin", order: number, published: boolean, createdAt, updatedAt }

export async function listPublishedProjects() {
  if (!firebaseReady) return [];
  // Filter only; sort here. A where + orderBy pair would need a composite index,
  // and for a handful of projects sorting in the browser is simpler and safer.
  const snap = await getDocs(query(PROJECTS, where("published", "==", true)));
  return snap.docs
    .map((d) => {
    // Tech stack is never shown publicly, even if an old document still has it.
    const { stack: _omit, ...rest } = d.data();
    return { id: d.id, ...rest };
    })
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
}

export async function listAllProjects() {
  const snap = await getDocs(query(PROJECTS, orderBy("order", "asc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProjectById(id) {
  const snap = await getDoc(doc(db, "projects", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function createProject(data) {
  return addDoc(PROJECTS, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateProject(id, data) {
  return updateDoc(doc(db, "projects", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteProject(id) {
  return deleteDoc(doc(db, "projects", id));
}
