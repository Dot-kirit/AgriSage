import { X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function ImagePreview() {
  const { previewUrl, clearUploadedImage } = useAppContext();

  if (!previewUrl) return null;

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-agri-text">Preview</p>
      <div className="relative overflow-hidden rounded-card border border-agri-border bg-agri-surface-alt animate-fade-in">
        <img
          src={previewUrl}
          alt="Uploaded crop leaf"
          className="max-h-64 w-full object-cover"
        />
        <button
          type="button"
          onClick={clearUploadedImage}
          aria-label="Remove uploaded image"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center
            rounded-full bg-black/60 text-white backdrop-blur transition-theme hover:bg-black/80"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
