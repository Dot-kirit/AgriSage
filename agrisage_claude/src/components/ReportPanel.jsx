import { FileText, Loader2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";

function ReportRow({ label, value, accentClass }) {
  return (
    <div>
      <p className={`text-xs font-semibold uppercase tracking-wide ${accentClass ?? "text-agri-text-muted"}`}>
        {label}
      </p>
      <p className="mt-0.5 text-sm text-agri-text">{value}</p>
    </div>
  );
}

export default function ReportPanel() {
  const { uploadedImage, diagnosisReport, isAnalyzing, requestDiagnosis, selectedLanguage } =
    useAppContext();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-agri-text">Analysis Report</h2>
          <p className="mt-1 text-sm text-agri-text-muted">
            View the AI-powered diagnosis of your crop.
          </p>
        </div>
        <button
          type="button"
          onClick={requestDiagnosis}
          disabled={!uploadedImage || isAnalyzing}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-agri-primary
            px-4 py-2 text-sm font-semibold text-white transition-theme
            hover:bg-agri-primary-dark disabled:opacity-40 disabled:hover:bg-agri-primary"
        >
          {isAnalyzing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          View Report
        </button>
      </div>

      <div className="mt-5 flex flex-1 flex-col rounded-card border border-agri-border bg-agri-surface-alt p-5">
        {!diagnosisReport && !isAnalyzing && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
            <FileText className="h-8 w-8 text-agri-text-muted" />
            <p className="max-w-[220px] text-sm text-agri-text-muted">
              Your analysis report will appear here after you click &ldquo;View Report&rdquo;.
            </p>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
            <Loader2 className="h-6 w-6 animate-spin text-agri-primary" />
            <p className="text-sm text-agri-text-muted">Analyzing your crop image...</p>
          </div>
        )}

        {diagnosisReport && !isAnalyzing && (
          <div className="space-y-4 animate-fade-in">
            {/* Placeholder for the future translated-report hook: content
                will swap to selectedLanguage once the translation API
                is connected, without changing this layout. */}
            <p className="text-xs text-agri-text-muted">
              Showing report in{" "}
              <span className="font-medium text-agri-text">{selectedLanguage.name}</span>
            </p>

            <ReportRow
              label="Disease Detected"
              value={diagnosisReport.diseaseDetected}
              accentClass="text-worst-accent"
            />
            <div className="grid grid-cols-2 gap-4">
              <ReportRow label="Crop" value={diagnosisReport.crop} />
              <ReportRow label="Severity" value={diagnosisReport.severity} />
            </div>
            <ReportRow label="Symptoms" value={diagnosisReport.symptoms} />
            <ReportRow
              label="Recommended Treatment"
              value={diagnosisReport.recommendedTreatment}
              accentClass="text-soil-accent"
            />
            <ReportRow label="Prevention" value={diagnosisReport.prevention} />
            <ReportRow
              label="Confidence"
              value={`${diagnosisReport.confidencePercent}%`}
              accentClass="text-agri-primary"
            />
          </div>
        )}
      </div>
    </div>
  );
}
