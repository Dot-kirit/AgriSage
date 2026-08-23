import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, X, ArrowLeft, FileText, Sparkles, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CropDiagnosis() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const {
    previewUrl,
    handleImageUpload,
    handleClearImage,
    diagnosisReport,
    isAnalyzing,
    predictCropDisease,
  } = useApp();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#16231D] border border-[#E5ECE8] dark:border-[#273E34] shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-[#1A2E22] dark:text-[#E5EFEA]">Upload Crop Image</h3>
            <p className="text-xs text-[#52665B] dark:text-[#8CA397] mt-0.5">
              Upload a clear image of the affected crop leaf for accurate diagnosis.
            </p>

            <div className="mt-5">
              {!previewUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#C5E5CE] dark:border-[#273E34] hover:border-[#419C5F] dark:hover:border-[#419C5F] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-[#F8FAF9] dark:bg-[#0F1713] hover:bg-[#F2F9F4] dark:hover:bg-[#1D2F27] transition-all group min-h-[220px]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#E1F2E6] dark:bg-[#1D3A29] flex items-center justify-center text-[#2F7E4A] dark:text-[#67B781] mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-[#1A2E22] dark:text-[#E5EFEA]">Click to upload image</span>
                  <span className="text-[10px] text-[#8CA397] mt-1">JPG, PNG, JPEG (Max. 10MB)</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-[#E5ECE8] dark:border-[#273E34] bg-[#0F1713] flex items-center justify-center max-h-[260px]">
                  <img src={previewUrl} alt="Crop Leaf Preview" className="w-full h-full object-contain" />
                  <button
                    onClick={handleClearImage}
                    className="absolute top-2.5 right-2.5 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all cursor-pointer"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#16231D] border border-[#E5ECE8] dark:border-[#273E34] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#1A2E22] dark:text-[#E5EFEA]">Analysis Report</h3>
                <p className="text-xs text-[#52665B] dark:text-[#8CA397] mt-0.5">
                  View the AI-powered diagnosis of your crop.
                </p>
              </div>
              <button
                onClick={predictCropDisease}
                disabled={!previewUrl || isAnalyzing}
                className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                  !previewUrl || isAnalyzing
                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-[#419C5F] hover:bg-[#2F7E4A] text-white cursor-pointer'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>View Report</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-5">
              {!diagnosisReport ? (
                <div className="min-h-[220px] rounded-2xl border border-[#E5ECE8] dark:border-[#273E34] bg-[#F8FAF9] dark:bg-[#0F1713] flex flex-col items-center justify-center p-6 text-center">
                  <FileText className="w-10 h-10 text-[#8CA397] mb-2" />
                  <p className="text-xs text-[#52665B] dark:text-[#8CA397] max-w-xs">
                    Your analysis report will appear here after you click "View Report".
                  </p>
                </div>
              ) : (
                <div className="bg-[#12231A] border border-white/10 rounded-2xl p-6 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                        Disease Detected
                      </p>
                      <h3 className="text-2xl font-bold text-white capitalize mt-1">
                        {diagnosisReport.diseaseDetected || 'Condition Identified'}
                      </h3>
                    </div>
                    <span className="text-sm font-bold text-emerald-400">
                      {diagnosisReport.confidence || '90%'}
                    </span>
                  </div>

                  <div className="flex gap-4 text-sm text-gray-300">
                    <p>
                      <strong className="text-gray-400">Crop:</strong> {diagnosisReport.crop || 'Crop'}
                    </p>
                    <p>
                      <strong className="text-gray-400">Severity:</strong>{' '}
                      <span className={
                        diagnosisReport.severity?.toLowerCase() === 'high' || diagnosisReport.severity?.toLowerCase() === 'critical'
                          ? 'text-red-400 font-semibold'
                          : 'text-amber-400 font-semibold'
                      }>
                        {diagnosisReport.severity || 'Moderate'}
                      </span>
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300">Symptoms:</h4>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                      {diagnosisReport.symptoms || 'Symptoms recorded.'}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300">Recommended Treatment:</h4>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                      {diagnosisReport.recommendedTreatment || 'Consult local agronomy guidelines.'}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300">Prevention:</h4>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                      {diagnosisReport.prevention || 'Standard crop rotation and sanitation.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#52665B] dark:text-[#8CA397] hover:text-[#1A2E22] dark:hover:text-[#E5EFEA] bg-white dark:bg-[#16231D] border border-[#E5ECE8] dark:border-[#273E34] hover:bg-[#F2F9F4] dark:hover:bg-[#1D2F27] transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </button>
      </div>
    </div>
  );
}