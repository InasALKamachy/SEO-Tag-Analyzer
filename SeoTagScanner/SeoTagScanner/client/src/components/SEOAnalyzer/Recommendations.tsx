import React from "react";
import { AlertTriangle } from "lucide-react";
import { Recommendation } from "@/lib/types";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  if (recommendations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">Improvement Recommendations</h3>
        </div>
        <div className="p-6">
          <div className="text-center text-neutral-500 py-4">
            <p>No recommendations needed! Your SEO tags look great.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-200">
        <h3 className="font-semibold text-neutral-800">Improvement Recommendations</h3>
      </div>
      <div className="divide-y divide-neutral-200">
        {recommendations.map((rec, index) => (
          <div className="p-4" key={index}>
            <div className="flex items-start">
              <AlertTriangle className="text-warning mt-0.5 mr-3 flex-shrink-0 h-5 w-5" />
              <div>
                <h4 className="font-medium text-neutral-800">{rec.title}</h4>
                <p className="text-sm text-neutral-600 mt-1">{rec.description}</p>
                {rec.example && (
                  <div className="mt-2 code bg-neutral-50 p-2 rounded text-sm">
                    {rec.example}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
