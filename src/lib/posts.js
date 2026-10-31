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
import { marked } from "marked";
import { db } from "./firebase";

const POSTS = collection(db, "posts");

// Document shape (kept close to the old markdown-frontmatter fields so the
// public pages barely changed when this moved off static files):
// { title, slug, date: "YYYY-MM-DD", excerpt, tag, body (markdown), coverImage,
//   published: boolean, createdAt, updatedAt }

export async function listPublishedPosts() {
  const q = query(POSTS, where("published", "==", true), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function listAllPosts() {
  // Admin view — includes drafts. orderBy(updatedAt) so the most recently
  // edited draft/post surfaces first.
  const snap = await getDocs(query(POSTS, orderBy("updatedAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getPostBySlug(slug) {
  const q = query(POSTS, where("slug", "==", slug), where("published", "==", true));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const docSnap = snap.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

export async function getPostById(id) {
  const snap = await getDoc(doc(db, "posts", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function createPost(data) {
  return addDoc(POSTS, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updatePost(id, data) {
  return updateDoc(doc(db, "posts", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deletePost(id) {
  return deleteDoc(doc(db, "posts", id));
}

export function renderMarkdown(md) {
  return marked.parse(md || "");
}

export function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
