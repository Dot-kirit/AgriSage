import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import ImagePreview from "../components/ImagePreview";
import ReportPanel from "../components/ReportPanel";
import { useAppContext } from "../context/AppContext";

export default function CropDiagnosis() {
  const navigate = useNavigate();
  const { previewUrl } = useAppContext();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
        {/* Upload Crop Image */}
        <div className="rounded-card border border-agri-border bg-agri-surface p-5 shadow-card sm:p-6">
          <h2 className="font-display text-lg font-semibold text-agri-text">
            Upload Crop Image
          </h2>
          <p className="mt-1 text-sm text-agri-text-muted">
            Upload a clear image of the affected crop leaf for accurate diagnosis.
          </p>

          <div className="mt-5">
            <ImageUploader />
          </div>

          {previewUrl && (
            <div className="mt-5">
              <ImagePreview />
            </div>
          )}
        </div>

        {/* Analysis Report */}
        <div className="rounded-card border border-agri-border bg-agri-surface p-5 shadow-card sm:p-6">
          <ReportPanel />
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="flex w-fit items-center gap-1.5 rounded-full border border-agri-border
          bg-agri-surface px-4 py-2 text-sm font-medium text-agri-text
          transition-theme hover:border-agri-primary hover:text-agri-primary-dark
          dark:hover:text-agri-primary-light"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Overview
      </button>
    </div>
  );
}
