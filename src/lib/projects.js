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
import { db } from "./firebase";

const PROJECTS = collection(db, "projects");

// Document shape (mirrors the old PROJECTS array in constants.js):
// { tag, title, img (Cloudinary URL), url, desc, stack: string[], color,
//   variant: "" | "admin", order: number, published: boolean, createdAt, updatedAt }

export async function listPublishedProjects() {
  const q = query(PROJECTS, where("published", "==", true), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
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
