import React from "react";
import { Download } from "lucide-react";

interface SEOScoreProps {
  score: number;
  tagCount: number;
  websiteUrl: string;
}

export default function SEOScore({ score, tagCount, websiteUrl }: SEOScoreProps) {
  const getScoreRating = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Poor";
  };

  // We're not implementing actual download functionality as it wasn't in the core requirements
  const handleDownload = () => {
    alert("Download functionality would be implemented here");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-grow mb-4 md:mb-0">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-neutral-800">SEO Analysis Results</h2>
            <span className="ml-2 px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-600">
              {tagCount} tags analyzed
            </span>
          </div>
          <p className="text-neutral-600 mt-1">{websiteUrl}</p>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full border-4 border-secondary flex items-center justify-center">
                <span className="text-xl font-bold text-secondary">{score}</span>
              </div>
              <div className="ml-3">
                <p className="font-medium text-neutral-800">SEO Score</p>
                <p className="text-sm text-neutral-500">{getScoreRating(score)}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={handleDownload}
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 p-2 rounded-full transition" 
            aria-label="Download Report"
          >
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
