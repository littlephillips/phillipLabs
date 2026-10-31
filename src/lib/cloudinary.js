// Unsigned upload via Cloudinary's REST API — no server round-trip needed.
// Requires an unsigned upload preset configured in the Cloudinary console
// (Settings → Upload → Upload presets → add preset → Signing mode: Unsigned).
// Restrict that preset to an "admin" folder + reasonable file size/type limits
// on the Cloudinary side, since the preset name is public in the client bundle.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImage(file, { folder = "philliplabs" } = {}) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary env vars missing — set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET"
    );
  }

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);
  form.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: form }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || "Image upload failed");
  }

  const data = await res.json();
  // secure_url is the CDN URL to store on the post/project document.
  // public_id is kept too so a delete/replace flow can target the exact asset later.
  return { url: data.secure_url, publicId: data.public_id };
}
