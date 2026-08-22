import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import clsx from "clsx";
import { useAppContext } from "../context/AppContext";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export default function ImageUploader() {
  const { setUploadedImageFile } = useAppContext();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, or JPEG image.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("Image must be under 10MB.");
      return;
    }
    setError("");
    setUploadedImageFile(file);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files?.[0]);
        }}
        className={clsx(
          "flex w-full flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed",
          "px-6 py-10 text-center transition-theme",
          isDragging
            ? "border-agri-primary bg-agri-primary-soft"
            : "border-agri-border bg-agri-surface-alt hover:border-agri-primary-light"
        )}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-agri-surface text-agri-primary">
          <UploadCloud className="h-5 w-5" />
        </span>
        <span className="text-sm font-medium text-agri-text">Click to upload image</span>
        <span className="text-xs text-agri-text-muted">JPG, PNG, JPEG (Max. 10MB)</span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      {error && <p className="mt-2 text-xs font-medium text-worst-accent">{error}</p>}
    </div>
  );
}
