import React from "react";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-neutral-600 font-medium">Analyzing website SEO tags...</p>
    </div>
  );
}
