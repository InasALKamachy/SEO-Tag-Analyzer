import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  onReset: () => void;
}

export default function ErrorState({ onReset }: ErrorStateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-destructive/10 rounded-lg p-6 flex items-start">
      <AlertCircle className="text-destructive mr-3 flex-shrink-0 h-5 w-5" />
      <div>
        <h3 className="font-semibold text-destructive">Unable to analyze website</h3>
        <p className="text-neutral-700 mt-1">
          We couldn't retrieve the data for this URL. Please check that the URL is correct and the website is accessible.
        </p>
        <button 
          className="mt-3 text-primary font-medium flex items-center"
          onClick={onReset}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Try again
        </button>
      </div>
    </div>
  );
}
