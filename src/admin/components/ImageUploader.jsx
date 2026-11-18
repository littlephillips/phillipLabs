import { useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { uploadImage } from "../../lib/cloudinary";

export default function ImageUploader({ value, onChange, folder }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file) {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const { url } = await uploadImage(file, { folder });
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {value ? (
        <div className="relative w-full max-w-sm rounded-lg overflow-hidden border border-line">
          <img src={value} alt="" className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full max-w-sm h-32 sm:h-40 border-2 border-dashed border-line-strong rounded-lg flex flex-col items-center justify-center gap-2 text-muted text-sm hover:border-accent hover:text-accent transition-colors disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 size={22} className="animate-spin" />
          ) : (
            <UploadCloud size={22} />
          )}
          {uploading ? "Uploading…" : "Click to upload image"}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
